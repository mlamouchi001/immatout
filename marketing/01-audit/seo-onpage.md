# Audit SEO on-page — pages-piliers

> Date : 2026-04-26 · Méthodo : extraction `<title>`, `<meta description>`, `<h1>`, hiérarchie H2/H3, mot-clé principal détecté, longueur du contenu, maillage sortant.

## Page-par-page

### 1. `/` (home)

| Champ                | Valeur                                                                         | Verdict                                                       |
| -------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `<title>`            | "Immatout — Calcul officiel du coût de la carte grise (France 2026)" — 67 car. | 🟡 trop long (>60), tronqué dans SERP à "...carte grise (Fr…" |
| `<meta description>` | 233 car. complète bien la promesse                                             | 🟡 trop long (>155), tronqué                                  |
| H1                   | "Calcul officiel du coût de votre carte grise"                                 | ✅ unique, ciblé                                              |
| Mot-clé principal    | "calcul carte grise 2026"                                                      | ✅ présent dans h1 et description                             |
| Longueur visible     | ~150 mots (hero + trust + calculator)                                          | 🟡 court, mais home conversion-focused, OK                    |
| Maillage interne     | minimal (juste le calculateur, pas de liens éditoriaux dans le hero)           | 🟡 améliorer                                                  |
| JSON-LD              | Organization + WebApplication + FAQPage (5 questions)                          | ✅                                                            |

**Suggestions** :

- Title → "Calcul carte grise 2026 — gratuit et officiel · Immatout" (50 car.)
- Description → "Simulez le coût de votre carte grise en 30 s : barèmes Loi de Finances 2026, comparateur 18 régions, gratuit." (113 car.)
- Ajouter sous le calculateur un bloc "Guides populaires" (3-4 liens vers guides) → maillage + UX.

### 2. `/guide/calcul-carte-grise-2026`

| Champ                | Valeur                                                                                      | Verdict               |
| -------------------- | ------------------------------------------------------------------------------------------- | --------------------- |
| `<title>`            | "Calcul carte grise 2026 : méthode officielle, barèmes CIBS, exemples · Immatout" — 79 car. | 🟡 long               |
| `<meta description>` | 167 car.                                                                                    | 🟡 limite             |
| H1                   | "Comment se calcule le coût d'une carte grise en 2026 ?"                                    | ✅                    |
| Mot-clé principal    | "calcul carte grise 2026"                                                                   | ✅                    |
| Longueur             | ~1 200 mots                                                                                 | ✅ pilier raisonnable |
| H2/H3                | structure en 9 sections (Y1..Y6 + exemples + cas particuliers)                              | ✅ excellent          |
| Maillage sortant     | 6 liens (RelatedGuides) + 2 inline                                                          | ✅                    |
| JSON-LD              | Article + BreadcrumbList + FAQPage                                                          | ✅                    |

**Suggestions** :

- Title → "Calcul carte grise 2026 : méthode officielle CIBS · Immatout" (58 car.)
- Description : raccourcir à 150 car.
- Allonger à 1 800 mots avec section "Erreurs fréquentes" (cible long-tail "pourquoi ma carte grise est-elle si chère").

### 3. `/guide/malus-co2-2026`

Structure équivalente, longueur similaire (~1 100 mots), H2/H3 OK, JSON-LD OK.

**Suggestions** :

- Ajouter graphique inline (barème CO2 → montant) avec recharts → contenu enrichi visuellement, taux de scroll meilleur.
- Maillage : croiser avec /guide/malus-poids-2026 et /guide/carte-grise-vehicule-electrique (déjà dans RelatedGuides ✅).

### 4. `/carte-grise/ile-de-france`

| Champ                | Valeur                                                                                                                                                         | Verdict      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `<title>`            | "Carte grise Île-de-France 2026 : prix et démarches · Immatout" — 60 car.                                                                                      | ✅ pile poil |
| `<meta description>` | "Prix de la carte grise en Île-de-France pour 2026, tarif du cheval fiscal, surcharge IDFM si applicable, exemples chiffrés et démarches en ligne." — 145 car. | ✅           |
| H1                   | "Carte grise en Île-de-France : prix 2026 et démarches"                                                                                                        | ✅           |
| Mot-clé              | "carte grise Île-de-France 2026"                                                                                                                               | ✅ excellent |
| Longueur             | ~600 mots (court mais data-driven, tableau régions+énergies + 4 exemples)                                                                                      | 🟡           |
| Maillage             | 4 liens RelatedGuides                                                                                                                                          | ✅           |
| JSON-LD              | Article + BreadcrumbList + FAQPage                                                                                                                             | ✅           |

