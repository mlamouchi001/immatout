import type { Metadata } from 'next';

import { CompareApp } from '@/components/calculator/compare-app';
import { PageHeader } from '@/components/page-header';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Comparateur 18 régions',
  description:
    "Estimez le coût de la carte grise d'un même véhicule dans les 18 régions françaises, utile avant un déménagement.",
};

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Outil d'aide à la décision"
        title={t('compare.title')}
        description="Estimez le coût total pour un même véhicule dans chacune des 18 régions. Utile avant un déménagement."
      />
      <section className="container py-10 sm:py-12">
        <CompareApp />
      </section>
    </>
  );
}
