/**
 * French administrative horsepower (CV fiscaux) estimation.
 *
 * Official formula (circulaire du 8 novembre 2021, applicable since LF 2020)
 * for combustion / hybrid vehicles:
 *
 *     CV = round_up( (CO₂ / 45) + 1.6 × (P_kW / 40)^1.6 )
 *
 * For pure battery-electric vehicles (BEV), a simplified rule applies in
 * practice on certificats d'immatriculation: a single digit derived from
 * peak electric power (5 CV typical for compact EV, up to 15 CV for
 * high-power Tesla/Porsche). The closest common approximation used by
 * préfectures is:
 *
 *     CV_electric = round_up(P_kW / 7.5)  capped at 15
 *
 * This estimation is ±1 CV vs the actual value on the certificate. Callers
 * must flag results with `fiscalCvApprox=true` so the UI can warn the user.
 */

export type EnergyHint = 'EE' | 'ES' | 'GO' | 'EH' | 'GH' | 'GL' | 'GN' | 'H2' | 'OTHER';

export function estimateFiscalCv(params: {
  energy: EnergyHint;
  powerKw: number | null;
  co2GPerKm: number | null;
}): number | null {
  const { energy, powerKw, co2GPerKm } = params;
  if (powerKw === null || powerKw <= 0) return null;

  if (energy === 'EE') {
    const cv = Math.ceil(powerKw / 7.5);
    return Math.max(1, Math.min(cv, 15));
  }

  if (co2GPerKm === null || co2GPerKm < 0) {
    // Combustion without CO₂ data: use power-only fallback from pre-2020 rules
    // CV = P / 5.8 capped at 50 (approximation; EEA rarely lacks CO₂ for ICE)
    return Math.max(1, Math.min(Math.ceil(powerKw / 5.8), 50));
  }

  const cv = Math.ceil(co2GPerKm / 45 + 1.6 * Math.pow(powerKw / 40, 1.6));
  return Math.max(1, Math.min(cv, 50));
}
