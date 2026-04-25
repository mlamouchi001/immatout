import Script from 'next/script';

/**
 * Plausible Analytics — privacy-friendly, cookieless, RGPD-compliant.
 *
 * Configure via two env vars:
 *   - NEXT_PUBLIC_PLAUSIBLE_DOMAIN: the site identifier registered in
 *     your Plausible instance (e.g. "immatcalc.fr"). Required.
 *   - NEXT_PUBLIC_PLAUSIBLE_HOST: base URL of the Plausible host serving
 *     /js/script.js and the events endpoint. Defaults to "https://plausible.io"
 *     (Plausible Cloud). Set to "https://plausible.immatcalc.fr" for the
 *     self-hosted instance.
 *
 * Set NEXT_PUBLIC_PLAUSIBLE_DISABLE_AUTO=1 to omit the script entirely
 * (e.g. to gate it behind an external consent flow).
 */
export function PlausibleAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const disabled = process.env.NEXT_PUBLIC_PLAUSIBLE_DISABLE_AUTO === '1';
  if (!domain || disabled) return null;

  const host = (process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? 'https://plausible.io').replace(
    /\/$/,
    '',
  );

  return (
    <Script
      strategy="afterInteractive"
      src={`${host}/js/script.js`}
      data-domain={domain}
      data-api={`${host}/api/event`}
    />
  );
}
