import type { MetadataRoute } from 'next';

/**
 * Robots rules: allow public pages for search engines, block API endpoints,
 * and default-deny LLM training crawlers (GPTBot, ClaudeBot, CCBot, etc.) to
 * keep control over content reuse. Bing, Google, DuckDuckGo, and Applebot are
 * explicitly allowed to index everything outside /api and /admin.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
