import { CalculatorApp } from '@/components/calculator/calculator-app';
import { t } from '@/lib/i18n';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          Carte grise · France 2026
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('app.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('app.tagline')}</p>
      </header>
      <CalculatorApp />
    </main>
  );
}
