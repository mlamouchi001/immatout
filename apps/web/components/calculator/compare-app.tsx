'use client';

import { useState, type FormEvent } from 'react';
import { ArrowDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCentsPrecise, formatCentsWhole } from '@/lib/format';
import type { EnergyType } from '@immatout/calc';

interface Row {
  regionCode: string;
  regionName: string;
  perCvRateEuros: number;
  totalCents: number;
  taxes: { Y1: number; Y3: number; Y6: number };
}

export function CompareApp() {
  const [cv, setCv] = useState(7);
  const [energy, setEnergy] = useState<EnergyType>('ESSENCE');
  const [co2, setCo2] = useState(130);
  const [mass, setMass] = useState(1400);
  const [firstReg, setFirstReg] = useState('2026-01-01');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          vehicle: {
            genre: 'VP',
            energy,
            fiscalHorsepower: cv,
            firstRegistrationDate: firstReg,
            co2WltpGPerKm: co2,
            massInRunningOrderKg: mass,
          },
          vehicleCase: 'FR_NEW',
          region: 'IDF',
          registrationDate: new Date().toISOString().slice(0, 10),
          household: { dependentChildren: 0, hasDisabilityCard: false, isLegalEntity: false },
        }),
      });
      const body = await res.json();
      if (res.ok) setRows(body.comparisons);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-5">
            <Field label="CV fiscaux">
              <Input
                type="number"
                min={1}
                max={99}
                value={cv}
                onChange={(e) => setCv(Number(e.target.value))}
              />
            </Field>
            <Field label="Énergie">
              <Select value={energy} onValueChange={(v) => setEnergy(v as EnergyType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['ESSENCE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PHEV', 'GPL'] as EnergyType[]).map(
                    (e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </Field>
            <Field label="CO₂ (g/km)">
              <Input
                type="number"
                min={0}
                value={co2}
                onChange={(e) => setCo2(Number(e.target.value))}
              />
            </Field>
            <Field label="Masse (kg)">
              <Input
                type="number"
                min={1}
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
              />
            </Field>
            <Field label="1ère immat.">
              <Input type="date" value={firstReg} onChange={(e) => setFirstReg(e.target.value)} />
            </Field>
            <div className="sm:col-span-5">
              <Button type="submit" disabled={loading}>
                {loading ? 'Calcul…' : 'Comparer les 18 régions'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {rows && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                    <th className="p-3">Région</th>
                    <th className="p-3 text-right">Tarif CV</th>
                    <th className="p-3 text-right">Y1 régionale</th>
                    <th className="p-3 text-right">Y3 + Y6 malus</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.regionCode} className="border-b border-border/60 last:border-0">
                      <td className="p-3 font-medium">
                        {i === 0 && <ArrowDown className="mr-1 inline h-3 w-3 text-green-600" />}
                        {r.regionName}
                      </td>
                      <td className="p-3 text-right tabular-nums text-muted-foreground">
                        {r.perCvRateEuros.toFixed(2)} €/CV
                      </td>
                      <td className="p-3 text-right tabular-nums">
                        {formatCentsWhole(r.taxes.Y1)}
                      </td>
                      <td className="p-3 text-right tabular-nums">
                        {formatCentsWhole(r.taxes.Y3 + r.taxes.Y6)}
                      </td>
                      <td className="p-3 text-right font-semibold tabular-nums">
                        {formatCentsPrecise(r.totalCents)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
