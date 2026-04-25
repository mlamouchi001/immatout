# Analyse concurrentielle — 5 acteurs

> Date : 2026-04-26 · Méthode : `curl` + observation manuelle. Outils payants Ahrefs/Semrush non dispos.

## 1. service-public.gouv.fr

- **Type** : portail officiel de l'État (DILA).
- **Autorité** : DA estimée 90+, le plus haut domaine `.gouv.fr` après gouvernement.
- **Pages carte grise** :
  - `/particuliers/vosdroits/F36199` actuellement 404 (mauvais slug ou réorganisé)
  - Page principale `/particuliers/vosdroits/N367` (taxes carte grise) accessible
  - Multiples sous-pages F35947 (malus CO2), F35950 (malus poids/décote), A18021 (coût annuel)
- **Force** : autorité maximale, toujours premier sur quasi toutes les requêtes informationnelles "carte grise", "malus CO2"
- **Faiblesse** : UX austère, pas de calculateur intégré, contenu dense pas scannable, pas de comparateur
- **Maillage interne** : énorme (toute la galaxie service-public)
- **Backlinks** : milliers de domaines, tout site institutionnel ou wiki cite.

**Angle d'attaque pour Immatout** : ne pas chercher à battre frontalement service-public sur "calcul carte grise" → on ne gagnera pas. **Cibler les requêtes longue traîne où service-public est faible** : "carte grise tesla model y", "carte grise import allemagne 2026", "carte grise IDF surcharge IDFM", "calculateur carte grise [modèle]", "comparateur 18 régions". Sur ces requêtes, service-public n'a souvent pas de page dédiée → on peut prendre la position #1.

## 2. cartegrise.com

- **Type** : intermédiaire commercial habilité par l'État (PFAC = prestataire de l'admin SIV).
- **Autorité** : DA estimée 60-70.
- **Page d'accueil** : 4 342 mots, **5 blocs JSON-LD** (Organization, WebSite, BreadcrumbList, FAQPage, Service), titre "Carte grise en ligne : démarche rapide habilitée par l'État".
- **Modèle** : calcul gratuit + démarche payante (~30-50 €).
- **Force** : SEO costaud, contenu dense, autorité bâtie depuis ~2010, brand recognition.
- **Faiblesse** : intention commerciale forte → l'utilisateur sent qu'on lui vend qqch, perception "intermédiaire pas obligatoire".
- **Pages observées** : énorme couverture par modèle, par région, par cas (succession, occasion, perte).

**Angle d'attaque** : positionner Immatout comme **alternative gratuite, sans intermédiation**. Slogan implicite : "Le calcul, oui. Le service, non." Mettre en avant l'open-source + transparence du moteur = facteur de différenciation crédible.

**Sur quoi gagner** : les requêtes éducatives où cartegrise.com survend ses services. Ex : "comment calculer carte grise" → on offre un guide gratuit complet sans pousser à acheter.

## 3. cartegriseminute.fr

- **Type** : intermédiaire commercial (concurrent direct cartegrise.com).
- **Autorité** : DA estimée 35-45.
- **Bloque les bots** : 403 sur curl (Cloudflare ou WAF agressif).
- **Modèle** : identique à cartegrise.com, légèrement moins cher.
- **Force** : marketing AdWords agressif (a beaucoup d'impressions sur "carte grise en ligne").
- **Faiblesse** : SEO organique faible (la majorité du trafic est SEA selon estimation).

**Angle d'attaque** : ignorer en SEO, c'est un concurrent payant. On ne fera pas de SEA → on ne croisera pas leurs requêtes hautes-intentes.

## 4. cartegrise-enligne.fr

- **Type** : intermédiaire commercial.
- **Profil similaire** à cartegriseminute.fr.
- **Volume** : plus petit, autorité estimée 20-35.

**Angle d'attaque** : idem ignorer.

## 5. immatriculation.ants.gouv.fr

- **Type** : portail officiel ANTS pour la démarche d'immatriculation.
- **Autorité** : DA `.gouv.fr`, max.
- **Pages indexables** : très peu (la démarche est une SPA React derrière login).
- **Force** : autorité, brand officiel.
- **Faiblesse** : pas de contenu éditorial, pas de simulateur intégré, pas de pédagogie.

**Angle d'attaque** : Immatout devient le **lien complémentaire pédagogique** vers ANTS. Nos pages disent toujours "la démarche officielle se fait sur ants.gouv.fr" → signal positif Google (citation d'autorité), confiance utilisateur.

