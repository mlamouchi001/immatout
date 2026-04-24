import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'occitanie',
  regionCode: 'OCC',
  niceName: 'Occitanie',
  departments:
    'Ariège (09), Aude (11), Aveyron (12), Gard (30), Haute-Garonne (31), Gers (32), Hérault (34), Lot (46), Lozère (48), Hautes-Pyrénées (65), Pyrénées-Orientales (66), Tarn (81), Tarn-et-Garonne (82)',
  intro:
    'L’Occitanie applique le plafond de 60 €/CV. La région englobe les 13 départements du sud (Toulouse, Montpellier, Perpignan, Nîmes, Rodez…). Aucune surcharge additionnelle, un simple cheval fiscal à 60 €.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
