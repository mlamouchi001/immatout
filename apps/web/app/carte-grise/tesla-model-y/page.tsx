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

export default async function Page() {
  return <ModelPage content={CONTENT} />;
}
