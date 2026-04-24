import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'dacia-sandero',
  make: 'DACIA',
  model: 'SANDERO',
  niceName: 'Dacia Sandero',
  intro:
    'La Dacia Sandero est la voiture neuve la moins chère du marché français, ce qui se traduit aussi par une carte grise parmi les plus abordables. Versions essence TCe 90 (4-5 CV, ~120 g/km CO₂) et bi-carburation GPL (coefficient 0,5 dans plusieurs régions).',
};

export const metadata = makeModelMetadata(CONTENT);

export default async function Page() {
  return <ModelPage content={CONTENT} />;
}
