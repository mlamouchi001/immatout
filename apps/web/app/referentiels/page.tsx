import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CARDS: Array<{ href: string; title: string; lede: string; facts: string[] }> = [
  {
    href: '/referentiels/regions',
    title: 'Tarifs régionaux du cheval fiscal',
    lede: '18 régions, coefficients par énergie, surcharge IDFM.',
    facts: ['Plafond légal 60 €/CV', 'Surcharge IDFM 14 €/CV dès mars 2026'],
  },
  {
    href: '/referentiels/malus-co2',
    title: 'Malus écologique CO₂',
    lede: 'Grilles 2024, 2025 et 2026 — déclencheur, paliers, plafond.',
    facts: ['Plafond global 2026 : 80 000 €', 'Déclencheur 2026 : 108 g/km'],
  },
  {
    href: '/referentiels/malus-poids',
    title: 'Malus au poids (TMOM)',
    lede: 'Seuil 1500 kg, 5 tranches progressives, abattements.',
    facts: ['Seuil 2026 : 1500 kg', 'Abattement par enfant : 200 kg'],
  },
  {
    href: '/referentiels/decote',
    title: 'Décote import 12 tiers',
    lede: 'Grille unifiée Y3/Y6 pour véhicules d’occasion importés.',
    facts: ['Exonération totale à 15 ans', '20 tranches mensuelles'],
  },
  {
    href: '/referentiels/catalogue',
    title: 'Catalogue véhicules',
    lede: 'Marques, modèles, motorisations avec CV fiscaux et CO₂ WLTP.',
    facts: ['ADEME Car Labelling (FR, WLTP)', 'EEA CO₂ Monitoring (2.6k trims FR)'],
  },
];

export default function ReferentialsHome() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {CARDS.map((c) => (
        <Link key={c.href} href={c.href} className="block">
          <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-pop">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-start justify-between gap-3 text-base">
                <span>{c.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-sm">
              <p className="text-muted-foreground">{c.lede}</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {c.facts.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
