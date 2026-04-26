import Link from 'next/link';

import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'tesla-model-y',
  make: 'TESLA',
  model: 'MODEL Y',
  niceName: 'Tesla Model Y',
  intro:
    'Véhicule 100 % électrique le plus vendu au monde depuis 2023, la Tesla Model Y bénéficie en France d’une exonération totale de la taxe régionale, du malus CO₂ et du malus au poids. Sa carte grise coûte donc 13,76 € partout sur le territoire, quelle que soit la version (Long Range, Performance).',
  isEv: true,
};

export const metadata = makeModelMetadata(CONTENT);

function ExtraContent() {
  return (
    <>
      <h2>Pourquoi la Tesla Model Y coûte 13,76 € en carte grise</h2>
      <p>
        En France, le coût total d’un certificat d’immatriculation se décompose en six taxes (Y1 à
        Y6). Pour un véhicule 100 % électrique comme la Tesla Model Y, quatre d’entre elles tombent
        à zéro grâce aux dispositifs prévus par la Loi de Finances 2026 :
      </p>
      <ul>
        <li>
          <strong>Y1 — taxe régionale sur les chevaux fiscaux</strong> : exonérée. Les 18 régions
          françaises appliquent un coefficient énergie de <code>0</code> aux véhicules électriques,
          indépendamment du tarif au cheval fiscal (43 €/CV en Auvergne-Rhône-Alpes, 60 €/CV
          ailleurs, 54,95 € + 14 € IDFM en Île-de-France).
        </li>
        <li>
          <strong>Y2 — taxe formation professionnelle</strong> : 0 € pour les véhicules
          particuliers. Cette taxe ne concerne que les véhicules utilitaires (camionnettes type N1).
        </li>
        <li>
          <strong>Y3 — malus CO₂</strong> : exonéré. La Tesla Model Y étant électrique, ses
          émissions WLTP officielles sont de 0 g/km. Aucune entrée sur la grille CO₂ 2026 dont le
          seuil de déclenchement est fixé à 108 g/km.
        </li>
        <li>
          <strong>Y4 — taxe de gestion</strong> : 11 € (forfait national identique pour tous les
          véhicules).
        </li>
        <li>
          <strong>Y5 — redevance d’acheminement</strong> : 2,76 € (envoi du certificat par courrier
          sécurisé).
        </li>
        <li>
          <strong>Y6 — malus au poids (TMOM)</strong> : exonéré. La Loi de Finances 2026 prévoit
          explicitement une exonération totale de la TMOM pour les véhicules 100 % électriques
          jusqu’en 2028, alors même que la Model Y dépasse largement le seuil de 1 500 kg (~1 920 kg
          en version Long Range, ~2 000 kg en Performance).
        </li>
      </ul>
      <p>
        Le total s’établit donc à <strong>11 € + 2,76 € = 13,76 €</strong>. Cette somme est
        identique quel que soit le département de résidence, la version (Long Range Propulsion, Long
        Range All-Wheel Drive, Performance) ou l’année du véhicule.
      </p>

      <h2>Comparaison avec un équivalent thermique</h2>
      <p>
        Pour mesurer l’économie permise par l’exonération EV, comparons la Model Y à un SUV
        thermique équivalent en taille et en puissance, par exemple un BMW X3 30d (3 litres diesel,
        286 ch, ~10 CV fiscaux, ~155 g CO₂/km, ~1 950 kg) immatriculé en Île-de-France :
      </p>
      <ul>
        <li>
          Y1 : 10 × 60 € = <strong>600 €</strong> (tarif IDFM hors surcharge)
        </li>
        <li>
          Surcharge IDFM : 10 × 4,50 € = <strong>45 €</strong>
        </li>
        <li>
          Y3 (malus CO₂ 155 g/km) : ~<strong>1 386 €</strong> selon la grille 2026
        </li>
        <li>
          Y6 (malus poids, 450 kg au-delà de 1 500 kg × 10 €) : <strong>4 500 €</strong>
        </li>
        <li>Y4 + Y5 : 13,76 €</li>
        <li>
          <strong>Total : ~6 545 €</strong>
        </li>
      </ul>
      <p>
        Pour la Tesla Model Y, on reste donc à 13,76 €, soit une économie de plus de 6 500 € sur la
        seule carte grise. Cet écart explique une partie de l’avantage fiscal des électriques en
        France et compense partiellement le surcoût d’achat à la concession (~50 000 € pour une
        Model Y Long Range vs ~75 000 € pour un X3 30d M Sport).
      </p>

      <h2>Cas particuliers et points de vigilance</h2>
      <h3>Importation depuis un autre pays de l’UE</h3>
      <p>
        Si vous importez une Model Y achetée en Allemagne, aux Pays-Bas ou ailleurs en Europe,
        l’exonération s’applique de la même manière. Les démarches supplémentaires sont :
      </p>
      <ul>
        <li>
          Quitus fiscal (formulaire CERFA n°1993 délivré par le service des impôts des entreprises)
        </li>
        <li>Certificat de conformité européen (COC), fourni par Tesla sur simple demande</li>
        <li>Contrôle technique français si le véhicule a plus de 4 ans</li>
      </ul>
      <p>
        Aucun malus écologique d’importation n’est dû puisque le véhicule est électrique. Pour un
        véhicule thermique d’importation, la loi prévoit une décote de 10 % par année d’ancienneté
        (max 90 %), mais ce mécanisme ne concerne pas la Model Y.
      </p>

      <h3>Versions Performance vs Long Range</h3>
      <p>
        Les deux versions principales (Long Range All-Wheel Drive et Performance) sont
        rigoureusement identiques au regard de la carte grise : 13,76 € chacune. Seule la puissance
        réelle, l’autonomie et le 0-100 km/h diffèrent. La case P.6 de votre certificat
        d’immatriculation indiquera 7 CV pour la Long Range et 9 CV pour la Performance, mais cela
        n’a aucun impact financier puisque le coefficient énergie reste à 0.
      </p>

      <h3>Carte grise pour une Tesla d’occasion</h3>
      <p>
        En cas de revente, le coût reste de 13,76 € pour le nouveau propriétaire,{' '}
        <em>quelle que soit l’année</em> du véhicule. Les Model Y de 2020 (production Shanghai
        importée), 2021 et 2022 bénéficient toutes du même barème EV. Vous aurez besoin du
        certificat de cession (Cerfa 15776), de la carte grise barrée par l’ancien propriétaire,
        d’un certificat de non-gage de moins de 15 jours et d’un contrôle technique récent (sauf si
        le véhicule a moins de 4 ans).
      </p>

      <h2>Quand le prix peut changer après 2028</h2>
      <p>
        L’exonération de la TMOM (malus au poids) pour les véhicules électriques est actuellement
        garantie par la Loi de Finances jusqu’à 2028. À cette échéance, le législateur pourrait
        décider de la prolonger, de l’aménager (par exemple en n’exonérant que les EV de moins de 2
        tonnes) ou de la supprimer pour aligner les EV lourds sur les thermiques. La Model Y
        dépassant 1 900 kg, elle serait alors potentiellement concernée si l’exonération disparaît
        sans aménagement. Pour l’instant, immatriculer une Tesla Model Y reste donc l’une des
        opérations administratives les moins chères du marché automobile français — moins cher,
        proportionnellement, qu’une simple Renault Clio thermique en région parisienne.
      </p>

      <p>
        Pour une simulation chiffrée selon votre situation réelle (occasion, importation, version
        spécifique), utilisez notre <Link href="/">calculateur en ligne</Link>. Pour comprendre en
        détail les exonérations fiscales des véhicules électriques en France, consultez notre{' '}
        <Link href="/guide/carte-grise-vehicule-electrique">
          guide dédié aux véhicules électriques
        </Link>
        .
      </p>
    </>
  );
}

export default async function Page() {
  return <ModelPage content={CONTENT} extraContent={<ExtraContent />} />;
}
