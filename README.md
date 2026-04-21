# Immatout

Application web full-stack de calcul officiel du coût d'immatriculation d'un véhicule en France, conforme à la **Loi de Finances 2026** et au **Code des impositions sur les biens et services (CIBS)**.

## ✨ Fonctionnalités

- Saisie par **plaque d'immatriculation** (provider SIV configurable, cache 30 jours) avec fallback gracieux vers la saisie manuelle.
- Formulaire manuel complet (genre, énergie, CV, CO₂ WLTP, masse, PTAC, famille, CMI, personne morale).
- **Détail des 6 taxes** (Y1 régionale · Y2 formation · Y3 malus CO₂ · Y4 gestion · Y5 acheminement · Y6 malus poids) avec citation de l'article CIBS pour chaque ligne.
- Donut chart de répartition + vue synthétique/expert.
- **Comparateur 18 régions** côte à côte (utile avant un déménagement).
- **Export PDF** du devis (A4 server-rendered).
- **Pages documents** : pièces à fournir pour chaque cas (FR neuf/occasion, import UE, import hors UE).
- Mentions légales complètes avec sources, licences et limitations.
- Analytics Plausible RGPD-friendly (opt-in via env).

## 🧱 Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript strict**
- **Prisma 6** + **PostgreSQL 16**
- **TailwindCSS 3** + **shadcn/ui** (Radix-based)
- **recharts** (donut) · **@react-pdf/renderer** (export PDF) · **lucide-react**
- **Zod** (validation de bout en bout)
- **Vitest** (tests unitaires + intégration) · **Playwright** (E2E)
- **Node 20 LTS** · **pnpm 10** (workspaces)

## 📦 Architecture

```
immatout/
├── apps/
│   └── web/                    # Next.js 15 + API + Prisma
│       ├── app/                # App Router pages + routes API
│       ├── components/         # UI + calculator (client)
│       ├── lib/                # utils, i18n, siv, pdf, api errors
│       ├── prisma/             # schema + migrations + seed
│       ├── tests/              # Vitest (API integration)
│       └── e2e/                # Playwright (parcours UI)
├── packages/
│   ├── calc/                   # moteur pur TS (framework-free)
│   │   ├── src/taxes/          # Y1-Y6
│   │   ├── src/abatements/     # âge, exonérations
│   │   └── tests/              # 91 tests + 20 golden cases
│   └── data/                   # barèmes versionnés (JSON + Zod)
│       └── scales/             # regions-cv, malus-co2, malus-weight, decote, documents
├── scripts/
│   └── ingestion/              # validateur Python + skeletons ADEME/EEA
├── docker-compose.yml          # postgres:16-alpine sur :5434
├── Dockerfile                  # multi-stage Next.js build
└── .github/workflows/ci.yml    # lint + typecheck + test + build
```

Le moteur `@immatout/calc` est **pur** : pas d'I/O, pas de framework, tout montant interne en **centimes entiers** pour éviter la dérive flottante. Chaque taxe retourne son `legalRef` (ex : `CIBS L.421-71 à L.421-81-1`) pour traçabilité.

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
pnpm install

# 2. Configurer l'environnement
cp .env.example .env

# 3. Démarrer Postgres (exposé sur 5434 pour éviter les collisions)
docker compose up -d postgres

# 4. Migrer la BDD + générer le client Prisma
pnpm --filter @immatout/web exec prisma migrate deploy

# 5. Seed les barèmes de référence (idempotent)
pnpm db:seed

