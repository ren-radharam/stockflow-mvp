import { AddProductDialog } from "@/components/products/add-product-dialog";
import { ProductsTable } from "@/components/products/products-table";

export default function ProductsPage() {
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
              text-3xl
              font-semibold
              tracking-tight
            "
          >
            Products
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage your inventory products.
          </p>
        </div>

        <AddProductDialog />
      </div>

      <ProductsTable />
    </div>
  );
}