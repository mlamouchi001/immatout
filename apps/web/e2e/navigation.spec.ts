import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigue entre Accueil, Comparateur et Documents', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Immatout' })).toBeVisible();

    await page.getByRole('link', { name: /Comparateur/ }).click();
    await expect(page).toHaveURL(/\/compare$/);
    await expect(page.getByRole('heading', { name: /Comparer les 18 régions/ })).toBeVisible();

    await page.getByRole('link', { name: /Documents/ }).click();
    await expect(page).toHaveURL(/\/documents$/);
    await expect(page.getByRole('heading', { name: /Pièces à fournir/ })).toBeVisible();

    await page.getByRole('link', { name: /Accueil/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('page documents liste les 6 cas d’usage', async ({ page }) => {
    await page.goto('/documents');
    for (const label of [
      /Véhicule neuf acheté en France/,
      /Véhicule d.occasion acheté en France/,
      /Véhicule neuf importé de l.UE/,
      /Véhicule d.occasion importé de l.UE/,
      /Véhicule neuf importé hors UE/,
      /Véhicule d.occasion importé hors UE/,
    ]) {
      await expect(page.getByText(label)).toBeVisible();
    }
  });

  test('comparateur calcule les 18 régions triées', async ({ page }) => {
    await page.goto('/compare');
    await page.getByRole('button', { name: /Comparer les 18 régions/ }).click();

    // Wait for the results table.
    await expect(page.getByRole('columnheader', { name: /Région/ })).toBeVisible();

    // Mayotte (30 €/CV) should be the cheapest for a standard VP.
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(18);
    await expect(rows.first()).toContainText('Mayotte');
  });
});
