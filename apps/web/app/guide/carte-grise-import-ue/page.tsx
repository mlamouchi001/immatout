import type { Metadata } from 'next';
import Link from 'next/link';

import { GuidePage } from '@/components/seo/guide-page';
import { RelatedGuides } from '@/components/seo/related-guides';

const PATH = '/guide/carte-grise-import-ue';
const PUBLISHED = '2026-04-01';
const UPDATED = '2026-04-24';
const DESCRIPTION =
  'Carte grise import UE 2026 : quitus fiscal, décote 12 tiers sur Y3/Y6, prix d’une BMW, Audi ou VW d’Allemagne ou des Pays-Bas, démarches complètes.';

const FAQ = [
  {
    question: 'Quels documents faut-il pour immatriculer une voiture achetée en Allemagne ?',
    answer:
      'Il faut la carte grise allemande (Zulassungsbescheinigung Teil I et II), le certificat de conformité européen (COC), la facture d’achat, le quitus fiscal délivré par le centre des impôts français, le formulaire Cerfa 13750, un justificatif de domicile et votre pièce d’identité.',
  },
  {
    question: 'Qu’est-ce que le quitus fiscal ?',
    answer:
      'Le quitus fiscal (ou certificat fiscal, Cerfa n°1993-VT) prouve que la TVA a été réglée (ou n’est pas due) pour un véhicule provenant d’un autre pays de l’UE. Il est délivré gratuitement par le service des impôts du domicile du propriétaire, souvent sous 48 h.',
  },
  {
    question: 'Y a-t-il un malus à payer sur un véhicule d’occasion importé d’UE ?',
    answer:
      'Oui. Contrairement aux occasions françaises, un véhicule d’occasion importé paie le malus CO₂ (Y3) et le malus au poids (Y6), mais avec une décote progressive fonction de son âge : 3 % dès le 1er mois, jusqu’à 100 % (exonération totale) à partir de 15 ans.',
  },
  {
    question: 'Une Tesla Model 3 importée de Belgique est-elle exonérée ?',
    answer:
      'Oui, le régime EV s’applique quel que soit le pays d’importation au sein de l’UE. Une Tesla Model 3 importée d’Allemagne, de Belgique, d’Espagne ou d’ailleurs en UE coûte 13,76 € à immatriculer en France.',
  },
];

export const metadata: Metadata = {
  title: 'Carte grise import UE 2026 : quitus, décote, prix exact',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: 'Carte grise import UE', description: DESCRIPTION },
};

