/**
 * @immatout/calc — pure TypeScript tax-calculation engine for the French
 * vehicle-registration fee (carte grise).
 *
 * Entry point. All public API is re-exported from here.
 */

export * from './types';
export * from './errors';
export * from './money';
export * from './schema';

export { calculate, ENGINE_VERSION } from './calculate';
export { computeY1Regional } from './taxes/y1-regional';
export { computeY2Formation } from './taxes/y2-formation';
export { computeY3MalusCo2 } from './taxes/y3-malus-co2';
export { computeY4Gestion } from './taxes/y4-fixed';
export { computeY5Acheminement } from './taxes/y5-delivery';
export { computeY6WeightMalus } from './taxes/y6-malus-weight';
