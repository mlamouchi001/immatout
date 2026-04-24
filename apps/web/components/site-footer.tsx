import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container grid gap-6 py-10 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-2">
          <p className="text-sm font-semibold">Immatout · Calcul carte grise 2026</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Simulateur indicatif, non opposable. Sources : Légifrance (CIBS L.421-29 à L.421-92),{' '}
            <a
              href="https://www.service-public.gouv.fr/particuliers/vosdroits/F36199"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              service-public.gouv.fr
            </a>
            ,{' '}
            <a
              href="https://carlabelling.ademe.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              ADEME Car Labelling
            </a>
            , EEA. Conforme à la Loi de Finances 2026.
          </p>
        </div>
        <nav
          aria-label="Liens secondaires"
          className="flex flex-col items-start gap-2 text-xs sm:items-end"
        >
          <Link href="/mentions-legales" className="text-muted-foreground hover:text-foreground">
            Mentions légales
          </Link>
          <Link href="/compare" className="text-muted-foreground hover:text-foreground">
            Comparateur 18 régions
          </Link>
          <Link href="/referentiels" className="text-muted-foreground hover:text-foreground">
            Référentiels &amp; barèmes
          </Link>
          <Link href="/documents" className="text-muted-foreground hover:text-foreground">
            Pièces à fournir
          </Link>
        </nav>
      </div>
    </footer>
  );
}
