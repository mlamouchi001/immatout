import Script from 'next/script';

/**
 * Plausible Analytics — privacy-friendly, cookieless, RGPD-compliant.
 *
 * Only renders the tracking script when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set.
 * No consent banner is strictly required (Plausible does not use cookies nor
 * track individual users), but if `NEXT_PUBLIC_PLAUSIBLE_DISABLE_AUTO=1`
 * the script is omitted so the site owner can gate it behind their own
 * consent flow.
 */
export function PlausibleAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const disabled = process.env.NEXT_PUBLIC_PLAUSIBLE_DISABLE_AUTO === '1';
  if (!domain || disabled) return null;

  return (
    <Script
      strategy="afterInteractive"
      src="https://plausible.io/js/script.js"
      data-domain={domain}
    />
  );
}
