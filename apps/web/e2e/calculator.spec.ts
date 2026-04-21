import { expect, test } from '@playwright/test';

test.describe('Calculator — parcours complet', () => {
  test('plaque mock AA-123-BC pré-remplit le formulaire et calcule', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('tab', { name: 'Saisie par plaque' }).click();
    await page.getByLabel(/Plaque d'immatriculation/).fill('AA-123-BC');
    await page.getByRole('button', { name: /Rechercher le véhicule/ }).click();

    // Look-up success switches to the manual tab.
    await expect(page.getByRole('tab', { name: 'Saisie manuelle', selected: true })).toBeVisible();

    await page.getByRole('button', { name: /Calculer le coût/ }).click();

    // IDF, 7 CV, 130 g, 1400 kg, first registered 2026-02-10.
    //   Y1 = 7 × 54.95 + 7 × 14 = 482.65 €
    //   Y3 = 983 €  Y4 = 11  Y5 = 2.76
    //   Total = 1479.41 €
    await expect(page.getByText('1 479,41 €')).toBeVisible();
    await expect(page.getByText('Taxe régionale')).toBeVisible();
    await expect(page.getByText('Malus CO₂')).toBeVisible();
  });

  test('saisie manuelle import UE occasion applique la décote', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('origin-eu').click();
    await page.getByTestId('state-used').click();

    await page.locator('#region').click();
    await page.getByRole('option', { name: /Grand Est/ }).click();

    await page.getByRole('tab', { name: 'Saisie manuelle' }).click();

    await page.getByLabel('Puissance fiscale (CV)').fill('6');
    await page.getByLabel('Date de 1ère immatriculation').fill('2022-07-01');
    await page.getByLabel('Émissions CO₂ WLTP (g/km)').fill('150');
    await page.getByLabel('Masse en ordre de marche (kg)').fill('1400');

    await page.getByTestId('energy-trigger').click();
    await page.getByRole('option', { name: 'Diesel' }).click();

    await page.getByRole('button', { name: /Calculer le coût/ }).click();

    //   Y1 = 6 × 60 = 360 €
    //   Y3: 2024 grid @ 150 g = 2205 × 0.67 = 1477.35 €
    //   Y4 + Y5 = 13.76 €   Y6 = 0 (mass 1400 < 1500)
    //   Total = 1851.11 €
    await expect(page.getByText('1 851,11 €')).toBeVisible();
  });

  test('véhicule électrique → exonérations totales Y1/Y3/Y6', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Saisie manuelle' }).click();

    await page.getByTestId('energy-trigger').click();
    await page.getByRole('option', { name: 'Électrique' }).click();

    await page.getByLabel('Puissance fiscale (CV)').fill('4');
    await page.getByLabel('Émissions CO₂ WLTP (g/km)').fill('0');
    await page.getByLabel('Masse en ordre de marche (kg)').fill('1800');

    await page.getByRole('button', { name: /Calculer le coût/ }).click();

    // Only Y4 + Y5 remain → 13,76 €
    await expect(page.getByText('13,76 €').first()).toBeVisible();
    await expect(page.getByText(/Véhicule 100 % électrique/)).toBeVisible();
  });
});
