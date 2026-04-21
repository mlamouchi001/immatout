"""Fetch ADEME Car Labelling dataset (vehicle autocompletion source).

Source : https://data.ademe.fr and https://carlabelling.ademe.fr, also mirrored
on data.gouv.fr under "Émissions de CO2 et de polluants des véhicules
commercialisés en France".

Licence : Licence Ouverte Etalab (commercial reuse allowed with attribution).

Extracts (per vehicle row): make, model, CNIT, type_mine, CO2_WLTP (g/km),
mass in running order (kg), energy, CV fiscaux, cylinder capacity (cm³),
engine power (kW).

Status (Phase 3): *not implemented yet*. The calculation engine works end-to-end
from manual vehicle input; ADEME ingestion will be wired in alongside the
auto-complete feature on the web form. Deliberately deferred — no placeholder
data, no fake values. Run will fail loud.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def fetch_ademe(year: int, out_path: Path) -> None:
    raise NotImplementedError(
        "ADEME ingestion not implemented — deferred to the auto-complete UI phase. "
        f"Requested year={year}, out={out_path}."
    )


def _main() -> int:
    parser = argparse.ArgumentParser(description="Fetch ADEME Car Labelling dataset")
    parser.add_argument("--year", type=int, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    try:
        fetch_ademe(args.year, args.out)
    except NotImplementedError as err:
        print(f"[fetch_ademe] {err}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(_main())
