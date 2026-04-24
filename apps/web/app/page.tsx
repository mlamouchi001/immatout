import { BadgeCheck, ScaleIcon, Sparkles } from 'lucide-react';

import { CalculatorApp } from '@/components/calculator/calculator-app';
import { JsonLd } from '@/components/seo/json-ld';
import { faqJsonLd, organizationJsonLd, webApplicationJsonLd } from '@/lib/seo';

const HOME_FAQ = [
  {
    question: 'Comment calculer le coût de sa carte grise en 2026 ?',
    answer:
      "Le coût d'une carte grise en France est la somme de six taxes : taxe régionale (Y1), taxe formation professionnelle pour les utilitaires (Y2), malus CO₂ (Y3), taxe fixe de gestion 11 € (Y4), redevance d'acheminement 2,76 € (Y5) et malus au poids (Y6). Immatout applique le barème exact de la Loi de Finances 2026 et vous donne le montant total en 30 secondes.",
  },
  {
    question: 'Quel est le tarif du cheval fiscal par région en 2026 ?',
    answer:
      'Le tarif varie de 43 €/CV (Auvergne-Rhône-Alpes) à 60 €/CV (plafond légal, appliqué par 11 régions). En Île-de-France une surcharge IDFM de 14 €/CV s’ajoute depuis mars 2026. Les véhicules électriques sont exonérés de cette taxe partout.',
  },
  {
    question: 'Les véhicules électriques paient-ils le malus en 2026 ?',
    answer:
      "Non. Les véhicules 100 % électriques et à hydrogène restent totalement exonérés des taxes Y1 (régionale), Y3 (malus CO₂) et Y6 (malus au poids) sur les années 2026, 2027 et 2028 suite au retrait de l'amendement d'octobre 2025. Seuls les 13,76 € de forfait (gestion + acheminement) restent dus.",
  },
  {
    question: 'Combien coûte la carte grise d’un véhicule importé d’Allemagne ?',
    answer:
      "Un véhicule d'occasion importé de l'UE bénéficie d'une décote sur le malus CO₂ et le malus au poids suivant une grille de 12 tranches mensuelles : 3 % d'abattement dès le 1ᵉʳ mois, jusqu'à une exonération totale à partir de 15 ans (181 mois). Un quitus fiscal délivré par le centre des impôts est exigé.",
  },
  {
    question: 'Le malus au poids s’applique-t-il à toutes les voitures ?',
    answer:
      "Le malus au poids (TMOM) s'applique aux véhicules particuliers neufs ou importés dont la masse en ordre de marche dépasse 1500 kg, depuis la Loi de Finances 2026. Des abattements réduisent la masse taxable : 100 kg pour les hybrides, 200 kg pour les PHEV, 200 kg par enfant à partir de 3 enfants, 500 kg pour les véhicules de 8 places et plus.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), webApplicationJsonLd(), faqJsonLd(HOME_FAQ)]} />
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
