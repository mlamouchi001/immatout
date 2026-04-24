'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const ENTRIES: Array<{ href: string; label: string; desc: string }> = [
  { href: '/referentiels/regions', label: 'Régions', desc: 'Tarif CV · surcharge IDFM' },
  { href: '/referentiels/malus-co2', label: 'Malus CO₂', desc: 'Grilles 2024-2026' },
  { href: '/referentiels/malus-poids', label: 'Malus poids', desc: 'Tranches + abattements' },
  { href: '/referentiels/decote', label: 'Décote import', desc: 'Grille 20 tiers' },
  { href: '/referentiels/catalogue', label: 'Catalogue véhicules', desc: 'ADEME + EEA' },
];

export function ReferentialsNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Référentiels" className="flex flex-col gap-1 text-sm">
      <p className="section-eyebrow mb-2">Sections</p>
      {ENTRIES.map((e) => {
        const active = pathname === e.href;
        return (
          <Link
            key={e.href}
            href={e.href}
            className={cn(
              'rounded-md border border-transparent px-3 py-2 transition-colors',
              active
                ? 'border-accent/30 bg-accent/5 text-foreground'
                : 'text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground',
            )}
          >
            <span className={cn('block font-medium', active && 'text-accent')}>{e.label}</span>
            <span className="block text-xs text-muted-foreground">{e.desc}</span>
          </Link>
        );
      })}
    </nav>
  );
}
