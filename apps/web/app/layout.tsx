import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

import { PlausibleAnalytics } from '@/components/plausible-analytics';
import { SiteHeader } from '@/components/site-header';
import { TooltipProvider } from '@/components/ui/tooltip';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Immatout — Calcul officiel du coût de la carte grise (France 2026)',
    template: '%s · Immatout',
  },
  description:
    "Calcul exact du coût d'immatriculation d'un véhicule en France : taxe régionale, malus CO₂, malus au poids, formation, gestion, acheminement. Sources : CIBS L.421-29 à L.421-92, Loi de Finances 2026.",
  keywords: [
    'carte grise',
    'certificat immatriculation',
    'calcul carte grise 2026',
    'malus CO2',
    'malus poids',
    'TMOM',
    'taxe régionale',
    'CIBS',
    'Loi de Finances 2026',
    'simulateur carte grise',
  ],
  authors: [{ name: 'Immatout' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Immatout',
    title: 'Immatout — Calcul officiel du coût de la carte grise',
    description:
      'Calcul indicatif du coût de la carte grise en France selon la Loi de Finances 2026. Détail des 6 taxes, comparateur 18 régions, export PDF.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immatout · Carte grise 2026',
    description: 'Calcul officiel du coût de la carte grise, conforme à la Loi de Finances 2026.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <TooltipProvider delayDuration={200}>
          <SiteHeader />
          {children}
          <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Sources : Légifrance (CIBS L.421-29 à L.421-92), service-public.gouv.fr, ADEME, EEA.
              Loi de Finances 2026. Calcul indicatif, non opposable.
            </span>
            <a href="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </a>
          </footer>
        </TooltipProvider>
        <PlausibleAnalytics />
      </body>
    </html>
  );
}
