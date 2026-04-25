# Audit SEO off-page — opportunités backlinks white-hat

> Date : 2026-04-26 · Site lancé il y a 7 jours → état zéro estimé. Aucun backlink connu.

## 1. Profil de liens actuel (estimation)

- **Domaines référents estimés** : 0 à 1 (peut-être un mention sur GitHub via le repo public)
- **Domain Authority** estimé : 1-5 (domaine neuf, .fr)
- **Trust Flow / Citation Flow** : non mesuré (pas de licence Majestic/Ahrefs)

Pour vérifier sans outil payant :

- `site:immatcalc.fr` sur Google → vérifier si pages déjà indexées
- Recherche `link:immatcalc.fr` → quasi-inutile depuis 2017 mais signale parfois
- Plausible Analytics → onglet "Sources" affichera les referers naturels après quelques semaines

## 2. Stratégie en 4 niveaux

### Niveau 1 — Citations / annuaires généralistes (effort minimal, 0 € → fait en 1 journée)

| Plateforme              | URL                             | Effort | Lien dofollow ?       | Impact           |
| ----------------------- | ------------------------------- | ------ | --------------------- | ---------------- |
| Google Business Profile | https://business.google.com     | 30 min | non (visibilité maps) | 🔥 fort si local |
| Bing Places             | https://www.bingplaces.com      | 15 min | non                   | moyen            |
| Yelp.fr                 | https://biz.yelp.fr             | 20 min | nofollow              | faible           |
| Foursquare              | https://foursquare.com          | 15 min | nofollow              | faible           |
| 118218.fr               | https://annuaire.118218.fr      | 15 min | dofollow              | moyen            |
| PagesJaunes pro         | https://www.pagesjaunes.fr/pros | 30 min | dofollow              | moyen            |
| Yellow.place            | https://www.yellow.place        | 10 min | dofollow              | faible           |
| Hotfrog France          | https://www.hotfrog.fr          | 10 min | dofollow              | faible           |

**Note** : Immatout n'est pas une entreprise locale au sens strict (pas de boutique physique). Inscriptions GBP/Bing Places possibles avec adresse "siège" mais à valider légalement.

**Action** : démarrer par 118218.fr + PagesJaunes pro + Hotfrog → 3 backlinks dofollow en 1 h.

### Niveau 2 — Plateformes de publication (signature de marque)

| Plateforme                               | URL profil                       | Effort                | Backlink                                         |
| ---------------------------------------- | -------------------------------- | --------------------- | ------------------------------------------------ |
| **GitHub** (repo public)                 | github.com/mlamouchi001/immatout | déjà fait             | dofollow vers immatcalc.fr dans README           |
| **Product Hunt** lancement               | producthunt.com                  | 2 h (visuels + texte) | massive trafic 24-48 h + lien permanent dofollow |
| **Hacker News** post `Show HN:`          | news.ycombinator.com             | 15 min                | nofollow mais énorme trafic + indexation         |
| **Indie Hackers**                        | indiehackers.com                 | 30 min                | dofollow profil                                  |
| **Dev.to** article tech                  | dev.to                           | 1 h                   | dofollow profil + article                        |
| **Reddit** r/france, r/rance, r/voitures | reddit.com                       | 30 min/post           | nofollow mais trafic + signal social             |

**Action** : préparer un Show HN + post Product Hunt **après** avoir corrigé les issues techniques P0 (sinon premières visites pénalisent le ranking).

### Niveau 3 — Digital PR ciblé presse auto / éco

Cible : journalistes ou rédacteurs qui couvrent les sujets carte grise / fiscalité auto.

| Média                          | Type                       | Angle d'attaque                                 |
| ------------------------------ | -------------------------- | ----------------------------------------------- |
| **Caradisiac**                 | site auto leader           | "Calculateur open-source LF 2026"               |
| **L'Argus**                    | spécialiste cote véhicules | Comparatif coût immatriculation par modèle      |
| **Auto Plus**                  | grand public               | Top 10 voitures avec carte grise la moins chère |
| **Le Particulier** (Le Figaro) | fiscalité particuliers     | Surcharge IDFM 2026 et impact                   |
| **Capital / BFM Eco**          | éco grand public           | Fact-check tarifs carte grise par région        |
| **Le Monde / Les Echos**       | presse quali               | Analyse Loi de Finances 2026 fiscalité auto     |
| **Reflets.info**               | indépendant tech           | Open-source fiscal calculator                   |

