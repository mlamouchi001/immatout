# Architecture de contenu — pillar pages + clusters

> Schéma de l'architecture topique d'Immatout : 1 hub central (`/`) + 5 piliers + clusters d'articles.
> Maillage interne pensé pour booster l'autorité topique aux yeux de Google.

## Vue d'ensemble

```
                          / (home — calculateur)
                          │
       ┌──────────────────┼──────────────────────────┐
       │                  │                          │
   /guide              /carte-grise            /referentiels
   (10 guides)         (régions + modèles)     (5 vues données)
       │                  │                          │
       ▼                  ▼                          ▼
   piliers SEO        clusters géo + modèle     trust + transparence
   (autorité)         (long-tail volume)        (E-E-A-T)
```

## Pilier 1 — Calcul & Méthode

**Pillar page** : `/guide/calcul-carte-grise-2026`
**Cluster pages** :

- `/guide/cheval-fiscal-explication`
- `/prix-carte-grise-2026`
- `/lexique`
- `/faq`

**Maillage attendu** :

- Pillar → toutes les cluster pages (CTA "voir aussi")
- Cluster → pillar + autres cluster (max 3 liens)

## Pilier 2 — Malus & Barèmes

**Pillar page** : `/guide/malus-co2-2026`
**Cluster pages** :

- `/guide/malus-poids-2026`
- `/guide/taxe-regionale-cheval-fiscal`
- `/referentiels/malus-co2`
- `/referentiels/malus-poids`
- `/referentiels/regions`

**Maillage** :

- Pillar Malus CO2 → Pillar Malus poids (et vice versa)
- Liens vers les `/referentiels/*` qui montrent les données brutes

## Pilier 3 — Régions

**Pillar page** : `/carte-grise` (hub des régions)
**Cluster pages** :

- 9 pages régionales actuelles (`/carte-grise/<région>`)
- 9 pages à créer en M+2 (Normandie, BFC, CVL, Corse, DOM-TOM)
- `/referentiels/regions`
- `/compare`

**Maillage** :

- Hub → 9 cards
- Région → autres régions (top 3 voisines)
- Région → `/compare` (CTA "comparer toutes les régions")

## Pilier 4 — Modèles véhicules

**Pillar page** : `/carte-grise` (hub des modèles, partagé avec Pilier 3)
**Cluster pages** :

- 6 pages modèles actuelles
- 24 pages modèles à créer d'ici M+3 (top ventes France 2026)
- `/referentiels/catalogue`

**Maillage** :

- Hub → 6 cards top ventes
- Modèle → 3 modèles similaires (même catégorie / prix)
- Modèle → guide pertinent (EV → `/guide/carte-grise-vehicule-electrique`)

## Pilier 5 — Démarches & Import

**Pillar page** : `/guide/documents-carte-grise`
**Cluster pages** :

- `/guide/carte-grise-occasion-france`
- `/guide/carte-grise-import-ue`
- `/guide/carte-grise-import-hors-ue`
- `/documents`
- `/referentiels/decote`

**Maillage** :

- Pillar → cluster (chaque cas)
- Cluster import → pillar Démarches + pillar Malus (cas import = malus avec décote)

## Diagramme de liens interne (extrait)

```
                    ┌─────────────────────────┐
                    │   / (home + calc)       │
                    └──────────┬──────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   ┌────▼────┐          ┌──────▼──────┐         ┌─────▼─────┐
   │ /guide  │          │ /carte-grise│         │/referentiels│
   └────┬────┘          └──────┬──────┘         └─────┬─────┘
        │                      │                      │
   ┌────┴────────┐         ┌───┴────┐            ┌────┴─────┐
   │             │         │        │            │          │
/calcul    /malus-co2   région    modèle      régions    catalogue
   │             │         │        │            │
   └─cible long-tail    /idf    /tesla-y     /ile-de-france
                          │        │
                          └────────┘
                          (compare 18 régions)
```

## Règles de maillage interne

### Sur chaque page éditoriale (guide, région, modèle)

- **Bloc `RelatedGuides`** en bas de page : 4-6 liens vers le hub de pilier + cluster cousins
- **Lien dans le H1 ou intro** : 1 lien sortant vers la home (calcul)
- **Liens contextuels dans le corps** : 2-3 liens sortants vers les guides pertinents
- **Pas de lien sortant vers concurrents** (sauf sources officielles : légifrance, service-public)

### Sur les pages techniques

- **Référentiels** ne lient pas vers d'autres référentiels (silos séparés)
- **Page calculateur** ne contient pas de liens éditoriaux (pour éviter de distraire la conversion)

### Anchor text

- ✅ Anchor descriptif : "calcul carte grise 2026", "guide complet du malus CO₂"
- ❌ Anchor générique : "cliquez ici", "voir plus"
- ✅ Anchor avec mot-clé du document cible (sans sur-optimiser)

## Évolution prévue (mois 2-3)

- **Ajout de 9 régions DOM-TOM + Normandie/BFC/CVL/Corse** → +9 pages cluster Pilier 3
- **Ajout de 24 modèles populaires** → +24 pages cluster Pilier 4
- **Articles "comparatifs" cross-piliers** : "Top 10 voitures avec carte grise la moins chère 2026" → cible long-tail mais point d'entrée pour explorer le site

## Profondeur d'arborescence

| Niveau | Pages                                                                     | Cible Google |
| ------ | ------------------------------------------------------------------------- | ------------ |
| 0      | `/`                                                                       | excellent    |
| 1      | `/guide`, `/carte-grise`, `/referentiels`, `/faq`, `/compare`, `/lexique` | excellent    |
| 2      | `/guide/<slug>`, `/carte-grise/<slug>`, `/referentiels/<slug>`            | bon          |
| 3      | aucun (pas d'arborescence plus profonde)                                  | —            |

→ **Profondeur max 2** : Google peut tout indexer rapidement, pas de pages "perdues".
