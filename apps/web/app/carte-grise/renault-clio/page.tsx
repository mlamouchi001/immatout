import Link from 'next/link';

import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'renault-clio',
  make: 'RENAULT',
  model: 'CLIO',
  niceName: 'Renault Clio',
  intro:
    'Meilleure vente en France depuis 2024, la Renault Clio V existe en essence (TCe 65, 91, 101 ch), hybride E-Tech, GPL et a historiquement connu une version diesel. Le calcul du coût de la carte grise dépend donc fortement de la motorisation choisie et de votre région.',
};

export const metadata = makeModelMetadata(CONTENT);

function ExtraContent() {
  return (
    <>
      <h2>Combien coûte la carte grise d’une Renault Clio en 2026 ?</h2>
      <p>
        Pour la Renault Clio, le total dépend de trois variables : la motorisation (essence, hybride
        E-Tech, GPL ou diesel d’occasion), la région d’immatriculation et l’ancienneté du véhicule
        (qui détermine si le malus CO₂ s’applique au taux plein ou avec décote pour les imports
        d’occasion). Voici les fourchettes les plus courantes :
      </p>
      <ul>
        <li>
          <strong>Clio TCe 91 essence (5 CV, ~125 g CO₂/km, 1 080 kg)</strong> en
          Auvergne-Rhône-Alpes : 5 × 43 € + 13,76 € (Y4 + Y5) + ~85 € malus CO₂ ≈{' '}
          <strong>313 €</strong>.
        </li>
        <li>
          <strong>Même Clio TCe 91 en Île-de-France</strong> : 5 × 60 € + 5 × 4,50 € (IDFM) + 13,76
          € + ~85 € ≈ <strong>421 €</strong>.
        </li>
        <li>
          <strong>Clio E-Tech hybride 145 ch (5 CV, ~96 g CO₂/km, 1 250 kg)</strong> dans la plupart
          des régions : 5 × 60 € + 13,76 € (pas de malus CO₂ car &lt; 108 g/km, pas de malus poids
          car &lt; 1 500 kg) ≈ <strong>314 €</strong>.
        </li>
        <li>
          <strong>Clio dCi 90 diesel (5 CV, ~117 g CO₂/km, 1 150 kg)</strong> d’occasion en Bretagne
          : 5 × 60 € (coefficient diesel 1) + 13,76 € + ~120 € malus CO₂ avec décote d’ancienneté ≈{' '}
          <strong>334 à 433 €</strong>.
        </li>
      </ul>
      <p>
        L’écart entre la version la moins chère (essence 5 CV en ARA, ~313 €) et la version la plus
        taxée (diesel sportif en IDF) peut atteindre 250 €. Pour la grande majorité des acheteurs
        (TCe 91 ou E-Tech hybride), le coût réel se situe entre <strong>250 et 450 €</strong>.
      </p>

      <h2>Coefficients d’énergie applicables à la Clio</h2>
      <p>
        Renault commercialise la Clio dans plusieurs motorisations qui n’ont pas toutes le même
        traitement fiscal sur la taxe régionale Y1. Voici les coefficients à appliquer au tarif au
        cheval fiscal de votre région :
      </p>
      <ul>
        <li>
          <strong>Essence (TCe 65, 91, 101)</strong> : coefficient <code>1</code> partout en France
          (tarif plein). Aucune région n’applique de coefficient réduit aux moteurs essence
          classiques.
        </li>
        <li>
          <strong>Hybride E-Tech 145</strong> : coefficient <code>1</code> dans la plupart des
          régions, mais <code>0,5</code> (demi-tarif) en Bretagne, Hauts-de-France, Corse et
          certaines régions DOM. Cela peut faire passer la Y1 d’une Clio E-Tech immatriculée en
          Bretagne à 5 × 60 € × 0,5 = 150 € au lieu de 300 €.
        </li>
        <li>
          <strong>Bicarburation essence/GPL (TCe 100 GPL)</strong> : coefficient <code>0,5</code>{' '}
          dans presque toutes les régions, soit un avantage immédiat de 50 % sur Y1. Renault avait
          arrêté la commercialisation du GPL Clio en 2022, donc cela ne concerne plus que les
          occasions.
        </li>
        <li>
          <strong>Diesel (dCi 75, 90, 110)</strong> : coefficient <code>1</code> partout, sauf en
          Corse où la taxe Y1 reste basée sur le tarif local très bas (27 €/CV).
        </li>
      </ul>

      <h2>Le malus CO₂ et la Clio en 2026</h2>
      <p>Le seuil de déclenchement du malus CO₂ est fixé à 108 g/km en 2026. Pour la Clio :</p>
      <ul>
        <li>
          <strong>TCe 65</strong> (~117 g/km) : malus de ~85 € (palier 117 g)
        </li>
        <li>
          <strong>TCe 91</strong> (~125 g/km) : malus de ~250 €
        </li>
        <li>
          <strong>TCe 101</strong> (~130 g/km) : malus de ~330 €
        </li>
        <li>
          <strong>E-Tech 145 hybride</strong> (~96 g/km) : <strong>0 € de malus</strong> (sous le
          seuil)
        </li>
        <li>
          <strong>dCi 90 diesel</strong> (~117 g/km) : malus de ~85 €
        </li>
      </ul>
      <p>
        L’hybride E-Tech est donc clairement la version la mieux placée fiscalement pour une Clio
        neuve en 2026 : pas de malus CO₂, pas de malus poids (1 250 kg, sous le seuil de 1 500 kg)
        et coefficient Y1 préférentiel dans 4 régions. Sur la durée de vie, l’économie en carte
        grise et en taxes annuelles peut atteindre 600 à 800 € par rapport à une TCe 101 essence.
      </p>

      <h2>Carte grise Clio d’occasion : les pièges à éviter</h2>
      <p>
        La Clio est l’un des modèles les plus échangés sur le marché de l’occasion français (~250
        000 transactions par an). Trois points de vigilance pour le calcul du coût de carte grise :
      </p>
      <ul>
        <li>
          <strong>Vérifier la case P.6 de la carte grise</strong> (puissance fiscale en CV). Les
          Clio IV (2012-2019) avaient parfois des CV différents de la Clio V actuelle pour la même
          cylindrée (ex : ancienne 1.2 16V à 6 CV, nouvelle TCe 91 à 5 CV).
        </li>
        <li>
          <strong>Pas de malus CO₂ rétroactif</strong> sur les véhicules d’occasion immatriculés en
          France pour la première fois avant 2008 : aucune Y3 n’est due. Ne payez pas un site qui
          prétend l’ajouter.
        </li>
        <li>
          <strong>Décote du malus pour les imports UE</strong> : si vous importez une Clio IV ou V
          depuis un pays de l’UE, le malus CO₂ s’applique avec une décote de 10 % par année
          d’ancienneté du véhicule (plafonnée à 90 %). Une Clio IV de 10 ans paiera donc seulement
          10 % du malus normalement dû.
        </li>
      </ul>

      <h2>Démarches d’immatriculation en pratique</h2>
      <p>
        Pour immatriculer une Clio neuve, votre concessionnaire Renault s’occupe en général de toute
        la démarche. Vous payez le total carte grise en même temps que le véhicule, et
        l’immatriculation prend 24 à 72 heures. Pour une occasion entre particuliers, vous devez :
      </p>
      <ul>
        <li>Obtenir le certificat de cession (Cerfa 15776) signé par le vendeur</li>
        <li>Récupérer la carte grise barrée et signée</li>
        <li>Demander un certificat de non-gage de moins de 15 jours</li>
        <li>Faire un contrôle technique (si véhicule de plus de 4 ans)</li>
        <li>
          Déposer la demande sur{' '}
          <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
            immatriculation.ants.gouv.fr
          </a>{' '}
          dans les 30 jours
        </li>
      </ul>

      <p>
        Pour le calcul exact selon votre version de Clio et votre département, utilisez notre{' '}
        <Link href="/">calculateur en ligne</Link>. Si vous hésitez entre la TCe et l’E-Tech, notre{' '}
        <Link href="/guide/malus-co2-2026">guide du malus CO₂ 2026</Link> détaille l’avantage fiscal
        pour chaque palier d’émissions.
      </p>
    </>
  );
}

export default async function Page() {
  return <ModelPage content={CONTENT} extraContent={<ExtraContent />} />;
}
