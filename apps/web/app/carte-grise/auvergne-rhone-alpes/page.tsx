import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'auvergne-rhone-alpes',
  regionCode: 'ARA',
  niceName: 'Auvergne-Rhône-Alpes',
  departments:
    'Ain (01), Allier (03), Ardèche (07), Cantal (15), Drôme (26), Isère (38), Loire (42), Haute-Loire (43), Puy-de-Dôme (63), Rhône (69), Savoie (73), Haute-Savoie (74)',
  intro:
    'Auvergne-Rhône-Alpes est la région la moins chère de France pour la carte grise en 2026, avec un cheval fiscal à 43 €/CV. Pour une citadine 5 CV, cela fait une économie de près de 170 € par rapport à un plafond de 60 €/CV.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
