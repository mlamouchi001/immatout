import { makeRegionMetadata, RegionPage, type RegionContent } from '@/components/seo/region-page';

const CONTENT: RegionContent = {
  slug: 'grand-est',
  regionCode: 'GES',
  niceName: 'Grand Est',
  departments:
    'Ardennes (08), Aube (10), Marne (51), Haute-Marne (52), Meurthe-et-Moselle (54), Meuse (55), Moselle (57), Bas-Rhin (67), Haut-Rhin (68), Vosges (88)',
  intro:
    'Le Grand Est (Strasbourg, Metz, Reims, Nancy, Troyes…) applique le plafond 60 €/CV en 2026. Région frontalière avec l’Allemagne, le Luxembourg et la Belgique, elle voit de nombreux imports d’occasion UE, pour lesquels la décote 12 tiers s’applique.',
};

export const metadata = makeRegionMetadata(CONTENT);

export default function Page() {
  return <RegionPage content={CONTENT} />;
}
