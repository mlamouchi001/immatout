import Link from 'next/link';
import { Calculator, FileText, Scale } from 'lucide-react';

import { t } from '@/lib/i18n';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Calculator className="h-5 w-5 text-primary" />
          <span>{t('app.title')}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            <Calculator className="inline h-4 w-4 mr-1" />
            {t('nav.home')}
          </Link>
          <Link href="/compare" className="hover:text-foreground">
            <Scale className="inline h-4 w-4 mr-1" />
            {t('nav.compare')}
          </Link>
          <Link href="/documents" className="hover:text-foreground">
            <FileText className="inline h-4 w-4 mr-1" />
            {t('nav.documents')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
