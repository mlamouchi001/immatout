import Link from 'next/link';

import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'ile-de-france',
  regionCode: 'IDF',
  niceName: 'Île-de-France',
  departments:
    'Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d’Oise (95)',
  intro:
    'L’Île-de-France applique un tarif de 54,95 €/CV auquel s’ajoute depuis le 1ᵉʳ mars 2026 la surcharge IDFM de 14 €/CV pour financer les transports franciliens. C’est la seule région en France à appliquer une surcharge additionnelle, ce qui la place parmi les plus chères du territoire pour la carte grise.',
};

export const metadata = makeRegionMetadata(CONTENT);

function ExtraContent() {
  return (
    <>
      <h2>Pourquoi l’Île-de-France est la région la plus chère pour la carte grise</h2>
      <p>
        Avec un tarif effectif de <strong>68,95 €/CV</strong> (54,95 € de tarif régional + 14 € de
        surcharge IDFM) pour les véhicules thermiques, l’Île-de-France est la région française la
        plus chère pour immatriculer une voiture neuve ou changer de propriétaire pour une occasion.
        À titre de comparaison, l’Auvergne-Rhône-Alpes pratique 43 €/CV (la plus basse de
        métropole), et la Corse seulement 27 €/CV. L’écart pour un même véhicule peut donc atteindre
        250 à 350 € entre les deux extrêmes.
      </p>

      <h2>La surcharge IDFM expliquée en détail</h2>
      <p>
        Depuis le 1ᵉʳ mars 2026, la Loi de Finances 2026 a entériné une surcharge de 14 € par cheval
        fiscal applicable aux véhicules immatriculés dans les huit départements de l’Île-de-France.
        Les recettes générées sont fléchées vers Île-de-France Mobilités (IDFM), l’autorité
        organisatrice des transports en commun de la région — RER, métro, bus, trams, Transilien.
      </p>
      <p>
        Cette surcharge concerne <strong>tous les véhicules thermiques et hybrides</strong>, mais ne
        s’applique pas aux véhicules 100 % électriques ni à hydrogène. Le mécanisme est simple :
        IDFM applique également un coefficient énergie identique à la taxe régionale standard.
        Concrètement, si vous immatriculez une Tesla Model Y en Île-de-France, le coefficient EV de
        0 ramène à 0 € la part Y1 ET la surcharge IDFM. Vous payez les mêmes 13,76 € (Y4 + Y5) que
        n’importe où ailleurs en France.
      </p>
      <p>En revanche, pour un Peugeot 3008 hybride rechargeable (PHEV) immatriculé à Paris :</p>
      <ul>
        <li>
          7 CV fiscaux × 54,95 € (tarif régional) × 0,5 (coefficient PHEV) = <strong>192 €</strong>
        </li>
        <li>
          7 CV × 14 € (surcharge IDFM) × 0,5 = <strong>49 €</strong>
        </li>
        <li>Y4 + Y5 = 13,76 €</li>
        <li>Pas de malus CO₂ (sous le seuil)</li>
        <li>
          <strong>Total ≈ 255 €</strong>
        </li>
      </ul>
      <p>
        Sans la surcharge IDFM, la même immatriculation coûterait 206 € — soit une économie de 49 €
        — par exemple si vous habitiez à Reims (Grand Est) ou à Tours (Centre-Val de Loire).
      </p>

      <h2>Coefficients d’énergie applicables en Île-de-France</h2>
      <p>
        Comme toutes les régions françaises, l’Île-de-France applique des coefficients
        multiplicateurs sur la taxe régionale en fonction de l’énergie du véhicule. Les coefficients
        IDF sont :
      </p>
      <ul>
        <li>
          <strong>Essence et diesel</strong> : coefficient <code>1</code> (tarif plein de 54,95
          €/CV)
        </li>
        <li>
          <strong>Hybride non rechargeable (HEV)</strong> : coefficient <code>1</code> (tarif plein,
          contrairement à la Bretagne ou aux Hauts-de-France qui appliquent 0,5)
        </li>
        <li>
          <strong>Hybride rechargeable (PHEV)</strong> : coefficient <code>0,5</code> (demi-tarif)
        </li>
        <li>
          <strong>GPL et E85</strong> : coefficient <code>0,5</code> (demi-tarif)
        </li>
        <li>
          <strong>Électrique (BEV)</strong> et <strong>hydrogène</strong> : coefficient{' '}
          <code>0</code> (exonération totale, surcharge IDFM incluse)
        </li>
      </ul>
      <p>
        L’Île-de-France ne fait <strong>pas</strong> partie des régions qui appliquent un demi-tarif
        aux hybrides classiques (HEV) — un choix politique qui distingue la région de la Bretagne,
        des Hauts-de-France ou de la Corse, où une Toyota Yaris hybride par exemple bénéficie d’une
        réduction immédiate de 50 % sur Y1.
      </p>

      <h2>Démarches d’immatriculation en Île-de-France</h2>
      <p>
        Depuis 2017, toutes les démarches liées à la carte grise se font exclusivement en ligne sur
        le portail de l’Agence Nationale des Titres Sécurisés (ANTS). Les guichets en préfecture ont
        été supprimés. Cela vaut pour Paris (Préfecture de Police, place Louis-Lépine) comme pour
        les sept préfectures de département, qui n’assurent plus aucune fonction d’immatriculation.
      </p>
      <p>Le portail officiel à utiliser est :</p>
      <ul>
        <li>
          <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
            immatriculation.ants.gouv.fr
          </a>{' '}
          — site officiel et gratuit (hors taxes Y1 à Y6)
        </li>
      </ul>
      <p>Les délais constatés en Île-de-France sont :</p>
      <ul>
        <li>
          <strong>Certificat d’immatriculation provisoire (CPI)</strong> : envoyé par mail sous 24 à
          48 h après validation du dossier — il vous permet de circuler immédiatement
        </li>
        <li>
          <strong>Carte grise définitive</strong> : reçue par courrier sécurisé sous 7 à 10 jours
          ouvrés
        </li>
      </ul>

      <h2>Cas particuliers franciliens</h2>
      <h3>Habitants de Paris et de la petite couronne</h3>
      <p>
        Si vous résidez à Paris (75) ou dans les Hauts-de-Seine (92), Seine-Saint-Denis (93) ou
        Val-de-Marne (94), votre adresse de résidence détermine la région d’immatriculation
        (Île-de-France) — donc la surcharge IDFM s’applique automatiquement. Il n’est pas possible
        de domicilier votre véhicule chez un parent ou un ami résidant en province pour échapper à
        la taxe IDFM : c’est l’adresse principale du titulaire du certificat qui fait foi, et les
        contrôles sont fréquents.
      </p>

      <h3>Grande couronne (77, 78, 91, 95)</h3>
      <p>
        La Seine-et-Marne (77), les Yvelines (78), l’Essonne (91) et le Val-d’Oise (95)
        appartiennent administrativement à l’Île-de-France et sont donc soumis à la surcharge IDFM,
        même pour les communes éloignées de Paris (Fontainebleau, Rambouillet, Étampes, etc.). Aucun
        mécanisme de dégrèvement n’est prévu pour les zones rurales de la région.
      </p>

      <h3>Frontière avec les régions voisines</h3>
      <p>
        Les départements limitrophes de l’IDF appartiennent aux régions Centre-Val de Loire, Grand
        Est, Hauts-de-France, Bourgogne-Franche-Comté ou Normandie. Tarifs de référence pour
        comparer :
      </p>
      <ul>
        <li>Centre-Val de Loire (Eure-et-Loir 28) : 60 €/CV (sans surcharge)</li>
        <li>Hauts-de-France (Oise 60) : 35 €/CV + coef hybride 0,5</li>
        <li>Grand Est (Marne 51) : 60 €/CV (sans surcharge)</li>
        <li>Normandie (Eure 27) : 60 €/CV (sans surcharge)</li>
      </ul>
      <p>
        Pour un Peugeot 3008 essence 7 CV, l’écart entre Paris (68,95 €/CV soit 482 €) et Évreux (60
        €/CV soit 420 €) est de 62 € sur Y1 — notable mais loin de justifier une fausse
        domiciliation.
      </p>

      <h2>Le malus CO₂ et le malus poids en Île-de-France</h2>
      <p>
        La surcharge IDFM ne touche que la taxe régionale Y1. Le malus CO₂ (Y3) et le malus au poids
        (Y6) sont des taxes nationales appliquées de manière identique partout en France. En
        Île-de-France, comme ailleurs :
      </p>
      <ul>
        <li>
          <strong>Malus CO₂</strong> : déclenché à 108 g CO₂/km (WLTP), plafonné à 70 000 € en 2026
        </li>
        <li>
          <strong>Malus au poids (TMOM)</strong> : 10 €/kg au-delà de 1 500 kg, plafonné à 60 €/kg
          au-delà de 2 100 kg
        </li>
        <li>
          <strong>Plafond cumulé Y3 + Y6</strong> : 70 000 € (le plafond du malus poids vient
          s’imputer sur celui du malus CO₂)
        </li>
      </ul>
      <p>
        Pour les SUV thermiques lourds importés en Île-de-France, ces deux taxes nationales
        s’ajoutent à la surcharge IDFM, ce qui peut faire grimper la carte grise à plus de 10 000 €
        pour un véhicule premium type Range Rover ou Mercedes GLS.
      </p>

      <p>
        Pour calculer le coût exact de votre carte grise selon la motorisation et les
        caractéristiques précises de votre véhicule, utilisez notre{' '}
        <Link href="/">calculateur en ligne</Link>. Pour comprendre l’impact de la surcharge IDFM
        sur votre cas particulier, consultez notre{' '}
        <Link href="/guide/taxe-regionale-cheval-fiscal">guide de la taxe régionale</Link>.
      </p>
    </>
  );
}

export default function Page() {
  return <RegionPage content={CONTENT} extraContent={<ExtraContent />} />;
}
