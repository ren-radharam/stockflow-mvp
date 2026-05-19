"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { AddProductDialog } from "@/components/products/add-product-dialog";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "/api/products"
      );

      const data =
        await response.json();

      setProducts(data.products || []);
    } catch {
      toast.error(
        "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    id: string
  ) {
    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !== id
        )
      );

      toast.success(
        "Product deleted"
      );
    } catch {
      toast.error(
        "Failed to delete product"
      );
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            Products
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage your inventory
            products.
          </p>
        </div>

        <AddProductDialog />
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/40
          backdrop-blur-xl
        "
      >
        <table className="w-full">
          <thead
            className="
              border-b
              border-white/10
            "
          >
            <tr>
              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-medium
                  text-zinc-300
                "
              >
                Product
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-medium
                  text-zinc-300
                "
              >
                SKU
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-medium
                  text-zinc-300
                "
              >
                Quantity
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-sm
                  font-medium
                  text-zinc-300
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="
                    px-6
                    py-10
                    text-center
                    text-zinc-500
                  "
                >
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="
                    px-6
                    py-10
                    text-center
                    text-zinc-500
                  "
                >
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="
                    border-b
                    border-white/5
                    transition
                    hover:bg-white/[0.02]
                  "
                >
                  <td
                    className="
                      px-6
                      py-4
                      text-white
                    "
                  >
                    {product.name}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-zinc-400
                    "
                  >
                    {product.sku}
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                    "
                  >
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          product.quantity <= 5
                            ? "bg-red-500/10 text-red-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }
                      `}
                    >
                      {product.quantity <= 5
                        ? `Low (${product.quantity})`
                        : product.quantity}
                    </span>
                  </td>

                  <td
                    className="
                      px-6
                      py-4
                      text-right
                    "
                  >
                    <button
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      className="
                        text-sm
                        text-red-400
                        transition
                        hover:text-red-300
                      "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}