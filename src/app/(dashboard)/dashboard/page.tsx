export default function DashboardPage() {
    return (
      <div className="space-y-8">
        <div>
          <h1
            className="
              text-3xl
              font-semibold
              tracking-tight
            "
          >
            Welcome back 👋
          </h1>
  
          <p className="mt-2 text-zinc-500">
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
          {[
            "Total Products",
            "Low Stock",
            "Inventory Value",
            "Monthly Sales",
          ].map((card) => (
            <div
              key={card}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
                backdrop-blur-xl
              "
            >
              <p className="text-sm text-zinc-500">
                {card}
              </p>
  
              <h2
                className="
                  mt-4
                  text-3xl
                  font-semibold
                "
              >
                0
              </h2>
            </div>
          ))}
        </div>
      </div>
    );
}