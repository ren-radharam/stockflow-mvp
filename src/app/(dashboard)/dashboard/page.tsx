import { cookies } from "next/headers";

import { InventoryChart } from "@/components/dashboard/inventory-chart";

async function getDashboardData() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  const statsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/stats`,
    {
      cache: "no-store",
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );

  const productsResponse = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );

  const stats = statsResponse.ok
    ? await statsResponse.json()
    : {
        totalProducts: 0,
        lowStockProducts: 0,
        inventoryValue: 0,
      };

  const productsData =
  productsResponse.ok
    ? await productsResponse.json()
    : [];
    
  const products =
    Array.isArray(productsData)
      ? productsData
      : productsData.products || [];

  return {
    stats,
    products,
  };
}

export default async function DashboardPage() {
  const { stats, products } =
    await getDashboardData();

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
    },
    {
      label: "Low Stock",
      value: stats.lowStockProducts,
    },
    {
      label: "Inventory Quantity",
      value: stats.inventoryValue,
    },
    {
      label: "Monthly Sales",
      value: "—",
    },
  ];

  const chartData =
    products.map((product: any) => ({
      name: product.name,
      quantity: product.quantity,
    }));

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="
            text-5xl
            font-bold
            tracking-tight
            text-white
          "
        >
          Welcome back 👋
        </h1>

        <p className="mt-3 text-zinc-400">
          Here’s an overview of your inventory.
        </p>
      </div>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {cards.map((card) => (
          <div
            key={card.label}
            className="
              group
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-blue-500/30
              hover:bg-white/[0.05]
              hover:shadow-2xl
              hover:shadow-blue-500/10
            "
          >
            <p className="text-sm text-zinc-400">
              {card.label}
            </p>

            <h2
              className="
                mt-4
                text-5xl
                font-bold
                tracking-tight
                text-white
              "
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <InventoryChart
        data={chartData}
      />
    </div>
  );
}