# Product Hunt — brouillon

> Soumission Product Hunt (producthunt.com)
> Audience : early adopters tech / SaaS, surtout US/UK + un noyau français

## Stratégie

Product Hunt favorise les **produits visuels, polished, B2B/B2C SaaS classiques**. Un calculateur fiscal français a un handicap d'audience. On limite l'effort PH à un **soft launch sans paid ads** : on profite de la rampe naturelle si elle vient, mais on n'investit pas en amont (pas de "hunter" influenceur payé, pas d'Upcoming Page travaillée des semaines).

## Préparer la fiche

### Tagline (60 caractères max)

Trois variantes :

1. `Free calculator for French car registration costs` (50)
2. `Know what you'll really pay to register a car in France` (53)
3. `The French car registration calculator that's actually free` (58)

→ **Recommandation : variante 1** (la plus claire et SEO friendly)

### Description courte (260 caractères max)

```
Buying a car in France? Get the exact registration cost in 30 seconds.
Built on official open data (ADEME, EEA, French gov), free forever, no
signup, no ads. Covers the 6 taxes, 18 regions, EV exemptions, weight
malus, and CO₂ malus per Loi de Finances 2026.
```

(252 chars)

### Description longue

```
Hi Product Hunt 👋

In France, registering a car ("carte grise") costs the sum of 6 different
taxes. The official government website does not compute that sum — it just
describes the formula. Private intermediary websites compute it but charge
€30-50 for what is literally arithmetic on public data.

Immatout is the calculator the government should have built:

✓ Exact computation per Loi de Finances 2026
✓ Covers the 6 taxes (regional, IDFM surcharge for Paris area, CO₂ malus,
  weight malus, fixed admin fees)
✓ 3500+ vehicles pre-loaded from ADEME and EEA open data
✓ EV exemptions, hybrid coefficients, GPL/E85 reductions properly handled
✓ Free, no signup, no ads, no email collection
✓ Self-hosted Plausible analytics, no third-party tracking
✓ Open data sources, auditable computation

Built on Next.js 15, Prisma, Postgres, deployed on Coolify (Hetzner).

Use cases:
- Buying a new car: know the actual out-the-door price
- Buying used: verify the seller's registration cost claim
- Importing from EU: handle the depreciation rule for CO₂ malus
- Compare regions: same vehicle can cost €600 differently between Île-de-France and Auvergne

The French audience is the primary target, but the methodology (6-tax stack,
weight cap interactions, regional energy coefficients) might be interesting
to any tax/calculator dev work.

Happy to discuss the fiscal mechanics or the seed pipeline. Constructive
feedback welcome.

→ https://immatcalc.fr
```

### Catégories à cocher

- **Primary**: Productivity
- **Secondary**: Finance, Open Source

### Topics

- France
- Tax tools
- Government tech
- Calculators
- Open data
- Civic tech

### Visuels nécessaires

- **Thumbnail (240×240 px)** : logo Immatout sur fond foncé (cf. `social/visuels-specs.md`)
- **Gallery images (1270×760 px chacune, 3-6 images)** :
  1. Hero screenshot du calculateur (page d'accueil)
  2. Résultat détaillé (les 6 taxes avec valeurs)
  3. Comparateur 18 régions (la vue qui montre l'écart)
  4. Liste des modèles (3500 véhicules)
  5. Page mobile (responsive)
- **GIF démo** (optionnel mais boost les votes) : 5-7 secondes, "saisir CV → choisir région → résultat instantané"

## Day-of launch

### Avant 00:00 PST (= 9h00 Paris)

- S'assurer que le site est up et fast (Plausible montrera tout)
- Préparer les comments-réponses pré-écrits :
  - "Why did you build this?"
  - "How does it compare to cartegrise.com?"
  - "Is the source code open?"

### À 00:01 PST (Product Hunt reset)

- Publier la fiche
- Poster un commentaire de fondateur **immédiat** :

```
Hey PH! Founder here.

Quick origin story: I needed to register a car last month. The government
website told me "the cost is the sum of 6 taxes" but didn't tell me the
total. Private intermediary sites wanted €40 to do the math. So I built it.

Open to feedback — especially from anyone who has dealt with French
administrative tools. The fiscal mechanics get surprisingly subtle once
you handle weight + CO₂ malus interactions.

Would love it if you give it a spin: immatcalc.fr
```

### Pendant 24h

- Surveiller toutes les 2h, répondre à tout commentaire en moins d'1h
- Si en top 5 du jour : profiter du momentum, partager sur LinkedIn et X
- Si en bas du classement après 6h : ne pas paniquer, parfois ça remonte le soir avec l'audience EU

## Mesure

- Position finale du jour (top 1 / top 5 / top 10 / hors top 10)
- Nombre de upvotes
- Nombre de commentaires
- Pic de trafic Plausible
- Backlinks acquis (la page PH elle-même est un backlink DR=92)

## Réalisme

Pour un calculateur fiscal français, **réalistement 30-100 upvotes max**, position dans le top 20-50 du jour. C'est suffisant pour :

- 1 backlink Product Hunt (DR 92, énorme pour SEO)
- ~500-2000 visiteurs sur 48h
- 2-5 mentions presse française si le post est repris

Ne pas viser top 1 — c'est le pari du Show HN qui est plus aligné avec l'audience.

## Plan B si flop

- Garder la fiche (le backlink reste)
- Re-soumettre 12 mois plus tard avec une mise à jour majeure (ex: support import US/UK)