# 6. Lancer l'application
pnpm dev
# → http://localhost:3000
```

## 🧪 Tests

| Suite                | Framework  | Commande                                  | Couverture                                             |
| -------------------- | ---------- | ----------------------------------------- | ------------------------------------------------------ |
| Moteur de calcul     | Vitest     | `pnpm --filter @immatout/calc test`       | **91 tests** · 98,8 % stmts                            |
| API REST             | Vitest     | `pnpm --filter @immatout/web test`        | **19 tests** (Prisma mockée en mémoire)                |
| Parcours utilisateur | Playwright | `pnpm --filter @immatout/web test:e2e`    | **7 tests** (plaque, manuel, PDF, navigation, compare) |
| Validateur barèmes   | Python     | `python3 scripts/ingestion/build_seed.py` | Monotonie CO₂, tranches poids, 18 régions              |

## 🛣️ API REST

| Route                        | Méthode | Description                                                    |
| ---------------------------- | ------- | -------------------------------------------------------------- |
| `/api/health`                | GET     | Santé + version moteur                                         |
| `/api/calculate`             | POST    | Calcul complet (body = `CalculationContextSchema`) + audit log |
| `/api/calculate/pdf`         | POST    | Devis PDF A4 (stream)                                          |
| `/api/vehicle/[plate]`       | GET     | Lookup SIV avec cache 30 j, fallback gracieux 503              |
| `/api/regions?year=2026`     | GET     | 18 régions + surcharge IDFM                                    |
| `/api/documents?case=FR_NEW` | GET     | Pièces à fournir par cas                                       |
| `/api/compare`               | POST    | Les 18 régions en un round-trip, trié ascendant                |

Erreurs au format stable `{ error, code, details? }` avec codes HTTP standards (400, 404, 503, 500).

## 📜 Sources officielles

| Domaine                    | Source                                                                                                                              | Licence                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Barèmes fiscaux            | [Légifrance — CIBS L.421-29 à L.421-92](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000044595989/LEGISCTA000044599003/) | Domaine public         |
| Malus CO₂                  | [service-public F35947](https://www.service-public.gouv.fr/particuliers/vosdroits/F35947)                                           | Domaine public         |
| Malus masse (TMOM)         | [service-public F35950](https://www.service-public.gouv.fr/particuliers/vosdroits/F35950)                                           | Domaine public         |
| Tarifs régionaux 2026      | [service-public A18021](https://www.service-public.gouv.fr/particuliers/actualites/A18021)                                          | Domaine public         |
| Caractéristiques véhicules | [ADEME Car Labelling](https://carlabelling.ademe.fr) · [data.gouv.fr](https://data.gouv.fr)                                         | Licence Ouverte Etalab |
| Véhicules importés UE      | [EEA CO₂ Monitoring](https://co2cars.apps.eea.europa.eu)                                                                            | EEA re-use policy      |

## ⚖️ Décisions réglementaires documentées

1. **Y6 sur véhicules électriques** : l'exonération totale des EV et véhicules hydrogène est **maintenue pour 2026-2028** (Loi de Finances 2026 adoptée via 49-3 après retrait de l'amendement instaurant le malus poids pour EV à partir de juillet 2026). Un flag `evApplicable` dans le schéma `WeightMalusFile` autorise l'évolution future.
2. **Île-de-France** : plafond CIBS toujours **60 €/CV**. La surcharge IDFM de **+14 €/CV** depuis le 1ᵉʳ mars 2026 (puis +12 €/CV en 2027) est modélisée comme taxe additionnelle séparée dans `Y1.idfmSurchargeCents`.
3. **Abattement ≥ 8 places** : 500 kg pour une personne physique, **600 kg pour une personne morale** au 1ᵉʳ janvier 2026 (LF 2026).
4. **Plafond global Y3+Y6** : 80 000 € en 2026 (évolue à 90 000 € en 2027, 100 000 € en 2028). Distribué par l'orchestrateur : si Y3 seul dépasse le plafond, Y6 est zéroé ; sinon Y6 est tronqué à `cap - Y3`.

## ⚙️ Variables d'environnement

Voir [.env.example](.env.example). Principales :

- `DATABASE_URL` — chaîne de connexion Postgres.
- `SIV_API_PROVIDER` — `mock` (défaut), ou identifiant d'un vrai provider.
- `SIV_CACHE_TTL_SECONDS` — TTL du cache SIV (défaut 30 jours).
- `NEXT_PUBLIC_APP_URL` — URL publique (sitemap, OG tags).
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — active l'analytics si défini (cookieless, RGPD-friendly).

## 🚧 Limitations connues

- **Grilles CO₂ 2020-2023 non ingérées** : les imports d'occasion dont la 1ʳᵉ immat est antérieure à 2024 utilisent en fallback la grille 2024. Documenté dans [getCo2MalusScaleOrClosest](packages/data/src/loaders.ts).
- **Malus rétroactif FR_USED** (requalification N1→M1 post-2015, CIBS L.421-60-1) non implémenté en v1.
- **ADEME / EEA ingestion** : skeletons fournis qui échouent loud (pas de fake data). La saisie manuelle est entièrement fonctionnelle.

## 📝 Licence

Code : MIT. Données : héritent de leurs licences respectives (voir tableau « Sources officielles »).

---

**Feuille de route**

- [x] Phase 1 · Fondations, monorepo, skeleton moteur, CI
- [x] Phase 2 · Implémentation Y1–Y6 avec tests (98,8 % couverture)
- [x] Phase 3 · Seed Postgres idempotent + grilles CO₂ 2024-2026 + validateur Python
- [x] Phase 4 · API REST (7 routes, 19 tests d'intégration)
- [x] Phase 5 · UI (stepper, formulaires, donut, comparateur, export PDF, documents)
- [x] Phase 6 · E2E Playwright, SEO + sitemap + OG, analytics RGPD, mentions légales