**Méthode** : envoyer un mail court (200 mots max) à `redaction@<média>.fr` ou contact LinkedIn d'un journaliste auto identifié. **Proposer un angle exclusif**, pas une demande de mention.

**Effort** : 30 min/mail × 7 cibles = 3,5 h. **Taux de réponse attendu** : 5-15 %.

**⚠️ Attendre validation utilisateur avant tout envoi.**

### Niveau 4 — Communautés et seeding organique

| Communauté         | URL                                                       | Posts utiles                                                                 |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| r/france           | reddit.com/r/france                                       | "j'ai créé un calculateur gratuit de carte grise…" (modulé selon règles sub) |
| r/rance            | reddit.com/r/rance                                        | humour mais zone de seed                                                     |
| r/voitures         | reddit.com/r/voitures                                     | très ciblé                                                                   |
| r/conseiljuridique | reddit.com/r/conseiljuridique                             | réponses à threads sur "combien coûte ma carte grise"                        |
| Forum Caradisiac   | forum.caradisiac.com                                      | réponses à questions "calcul carte grise"                                    |
| Forum Auto-Plus    | forum.auto-plus.fr                                        | idem                                                                         |
| Forum Mobilité     | forum-auto.caradisiac.com/voitures-electriques/           | EV-spécifique                                                                |
| Discord r/france   | varie                                                     | partage modéré                                                               |
| LinkedIn (groupes) | groupes "Automobile France", "Mobilité", "Fiscalité auto" | posts d'expert                                                               |
| Quora français     | fr.quora.com                                              | réponses long-format                                                         |

**Méthode** : **répondre aux questions existantes** plutôt que poster. Ratio recommandé : **9 réponses utiles : 1 mention de son site**.

**Effort** : 1 h/semaine soutenable pendant 3 mois.

## 3. Quick wins immédiats (semaine 1)

1. **Soumettre sitemap à GSC + Bing WMT** (10 min) — pas un backlink mais signal d'existence majeur.
2. **Créer profil GitHub README projet immatout** avec lien vers https://immatcalc.fr (déjà fait probablement).
3. **3 inscriptions annuaires gratuits** : 118218.fr, PagesJaunes, Hotfrog.
4. **2 réponses Reddit** ciblées (r/france ou r/voitures) sur threads carte grise existants.

**Total temps** : 2 h. **Backlinks attendus** : 3-4 dofollow + signaux d'autorité.

## 4. À éviter formellement

- ❌ **Achat de backlinks** sur Fiverr / SeoClerks / plateformes équivalentes (sandbox Google quasi-systématique pour un domaine neuf)
- ❌ **Échange de liens massif** ("link wheel") — détecté par Penguin
- ❌ **Annuaires de mauvaise qualité** type "100 backlinks gratuits" (signal rouge Google)
- ❌ **Commentaires de blog** spammy avec ancres optimisées
- ❌ **PBN** (Private Blog Networks)

## 5. Roadmap backlinks 90 jours

| Mois                   | Cible                                                                     | Détail                        |
| ---------------------- | ------------------------------------------------------------------------- | ----------------------------- |
| **M+1** (mai 2026)     | 3 backlinks dofollow + 2 mentions Reddit/forums                           | Annuaires + seeding organique |
| **M+2** (juin 2026)    | +5 backlinks (Show HN, Product Hunt, IndieHackers, Dev.to, GitHub topics) | Plateformes pub               |
| **M+3** (juillet 2026) | +3 backlinks (presse auto si pitch accepté) + 5 mentions forums           | Digital PR + community        |

**Cible M+3** : ~15 domaines référents naturels, dont 50 % dofollow.

## 6. Mesure

- **GSC > Liens** affichera les domaines référents repérés par Google (lag 1-2 semaines).
- **Plausible > Sources** affichera les referers humains qui amènent du trafic.
- **Recherche manuelle** : `site:caradisiac.com immatcalc` → repérer mentions hors radar.
