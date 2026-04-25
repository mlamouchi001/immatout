/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@immatout/calc', '@immatout/data'],
  output: 'standalone',

  // SEO + sécurité — ces headers sont injectés par Next (le proxy Traefik
  // les transmet tels quels). HSTS est chargé seulement quand on vit sur
  // HTTPS (Coolify gère TLS via Let's Encrypt).
  async headers() {
    const securityHeaders = [
      {
        // Strict-Transport-Security : 2 ans, includeSubDomains, preload-eligible.
        // Activable seulement si on garantit HTTPS sur tous les sous-domaines.
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        // Permissions-Policy : on coupe ce qu'on n'utilise pas. Pas de pubs,
        // pas de fingerprinting via API navigateur.
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
