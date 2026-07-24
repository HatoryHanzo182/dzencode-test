import { test, expect } from "@playwright/test";

test("products have correct structure", async ({ request }) =>
{
    const response = await request.get(
        "http://localhost:5000/products?order=2"
    );

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");

    const products = await response.json();

    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products)
    {
        expect(product).toEqual(expect.objectContaining(
        {
            id: expect.any(Number),
            serialNumber: expect.any(Number),
            isNew: expect.any(Number),
            photo: expect.any(String),
            title: expect.any(String),
            type: expect.any(String),
            specification: expect.any(String),
            order: expect.any(Number),
            date: expect.any(String),
        }));
    }
});


test("GET /products/filters?order=2 returns filters", async ({ request }) =>
{
    const response = await request.get(
        "http://localhost:5000/products/filters?order=2"
    );

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");

    const filters = await response.json();

    expect(filters).toEqual(
    {
        types: expect.any(Array),
        specifications: expect.any(Array),
    });
});