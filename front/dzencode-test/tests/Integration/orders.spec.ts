import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:5000";

test("GET /orders returns valid order structure", async ({ request }) =>
{
    const response = await request.get(`${API_URL}/orders`);

    expect(response.status()).toBe(200);

    const orders = await response.json();

    expect(Array.isArray(orders)).toBeTruthy();

    for (const order of orders)
    {
        expect(order).toEqual(
            expect.objectContaining(
            {
                id: expect.any(Number),
                title: expect.any(String),
                date: expect.any(String),
                description: expect.any(String),
            })
        );
    }
});


test("GET /orders returns correct first order", async ({ request }) =>
{
    const response = await request.get(`${API_URL}/orders`);

    expect(response.status()).toBe(200);

    const orders = await response.json();

    expect(orders[0]).toEqual(
        expect.objectContaining(
        {
            id: 1,
            title: "Order 1",
            date: "2017-06-29 12:09:33",
            description: "First order with electronic equipment",
        })
    );
});


test("GET /orders/1 returns Order 1", async ({ request }) =>
{
    const response = await request.get(`${API_URL}/orders/1`);

    expect(response.status()).toBe(200);

    const order = await response.json();

    expect(order).toEqual(
        expect.objectContaining(
        {
            id: 1,
            title: "Order 1",
            date: "2017-06-29 12:09:33",
            description: "First order with electronic equipment",
        })
    );
});


test("GET /orders/1/summary returns correct summary", async ({ request }) =>
{
    const response = await request.get(
        `${API_URL}/orders/1/summary`
    );

    expect(response.status()).toBe(200);

    expect(response.headers()["content-type"])
        .toContain("application/json");

    const summary = await response.json();

    expect(summary).toEqual(
    {
        productsCount: 2,
        prices:
        {
            USD: 280,
            UAH: 7280,
        },
    });
});

test("GET /orders/2/products returns products", async ({ request }) =>
{
    const response = await request.get(
        `${API_URL}/orders/2/products`
    );

    expect(response.status()).toBe(200);

    const products = await response.json();

    expect(Array.isArray(products)).toBeTruthy();

    expect(products.length).toBeGreaterThan(0);

    expect(products[0]).toEqual(
        expect.objectContaining(
        {
            id: 2,
            title: "LG UltraGear 27GP850",
            type: "Monitors",
            order: 2,
        })
    );
});