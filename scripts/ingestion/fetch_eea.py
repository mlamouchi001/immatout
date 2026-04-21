"""Fetch EEA CO2 Monitoring dataset (covers EU-imported used vehicles).

Source : https://co2cars.apps.eea.europa.eu (SQL REST endpoint available).
Licence : EEA re-use policy (attribution required).

Extracts (per vehicle row): manufacturer, TA number, CO2 WLTP (g/km),
mass (kg), fuel type, engine power (kW), registration country.

Status (Phase 3): *not implemented yet*. Same rationale as `fetch_ademe.py`.
Calculation engine is fully functional from manual input. This ingestion is
sequenced with the UI auto-complete work.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def fetch_eea(year: int, out_path: Path) -> None:
    raise NotImplementedError(
        "EEA ingestion not implemented — deferred to the auto-complete UI phase. "
        f"Requested year={year}, out={out_path}."
    )


def _main() -> int:
    parser = argparse.ArgumentParser(description="Fetch EEA CO2 Monitoring dataset")
    parser.add_argument("--year", type=int, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    try:
        fetch_eea(args.year, args.out)
    except NotImplementedError as err:
        print(f"[fetch_eea] {err}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(_main())
