'use client';

import { useEffect, useState } from 'react';

import type { RegionCode, VehicleInput } from '@immatout/calc';
import type { RegionScaleEntry } from '@immatout/data';

import { CasePicker, toVehicleCase } from './case-picker';
import { ManualForm, type ManualFormValue } from './manual-form';
import { PlateForm, type PlateLookupResult } from './plate-form';
import { ResultView } from './result-view';
import { Stepper } from './stepper';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { t } from '@/lib/i18n';
import { useCalculate } from '@/lib/use-calculate';

type Mode = 'plate' | 'manual';
type Origin = 'FR' | 'EU' | 'NON_EU';
type State = 'NEW' | 'USED';

export function CalculatorApp() {
  const [origin, setOrigin] = useState<Origin>('FR');
  const [state, setState] = useState<State>('NEW');
  const [region, setRegion] = useState<RegionCode>('IDF');
  const [regions, setRegions] = useState<RegionScaleEntry[]>([]);
  const [regionsError, setRegionsError] = useState<string | null>(null);

  const [mode, setMode] = useState<Mode>('plate');
  const [prefill, setPrefill] = useState<Partial<VehicleInput>>();
  const [result, run, reset] = useCalculate();

  useEffect(() => {
    let active = true;
    fetch('/api/regions')
      .then((r) => r.json())
      .then((data: { regions: RegionScaleEntry[] }) => {
        if (active) setRegions(data.regions);
      })
      .catch((err) => active && setRegionsError(String(err)));
    return () => {
      active = false;
    };
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  function handlePlateFound(v: PlateLookupResult) {
    setPrefill({
      genre: v.genre as VehicleInput['genre'],
      energy: v.energy as VehicleInput['energy'],
      fiscalHorsepower: v.fiscalHorsepower,
      firstRegistrationDate: v.firstRegistrationDate,
      co2WltpGPerKm: v.co2WltpGPerKm,
      massInRunningOrderKg: v.massInRunningOrderKg,
      make: v.make,
      model: v.model,
    });
    setMode('manual');
  }

  function handleManualSubmit({ vehicle, household }: ManualFormValue) {
    const vehicleCase = toVehicleCase(origin, state);
    void run({
      vehicle,
      vehicleCase,
      region,
      registrationDate: today,
      household,
    });
  }

  if (result.status === 'success') {
    return <ResultView result={result.data} input={result.input} onReset={reset} />;
  }

  return (
    <div className="space-y-8">
      <Stepper
        steps={[
          { id: 'case', label: 'Contexte' },
          { id: 'vehicle', label: 'Véhicule' },
          { id: 'result', label: 'Résultat' },
        ]}
        currentIndex={result.status === 'loading' ? 2 : 1}
      />

      {regionsError && (
        <Alert variant="error">
          <AlertDescription>Impossible de charger les régions : {regionsError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <CasePicker
            origin={origin}
            state={state}
            region={region}
            regions={regions}
            onOrigin={setOrigin}
            onState={setState}
            onRegion={setRegion}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="plate">{t('form.mode.plate')}</TabsTrigger>
              <TabsTrigger value="manual">{t('form.mode.manual')}</TabsTrigger>
            </TabsList>
            <TabsContent value="plate">
              <PlateForm onFound={handlePlateFound} onFallback={() => setMode('manual')} />
            </TabsContent>
            <TabsContent value="manual">
              <ManualForm
                initial={prefill}
                onSubmit={handleManualSubmit}
                submitting={result.status === 'loading'}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {result.status === 'error' && (
        <Alert variant="error">
          <AlertDescription>Erreur de calcul : {result.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
