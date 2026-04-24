import type { Metadata } from 'next';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/carte-grise-import-hors-ue';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Import voiture hors UE 2026 : droits de douane 10 %, TVA 20 %, attestation 846A, taxes carte grise, exemple Tesla US, Toyota japonaise.';

const FAQ = [
  {
    question: 'Quels sont les droits de douane en France pour une voiture hors UE ?',
    answer:
      'En principe 10 % du prix d’achat + frais de transport (taux douanier commun de l’UE). Certains accords de libre-échange (ex. UK après Brexit sous conditions d’origine) peuvent réduire ou supprimer ce taux.',
  },
  {
    question: 'Faut-il payer la TVA sur un véhicule importé hors UE ?',
    answer:
      'Oui, la TVA française à 20 % s’applique sur (prix d’achat + frais de transport + droits de douane). Elle est perçue par la douane lors du dédouanement.',
  },
  {
    question: 'Qu’est-ce que l’attestation 846A ?',
    answer:
      'L’attestation 846A (ancien Cerfa 13 566) est le document douanier qui prouve que le véhicule a été régulièrement dédouané et que la TVA a été payée. Elle est indispensable pour obtenir la carte grise française.',
  },
  {
    question: 'Le malus s’applique-t-il sur un véhicule hors UE ?',
    answer:
      'Oui, le malus CO₂ (Y3) et le malus au poids (Y6) s’appliquent de la même manière que pour les imports UE : plein tarif pour les neufs, décote mensuelle pour les occasions, jusqu’à exonération totale à 15 ans.',
  },
];

export const metadata: Metadata = {
  title: 'Carte grise import hors UE 2026 : douane, TVA, taxes',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Carte grise import hors UE', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Carte grise pour un véhicule importé hors UE"
      lede="Importer une voiture des États-Unis, du Japon, du Royaume-Uni ou de Suisse ajoute deux étapes par rapport à un import UE : le dédouanement (droits 10 % + TVA 20 %) et l’homologation technique. Voici la méthode complète et un exemple Tesla US chiffré."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Import hors UE', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Les deux étapes supplémentaires vs UE</h2>
      <ol>
        <li>
          <strong>Dédouanement</strong> au bureau de douane d’entrée : droits de douane (10 %) + TVA
          (20 %). Le véhicule reçoit une <strong>attestation 846A</strong>.
        </li>
        <li>
          <strong>Réception à titre isolé (RTI)</strong> auprès de la DREAL, si le véhicule n’a pas
          de certificat de conformité européen (COC). Cela peut impliquer des essais et des
          modifications (phares, clignotants orange, compteur en km).
        </li>
      </ol>

      <h2>Coûts cumulés : exemple Tesla Model 3 US</h2>
      <p>
        Achat 45 000 $ (≈ 41 000 €) aux États-Unis, transport maritime 2 500 €, entrée à Rotterdam
        puis transit France. 11 CV fiscaux (calcul CV électrique simplifié), 0 g/km CO₂, 1 835 kg.
      </p>
      <table>
        <thead>
          <tr>
            <th>Ligne</th>
            <th>Base</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prix d’achat</td>
            <td>—</td>
            <td>41 000 €</td>
          </tr>
          <tr>
            <td>Transport maritime</td>
            <td>—</td>
            <td>2 500 €</td>
          </tr>
          <tr>
            <td>Droits de douane</td>
            <td>10 % (41 000 + 2 500)</td>
            <td>4 350 €</td>
          </tr>
          <tr>
            <td>TVA</td>
            <td>20 % (41 000 + 2 500 + 4 350)</td>
            <td>9 570 €</td>
          </tr>
          <tr>
            <td>Homologation DREAL + RTI</td>
            <td>estimation</td>
            <td>1 500 €</td>
          </tr>
          <tr>
            <td>Carte grise (EV exonéré)</td>
            <td>Y4 + Y5</td>
            <td>13,76 €</td>
          </tr>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td></td>
            <td>
              <strong>58 933 €</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Une Tesla Model 3 neuve en concession France coûte environ 45 000 € TTC. L’import US n’est
        donc rentable que pour des versions non-distribuées en Europe (Performance plus puissante,
        éditions Plaid, etc.).
      </p>

      <h2>Documents à rassembler</h2>
      <ul>
        <li>Carte grise ou titre de propriété étranger.</li>
        <li>Facture d’achat et titre de transport.</li>
        <li>Attestation 846A (dédouanement) + quittance de paiement des droits et TVA.</li>
        <li>
          Certificat de conformité européen <strong>OU</strong> attestation de RTI délivrée par la
          DREAL.
        </li>
        <li>Contrôle technique français de moins de 6 mois (si véhicule &gt; 4 ans).</li>
        <li>Formulaire Cerfa 13750, pièce d’identité, justificatif de domicile.</li>
      </ul>

      <h2>Régimes spéciaux</h2>
      <h3>Brexit et Royaume-Uni</h3>
      <p>
        Le Royaume-Uni est hors UE depuis 2021. Droits de douane en principe 0 % sous accord
        d’origine UE-UK (si le véhicule est fabriqué au Royaume-Uni avec suffisamment de contenu
        local), mais TVA 20 % et attestation 846A restent dues.
      </p>
      <h3>Véhicule de collection</h3>
      <p>
        Un véhicule classé « collection » (&gt; 30 ans, non modifié) peut bénéficier d’une TVA
        réduite à 5,5 % (code douanier 9705) et certaines régions appliquent un tarif Y1 forfaitaire
        spécifique.
      </p>
      <h3>Véhicule rapporté par un particulier après déménagement</h3>
      <p>
        Les biens transférés lors d’un déménagement définitif vers la France depuis un pays tiers
        peuvent être exonérés de droits de douane et TVA (régime « transfert de résidence », art. 3
        à 11 du règlement 1186/2009), sous conditions de détention préalable ≥ 6 mois.
      </p>

      <RelatedGuides
        links={[
          {
            href: '/guide/carte-grise-import-ue',
            label: 'Import UE',
            desc: 'Cas plus simple, sans douane',
          },
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul complet',
            desc: 'Les 6 taxes expliquées',
          },
          {
            href: '/guide/documents-carte-grise',
            label: 'Documents',
            desc: 'Cerfa 13750 et compagnie',
          },
          {
            href: '/referentiels/decote',
            label: 'Décote import',
            desc: 'Grille 20 tiers',
          },
        ]}
      />
    </GuidePage>
  );
}