## 6. Concurrents secondaires à surveiller

| Site                                                | Profil                                | Menace                                         |
| --------------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| **carte-grise.org**                                 | aggregator quasi-spammy               | aucune                                         |
| **service-public.fr/particuliers/vosdroits/F35947** | sous-page malus CO2                   | concurrent direct sur /guide/malus-co2-2026    |
| **economie.gouv.fr**                                | fiscalité, peu de contenu carte grise | secondaire                                     |
| **legifrance.gouv.fr**                              | texte CIBS brut                       | autorité, on cite plutôt qu'on concurrence     |
| **autocadre.com**                                   | calculateur particulier-pro           | DA faible, concurrent niche                    |
| **autoplus.fr** (presse)                            | articles ponctuels carte grise        | concurrent par mots-clés actu (LF 2026 par ex) |
| **caradisiac.com**                                  | presse + tutoriels                    | gros concurrent éditorial sur "comprendre…"    |

## 7. Tableau comparatif synthétique

| Critère                  | Immatout       | service-public | cartegrise.com | cartegriseminute | autres intermédiaires |
| ------------------------ | -------------- | -------------- | -------------- | ---------------- | --------------------- |
| Calcul gratuit           | ✅             | ✅ basique     | ✅             | ✅               | ✅                    |
| Démarche payante         | ❌             | ❌             | ✅ ~40 €       | ✅ ~35 €         | ✅                    |
| Comparateur 18 régions   | ✅ unique      | ❌             | ❌             | ❌               | ❌                    |
| Catalogue véhicules WLTP | ✅ 3 250 trims | ❌             | partiel        | ❌               | ❌                    |
| Articles longs CIBS      | ✅ 10 guides   | ✅ multiples   | ✅ multiples   | partiel          | partiel               |
| Open source              | ✅             | ❌             | ❌             | ❌               | ❌                    |
| Sans pub / sans tracking | ✅             | ✅             | ❌ pubs        | ❌               | ❌                    |
| Export PDF               | ✅             | ❌             | ✅ payant      | ✅ payant        | partiel               |

## 8. 5 angles différenciants à exploiter dans le contenu

1. **"Open source"** — peut-être premier site de ce secteur en français à publier son code et ses barèmes. Argument E-E-A-T fort.
2. **"100 % gratuit, 100 % du temps"** — pas de freemium, pas de service payant.
3. **"Conforme LF 2026 jour J+1"** — montrer la mise à jour rapide post-loi.
4. **"Calcul auditable"** — moteur testé sur 100 cas, taux de concordance 100 % avec référence indépendante.
5. **"Comparateur 18 régions"** — feature unique, exploitable comme angle viral ("où coûte le moins ma carte grise ?").

## 9. Mots-clés à ne **PAS** cibler (concurrence trop dure)

- "carte grise" (DA 90+ requise, ~50k recherches/mois — perdu d'avance)
- "carte grise en ligne" (cartegrise.com top 3 stable)
- "ANTS carte grise" (brand officiel)
- "prefecture carte grise" (sites institutionnels)

## 10. Mots-clés à attaquer (où on peut gagner)

Voir `mots-cles.md` pour la liste détaillée. Focus sur :

- **Année + sujet** : "calcul carte grise 2026", "barème malus 2026", "tarif carte grise 2026"
- **Région + carte grise** : "carte grise [région]" pour les 18 régions
- **Modèle + carte grise** : top 30 modèles vendus en France
- **Cas spécifique** : "carte grise import allemagne", "carte grise tesla model y", "exonération carte grise CMI"
- **Formules/lexique** : "cheval fiscal calcul", "TMOM 2026", "surcharge IDFM"
