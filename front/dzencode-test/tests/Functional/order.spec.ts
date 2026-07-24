import { test, expect } from "@playwright/test";

test.describe("Orders functionality", () =>
{
    test("user can open orders page and see orders", async ({ page }) =>
    {
        await page.goto("/orders");

        await expect(page.getByText("Order 1")).toBeVisible();
        await expect(page.getByText("Order 2")).toBeVisible();
        await expect(page.getByText("Order 3")).toBeVisible();
        await expect(page.getByText("Order 4")).toBeVisible();
    });


    test("user can open order products", async ({ page }) =>
    {
        await page.goto("/orders");

        const orderCard = page
            .locator(".order-card")
            .filter({ hasText: "Order 1" });

        await expect(orderCard).toBeVisible();

        await orderCard.click();

        await expect(page).toHaveURL(/\/orders\/1\/products/);

        await expect(page.locator(".product-row").first()).toBeVisible();
    });


    test("user can filter products by type", async ({ page }) =>
    {
        await page.goto("/orders/1/products");

        const productRows = page.locator(".product-row");

        await expect(productRows).toHaveCount(2);

        await page
            .locator("select")
            .first()
            .selectOption({ label: "Monitors" });

        await expect(productRows).toHaveCount(1);

        await expect(
            productRows.filter({
                hasText: "Dell UltraSharp U2720Q"
            })
        ).toBeVisible();
    });
});