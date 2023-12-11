import { test, expect } from '@playwright/test'

test('can buy product', async ({ page }) => {
	// THIS SHOULD POINT TO THE STAGING OR TEST ENVIRONMENT

	await page.goto('/')

	await expect(page.getByRole('heading', { name: 'Oils' })).toBeVisible()

	//expect to have text Product 9
	await expect(page.getByRole('heading', { name: /\bProduct 9\b/ })).toBeVisible()

	await page.getByTestId('add-9').click()

	await page.getByRole('status', { name: /\b1\b/ })

	await page.getByTestId('add-plus-9').click()

	await page.getByRole('status', { name: /\b2\b/ })

	await page.getByTestId('add-minus-9').click()

	await page.getByRole('status', { name: /\b1\b/ })

	await page.getByTestId('add-plus-9').click()

	await page.getByRole('status', { name: /\b2\b/ })

	await page.locator("[aria-label='Shopping Cart']").click()

	// add success notification
})
