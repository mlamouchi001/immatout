import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

import { PlausibleAnalytics } from '@/components/plausible-analytics';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

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
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TooltipProvider delayDuration={200}>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </TooltipProvider>
        <PlausibleAnalytics />
      </body>
    </html>
  );
}
