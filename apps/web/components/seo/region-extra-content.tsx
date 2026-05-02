import Link from 'next/link';

/**
 * Region-specific editorial content injected as `extraContent` on each
 * /carte-grise/<region>/page.tsx via the RegionPage shared renderer.
 *
 * Each region needs ~600-800 mots beyond the base RegionPage scaffold to
 * cross the SEO "thin content" threshold (target 1000+ words rendered on
 * the page). The base RegionPage already adds ~400 words of factual data
 * (rate per CV, examples table, energy coefs table, démarches, FAQ).
 *
 * Centralized here rather than in each page.tsx so that:
 *   - the shared scaffolding stays consistent
 *   - facts can be updated in one place when LF tariffs change
 *   - the per-page file remains a thin shell (just slug + intro)
 */

interface SectionProps {
  niceName: string;
  perCv: number;
  ranking: string; // e.g. "la moins chère", "la 3ᵉ moins chère"
  delta: { vs: string; amountCv: number; example: string };
  hybridCoef: 0 | 0.5 | 1;
  hybridSpecificity: string;
  geographyDescription: string;
  topCities: string[];
  importHint: string;
  practicalNotes: string[];
}

function CommonExtra(props: SectionProps) {
  const {
    niceName,
    perCv,
    ranking,
    delta,
    hybridCoef,
    hybridSpecificity,
    geographyDescription,
    topCities,
    importHint,
    practicalNotes,
  } = props;
  const annualSavingExample =
    delta.amountCv > 0
      ? `Pour un véhicule 7 CV, l'écart représente environ ${delta.amountCv * 7} € sur la carte grise comparé à ${delta.vs}.`
      : `${delta.example}`;
  return (
    <>
      <h2>Pourquoi le tarif au cheval fiscal en {niceName} ?</h2>
      <p>
        Le conseil régional de {niceName} fixe chaque année le tarif au cheval fiscal applicable à
        la taxe régionale Y1, dans la limite du plafond légal national (60 €/CV en 2026). Pour 2026,
        le tarif est de <strong>{perCv} €/CV</strong>
        {perCv >= 60
          ? ' — soit le maximum autorisé par la loi.'
          : ', soit en dessous du plafond légal.'}{' '}
        {niceName} se positionne ainsi comme {ranking} de France pour la carte grise des véhicules
        thermiques.
      </p>
      <p>{annualSavingExample}</p>
      <p>{geographyDescription}</p>

      <h2>Coefficients d'énergie en {niceName}</h2>
      <p>
        Le tarif {perCv} €/CV ne s'applique pas uniformément. Selon l'énergie de votre véhicule, un
        coefficient multiplicateur peut s'appliquer (entre 0 pour l'exonération totale et 1 pour le
        tarif plein) :
      </p>
      <ul>
        <li>
          <strong>Essence et diesel</strong> : coefficient <code>1</code> (tarif plein de {perCv}{' '}
          €/CV)
        </li>
        <li>
          <strong>Hybride non rechargeable (HEV)</strong> :{' '}
          {hybridCoef === 0 ? (
            <>
              coefficient <code>0</code> (exonération totale) — {hybridSpecificity}
            </>
          ) : hybridCoef === 0.5 ? (
            <>
              coefficient <code>0,5</code> — {hybridSpecificity}
            </>
          ) : (
            <>
              coefficient <code>1</code> (tarif plein, comme essence)
            </>
          )}
        </li>
        <li>
          <strong>Hybride rechargeable (PHEV)</strong> : coefficient <code>0,5</code> en général
          (demi-tarif)
        </li>
        <li>
          <strong>GPL et E85</strong> : coefficient <code>0,5</code> dans la majorité des régions, à
          vérifier sur la grille officielle
        </li>
        <li>
          <strong>Électrique (BEV)</strong> et <strong>hydrogène</strong> : coefficient{' '}
          <code>0</code> (exonération totale de Y1)
        </li>
      </ul>

      <h2>Exemples chiffrés détaillés</h2>
      <p>
        Pour vous donner une idée concrète, voici trois exemples de calcul pour des véhicules
        typiques immatriculés en {niceName} :
      </p>
      <ul>
        <li>
          <strong>Renault Clio TCe 91 essence (5 CV, 125 g CO₂/km)</strong> : {5 * perCv} € (Y1) +
          13,76 € (Y4 + Y5) + ~190 € (malus CO₂ palier 125 g) ≈{' '}
          <strong>{(5 * perCv + 14 + 190).toLocaleString('fr-FR')} €</strong>
        </li>
        <li>
          <strong>Peugeot 3008 hybride E-Tech (7 CV, 27 g CO₂/km)</strong> : 7 × {perCv} ×{' '}
          {hybridCoef === 0 ? '0' : hybridCoef === 0.5 ? '0,5' : '1'} ={' '}
          {(7 * perCv * hybridCoef).toLocaleString('fr-FR')} € (Y1) + 13,76 € + 0 € de malus (sous
          le seuil 108 g) ≈{' '}
          <strong>{(7 * perCv * hybridCoef + 14).toLocaleString('fr-FR')} €</strong>
        </li>
        <li>
          <strong>Tesla Model Y électrique (15 CV, 0 g CO₂/km)</strong> : 0 € (Y1 exonérée) + 13,76
          € (Y4 + Y5) + 0 € (malus CO₂ exonéré) + 0 € (malus poids exonéré) ={' '}
          <strong>13,76 €</strong>
        </li>
      </ul>

      <h2>Villes principales et démarches</h2>
      <p>
        Les principales agglomérations de {niceName} concernées par ces tarifs sont :{' '}
        {topCities.join(', ')}. Quelle que soit la commune, la démarche d'immatriculation se fait
        exclusivement en ligne sur le portail officiel{' '}
        <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
          immatriculation.ants.gouv.fr
        </a>{' '}
        depuis 2017. Aucune préfecture n'instruit plus de demandes au guichet.
      </p>
      <p>{importHint}</p>

      <h2>Cas particuliers en {niceName}</h2>
      <ul>
        {practicalNotes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>

      <h2>Réduire le coût : voitures éligibles aux tarifs préférentiels</h2>
      <p>
        Les véhicules <strong>100 % électriques et à hydrogène</strong> bénéficient d'une
        exonération totale de la taxe régionale Y1 et du malus CO₂. Combinés avec l'exonération du
        malus au poids (TMOM) jusqu'en 2028, ils ne paient que les{' '}
        <strong>13,76 € de Y4 + Y5</strong> au total, soit le minimum absolu en France. Pour
        comparer le coût total d'une électrique vs une thermique équivalente, utilisez notre{' '}
        <Link href="/">calculateur en ligne</Link> et vérifiez l'effet de l'exonération sur votre
        cas précis.
      </p>
      <p>
        Si votre véhicule est âgé de <strong>10 ans ou plus</strong>, la taxe régionale Y1 est
        divisée par 2 (article L.421-48 du CIBS). Cela concerne notamment les véhicules d'occasion
        en transmission entre particuliers : pour une voiture de 12 ans en {niceName}, la Y1 est
        calculée à {perCv / 2} €/CV.
      </p>
    </>
  );
}

