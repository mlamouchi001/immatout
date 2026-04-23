import type { Metadata } from 'next';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    "Sources réglementaires, licences des données, limitations et avertissements d'Immatout.",
};

export default function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title="Mentions légales" />
      <section className="container max-w-4xl space-y-6 py-10 sm:py-12">
        <Card>
          <CardHeader>
            <CardTitle>Avertissement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              Immatout est un <strong>outil de simulation indicatif</strong>. Les montants affichés
              ne constituent pas un devis opposable à l&apos;administration. Le montant exact de
              votre carte grise ne peut être confirmé que par les services de l&apos;État via le
              portail officiel <code>ants.gouv.fr</code>.
            </p>
            <p>
              Les barèmes et les règles de calcul évoluent chaque année. Les calculs proposés
              reflètent les règles en vigueur au <strong>1ᵉʳ janvier 2026</strong>, intégrant les
              ajustements du gouvernement Lecornu II d&apos;octobre 2025 et la Loi de Finances 2026
              adoptée via l&apos;article 49-3.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sources officielles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <Source
                href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000044595989/LEGISCTA000044599003/"
                label="Légifrance — Code des impositions sur les biens et services (CIBS)"
                role="Articles L.421-29 à L.421-92 — barèmes Y1, Y2, Y3, Y4, Y5, Y6"
              />
              <Source
                href="https://www.service-public.gouv.fr/particuliers/vosdroits/F35947"
                label="service-public.gouv.fr — Malus CO₂ (F35947)"
                role="Grille CO₂ WLTP et seuils 2024-2026"
              />
              <Source
                href="https://www.service-public.gouv.fr/particuliers/vosdroits/F35950"
                label="service-public.gouv.fr — Malus masse / TMOM (F35950)"
                role="Seuils, tranches, abattements et décote importations"
              />
              <Source
                href="https://www.service-public.gouv.fr/particuliers/actualites/A18021"
                label="service-public.gouv.fr — Coût carte grise 2026 (A18021)"
                role="Tarifs régionaux du cheval fiscal et surcharge IDFM"
              />
              <Source
                href="https://data.ademe.fr/"
                label="ADEME Car Labelling"
                role="Émissions CO₂, masse, CV fiscaux — Licence Ouverte Etalab"
              />
              <Source
                href="https://co2cars.apps.eea.europa.eu/"
                label="EEA CO₂ Monitoring"
                role="Véhicules UE — licence EEA re-use"
              />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Licences et données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Code source</strong> : licence MIT. Le moteur de calcul (
              <code>@immatout/calc</code>) et les barèmes (<code>@immatout/data</code>) sont
              librement auditables.
            </p>
            <p>
              <strong>Données ADEME</strong> : Licence Ouverte Etalab (réutilisation commerciale
              autorisée avec attribution).
            </p>
            <p>
              <strong>Données EEA</strong> : EEA re-use policy (attribution requise).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitations connues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Grilles CO₂ <strong>2020-2023</strong> non ingérées : les imports d&apos;occasion
                dont la 1ère immatriculation est antérieure à 2024 utilisent en fallback la grille
                2024 (valeur conservatrice, documentée dans le champ <code>scaleYear</code> du
                résultat).
              </li>
              <li>
                Le <strong>malus rétroactif FR_USED</strong> (requalification N1→M1 post-2015, CIBS
                L.421-60-1) n&apos;est pas implémenté en v1.
              </li>
              <li>
                L&apos;identification par plaque utilise un provider configurable via{' '}
                <code>SIV_API_PROVIDER</code>. En mode <code>mock</code> (défaut), seules quelques
                plaques de démonstration sont reconnues.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Données personnelles (RGPD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              Les informations saisies (véhicule, région, situation familiale) sont traitées côté
              serveur uniquement pour produire le devis puis journalisées de manière anonymisée dans
              la table <code>CalculationLog</code> (aucun identifiant personnel).
            </p>
            <p>
              Aucun cookie de suivi n&apos;est posé. L&apos;analytics optionnelle (Plausible) est
              cookieless et conforme RGPD sans bandeau.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function Source({ href, label, role }: { href: string; label: string; role: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-primary hover:underline"
      >
        {label}
      </a>
      <span className="block text-muted-foreground">{role}</span>
    </li>
  );
}
