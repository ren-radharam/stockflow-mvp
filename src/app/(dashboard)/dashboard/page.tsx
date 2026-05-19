import { cookies } from "next/headers";

async function getDashboardStats() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  const response = await fetch(
    "http://localhost:3000/api/dashboard/stats",
    {
      cache: "no-store",
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );

  if (!response.ok) {
    return {
      totalProducts: 0,
      lowStockProducts: 0,
      inventoryValue: 0,
    };
  }

  return response.json();
}

export default async function DashboardPage() {
  const stats =
    await getDashboardStats();

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
    </div>
  );
}