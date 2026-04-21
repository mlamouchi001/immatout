/**
 * Minimal i18n helper. Single language for v1 (fr-FR). Centralising all
 * user-visible strings here makes it trivial to add English later without
 * touching components.
 */

const FR_FR = {
  'app.title': 'Immatout',
  'app.tagline': 'Calcul officiel du coût de la carte grise (Loi de Finances 2026)',
  'nav.home': 'Accueil',
  'nav.documents': 'Documents',
  'nav.compare': 'Comparateur',
  'stepper.origin.title': 'Origine du véhicule',
  'stepper.origin.fr': '🇫🇷 Acheté en France',
  'stepper.origin.eu': '🇪🇺 Importé de l’UE',
  'stepper.origin.non_eu': '🌍 Importé hors UE',
  'stepper.state.title': 'État du véhicule',
  'stepper.state.new': 'Neuf (jamais immatriculé)',
  'stepper.state.used': 'Occasion',
  'stepper.region.title': 'Région de résidence',
  'stepper.region.helper':
    'La taxe régionale dépend du tarif du cheval fiscal et de la surcharge IDFM en Île-de-France.',
  'form.mode.plate': 'Saisie par plaque',
  'form.mode.model': 'Par modèle',
  'form.mode.manual': 'Saisie manuelle',
  'form.plate.label': "Plaque d'immatriculation",
  'form.plate.placeholder': 'AA-123-BC',
  'form.plate.fetch': 'Rechercher le véhicule',
  'form.plate.fallback': 'Plaque introuvable ou service indisponible — bascule en saisie manuelle.',
  'form.model.make': 'Marque',
  'form.model.makePlaceholder': 'Choisir une marque',
  'form.model.model': 'Modèle',
  'form.model.modelPlaceholder': 'Choisir un modèle',
  'form.model.trim': 'Motorisation',
  'form.model.trimPlaceholder': 'Choisir une motorisation',
  'form.model.submit': 'Utiliser ces caractéristiques',
  'form.model.noData':
    'Cette marque n’a pas de données détaillées (source vPIC uniquement). Utilisez la saisie manuelle.',
  'form.submit': 'Calculer le coût',
  'result.total': 'Coût total',
  'result.tax.Y1': 'Taxe régionale',
  'result.tax.Y2': 'Formation professionnelle',
  'result.tax.Y3': 'Malus CO₂',
  'result.tax.Y4': 'Taxe de gestion',
  'result.tax.Y5': 'Acheminement',
  'result.tax.Y6': 'Malus au poids',
  'result.view.summary': 'Vue synthétique',
  'result.view.expert': 'Vue technique',
  'result.download_pdf': 'Télécharger le devis (PDF)',
  'documents.title': 'Documents à fournir',
  'compare.title': 'Comparer les 18 régions',
} as const;

export type TranslationKey = keyof typeof FR_FR;

export function t(key: TranslationKey): string {
  return FR_FR[key];
}