export default function Page() {
  return (
    <GuidePage
      title="Carte grise pour un véhicule importé de l’UE"
      lede="Importer une voiture d’Allemagne, des Pays-Bas, d’Espagne ou d’Italie est courant — les occasions premium y coûtent souvent 20 % de moins qu’en France. Voici les démarches, le quitus fiscal et le barème précis de la décote qui s’applique au malus."
      path={PATH}
      datePublished={PUBLISHED}
      dateModified={UPDATED}
      breadcrumbs={[
        { name: 'Guides', path: '/guide/calcul-carte-grise-2026' },
        { name: 'Import UE', path: PATH },
      ]}
      description={DESCRIPTION}
      faq={FAQ}
    >
      <h2>Étape 1 · Obtenir le quitus fiscal</h2>
      <p>
        Avant toute immatriculation, il faut un <strong>quitus fiscal</strong> (Cerfa 1993-VT)
        délivré par le service des impôts dont dépend votre domicile. Il certifie que la TVA est
        soit payée dans le pays d’origine (pour une occasion &gt; 6 mois et &gt; 6 000 km), soit
        redevable en France. La demande est gratuite, les documents à fournir :
      </p>
      <ul>
        <li>La carte grise étrangère (original et/ou copie).</li>
        <li>La facture d’achat ou l’acte de vente.</li>
        <li>Votre pièce d’identité et un justificatif de domicile de moins de 6 mois.</li>
        <li>Le COC (certificat de conformité) européen si disponible.</li>
      </ul>
      <p>Délai de délivrance : 24 à 72 h dans la plupart des services des impôts.</p>

      <h2>Étape 2 · Calcul des 6 taxes</h2>
      <p>
        Pour un <strong>véhicule neuf importé</strong> (moins de 6 mois et moins de 6 000 km), les
        taxes sont calculées au barème 2026 plein tarif, comme pour un neuf français — à savoir :
      </p>
      <ul>
        <li>Y1 = CV × tarif régional × coef énergie (+ IDFM)</li>
        <li>Y3 au plein barème 2026 (basé sur le CO₂ WLTP du véhicule)</li>
        <li>Y6 au plein barème 2026 (basé sur la masse en ordre de marche)</li>
      </ul>
      <p>
        Pour un <strong>véhicule d’occasion importé</strong>, Y3 et Y6 sont calculés différemment :
      </p>
      <ol>
        <li>On utilise le barème de l’année de première mise en circulation à l’étranger.</li>
        <li>
          Un coefficient de décote est appliqué en fonction de l’âge (voir tableau ci-dessous).
        </li>
      </ol>

      <h2>La décote 12 tiers (Y3 + Y6)</h2>
      <p>
        La grille officielle, codifiée au CIBS et publiée au{' '}
        <a
          href="https://www.service-public.gouv.fr/particuliers/vosdroits/F35950"
          target="_blank"
          rel="noopener noreferrer"
        >
          F35950
        </a>{' '}
        de service-public.gouv.fr :
      </p>
      <table>
        <thead>
          <tr>
            <th>Âge du véhicule</th>
            <th>Coefficient de décote</th>
            <th>Part restante du malus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 - 3 mois</td>
            <td>3 %</td>
            <td>97 %</td>
          </tr>
          <tr>
            <td>4 - 6 mois</td>
            <td>6 %</td>
            <td>94 %</td>
          </tr>
          <tr>
            <td>7 - 9 mois</td>
            <td>9 %</td>
            <td>91 %</td>
          </tr>
          <tr>
            <td>10 - 12 mois</td>
            <td>12 %</td>
            <td>88 %</td>
          </tr>
          <tr>
            <td>1 an - 18 mois</td>
            <td>16 %</td>
            <td>84 %</td>
          </tr>
          <tr>
            <td>19 - 24 mois</td>
            <td>20 %</td>
            <td>80 %</td>
          </tr>
          <tr>
            <td>2 - 3 ans</td>
            <td>28 %</td>
            <td>72 %</td>
          </tr>
          <tr>
            <td>3 - 4 ans</td>
            <td>33 %</td>
            <td>67 %</td>
          </tr>
          <tr>
            <td>5 - 10 ans</td>
            <td>43 - 64 %</td>
            <td>de 57 % à 36 %</td>
          </tr>
          <tr>
            <td>10 - 15 ans</td>
            <td>70 - 94 %</td>
            <td>de 30 % à 6 %</td>
          </tr>
          <tr>
            <td>
              <strong>15 ans et +</strong>
            </td>
            <td>
              <strong>100 %</strong>
            </td>
            <td>
              <strong>Exonération totale</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Grille complète au mois près sur{' '}
        <Link href="/referentiels/decote">Référentiels · Décote</Link>.
      </p>

      <h2>Exemple chiffré : BMW Série 3 320i de 2019</h2>
      <p>
        Véhicule acheté en Allemagne, 9 CV essence, 160 g/km CO₂, 1 700 kg, importé en France en
        avril 2026 (âge 7 ans, 84 mois). Région : Île-de-France.
      </p>
      <ul>
        <li>Y1 = 9 × 54,95 € + 9 × 14 € (IDFM) = 620,55 €</li>
        <li>Y3 : barème 2019 à 160 g/km = 8 750 € × (1 − 0,48) [coef 7 ans] = 4 550 €</li>
        <li>Y6 : (1 700 − 1 500) × 10 € = 2 000 € × (1 − 0,48) = 1 040 €</li>
        <li>Y4 + Y5 = 13,76 €</li>
        <li>
          <strong>Total : 6 224,31 €</strong>
        </li>
      </ul>
      <p>
        Le même véhicule acheté neuf en France en 2026 aurait coûté : 620,55 + 15 172 (barème 2026 à
        170 g/km, plus sévère) + 2 000 + 13,76 = <strong>17 806 €</strong>. L’import d’occasion
        permet donc d’économiser environ 11 500 € sur la carte grise — et généralement plusieurs
        milliers d’euros sur le prix du véhicule lui-même.
      </p>

      <h2>Délais et pénalités</h2>
      <p>
        L’immatriculation doit être demandée dans les <strong>30 jours</strong> qui suivent l’entrée
        du véhicule en France. Passé ce délai, l’administration peut exiger des pénalités de retard.
        La demande se fait exclusivement en ligne sur{' '}
        <a href="https://immatriculation.ants.gouv.fr/" target="_blank" rel="noopener noreferrer">
          immatriculation.ants.gouv.fr
        </a>
        .
      </p>

      <RelatedGuides
        links={[
          {
            href: '/guide/calcul-carte-grise-2026',
            label: 'Calcul complet',
            desc: 'Les 6 taxes expliquées',
          },
          {
            href: '/guide/carte-grise-import-hors-ue',
            label: 'Import hors UE',
            desc: 'Douane, TVA, droits 10 %',
          },
          {
            href: '/guide/documents-carte-grise',
            label: 'Documents nécessaires',
            desc: 'Cerfa 13750, quitus, COC',
          },
          {
            href: '/referentiels/decote',
            label: 'Grille décote',
            desc: '20 tiers mensuels',
          },
        ]}
      />
    </GuidePage>
  );
}