**Suggestions** :

- Allonger à 900-1100 mots : ajouter section "Spécificité IDFM 14 €/CV" avec historique (vote 2025, mise en vigueur 2026), exemple chiffré département par département (75/77/78/91/92/93/94/95).
- Cibler longue traîne : "carte grise Paris", "carte grise 92", "carte grise IDF surcharge" en H3.

### 5. `/carte-grise/tesla-model-y`

| Champ     | Valeur                                                                        | Verdict           |
| --------- | ----------------------------------------------------------------------------- | ----------------- |
| `<title>` | "Carte grise Tesla Model Y 2026 : prix par motorisation · Immatout" — 60 car. | ✅                |
| H1        | "Carte grise Tesla Model Y — prix 2026"                                       | ✅                |
| Mot-clé   | "carte grise tesla model y"                                                   | ✅                |
| Longueur  | ~350 mots (page EV, peu à dire car exonération totale)                        | 🟡 trop court     |
| Trim list | dynamique depuis Prisma                                                       | ✅ unique au site |
| Maillage  | 4 liens                                                                       | ✅                |

**Suggestions** :

- Étendre à 700-800 mots : section "Pourquoi 13,76 € chez Tesla", comparatif Model Y vs Model 3 vs Model X côté carte grise, mention du superchargeur Tesla en France (signal pertinence locale).
- Ajouter image Tesla Model Y avec alt text "Tesla Model Y 2026 immatriculée en France".
- CTA en milieu d'article vers `/` : "Calculez le coût exact de votre Tesla en 30 s".

### 6. `/faq`

✅ 25 questions, JSON-LD FAQPage complet (résultats enrichis Google probables sur "Quelles sont les 6 taxes carte grise"), structure dl/dt/dd.

**Suggestions** :

- Title → "FAQ carte grise 2026 : 25 questions/réponses · Immatout" (60 car.)
- Lazy-loading des sections (anchor links / collapsible) si la page devient longue → meilleur UX.

### 7. `/prix-carte-grise-2026`

H1 : "Prix carte grise 2026 : combien coûte une carte grise ?" ✅ excellent — réponse directe à une question Google fréquente.

**Suggestions** : ajouter table dynamique calculée depuis `@immatout/data` (auto-update à chaque changement de barème).

## Synthèse

| Catégorie            | État                                        | Action                                     |
| -------------------- | ------------------------------------------- | ------------------------------------------ |
| Titles               | 5/7 trop longs (>60 car.)                   | **Raccourcir tous les titres**             |
| Descriptions         | 3/7 trop longues (>155)                     | Raccourcir                                 |
| H1                   | tous uniques et ciblés                      | ✅                                         |
| Hiérarchie H2/H3     | OK partout                                  | ✅                                         |
| Mots-clés principaux | présents                                    | ✅                                         |
| Longueur             | guides OK, régions/modèles trop courts      | **Allonger /carte-grise/ à 800-1200 mots** |
| Maillage             | RelatedGuides OK, mais home pauvre          | Ajouter bloc "Guides populaires" sur home  |
| JSON-LD              | 3 scripts par page éditoriale               | ✅                                         |
| OG / Twitter         | tous présents avec image dynamique 1200×630 | ✅                                         |

## Top 5 actions priorisées on-page

| #   | Action                                                      | Impact            | Effort |
| --- | ----------------------------------------------------------- | ----------------- | ------ |
| 1   | Raccourcir 5 titles >60 car.                                | CTR SERP          | 30 min |
| 2   | Raccourcir 3 meta descriptions >155 car.                    | CTR SERP          | 15 min |
| 3   | Étendre les 6 pages `/carte-grise/<modele>` à 700-1000 mots | Ranking long-tail | 4 h    |
| 4   | Étendre les 9 pages `/carte-grise/<region>` à 900-1100 mots | Ranking régional  | 6 h    |
| 5   | Ajouter bloc "Guides populaires" sur la home                | Maillage + UX     | 30 min |

**Total temps** : ~11 h, à étaler sur 2 semaines.
