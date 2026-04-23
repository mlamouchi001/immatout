import { BadgeCheck, ScaleIcon, Sparkles } from 'lucide-react';

import { CalculatorApp } from '@/components/calculator/calculator-app';

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow mb-4 justify-center">
              <span className="h-px w-6 bg-border" aria-hidden />
              Carte grise · France 2026
              <span className="h-px w-6 bg-border" aria-hidden />
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Calcul officiel du coût de votre{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                carte grise
              </span>
            </h1>
            <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
              Estimez précisément les 6 taxes (régionale, malus CO₂, malus poids, formation,
              gestion, acheminement) conformément à la Loi de Finances 2026 — pour un véhicule
              français, importé UE ou hors UE, neuf ou d&apos;occasion.
            </p>

            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <TrustItem icon={<BadgeCheck className="h-3.5 w-3.5" />}>
                Barèmes CIBS L.421-29 à L.421-92
              </TrustItem>
              <TrustItem icon={<ScaleIcon className="h-3.5 w-3.5" />}>
                18 régions couvertes
              </TrustItem>
              <TrustItem icon={<Sparkles className="h-3.5 w-3.5" />}>
                Données ADEME Car Labelling
              </TrustItem>
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-10 sm:py-14">
        <CalculatorApp />
      </section>
    </>
  );
}

function TrustItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <span className="text-accent" aria-hidden>
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}
