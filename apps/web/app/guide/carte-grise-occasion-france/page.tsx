import type { Metadata } from 'next';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/carte-grise-occasion-france';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Changement de carte grise pour une voiture d’occasion française 2026 : seule Y1 est due, décote 50 % après 10 ans, démarche en ligne ANTS en 15 minutes.';

const FAQ = [
  {
    question: 'Pourquoi une occasion française coûte-t-elle moins cher qu’un import ?',
    answer:
      'Parce que le malus CO₂ (Y3) et le malus au poids (Y6) ont déjà été acquittés lors de la première immatriculation du véhicule. Lors du changement de propriétaire, seule la taxe régionale (Y1) et les forfaits (Y4, Y5) sont dus.',
  },
  {
    question: 'Quelle est la décote après 10 ans ?',
    answer:
      'Une réduction de 50 % sur la taxe régionale Y1 (article L.421-48 du CIBS). Elle s’applique dès que l’écart entre la 1ʳᵉ immatriculation et la nouvelle dépasse 10 ans. Cela peut transformer une carte grise à 300 € en carte grise à 150 €.',
  },
  {
    question: 'Quels sont les documents requis ?',
    answer:
      'Certificat de cession (Cerfa 15776), ancienne carte grise barrée avec la mention « Vendu le » signée, certificat de situation administrative (non-gage) de moins de 15 jours, contrôle technique de moins de 6 mois (si véhicule &gt; 4 ans), pièce d’identité, justificatif de domicile.',
  },
  {
    question: 'Combien de temps ai-je pour faire la carte grise après achat ?',
    answer:
      'Vous disposez de 30 jours après la date du certificat de cession pour demander la nouvelle carte grise, via le portail officiel immatriculation.ants.gouv.fr. Au-delà, une amende de 135 € peut être appliquée.',
  },
];

export const metadata: Metadata = {
  title: 'Carte grise occasion France 2026 : prix, décote 10 ans, démarches',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Carte grise occasion France 2026', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Changement de carte grise pour une occasion française"
      lede="Acheter d’occasion en France est le cas le plus avantageux : le malus CO₂ et le malus au poids ne sont pas ré-appliqués, seule la taxe régionale reste due. Voici les règles, la décote 10 ans et les démarches en ligne."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Occasion France', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Quelles taxes sur une occasion française ?</h2>
      <table>
        <thead>
          <tr>
            <th>Taxe</th>
            <th>Applicable ?</th>
            <th>Montant typique</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Y1 — Taxe régionale</td>
            <td>Oui</td>
            <td>43 € à 60 € × CV fiscaux (+ IDFM)</td>
          </tr>
          <tr>
            <td>Y2 — Formation pro</td>
            <td>Non (VP)</td>
            <td>0 €</td>
          </tr>
          <tr>
            <td>
              <strong>Y3 — Malus CO₂</strong>
            </td>
            <td>
              <strong>Non</strong>
            </td>
            <td>0 € (déjà payé)</td>
          </tr>
          <tr>
            <td>Y4 — Gestion</td>
            <td>Oui</td>
            <td>11 €</td>
          </tr>
          <tr>
            <td>Y5 — Acheminement</td>
            <td>Oui</td>
            <td>2,76 €</td>
          </tr>
          <tr>
            <td>
              <strong>Y6 — Malus poids</strong>
            </td>
            <td>
              <strong>Non</strong>
            </td>
            <td>0 € (déjà payé)</td>
          </tr>
        </tbody>
      </table>
      <p>
        L’absence de Y3 et Y6 fait une différence énorme : une BMW X5 essence neuve coûte 50 000 €
        de carte grise, la même BMW X5 essence d’occasion française coûte 600 €.
      </p>

      <h2>Exemples chiffrés</h2>

      <h3>Clio 5 CV essence de 2020, Île-de-France</h3>
      <p>Âge : 6 ans (pas de décote 10 ans).</p>
      <ul>
        <li>Y1 = 5 × (54,95 + 14) = 344,75 €</li>
        <li>Y3 + Y6 = 0</li>
        <li>Y4 + Y5 = 13,76 €</li>
        <li>
          <strong>Total : 358,51 €</strong>
        </li>
      </ul>

      <h3>Peugeot 508 diesel 8 CV de 2014, Île-de-France</h3>
      <p>Âge : 12 ans (&gt; 10 ans → décote Y1 de 50 %).</p>
      <ul>
        <li>Y1 = 8 × (54,95 + 14) × 0,5 = 275,80 €</li>
        <li>Y3 + Y6 = 0</li>
        <li>Y4 + Y5 = 13,76 €</li>
        <li>
          <strong>Total : 289,56 €</strong>
        </li>
      </ul>

      <h3>Tesla Model S de 2019, Paris</h3>
      <p>11 CV, 100 % électrique — exonération totale.</p>
      <ul>
        <li>Y1 = 0 €, Y3 = 0 €, Y6 = 0 €</li>
        <li>
          <strong>Total : 13,76 €</strong>
        </li>
      </ul>

      <h2>Démarche en ligne en 6 étapes</h2>
      <ol>
        <li>
          Se connecter à{' '}
          <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
            immatriculation.ants.gouv.fr
          </a>{' '}
          avec FranceConnect.
        </li>
        <li>Sélectionner « Faire une demande » → « Changement de titulaire ».</li>
        <li>Saisir le numéro de formule de l’ancienne carte grise (en bas à droite).</li>
        <li>
          Renseigner les coordonnées et téléverser les pièces (Cerfa 15776, non-gage, CT, pièce
          d’identité, justificatif de domicile).
        </li>
        <li>Payer la taxe (carte bancaire sécurisée).</li>
        <li>
          Recevoir sous 7 jours le certificat provisoire d’immatriculation (CPI) par mail, puis la
          carte grise définitive par courrier recommandé.
        </li>
      </ol>

      <h2>Les pièges classiques</h2>
      <ul>
        <li>
          <strong>Non-gage périmé</strong> (&gt; 15 jours) : à refaire avant démarche.
        </li>
        <li>
          <strong>Contrôle technique absent</strong> si véhicule &gt; 4 ans : demande refusée.
        </li>
        <li>
          <strong>Ancienne carte grise non signée</strong> avec la mention « Vendu le » : le vendeur
          doit la barrer et inscrire date + heure + signature.
        </li>
        <li>
          <strong>Délai dépassé</strong> (&gt; 30 jours) : 135 € d’amende.
        </li>
        <li>
          <strong>Vérifier les points à la connexion</strong> : si le vendeur déclare plus de points
          retirés que la réalité, vous pouvez vous retrouver avec un solde amputé à la délivrance de
          votre titre.
        </li>
      </ul>

      <RelatedGuides
        links={[
          {
            href: '/guide/documents-carte-grise',
            label: 'Documents carte grise',
            desc: 'Cerfa 13750, 15776, non-gage',
          },
          {
            href: '/guide/taxe-regionale-cheval-fiscal',
            label: 'Taxe régionale',
            desc: 'Tarifs par région',
          },
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul complet',
            desc: 'Les 6 taxes',
          },
          {
            href: '/guide/cheval-fiscal-explication',
            label: 'Cheval fiscal',
            desc: 'Comprendre le CV',
          },
        ]}
      />
    </GuidePage>
  );
}
