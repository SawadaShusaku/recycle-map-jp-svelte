import { expect, test } from '@playwright/test';

test.describe('Contact page', () => {
	test('opens from the sidebar and renders the Turnstile widget anchor', async ({ page }) => {
		await page.addInitScript(() => {
			sessionStorage.setItem('openSidebar', '1');
		});
		await page.goto('/');

		const sidebar = page.getByRole('complementary', { name: '設定メニュー' });
		await expect(sidebar).toBeVisible();
		const contactLink = sidebar.locator('a[href="/contact"]');
		await expect(contactLink).toBeVisible();
		await contactLink.click({ force: true });

		await expect(page).toHaveURL(/\/contact$/);
		await expect(page.getByRole('heading', { name: 'お問い合わせ', exact: true })).toBeVisible();
		await expect(page.locator('[data-testid="contact-turnstile"]')).toHaveAttribute(
			'data-sitekey',
			'0x4AAAAAADSblskoxiF4EWxq'
		);
	});
});
