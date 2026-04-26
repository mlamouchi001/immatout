# KPIs — baseline et suivi

> Mesure des indicateurs clés du sprint Growth d'Immatout.
> Baseline figée à la fin du sprint des 7 jours (26 avril 2026).
> Objectif : revoir tous les 30 jours pour valider la roadmap 90j.

## Indicateurs par catégorie

### Acquisition organique (SEO)

| Métrique                            | Source            | Baseline 26-04 | M+1 (objectif) | M+3 (objectif) |
| ----------------------------------- | ----------------- | -------------- | -------------- | -------------- |
| Pages indexées Google               | GSC > Couverture  | 0-5            | 30+            | 80+            |
| Impressions organiques (sur 30j)    | GSC > Performance | 0              | 1 000+         | 10 000+        |
| Clics organiques (sur 30j)          | GSC > Performance | 0              | 50+            | 1 000+         |
| Position moyenne (mots-clés ciblés) | GSC               | n/a            | 30-50          | 10-30          |
| Sitemap status                      | GSC > Sitemaps    | submitted      | success        | success        |
| Bing indexed pages                  | Bing Webmaster    | 0              | 20+            | 60+            |

### Acquisition payée

> Pas d'acquisition payée prévue dans la roadmap 90j (no SEA, no paid backlinks).
> Si on en active plus tard, on rajoute une section.

### Acquisition sociale

| Métrique                             | Source              | Baseline 26-04 | M+1  | M+3  |
| ------------------------------------ | ------------------- | -------------- | ---- | ---- |
| Followers LinkedIn                   | LinkedIn Page       | 0              | 30+  | 100+ |
| Followers X                          | X analytics         | 0              | 50+  | 200+ |
| Karma Reddit                         | Reddit profil       | 0              | 50+  | 200+ |
| Posts publiés (LinkedIn + X cumulés) | manuel              | 0              | 8    | 24   |
| Clics sortants depuis social (UTM)   | Plausible > Sources | 0              | 100+ | 500+ |

### Off-page / autorité

| Métrique                     | Source                    | Baseline 26-04 | M+1 | M+3 |
| ---------------------------- | ------------------------- | -------------- | --- | --- |
| Backlinks total (refdomains) | Ahrefs / Ubersuggest free | TBD (vérifier) | 5+  | 20+ |
| DR moyen des backlinks       | Ahrefs                    | n/a            | 35+ | 45+ |
| Mentions presse              | manuel                    | 0              | 0   | 1-2 |
| Show HN posté ?              | manuel                    | non            | oui | oui |
| Product Hunt posté ?         | manuel                    | non            | oui | oui |

### Trafic et engagement

| Métrique                         | Source                   | Baseline 26-04    | M+1     | M+3         |
| -------------------------------- | ------------------------ | ----------------- | ------- | ----------- |
| Visiteurs uniques / mois         | Plausible                | TBD (mesurer 30j) | 200-500 | 3 000-5 000 |
| Visites / mois                   | Plausible                | TBD               | 300-800 | 5 000+      |
| Pages vues / mois                | Plausible                | TBD               | 1 000+  | 15 000+     |
| Durée moyenne / visite           | Plausible                | TBD               | 1 min+  | 1 min 30+   |
| Taux de rebond                   | Plausible                | TBD               | < 70 %  | < 60 %      |
| % de calculs effectués / visites | Plausible (custom event) | TBD               | > 30 %  | > 40 %      |

### Conversion produit

| Métrique                                   | Source                 | Baseline 26-04 | M+1    | M+3    |
| ------------------------------------------ | ---------------------- | -------------- | ------ | ------ |
| Calculs effectués / mois                   | Plausible custom event | TBD            | 100+   | 1 500+ |
| PDF exports / mois                         | Plausible custom event | TBD            | 20+    | 300+   |
| Taux d'utilisation comparateur 18 régions  | Plausible              | TBD            | > 10 % | > 15 % |
| Retours utilisateurs (mail, GitHub issues) | manuel                 | 0              | 1-3    | 10+    |

### Technique / SEO santé

