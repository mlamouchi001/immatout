import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'citroen-c3',
  make: 'CITROEN',
  model: 'C3',
  niceName: 'Citroën C3',
  intro:
    'La Citroën C3 est une citadine polyvalente disponible en essence, diesel et depuis 2023 en version 100 % électrique ë-C3, vendue à partir de 23 300 €. L’ë-C3 bénéficie de l’exonération totale (carte grise 13,76 €), tandis que la C3 PureTech 4-5 CV oscille entre 200 € et 400 € selon la région.',
};

export const metadata = makeModelMetadata(CONTENT);

export default async function Page() {
  return <ModelPage content={CONTENT} />;
}
