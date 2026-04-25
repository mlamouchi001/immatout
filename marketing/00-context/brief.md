# Brief Marketing — Immatout

> Source de vérité pour toutes les actions marketing/SEO/social du projet.
> Mise à jour : 2026-04-26

## 1. Site

- **URL prod** : https://immatcalc.fr
- **Stack** : Next.js 15 (App Router, React 19), TypeScript strict, Prisma 6 + Postgres 16, TailwindCSS 3 + shadcn/ui, déployé sur **Coolify** auto-hébergé.
- **Date de mise en ligne** : 2026-04-19
- **Repo public** : https://github.com/mlamouchi001/immatout (MIT)

## 2. Proposition de valeur

Calculateur **gratuit, sans publicité et sans inscription** du coût d'une carte grise en France, conforme à la **Loi de Finances 2026**. Détail transparent des 6 taxes (Y1 à Y6) avec citation des articles CIBS, exemples chiffrés, comparateur 18 régions, export PDF.

**USP** :

1. **Transparence totale** : moteur de calcul open-source, barèmes versionnés, validés à 100% sur 100 cas-tests stratifiés contre une référence indépendante.
2. **Données officielles** : ADEME Car Labelling + EEA CO₂ Monitoring (3 250+ motorisations FR), pas de mock.
3. **Conforme LF 2026** : seuil malus poids 1500 kg, surcharge IDFM 14 €/CV, exo EV 2026-2028 — à jour.
4. **Sans pub, sans cookie de tracking** : Plausible self-hosté.

## 3. Personas (3 cibles)

### P1 — Acheteur particulier (cas le plus fréquent)

- **Profil** : 25-65 ans, achète un véhicule neuf ou d'occasion en France, veut estimer le coût total avant signature.
- **Pain points** : simulateurs en ligne payants, opaques, qui poussent à des services payants ; complexité du barème malus CO2 + poids ; régionalisation des tarifs ; surcharge IDFM récente méconnue.
- **Requêtes Google typiques** : "calcul carte grise 2026", "prix carte grise [région]", "carte grise [marque modèle]", "combien coûte la carte grise pour une [voiture]".

### P2 — Importateur (UE/hors UE)

- **Profil** : particulier ou pro qui ramène une voiture d'Allemagne (BMW, Audi, VW), Belgique, Pays-Bas — souvent une occasion premium.
- **Pain points** : décote import 12 tiers complexe, quitus fiscal, anciens barèmes CO2 (2019-2023), différence neuf/occasion sur Y3/Y6.
- **Requêtes** : "carte grise import allemagne", "décote malus CO2 import", "quitus fiscal voiture allemande".

### P3 — Acheteur EV / hybride

- **Profil** : intéressé par Tesla, Zoé, Model Y, BYD, hybride rechargeable.
- **Pain points** : rumeurs sur le malus EV (amendement 49-3 retiré), abattement PHEV 200 kg, coefficients régionaux 0.5 hybride, exonération CMI cumulable.
- **Requêtes** : "carte grise voiture électrique", "carte grise tesla model y", "malus poids EV 2026".

## 4. Concurrents directs (à analyser en phase audit)

1. **service-public.gouv.fr** — autorité maximale, calculateur officiel intégré, mais UX datée et pas de comparateur régional.
2. **cartegrise.com** — leader commercial des intermédiaires, fait office de calculateur + service payant.
3. **cartegriseminute.fr** — concurrent direct, modèle commercial similaire.
4. **cartegrise-enligne.fr** — autre acteur du marché des intermédiaires.
5. **ANTS (immatriculation.ants.gouv.fr)** — portail officiel sans simulateur, seulement la démarche.

## 5. Objectifs business chiffrés (M+3, M+6, M+12)

> Site lancé il y a 7 jours, partons de baseline 0.

