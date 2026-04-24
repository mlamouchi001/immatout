import { makeModelMetadata, ModelPage, type ModelContent } from '@/components/seo/model-page';

export const dynamic = 'force-dynamic';

const CONTENT: ModelContent = {
  slug: 'renault-captur',
  make: 'RENAULT',
  model: 'CAPTUR',
  niceName: 'Renault Captur',
  intro:
    'Le Renault Captur est le SUV compact le plus vendu en France depuis 2020. Disponible en essence TCe, hybride E-Tech 145 (145 ch) et hybride rechargeable E-Tech plug-in, il se situe généralement entre 5 et 7 CV fiscaux. La version hybride rechargeable bénéficie d’un abattement de 200 kg sur le malus au poids.',
};

export const metadata = makeModelMetadata(CONTENT);

export default async function Page() {
  return <ModelPage content={CONTENT} />;
}
