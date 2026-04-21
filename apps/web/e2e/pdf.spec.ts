import { expect, test } from '@playwright/test';

test('Export PDF du devis téléchargeable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Saisie manuelle' }).click();
  await page.getByRole('button', { name: /Calculer le coût/ }).click();
  await expect(page.getByText('Coût total')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Télécharger le devis/ }).click();
  const download = await downloadPromise;

  // The filename is timestamped; just check the extension and that bytes arrived.
  expect(download.suggestedFilename()).toMatch(/^immatout-.*\.pdf$/);
  const buffer = await download.createReadStream().then((stream) => {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (c) => chunks.push(Buffer.from(c)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  });
  expect(buffer.length).toBeGreaterThan(1000);
  // Magic bytes for PDF.
  expect(buffer.subarray(0, 4).toString()).toBe('%PDF');
});
