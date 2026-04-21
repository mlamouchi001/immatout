# Immatout — ingestion

Scripts Python qui construisent les fichiers JSON de `packages/data/` à partir
des sources officielles.

## Sources

| Script           | Source                                                              | Licence                |
| ---------------- | ------------------------------------------------------------------- | ---------------------- |
| `fetch_ademe.py` | [ADEME Car Labelling](https://carlabelling.ademe.fr) / data.gouv.fr | Licence Ouverte Etalab |
| `fetch_eea.py`   | [EEA CO2 Monitoring](https://co2cars.apps.eea.europa.eu)            | EEA re-use policy      |
| `build_seed.py`  | Agrège les deux ci-dessus + barèmes manuels                         | —                      |

## Installation

```bash
cd scripts/ingestion
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Exécution

```bash
python fetch_ademe.py --year 2026 --out ../../packages/data/vehicles-ademe.json
python fetch_eea.py --year 2026 --out ../../packages/data/vehicles-eea.json
python build_seed.py   # produit tous les JSON de packages/data/
```

Phase 1 : les scripts sont des skeletons qui lèvent `NotImplementedError`.
Phase 3 les remplira avec les appels réels.
