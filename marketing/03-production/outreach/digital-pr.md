# Digital PR — angles de pitch presse

> Cible : 3-5 mentions presse française tech ou auto en 90 jours
> Effort : ~3h utilisateur (rédiger pitches + envoyer aux journalistes)
> Objectif : backlinks haute autorité (DR > 70) + crédibilité

## Pourquoi la presse va parler d'Immatout

Trois angles narratifs possibles, chacun adressant un type de média différent :

### Angle 1 — "Outil que l'État ne fait pas"

**Cible** : presse tech / civic tech (Next INpact, Numerama, Le Monde Pixels, Korben)

> Service-public.gouv.fr est censé répondre aux questions des Français sur leurs démarches.
> En pratique, il décrit la formule du coût de la carte grise sur 4 pages mais ne la calcule pas.
> Des plateformes privées comblent ce manque... en facturant 30 à 50 € pour l'arithmétique
> sur des données publiques. Un développeur indépendant a construit l'outil officiel manquant,
> open source et gratuit, en moins d'un mois.

### Angle 2 — "Comparateur fiscal qui montre les écarts régionaux"

**Cible** : presse auto / consommation (Auto Plus, Caradisiac, L'Argus, 60 Millions de Consommateurs)

> Acheter une Peugeot 3008 hybride en 2026 ? Vous paierez 525 € de carte grise en région
> Auvergne-Rhône-Alpes, mais 822 € à Paris. La différence : 297 €, soit 56 % de plus pour
> exactement la même voiture, à cause des tarifs régionaux et de la nouvelle surcharge IDFM
> de 14 €/CV. Un nouveau calculateur gratuit (immatcalc.fr) permet de visualiser ces écarts
> en temps réel sur les 18 régions françaises.

### Angle 3 — "Le malus CO₂ 2026 explique enfin"

**Cible** : presse auto pure (Largus.fr, Caradisiac, Automoto)

> La grille du malus CO₂ pour 2026 a été publiée par décret et plafonne à 70 000 € pour les
> émissions au-delà de 220 g/km. Un SUV diesel d'import vous coûtera désormais en cumul
> CO₂ + poids jusqu'à 12 000 € en carte grise — soit le prix de 4 ou 5 cartes grises de
> petites citadines. Un calculateur gratuit (immatcalc.fr) intègre la nouvelle grille pour
> simuler le coût exact de chaque modèle.

## Liste de journalistes à pitcher

### Tech / civic tech

| Journaliste           | Média                 | Sujet                          | Email                      | Note                                  |
| --------------------- | --------------------- | ------------------------------ | -------------------------- | ------------------------------------- |
| Marc Rees             | Next INpact           | Civic tech, gouvernement, RGPD | marc.rees@nextinpact.com   | Réceptif aux outils open source FR    |
| Olivier Tesquet       | Télérama              | Surveillance, civic tech       | otesquet@telerama.fr       | A déjà couvert des projets similaires |
| Romain Dillet         | Numerama / TechCrunch | Tech française                 | romain.dillet@numerama.com | Audience large                        |
| Korben (Manuel Dorne) | korben.info           | Outils dev / sysadmin          | hello@korben.info          | Couvre les outils utiles français     |
| Tariq Krim            | Cypherspace.fr        | Souveraineté num.              | tariq.krim@cypherspace.fr  | Angle "outil indépendant"             |

### Presse auto

| Journaliste       | Média                  | Sujet          | Email                          |
| ----------------- | ---------------------- | -------------- | ------------------------------ |
| Pierre Desjardins | L'Argus.fr             | Fiscalité auto | pierre.desjardins@largus.fr    |
| (rédaction)       | Caradisiac.com         | Économie auto  | redaction@caradisiac.com       |
| Thomas Antoine    | Auto Plus              | Conseil achat  | thomas.antoine@autoplus.fr     |
| (rédaction)       | Automobile-magazine.fr | News fiscale   | contact@automobile-magazine.fr |

### Conso / Service-public

| Journaliste    | Média                        | Sujet                | Email                      |
| -------------- | ---------------------------- | -------------------- | -------------------------- |
| (rédaction)    | 60 Millions de Consommateurs | Démarches admin      | contact@60millions-mag.com |
| Sandra Lorenzo | HuffPost FR                  | Économie quotidienne | sandra.lorenzo@huffpost.fr |
| (rédaction)    | Quechoisir.org               | Comparateur, conso   | contact@quechoisir.org     |

## Template de pitch (à adapter par journaliste)

### Sujet : `Outil gratuit pour calcul carte grise — il manquait sur service-public.gouv.fr`

```
Bonjour [Prénom],

Je me permets de vous écrire car votre couverture de [article ou sujet
récent du journaliste] m'a fait penser que cette histoire pourrait
vous intéresser.

J'ai construit immatcalc.fr — un calculateur gratuit, open source et
sans publicité du coût de la carte grise en France pour 2026.

L'origine du projet : la formule officielle (6 taxes empilées, 18
régions différentes, malus CO₂ et poids depuis 2024) est complexe.
Service-public.gouv.fr la décrit mais ne la calcule pas — il renvoie
vers ANTS pour la démarche administrative. Des sites privés comme
cartegrise.com ou cartegriseminute.fr font le calcul... et facturent
30 à 50 € de "frais de dossier" pour ce qui est de l'arithmétique
sur des données publiques.

Quelques chiffres qui pourraient intéresser vos lecteurs :

- Pour le même Peugeot 3008 hybride neuf, l'écart entre régions va de
  525 € (Auvergne-Rhône-Alpes) à 822 € (Île-de-France) en 2026, soit
  56 % de plus à Paris.
- L'exonération des véhicules 100 % électriques fait passer la carte
  grise d'une Tesla Model Y de 6 545 € (équivalent thermique BMW X3 30d)
  à 13,76 € — une économie de 6 530 €.
- La nouvelle surcharge IDFM (14 €/CV depuis mars 2026) ne touche que
  les Franciliens et représente 50 à 100 € supplémentaires par carte
  grise pour 12 millions d'habitants.

Le code et les barèmes sont publics. Les sources de données sont
ouvertes (ADEME Car Labelling, EEA CO₂ Monitoring, décrets Légifrance).
J'ai testé 100 cas stratifiés contre le simulateur officiel : écart
moyen < 0,5 % (arrondis uniquement).

Je suis disponible pour échanger si vous souhaitez en savoir plus,
fournir des chiffres complémentaires ou tester l'outil avec vos
propres exemples.

Lien : https://immatcalc.fr

Bien à vous,
Mohamed Lamouchi
```

## Suivi

| Journaliste | Date envoi | Date relance | Statut | Article publié |
| ----------- | ---------- | ------------ | ------ | -------------- |
| ...         | ...        | J+10         | ...    | ...            |

**Règle** : 1 relance maximum, 10 jours après le pitch initial. Si pas de réponse → abandon poli.

## Volume attendu

Sur 12 pitches :

- ~3 réponses (taux 25 %)
- ~1-2 articles publiés (taux 8-15 %)
- 1 article "tech" (Korben ou Numerama) + 1 article "auto" (L'Argus ou Caradisiac) serait un succès

Avec 2 articles publiés à DR 70+, on a 2 backlinks haute autorité, 5 000-15 000 visiteurs additionnels, et la crédibilité pour pitcher la presse plus tier-1 (Le Monde, Les Echos) en mois 6.

## Plan B : data journalism

Si les pitches narratifs ne prennent pas, alternative : **fournir un dataset packagé** à un journaliste.

Exemple : "Le tableau des 18 régions : tarif au CV, surcharge éventuelle, écart par rapport à la moyenne, économie EV vs équivalent thermique" → publier en open data sur data.gouv.fr et envoyer le lien à 5 journalistes data en sujet auto. Les redactions data adorent les datasets clés en main.
