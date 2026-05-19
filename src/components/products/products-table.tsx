"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

export function ProductsTable() {
  const [products, setProducts] =
    useState<Product[]>([]);

  async function fetchProducts() {
    const response = await fetch(
      "/api/products",
      {
        credentials: "include",
      }
    );

    const data =
      await response.json();

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
      "
    >
      <table className="w-full">
        <thead
          className="
            border-b
            border-white/10
          "
        >
          <tr className="text-left">
            <th className="p-4">
              Product
            </th>

            <th className="p-4">
              SKU
            </th>

            <th className="p-4">
              Quantity
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="
                border-b
                border-white/5
              "
            >
              <td className="p-4">
                {product.name}
              </td>

              <td className="p-4 text-zinc-400">
                {product.sku}
              </td>

              <td className="p-4">
                {product.quantity}
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="
                  p-10
                  text-center
                  text-zinc-500
                "
              >
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}