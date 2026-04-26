# Show HN — brouillon

> Soumission Hacker News (news.ycombinator.com)
> Catégorie : Show HN
> Audience : développeurs internationaux + early adopters tech français

## Stratégie

Show HN fonctionne quand le projet est **finissable, fonctionnel, et apporte un point technique intéressant ou un parti pris fort**. Pour Immatout, l'angle est :

- **Outil officiel français spécifique** (peu de concurrents anglophones connaissent le système fiscal français)
- **Méthode auditable** : 100 cas testés contre simulateur officiel, source open
- **Self-hosted Plausible analytics, no tracking, no ads**
- **Code Next.js + Prisma + ADEME open data** — angle techno développeur

⚠️ **Risque** : audience HN majoritairement anglophone, le sujet "carte grise française" est niche. Le post peut faire flop. Stratégie : framer en problème universel ("government calculator that nobody bothered to build"), mention du code open source.

## Titre (max 80 caractères)

Trois variantes à tester (choisir au moment du post) :

1. `Show HN: Immatout — official French car registration cost calculator (open data, no ads)` (89 — trop long)
2. `Show HN: I built the French car registration calculator the government won't` (80 — borderline)
3. `Show HN: Free, open-data calculator for French car registration costs` (66 — clean)

→ **Recommandation : variante 3** (la plus claire, sous la limite)

## URL à soumettre

`https://immatcalc.fr` (sans UTM — HN strip les query params)

## Premier commentaire (à poster soi-même immédiatement après soumission)

HN convention : l'auteur poste le 1er commentaire pour donner le contexte.

```
Hi HN — author here.

Quick context: when you buy a car in France, you need to register it
("carte grise"). The cost is the sum of 6 different taxes, with rates
that vary by 18 regions, by fuel type, by CO₂ emissions, and by vehicle
weight. The official government website (service-public.gouv.fr) does
not actually compute the price for you — it just describes the formula.

Several private "intermediary" websites compute it but charge €30-50 for
that single calculation, on top of the actual taxes you owe. There's no
real reason for that — the formula is public, the tax rates are public,
and the underlying datasets (ADEME for vehicle specs, regional rates
from official decrees) are open.

So I built it. immatcalc.fr is free, no signup, no ads, no email gate.
The full calculation is shown step by step, including which of the 6
taxes apply to your vehicle and why. I tested 100 stratified cases
against the closest semi-official simulator I could find — variance is
under 0.5% (rounding only).

Stack: Next.js 15 / Prisma / Postgres on a Hetzner box, running through
Coolify. Plausible self-hosted for analytics, no third-party tracking.
Vehicle catalog (~3500 trims) seeded from ADEME Car Labelling and EEA
CO₂ Monitoring open datasets at deploy time.

Happy to discuss any of: the fiscal logic (it's surprisingly subtle —
the "weight tax" interacts with the "CO₂ tax" through a global cap),
the seeding pipeline, or why French government services consistently
stop one step before being actually useful.
```

## Que faire après le post

1. **Ne pas voter pour soi** (HN détecte et flag)
2. **Ne pas demander de votes** (idem, et c'est mal vu)
3. Surveiller les commentaires les 2-3 premières heures, **répondre à tout** poliment
4. Si modéré ou flagged : ne pas répondre par mail à dang, attendre 24h et re-soumettre une variante du titre

## Timing optimal

- **Mardi ou mercredi**, **15h-18h heure de Paris** = 9h-12h heure US East = pic d'audience HN
- Éviter weekend, lundi (back-from-weekend), vendredi après-midi

## Suivi

- Note l'ID du post (visible dans l'URL: `news.ycombinator.com/item?id=NNNNNN`)
- Suivre dans `marketing/04-reporting/kpis.md` :
  - Position dans la front page (rang max atteint)
  - Nombre de commentaires
  - Pic de trafic Plausible (`plausible.immatcalc.fr`)
  - Nouveaux backlinks générés (DR de news.ycombinator.com = 91)

## Plan B si flop

Si le post fait < 5 upvotes en 30 min :

- Le laisser couler (ne pas re-soumettre tout de suite)
- Réessayer dans 2 mois avec un angle différent : "Show HN: I'm leaving money on the table by giving away what cartegrise.com charges €40 for"
