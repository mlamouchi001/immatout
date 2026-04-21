import type { Metadata } from 'next';

import { CompareApp } from '@/components/calculator/compare-app';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Comparateur 18 régions',
  description:
    "Estimez le coût de la carte grise d'un même véhicule dans les 18 régions françaises, utile avant un déménagement.",
};

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          Outil d&apos;aide à la décision
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('compare.title')}</h1>
        <p className="text-lg text-muted-foreground">
          Estimez le coût total pour un même véhicule dans chacune des 18 régions. Utile avant un
          déménagement.
        </p>
      </header>
      <CompareApp />
    </main>
  );
}