| Métrique                        | Source             | Baseline 26-04 | Cible permanente |
| ------------------------------- | ------------------ | -------------- | ---------------- |
| Lighthouse Performance (mobile) | PageSpeed Insights | TBD (mesurer)  | > 90             |
| Lighthouse SEO (mobile)         | PageSpeed Insights | TBD            | 100              |
| Core Web Vitals (LCP)           | GSC > Web Vitals   | TBD            | < 2,5 s          |
| Compression gzip active         | curl               | ✅             | ✅               |
| HTTPS / HSTS                    | curl               | ✅             | ✅               |
| Sitemap fresh                   | GSC                | ✅ (42 URLs)   | ≥ 42             |

## Baseline à mesurer (le 27 avril, après 24h de données)

Quand 24h se sont écoulées depuis la fin du sprint, faire ce check-up :

```bash
# 1. Plausible — visites des dernières 24h
# Aller sur https://plausible.immatcalc.fr/immatcalc.fr → screenshot

# 2. GSC — pages indexées + impressions des 7 derniers jours
# https://search.google.com/search-console → Property immatcalc.fr → Performance

# 3. Lighthouse — score actuel
# https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fimmatcalc.fr → screenshot

# 4. Backlinks — ce qui existe déjà
# https://app.ahrefs.com/site-explorer/overview/v2/exact/recent?target=immatcalc.fr
# (compte free Ahrefs limite, sinon utiliser https://neilpatel.com/ubersuggest/ free tier)
```

Reporter les chiffres dans la colonne "Baseline 26-04" ci-dessus.

## Reporting cadencé

### Quotidien (les 7 premiers jours après lancement social)

Court check rapide :

- Visiteurs Plausible
- Pages vues
- Sources de trafic top 3
- Anomalie technique (502, lenteur) ?

### Hebdomadaire

Tableau de bord rempli dans `marketing/04-reporting/weekly-YYYY-WW.md` :

- Trafic 7j
- Posts publiés
- Backlinks acquis
- Top contenus consultés
- Top requêtes GSC (si elles apparaissent)

### Mensuel

Bilan complet avec tableaux KPI ci-dessus remplis :

- Comparaison vs M-1 et vs objectif M+X
- Décisions stratégiques : ajuster la roadmap si écart > 30 %

## Outils gratuits utilisés pour mesurer

| Outil                         | Usage                                   | Coût               |
| ----------------------------- | --------------------------------------- | ------------------ |
| Plausible (self-hosted)       | Web analytics                           | 0 € (déjà déployé) |
| Google Search Console         | SEO performance, indexation             | 0 €                |
| Bing Webmaster Tools          | Indexation Bing                         | 0 €                |
| PageSpeed Insights            | Web Vitals + Lighthouse                 | 0 €                |
| Ubersuggest (free tier)       | 3 recherches mots-clés / jour           | 0 €                |
| Ahrefs Webmaster Tools (free) | Backlinks de son propre site uniquement | 0 €                |
| Search.google.com             | Position vérification rapide            | 0 €                |

Pas besoin de Semrush / Ahrefs payants pour le moment. Réévaluer en M+3 si besoin de comp competitor analysis poussée.

## Décisions liées aux KPIs

### Si M+1 < 50 % de l'objectif

- **Acquisition organique faible** : le problème est probablement l'indexation. Vérifier robots.txt, sitemap, et utiliser "Inspecter URL" dans GSC pour forcer l'indexation des 5 pages prioritaires.
- **Acquisition sociale faible** : les comptes ne sont peut-être pas encore créés. Cf. `marketing/03-production/social/guide-creation-comptes.md`.
- **Pas de backlinks** : Show HN et Product Hunt n'ont pas été postés ou ont flop. Activer le plan B (cf. `outreach/show-hn.md`).

### Si M+1 dépasse l'objectif de 50 %

- C'est probablement un coup de chance (Show HN viral, mention presse imprévue). Profiter du momentum :
  - Doubler les efforts de production de contenu (pillar 4 et 5)
  - Activer 2-3 publication PR supplémentaires
  - Garder en tête que ça peut redescendre

## Questions ouvertes (à valider en M+1)

- [ ] Le funnel TOFU → BOFU fonctionne-t-il ? (mesurer le taux entre "page calcul" → "page modèle" → "calcul effectif")
- [ ] Quelles requêtes Google amènent du trafic réel ? (pivoter le contenu si surprise)
- [ ] Y a-t-il un "channel mix" qui dépasse ce qu'on attend ? (ex : Reddit > LinkedIn pour notre audience)
