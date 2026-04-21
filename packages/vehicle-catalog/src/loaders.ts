import catalogJson from '../data/catalog.json';
import { type Catalog, CatalogSchema, type Make, type Model, type Trim } from './schemas';

let _catalog: Catalog | null = null;

export function getCatalog(): Catalog {
  if (_catalog) return _catalog;
  _catalog = CatalogSchema.parse(catalogJson);
  return _catalog;
}

export function listMakes(): string[] {
  return getCatalog().makes.map((m: Make) => m.name);
}

export function listModels(makeName: string): string[] {
  const make = getCatalog().makes.find((m: Make) => m.name === makeName);
  return make ? make.models.map((model: Model) => model.name) : [];
}

export function listTrims(makeName: string, modelName: string): Trim[] {
  const make = getCatalog().makes.find((m: Make) => m.name === makeName);
  if (!make) return [];
  const model = make.models.find((mo: Model) => mo.name === modelName);
  return model ? model.trims : [];
}

export function getTrim(makeName: string, modelName: string, trimId: string): Trim | null {
  const trims = listTrims(makeName, modelName);
  return trims.find((t: Trim) => t.id === trimId) ?? null;
}
