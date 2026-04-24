import type { Metadata } from 'next';

import { getWeightMalusScale } from '@immatout/data';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Malus au poids (TMOM)',
  description:
    'Barème 2026 du malus au poids des véhicules particuliers en France : seuil déclencheur 1500 kg, 5 tranches progressives et abattements (hybride, PHEV, famille, 8+ places).',
};

export default function MalusPoidsRef() {
  const scale = getWeightMalusScale(2026);

  const exampleMasses = [1400, 1600, 1800, 2000, 2300, 2800];
  const exampleRows = exampleMasses.map((mass) => {
    if (mass <= scale.triggerKg) {
      return { mass, amount: 0, tranches: ['masse ≤ seuil'] };
    }
    let euros = 0;
    const parts: string[] = [];
    for (const tr of scale.tranches) {
      const from = tr.fromKg;
      const to = tr.toKg ?? Infinity;
      if (mass <= from) break;
      const slice = Math.min(mass, to) - from;
      if (slice > 0) {
        euros += slice * tr.ratePerKgEuros;
        parts.push(`${slice} kg × ${tr.ratePerKgEuros} €`);
      }
    }
    return { mass, amount: euros, tranches: parts };
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Malus au poids 2026</h2>
        <p className="text-sm text-muted-foreground">
          Base légale : <code>CIBS L.421-71 à L.421-81-1</code>. Seuil abaissé de 1600 kg à 1500 kg
          par la Loi de Finances 2026. Les véhicules 100 % électriques restent exonérés en 2026,
          2027 et 2028.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Seuil déclencheur" value={`${scale.triggerKg} kg`} />
        <Stat label="Tranches" value={String(scale.tranches.length)} />
        <Stat label="Tarif 1ʳᵉ tranche" value={`${scale.tranches[0]!.ratePerKgEuros} €/kg`} />
        <Stat
          label="Tarif dernière tranche"
          value={`${scale.tranches[scale.tranches.length - 1]!.ratePerKgEuros} €/kg`}
        />
      </div>

      {!scale.evApplicable && (
        <Alert variant="info">
          <AlertDescription>
            <strong>EV + H₂ exonérés</strong> de Y6 sur 2026-2028 (suite au retrait de
            l&apos;amendement via 49-3). À partir de 2029, le régime peut évoluer.
          </AlertDescription>
        </Alert>
      )}

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Tranches progressives</h3>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">Tranche</th>
                    <th className="px-4 py-3 text-right">De (kg)</th>
                    <th className="px-4 py-3 text-right">À (kg)</th>
                    <th className="px-4 py-3 text-right">Tarif €/kg</th>
                  </tr>
                </thead>
                <tbody>
                  {scale.tranches.map((tr, i) => (
                    <tr
                      key={i}
                      className="border-t border-border/60 transition-colors hover:bg-muted/20"
                    >
                      <td className="px-4 py-3 font-medium">T{i + 1}</td>
                      <td className="num px-4 py-3 text-right">{tr.fromKg}</td>
                      <td className="num px-4 py-3 text-right">
                        {tr.toKg === null ? '—' : tr.toKg}
                      </td>
                      <td className="num px-4 py-3 text-right font-semibold">
                        {tr.ratePerKgEuros} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Abattements sur la masse taxable</h3>
        <Card>
          <CardContent className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <Abatement
              title="Hybride non rechargeable (HEV / MHEV)"
              value={`− ${scale.abatements.hybridKg} kg`}
            />
            <Abatement
              title="Hybride rechargeable (PHEV)"
              value={`− ${scale.abatements.phevKg} kg`}
            />
            <Abatement
              title="Véhicule 8+ places · particulier"
              value={`− ${scale.abatements.eightSeatsIndividualKg} kg`}
            />
            <Abatement
              title="Véhicule 8+ places · personne morale"
              value={`− ${scale.abatements.eightSeatsLegalEntityKg} kg`}
            />
            <Abatement
              title={`Famille (${scale.abatements.familyMinChildren}+ enfants à charge)`}
              value={`− ${scale.abatements.perChildKg} kg / enfant`}
            />
            <Abatement title="Véhicule 100 % électrique" value={`exonération totale (2026-2028)`} />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Exemples</h3>
        <p className="text-sm text-muted-foreground">
          Montant Y6 pour quelques masses en ordre de marche, sans abattement.
        </p>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">Masse (kg)</th>
                    <th className="px-4 py-3 text-left">Détail par tranche</th>
                    <th className="px-4 py-3 text-right">Malus</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleRows.map((row) => (
                    <tr
                      key={row.mass}
                      className="border-t border-border/60 transition-colors hover:bg-muted/20"
                    >
                      <td className="num px-4 py-3 font-medium">{row.mass}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {row.tranches.join(' + ') || '—'}
                      </td>
                      <td className="num px-4 py-3 text-right font-semibold">
                        {row.amount.toLocaleString('fr-FR')} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">Source : {scale.source}</footer>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="num mt-1 text-xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
}

function Abatement({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/10 p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
