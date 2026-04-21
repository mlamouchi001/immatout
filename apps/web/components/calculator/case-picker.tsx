'use client';

import { Globe, Check, Sparkles, Rotate3d } from 'lucide-react';

import type { VehicleCase, RegionCode } from '@immatout/calc';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import type { RegionScaleEntry } from '@immatout/data';

type Origin = 'FR' | 'EU' | 'NON_EU';
type State = 'NEW' | 'USED';

export function toVehicleCase(origin: Origin, state: State): VehicleCase {
  if (origin === 'FR') return state === 'NEW' ? 'FR_NEW' : 'FR_USED';
  if (origin === 'EU') return state === 'NEW' ? 'IMPORT_EU_NEW' : 'IMPORT_EU_USED';
  return state === 'NEW' ? 'IMPORT_NON_EU_NEW' : 'IMPORT_NON_EU_USED';
}

interface Props {
  origin: Origin;
  state: State;
  region: RegionCode;
  regions: RegionScaleEntry[];
  onOrigin: (o: Origin) => void;
  onState: (s: State) => void;
  onRegion: (r: RegionCode) => void;
}

export function CasePicker({ origin, state, region, regions, onOrigin, onState, onRegion }: Props) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-base font-semibold">{t('stepper.origin.title')}</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <OriginCard active={origin === 'FR'} onClick={() => onOrigin('FR')} testId="origin-fr">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{t('stepper.origin.fr')}</span>
          </OriginCard>
          <OriginCard active={origin === 'EU'} onClick={() => onOrigin('EU')} testId="origin-eu">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{t('stepper.origin.eu')}</span>
          </OriginCard>
          <OriginCard
            active={origin === 'NON_EU'}
            onClick={() => onOrigin('NON_EU')}
            testId="origin-non-eu"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{t('stepper.origin.non_eu')}</span>
          </OriginCard>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-base font-semibold">{t('stepper.state.title')}</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <OriginCard active={state === 'NEW'} onClick={() => onState('NEW')} testId="state-new">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t('stepper.state.new')}</span>
          </OriginCard>
          <OriginCard active={state === 'USED'} onClick={() => onState('USED')} testId="state-used">
            <Rotate3d className="h-4 w-4" />
            <span className="text-sm font-medium">{t('stepper.state.used')}</span>
          </OriginCard>
        </div>
      </section>

      <section>
        <Label htmlFor="region">{t('stepper.region.title')}</Label>
        <p className="mb-3 text-sm text-muted-foreground">{t('stepper.region.helper')}</p>
        <Select value={region} onValueChange={(v) => onRegion(v as RegionCode)}>
          <SelectTrigger id="region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r.regionCode} value={r.regionCode}>
                {r.regionName} · {r.perCvRateEuros.toFixed(2)} €/CV
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </div>
  );
}

function OriginCard({
  active,
  onClick,
  children,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <Card
      data-testid={testId}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'flex cursor-pointer items-center gap-3 p-4 transition-colors hover:border-primary/50',
        active && 'border-primary bg-primary/5',
      )}
    >
      {children}
      {active && <Check className="ml-auto h-4 w-4 text-primary" />}
    </Card>
  );
}