| KPI                                    | M+3 (juillet 2026) | M+6 (octobre 2026) | M+12 (avril 2027) |
| -------------------------------------- | ------------------ | ------------------ | ----------------- |
| Visiteurs uniques mensuels (Plausible) | 3 000              | 15 000             | 80 000            |
| Pages indexées (GSC)                   | 40+                | 50+                | 100+              |
| Mots-clés top 10 (GSC)                 | 5                  | 30                 | 150               |
| Mots-clés top 3                        | 0                  | 5                  | 25                |
| Backlinks domaines référents           | 5                  | 20                 | 60                |
| Newsletter (si lancée)                 | n/a                | 200 abonnés        | 2 000             |

## 6. Zone géographique

**France métropolitaine + DOM-TOM**, 18 régions couvertes par le calculateur. Pas d'export à l'étranger pour l'instant.

## 7. Langue

**Français uniquement** (fr-FR). Pas de plan multilingue à 12 mois.

## 8. Comptes réseaux sociaux existants

**AUCUN à ce jour** — tout est à créer.

À planifier (selon priorité ROI) :

- LinkedIn page Immatout (B2B, presse auto)
- X/Twitter (posts courts, engagement, threads pédagogiques)
- Reddit (sub r/france, r/voitures, r/conseiljuridique — answers organiques)
- YouTube (long terme, tutos vidéo)

## 9. Accès & outils dispos

- ✅ Code source (repo Git)
- ✅ Hébergeur (Coolify, accès admin)
- ✅ Plausible Analytics self-hosté (https://plausible.immatcalc.fr) — installé 2026-04-26
- ❌ Google Search Console — **à configurer** (priorité 1 phase 2)
- ❌ Bing Webmaster Tools — à configurer
- ❌ GA4 — non prévu (Plausible suffit, RGPD-friendly)
- ❌ Ahrefs / Semrush — pas de licence
- ❌ ESP (Mailjet, Brevo, Resend…) — pas encore choisi

## 10. Budget temps / argent

- **Temps** : ~5h/semaine pour la production de contenu et l'outreach (estimation utilisateur).
- **Argent** : **0 €/mois** sur outils SEO payants. Tout doit être faisable avec :
  - GSC (gratuit)
  - Bing Webmaster (gratuit)
  - Plausible self-hosté (déjà déployé)
  - Recherche manuelle de mots-clés (Google autosuggest, "people also ask", AnswerThePublic gratuit, Google Trends)

## 11. Ton de marque

- **Pédagogue** : on explique, on cite ses sources, on ne survend pas.
- **Direct** : pas de jargon inutile.
- **Précis** : chiffres, articles CIBS, exemples chiffrés.
- **Honnête** : on dit clairement ce qu'on ne fait pas (pas de service payant, pas d'intermédiation, juste un calculateur).
- **Pas de fausse urgence** : pas de "Plus que 3 places !" ou "Prix exclusif".

## 12. État SEO actuel

> Snapshot au 2026-04-26 (avant audit complet)

- **40 URLs** dans `sitemap.xml` (10 guides, 9 régions, 6 modèles, 5 transversales, 5 référentiels, 5 secondaires)
- **JSON-LD** : Organization, WebApplication, Article, BreadcrumbList, FAQPage sur chaque page éditoriale
- **robots.txt** : autorise tous les bots sauf entraînement IA (GPTBot, ClaudeBot, CCBot, anthropic-ai, Google-Extended)
- **HTTPS + Let's Encrypt** sur immatcalc.fr et plausible.immatcalc.fr
- **Core Web Vitals** : non mesurés (à auditer)
- **Pas encore** : GSC, Bing WMT, fil X/LinkedIn, backlinks externes, mentions presse.

## 13. Ce qui a été fait avant cet agent

- Refonte UI shadcn/ui (avril 2026)
- Page de base + 30 pages éditoriales SEO (FAQ, guides, régions, modèles, lexique, à-propos)
- Catalogue véhicules ADEME + EEA en base Postgres (3 253 motorisations)
- Validation 100/100 sur 100 cas-tests
- Plausible self-hosté actif
- Mentions légales + RGPD compliant (pas de cookie tracker)

## 14. Contraintes / non-négociables

- **Pas de pub** sur le site (jamais)
- **Pas de service payant** d'intermédiation
- **Pas de cookie tracker** (Plausible only)
- **Pas de PBN, achat de liens, scraping commercial** (white-hat strict)