const CONTENT_BY_REGION: Record<string, SectionProps> = {
  ARA: {
    niceName: 'Auvergne-Rhône-Alpes',
    perCv: 43,
    ranking: 'la deuxième région la moins chère',
    delta: {
      vs: 'Île-de-France',
      amountCv: 26,
      example:
        "L'écart de 26 €/CV avec l'Île-de-France représente une économie de plus de 180 € pour un 7 CV, ce qui place ARA dans le peloton de tête des régions les plus avantageuses pour la carte grise en France.",
    },
    hybridCoef: 1,
    hybridSpecificity: "ARA n'applique pas de coefficient réduit pour les hybrides simples (HEV)",
    geographyDescription:
      "Avec 12 départements (Ain 01, Allier 03, Ardèche 07, Cantal 15, Drôme 26, Isère 38, Loire 42, Haute-Loire 43, Puy-de-Dôme 63, Rhône 69, Savoie 73, Haute-Savoie 74), Auvergne-Rhône-Alpes est l'une des plus grandes régions de France, couvrant un territoire varié de la métropole lyonnaise jusqu'aux massifs alpins et au Massif central.",
    topCities: [
      'Lyon',
      'Saint-Étienne',
      'Grenoble',
      'Annecy',
      'Clermont-Ferrand',
      'Chambéry',
      'Valence',
    ],
    importHint:
      "Pour un véhicule importé d'un autre pays de l'UE (Allemagne, Italie, Suisse via la Haute-Savoie), il faut produire en plus le quitus fiscal délivré par le service des impôts des entreprises et le certificat de conformité européen (COC). Le contrôle technique français est exigé si le véhicule a plus de 4 ans.",
    practicalNotes: [
      "Les habitants de la métropole lyonnaise (zone à faibles émissions ZFE-m) peuvent bénéficier de bonus complémentaires sur l'achat d'un véhicule électrique mais cela n'affecte pas le calcul de la carte grise.",
      "Pour les véhicules de collection (>30 ans, certificat fédéral FFVE), le tarif au CV reste identique mais la procédure d'immatriculation passe par une carte grise collection avec restrictions de circulation.",
      "ARA n'a pas de surcharge équivalente à l'IDFM francilienne : aucune majoration au-delà du tarif régional de 43 €/CV.",
    ],
  },
  BRE: {
    niceName: 'Bretagne',
    perCv: 60,
    ranking: "l'une des plus avantageuses pour les hybrides",
    delta: {
      vs: 'Auvergne-Rhône-Alpes',
      amountCv: 17,
      example:
        "Si la Bretagne pratique le tarif plafond à 60 €/CV pour les véhicules thermiques classiques, son coefficient hybride à 0,5 en fait l'une des régions les moins chères pour les véhicules HEV (Toyota Yaris hybride, Renault Clio E-Tech, Peugeot 3008 Hybrid…).",
    },
    hybridCoef: 0.5,
    hybridSpecificity:
      'la Bretagne fait partie des 4 régions françaises qui appliquent un demi-tarif aux hybrides simples (HEV) — avec les Hauts-de-France, la Corse et certaines régions DOM',
    geographyDescription:
      "La Bretagne couvre 4 départements (Côtes-d'Armor 22, Finistère 29, Ille-et-Vilaine 35, Morbihan 56). Particularité : la Loire-Atlantique (44, Nantes) appartient administrativement aux Pays de la Loire et non à la Bretagne, ce qui crée parfois la confusion lors de l'immatriculation.",
    topCities: ['Rennes', 'Brest', 'Quimper', 'Lorient', 'Vannes', 'Saint-Malo'],
    importHint:
      "Pour un véhicule importé d'Irlande ou du Royaume-Uni via les ports de Saint-Malo et Roscoff, attention au statut Brexit : un véhicule UK est désormais traité comme une importation hors-UE, ce qui implique des droits de douane (10 %) et la TVA française (20 %) en plus de la carte grise.",
    practicalNotes: [
      "Le coefficient 0,5 sur les hybrides est l'une des principales motivations pour les acheteurs de Yaris Hybride et Clio E-Tech immatriculés en Bretagne — l'économie peut atteindre 150 € sur Y1 par rapport à l'IDF.",
      "La Bretagne ne pratique pas de demi-tarif sur le diesel ni sur l'essence : les motorisations classiques restent à 60 €/CV plein.",
      'Pour les ports bretons (Saint-Malo, Brest, Lorient), de nombreuses immatriculations concernent des véhicules importés de Grande-Bretagne en transit. Le statut du véhicule (occasion britannique, plaque à transformer) impose des justificatifs spécifiques.',
    ],
  },
  GES: {
    niceName: 'Grand Est',
    perCv: 60,
    ranking: 'au tarif plafond légal',
    delta: {
      vs: 'Auvergne-Rhône-Alpes',
      amountCv: 17,
      example:
        'Avec ses 60 €/CV pleins et son demi-tarif limité aux énergies vertes, le Grand Est se situe dans la moyenne haute des régions françaises pour la carte grise.',
    },
    hybridCoef: 1,
    hybridSpecificity: 'le Grand Est applique le tarif plein aux hybrides simples (HEV)',
    geographyDescription:
      "Issu de la fusion de l'Alsace, de la Lorraine et de la Champagne-Ardenne en 2016, le Grand Est compte 10 départements (Ardennes 08, Aube 10, Marne 51, Haute-Marne 52, Meurthe-et-Moselle 54, Meuse 55, Moselle 57, Bas-Rhin 67, Haut-Rhin 68, Vosges 88) et frontière avec l'Allemagne, la Suisse, le Luxembourg et la Belgique.",
    topCities: ['Strasbourg', 'Reims', 'Metz', 'Nancy', 'Mulhouse', 'Troyes', 'Colmar'],
    importHint:
      'Le Grand Est est la première région française pour les imports européens automobiles, notamment via la frontière allemande (Strasbourg-Kehl, Sarrebourg-Sarrebruck). Compte tenu du volume, les concessions transfrontalières maîtrisent parfaitement la procédure carte grise import UE — pensez à demander un devis comparé entre achat français et import UE pour le même modèle.',
    practicalNotes: [
      'Pour les frontaliers travaillant en Allemagne ou au Luxembourg, le véhicule doit être immatriculé en France si la résidence principale y est établie. Une plaque allemande sur un véhicule conduit majoritairement par un résident français peut être requalifiée par les douanes.',
      "L'Alsace-Moselle a un régime de droit local mais celui-ci ne concerne pas la carte grise (régime fiscal commun à toute la France).",
      'Le Grand Est ne pratique pas de surcharge type IDFM : aucune majoration au-delà des 60 €/CV.',
    ],
  },
  HDF: {
    niceName: 'Hauts-de-France',
    perCv: 42,
    ranking: 'la région la moins chère de France',
    delta: {
      vs: 'Île-de-France',
      amountCv: 27,
      example:
        "Avec 42 €/CV, les Hauts-de-France sont la région la moins chère de métropole pour la carte grise des véhicules thermiques. L'écart avec l'Île-de-France atteint 27 €/CV (190 € pour un 7 CV).",
    },
    hybridCoef: 0.5,
    hybridSpecificity:
      'les Hauts-de-France appliquent un demi-tarif aux hybrides (HEV), une rare combinaison avec un tarif déjà bas qui en fait la région idéale pour les Yaris Hybrid et Clio E-Tech',
    geographyDescription:
      "Les Hauts-de-France couvrent 5 départements (Aisne 02, Nord 59, Oise 60, Pas-de-Calais 62, Somme 80). La région inclut le tunnel sous la Manche et constitue la principale porte d'entrée des véhicules importés depuis le Royaume-Uni.",
    topCities: [
      'Lille',
      'Amiens',
      'Roubaix',
      'Tourcoing',
      'Calais',
      'Dunkerque',
      'Boulogne-sur-Mer',
    ],
    importHint:
      "Pour un véhicule importé du Royaume-Uni via Calais ou le tunnel sous la Manche, la procédure post-Brexit s'applique : droits de douane 10 % + TVA française 20 % + carte grise standard. Comptez un surcoût d'environ 30 % sur le prix UK avant immatriculation.",
    practicalNotes: [
      "Les habitants de la métropole lilloise bénéficient d'aides locales à l'achat de véhicules propres (cumulables avec le bonus écologique national) mais cela n'affecte pas le calcul de la carte grise elle-même.",
      'Le combo tarif bas (42 €/CV) + coefficient hybride 0,5 fait des HdF la région idéale pour immatriculer une Toyota Yaris Hybride ou une Renault Clio E-Tech : Y1 = 5 × 42 × 0,5 = 105 € contre 300 € en IDF.',
      "Aucune surcharge type IDFM ou autre majoration spécifique n'est appliquée par la région.",
    ],
  },
  NAQ: {
    niceName: 'Nouvelle-Aquitaine',
    perCv: 58,
    ranking: 'légèrement sous le plafond',
    delta: {
      vs: 'Île-de-France',
      amountCv: 11,
      example:
        'Avec 58 €/CV, la Nouvelle-Aquitaine est très proche du plafond légal mais permet une économie modeste de 14 € pour un 7 CV par rapport aux régions plafonnées à 60 €.',
    },
    hybridCoef: 1,
    hybridSpecificity: 'la Nouvelle-Aquitaine applique le tarif plein aux hybrides simples (HEV)',
    geographyDescription:
      "Plus grande région de France métropolitaine, la Nouvelle-Aquitaine compte 12 départements (Charente 16, Charente-Maritime 17, Corrèze 19, Creuse 23, Dordogne 24, Gironde 33, Landes 40, Lot-et-Garonne 47, Pyrénées-Atlantiques 64, Deux-Sèvres 79, Vienne 86, Haute-Vienne 87) et s'étend de la côte atlantique aux Pyrénées.",
    topCities: ['Bordeaux', 'Limoges', 'Poitiers', 'La Rochelle', 'Pau', 'Bayonne', 'Angoulême'],
    importHint:
      "Pour un véhicule importé d'Espagne via Hendaye ou via la côte basque, la procédure UE standard s'applique : quitus fiscal + COC + contrôle technique français si véhicule de plus de 4 ans. Le port de Bordeaux reçoit également des imports américains, traités en hors-UE.",
    practicalNotes: [
      "La métropole de Bordeaux pratique des aides à l'achat de véhicules propres mais celles-ci sont distinctes du calcul de carte grise.",
      'Les véhicules de collection (>30 ans) bénéficient des règles nationales sans particularité régionale.',
      "Aucune surcharge équivalente à l'IDFM n'est appliquée en Nouvelle-Aquitaine.",
    ],
  },
  OCC: {
    niceName: 'Occitanie',
    perCv: 59.5,
    ranking: 'juste sous le plafond légal',
    delta: {
      vs: 'Île-de-France',
      amountCv: 9.45,
      example:
        "Avec 59,50 €/CV, l'Occitanie n'est qu'à 50 centimes du plafond légal de 60 €. La région a maintenu ce tarif léger en deçà pour préserver une légère attractivité fiscale.",
    },
    hybridCoef: 1,
    hybridSpecificity: "l'Occitanie applique le tarif plein aux hybrides simples (HEV)",
    geographyDescription:
      "Issue de la fusion Languedoc-Roussillon + Midi-Pyrénées en 2016, l'Occitanie compte 13 départements (Ariège 09, Aude 11, Aveyron 12, Gard 30, Haute-Garonne 31, Gers 32, Hérault 34, Lot 46, Lozère 48, Hautes-Pyrénées 65, Pyrénées-Orientales 66, Tarn 81, Tarn-et-Garonne 82) et s'étend des Pyrénées à la Méditerranée.",
    topCities: [
      'Toulouse',
      'Montpellier',
      'Nîmes',
      'Perpignan',
      'Béziers',
      'Carcassonne',
      'Tarbes',
    ],
    importHint:
      "Pour un véhicule importé d'Espagne via Le Perthus ou de Catalogne, la procédure UE standard s'applique. Toulouse étant un grand bassin d'emploi, les imports concernent autant des véhicules d'occasion espagnols que des véhicules neufs achetés en Allemagne.",
    practicalNotes: [
      "L'Occitanie a longtemps pratiqué un tarif plus bas mais a relevé progressivement à 59,50 €/CV pour suivre l'évolution générale des budgets régionaux.",
      "Les habitants des départements pyrénéens (09, 65, 66) sont nombreux à acheter en Andorre — attention, l'Andorre est hors UE, la procédure d'importation est plus lourde (douane, TVA).",
      "Aucune surcharge type IDFM n'est appliquée en Occitanie.",
    ],
  },
  PDL: {
    niceName: 'Pays de la Loire',
    perCv: 51,
    ranking: 'parmi les régions les moins chères',
    delta: {
      vs: 'Île-de-France',
      amountCv: 17.95,
      example:
        "À 51 €/CV, les Pays de la Loire pratiquent l'un des tarifs les plus bas de France, avec une économie de plus de 125 € pour un 7 CV par rapport à l'Île-de-France.",
    },
    hybridCoef: 0,
    hybridSpecificity:
      "les Pays de la Loire appliquent l'exonération totale (coefficient 0) aux véhicules hybrides simples (HEV) — une particularité qui en fait la région la plus avantageuse pour les Toyota Yaris Hybride, Renault Clio E-Tech et Peugeot 3008 Hybride",
    geographyDescription:
      "Les Pays de la Loire couvrent 5 départements (Loire-Atlantique 44, Maine-et-Loire 49, Mayenne 53, Sarthe 72, Vendée 85). La région inclut Nantes (souvent confondue avec la Bretagne) et l'estuaire de la Loire avec son grand port industriel.",
    topCities: ['Nantes', 'Angers', 'Le Mans', 'Saint-Nazaire', 'La Roche-sur-Yon', 'Cholet'],
    importHint:
      "Le port de Saint-Nazaire reçoit des imports automobiles tant européens qu'américains. Pour un véhicule UE, la procédure standard s'applique. Pour un véhicule US, comptez la procédure hors-UE avec homologation à titre isolé si le modèle n'est pas commercialisé en Europe.",
    practicalNotes: [
      "Les Pays de la Loire sont l'une des **rares régions françaises avec exonération totale Y1 pour hybrides simples** — c'est unique parmi les grandes régions et fait de Nantes une plaque tournante pour l'immatriculation des Toyota Yaris Hybride.",
      "Les habitants de Loire-Atlantique (44) sont parfois tentés d'immatriculer en Bretagne pour le coefficient hybride 0,5 — c'est inutile puisque PDL applique 0 (exonération totale, encore plus avantageux).",
      "Aucune surcharge type IDFM n'est appliquée en Pays de la Loire.",
    ],
  },
  PAC: {
    niceName: "Provence-Alpes-Côte d'Azur",
    perCv: 60,
    ranking: 'au tarif plafond légal',
    delta: {
      vs: 'Auvergne-Rhône-Alpes',
      amountCv: 17,
      example:
        "PACA pratique le tarif plafond de 60 €/CV, ce qui la place dans la moyenne haute des régions françaises mais sans surcharge additionnelle (contrairement à l'Île-de-France qui est à 68,95 €/CV avec l'IDFM).",
    },
    hybridCoef: 1,
    hybridSpecificity: 'PACA applique le tarif plein aux hybrides simples (HEV)',
    geographyDescription:
      "Provence-Alpes-Côte d'Azur (PACA) couvre 6 départements (Alpes-de-Haute-Provence 04, Hautes-Alpes 05, Alpes-Maritimes 06, Bouches-du-Rhône 13, Var 83, Vaucluse 84) et s'étend des Alpes du Sud à la Méditerranée. Région touristique majeure, elle a un parc automobile renouvelé avec une forte présence de SUV thermiques et de véhicules de luxe.",
    topCities: ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Avignon', 'Cannes', 'Antibes'],
    importHint:
      "Pour un véhicule importé d'Italie via Vintimille ou de Monaco (qui a son propre système d'immatriculation), la procédure UE standard s'applique pour l'Italie. Monaco étant en union douanière avec la France mais souverain, un véhicule monégasque doit être réimmatriculé via la procédure UE classique.",
    practicalNotes: [
      "La région PACA ne pratique pas de surcharge type IDFM. À titre indicatif, les départements 06 (Alpes-Maritimes), 13 (Bouches-du-Rhône) et 83 (Var) ont un fort taux d'immatriculation lié au tourisme et aux résidences secondaires.",
      'Les frontaliers de Monaco sont fiscalement considérés comme résidents français si leur domicile principal est dans les Alpes-Maritimes — la voiture doit alors être immatriculée en France.',
      "Le port de Marseille traite des imports automobiles depuis l'Afrique du Nord — ces véhicules suivent la procédure hors-UE.",
    ],
  },
};

export function RegionExtraContent({ regionCode }: { regionCode: string }) {
  const props = CONTENT_BY_REGION[regionCode];
  if (!props) return null;
  return <CommonExtra {...props} />;
}
