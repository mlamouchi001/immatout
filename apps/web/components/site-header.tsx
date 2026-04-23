import Link from 'next/link';

import { t } from '@/lib/i18n';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          aria-label="Immatout — accueil"
        >
          <LogoMark />
          <span>{t('app.title')}</span>
          <span className="hidden rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            LF 2026
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="flex items-center gap-1">
          <HeaderLink href="/">{t('nav.home')}</HeaderLink>
          <HeaderLink href="/compare">{t('nav.compare')}</HeaderLink>
          <HeaderLink href="/documents">{t('nav.documents')}</HeaderLink>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </Link>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-accent to-primary text-[11px] font-bold text-primary-foreground shadow-sm ring-1 ring-inset ring-white/10"
    >
      IM
    </span>
  );
}
