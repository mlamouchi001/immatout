"""Validate packages/data/ JSON grids and print a machine-readable summary.

This script does NOT write to the database — the authoritative seed path is
`pnpm --filter @immatout/web db:seed` (TypeScript, using Prisma). This Python
counterpart exists for CI and for the upcoming ADEME/EEA ingestion that will
produce new JSON grids; in that context, we want a language-agnostic validator.

Validation rules enforced here:
  - every required file exists
  - grids are non-empty
  - CO2 grid is monotonic non-decreasing in both co2GPerKm and amountEuros
  - CO2 grid peak matches `globalMalusCapEuros`
  - weight grid tranches are contiguous (from_kg of tranche[i+1] == to_kg of tranche[i])
  - regions grid covers the 13 metropolitan + 5 overseas regions

Exit code 0 on success, 1 on failure. JSON summary printed to stdout.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


REQUIRED_REGIONS = {
    "ARA", "BFC", "BRE", "CVL", "COR", "GES", "HDF", "IDF", "NOR",
    "NAQ", "OCC", "PDL", "PAC", "GUA", "GUF", "MAR", "MAY", "REU",
}


class ValidationError(Exception):
    pass


def _load(path: Path) -> Any:
    if not path.exists():
        raise ValidationError(f"missing file: {path}")
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def validate_co2(path: Path) -> dict[str, Any]:
    data = _load(path)
    grid = data["grid"]
    if not grid:
        raise ValidationError(f"{path}: empty grid")

    prev_co2 = -1
    prev_amount = -1
    for row in grid:
        co2 = row["co2GPerKm"]
        amount = row["amountEuros"]
        if co2 <= prev_co2:
            raise ValidationError(f"{path}: co2 not increasing at {row}")
        if amount < prev_amount:
            raise ValidationError(f"{path}: amount decreasing at {row}")
        prev_co2 = co2
        prev_amount = amount

    peak = grid[-1]["amountEuros"]
    cap = data["globalMalusCapEuros"]
    if peak != cap:
        raise ValidationError(f"{path}: grid peak {peak} != globalMalusCapEuros {cap}")

    return {
        "scaleYear": data["scaleYear"],
        "thresholdGPerKm": grid[0]["co2GPerKm"],
        "capEuros": cap,
        "capReachedAtGPerKm": grid[-1]["co2GPerKm"],
        "rows": len(grid),
    }


def validate_weight(path: Path) -> dict[str, Any]:
    data = _load(path)
    tranches = data["tranches"]
    if not tranches:
        raise ValidationError(f"{path}: empty tranches")

    prev_to = data["triggerKg"]
    for tr in tranches:
        if tr["fromKg"] != prev_to:
            raise ValidationError(
                f"{path}: non-contiguous tranches around {tr}"
            )
        prev_to = tr["toKg"] if tr["toKg"] is not None else float("inf")

    return {
        "scaleYear": data["scaleYear"],
        "triggerKg": data["triggerKg"],
        "tranches": len(tranches),
        "evApplicable": data["evApplicable"],
    }


def validate_regions(path: Path) -> dict[str, Any]:
    data = _load(path)
    codes = {r["regionCode"] for r in data["regions"]}
    missing = REQUIRED_REGIONS - codes
    unknown = codes - REQUIRED_REGIONS
    if missing or unknown:
        raise ValidationError(
            f"{path}: region coverage mismatch · missing={missing} unknown={unknown}"
        )

    for r in data["regions"]:
        if r["perCvRateEuros"] > 60:
            raise ValidationError(
                f"{path}: {r['regionCode']} exceeds legal 60 €/CV ceiling"
            )

    return {
        "scaleYear": data["scaleYear"],
        "regionsCount": len(data["regions"]),
        "idfmSurchargeEurosPerCv": data["idfmSurchargeEurosPerCv"],
    }


def validate_decote(path: Path) -> dict[str, Any]:
    data = _load(path)
    tiers = data["tiers"]
    if not tiers:
        raise ValidationError(f"{path}: empty decote tiers")
    prev_to = 0
    for t in tiers:
        if t["fromMonths"] != prev_to + 1 and t["fromMonths"] != prev_to:
            # Accept either inclusive-next or half-open continuation.
            # We documented half-open intervals [from, to); expect from == prev_to.
            if t["fromMonths"] != prev_to:
                raise ValidationError(
                    f"{path}: non-contiguous decote tier around {t}"
                )
        prev_to = t["toMonths"] if t["toMonths"] is not None else float("inf")
    return {"tiers": len(tiers), "fullExonerationAtMonths": data["fullExonerationAtMonths"]}


def validate_documents(path: Path) -> dict[str, Any]:
    data = _load(path)
    expected_cases = {
        "FR_NEW", "FR_USED",
        "IMPORT_EU_NEW", "IMPORT_EU_USED",
        "IMPORT_NON_EU_NEW", "IMPORT_NON_EU_USED",
    }
    missing = expected_cases - set(data.keys())
    if missing:
        raise ValidationError(f"{path}: missing vehicle cases {missing}")
    return {"cases": list(data.keys())}


def build_seed(data_dir: Path) -> dict[str, Any]:
    scales_dir = data_dir / "scales"
    summary: dict[str, Any] = {"co2": [], "weight": [], "regions": [], "decote": None, "documents": None}

    for co2_path in sorted(scales_dir.glob("malus-co2-*.json")):
        summary["co2"].append(validate_co2(co2_path))

    for w_path in sorted(scales_dir.glob("malus-weight-*.json")):
        summary["weight"].append(validate_weight(w_path))

    for r_path in sorted(scales_dir.glob("regions-cv-*.json")):
        summary["regions"].append(validate_regions(r_path))

    summary["decote"] = validate_decote(scales_dir / "decote-coefficients.json")
    summary["documents"] = validate_documents(scales_dir / "required-documents.json")

    return summary


def _main() -> int:
    parser = argparse.ArgumentParser(description="Validate immatout reference-data seed")
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=Path(__file__).resolve().parents[2] / "packages" / "data",
    )
    args = parser.parse_args()

    try:
        summary = build_seed(args.data_dir)
    except ValidationError as err:
        print(f"[build_seed] VALIDATION FAILED: {err}", file=sys.stderr)
        return 1
    except Exception as err:  # unexpected, let it fail loudly
        print(f"[build_seed] UNEXPECTED: {type(err).__name__}: {err}", file=sys.stderr)
        return 1

    print(json.dumps(summary, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(_main())
