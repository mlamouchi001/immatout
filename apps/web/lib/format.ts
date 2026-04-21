/**
 * Locale-aware formatters. All amounts inside the app are carried as integer
 * cents (matching the calc engine). This module is the single place where
 * we convert to display strings.
 */

const EURO_FORMATTER_WHOLE = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const EURO_FORMATTER_PRECISE = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCentsPrecise(cents: number): string {
  return EURO_FORMATTER_PRECISE.format(cents / 100);
}

export function formatCentsWhole(cents: number): string {
  // For small amounts (< 100 €), keep the cents. Otherwise drop them.
  if (Math.abs(cents) < 10_000) return EURO_FORMATTER_PRECISE.format(cents / 100);
  return EURO_FORMATTER_WHOLE.format(cents / 100);
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)} %`;
}

export function formatDateFr(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
