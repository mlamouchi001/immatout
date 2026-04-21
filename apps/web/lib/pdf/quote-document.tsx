import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import type { CalculationContext, RegistrationCostBreakdown } from '@immatout/calc';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica', color: '#0f172a' },
  header: { marginBottom: 20, borderBottom: '1pt solid #cbd5e1', paddingBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 10, color: '#64748b' },
  section: { marginBottom: 18 },
  h2: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, color: '#1e293b' },
  row: { flexDirection: 'row', marginBottom: 3 },
  label: { flex: 1, color: '#475569' },
  value: { flex: 1, textAlign: 'left' },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #cbd5e1',
    paddingBottom: 4,
    marginBottom: 4,
    fontSize: 9,
    textTransform: 'uppercase',
    color: '#64748b',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottom: '0.5pt solid #e2e8f0',
  },
  tableCol1: { flex: 2 },
  tableCol2: { flex: 2, color: '#64748b', fontSize: 9 },
  tableCol3: { flex: 1, textAlign: 'right' },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 8,
    borderTop: '1pt solid #0f172a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  small: { fontSize: 9, color: '#64748b', marginTop: 20 },
});

function fmtEur(cents: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

interface Props {
  input: CalculationContext;
  breakdown: RegistrationCostBreakdown;
}

export function QuoteDocument({ input, breakdown }: Props) {
  const v = input.vehicle;
  const taxes = [
    ['Y1', 'Taxe régionale', breakdown.taxes.Y1_regionale],
    ['Y2', 'Formation professionnelle', breakdown.taxes.Y2_formation],
    ['Y3', 'Malus CO₂', breakdown.taxes.Y3_malusCO2],
    ['Y4', 'Taxe fixe de gestion', breakdown.taxes.Y4_gestion],
    ['Y5', 'Redevance d’acheminement', breakdown.taxes.Y5_acheminement],
    ['Y6', 'Malus au poids', breakdown.taxes.Y6_malusPoids],
  ] as const;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Devis carte grise — Immatout</Text>
          <Text style={styles.subtitle}>
            Calcul indicatif, Loi de Finances 2026 · CIBS L.421-29 à L.421-92
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Véhicule</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Marque / modèle</Text>
            <Text style={styles.value}>{[v.make, v.model].filter(Boolean).join(' ') || '—'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Genre</Text>
            <Text style={styles.value}>{v.genre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Énergie · CV fiscaux</Text>
            <Text style={styles.value}>
              {v.energy} · {v.fiscalHorsepower} CV
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CO₂ WLTP · masse</Text>
            <Text style={styles.value}>
              {v.co2WltpGPerKm} g/km · {v.massInRunningOrderKg} kg
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>1ère immatriculation</Text>
            <Text style={styles.value}>{v.firstRegistrationDate.slice(0, 10)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cas · Région</Text>
            <Text style={styles.value}>
              {input.vehicleCase} · {input.region}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Détail des taxes</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol1}>Taxe</Text>
            <Text style={styles.tableCol2}>Base légale</Text>
            <Text style={styles.tableCol3}>Montant</Text>
          </View>
          {taxes.map(([code, label, tax]) => (
            <View key={code} style={styles.tableRow}>
              <Text style={styles.tableCol1}>
                {code} · {label}
              </Text>
              <Text style={styles.tableCol2}>{tax.legalRef}</Text>
              <Text style={styles.tableCol3}>{fmtEur(tax.amountCents)}</Text>
            </View>
          ))}
          <View style={styles.total}>
            <Text>Coût total TTC</Text>
            <Text>{fmtEur(breakdown.totalCents)}</Text>
          </View>
        </View>

        {breakdown.applied.exonerations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Exonérations appliquées</Text>
            <Text>{breakdown.applied.exonerations.join(' · ')}</Text>
          </View>
        )}

        <Text style={styles.small}>
          Devis généré le {new Date().toLocaleDateString('fr-FR')} · Barème{' '}
          {breakdown.metadata.scaleVersion} · Moteur {breakdown.metadata.engineVersion}. Sources :
          Légifrance (CIBS), service-public.gouv.fr, Loi de Finances 2026. Calcul indicatif, non
          opposable à l’administration.
        </Text>
      </Page>
    </Document>
  );
}
