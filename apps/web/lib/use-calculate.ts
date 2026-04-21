'use client';

import { useCallback, useState } from 'react';

import type { CalculationContext, RegistrationCostBreakdown } from '@immatout/calc';

export type CalcState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: RegistrationCostBreakdown; input: CalculationContext }
  | { status: 'error'; error: string };

export function useCalculate(): [
  CalcState,
  (ctx: CalculationContext) => Promise<void>,
  () => void,
] {
  const [state, setState] = useState<CalcState>({ status: 'idle' });

  const run = useCallback(async (ctx: CalculationContext) => {
    setState({ status: 'loading' });
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(ctx),
      });
      const body = (await res.json()) as RegistrationCostBreakdown | { error: string };
      if (!res.ok) {
        setState({
          status: 'error',
          error: 'error' in body ? body.error : `HTTP ${res.status}`,
        });
        return;
      }
      setState({
        status: 'success',
        data: body as RegistrationCostBreakdown,
        input: ctx,
      });
    } catch (err) {
      setState({ status: 'error', error: err instanceof Error ? err.message : 'Erreur inconnue' });
    }
  }, []);

  const reset = useCallback(() => setState({ status: 'idle' }), []);
  return [state, run, reset];
}
