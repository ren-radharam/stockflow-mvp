export default function SettingsPage() {
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
            Settings
          </h1>
  
          <p className="mt-3 text-zinc-400">
            Manage your organization preferences.
          </p>
        </div>
  
        <div
          className="
            grid
            gap-6
            xl:grid-cols-2
          "
        >
          {/* Organization Info */}
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                text-white
              "
            >
              Organization
            </h2>
  
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-zinc-500">
                  Organization Name
                </p>
  
                <p className="mt-1 text-white">
                  StockFlow Inc.
                </p>
              </div>
  
              <div>
                <p className="text-sm text-zinc-500">
                  Plan
                </p>
  
                <p className="mt-1 text-white">
                  Free Plan
                </p>
              </div>
            </div>
          </div>
  
          {/* Inventory Preferences */}
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                text-white
              "
            >
              Inventory Preferences
            </h2>
  
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-zinc-500">
                  Default Low Stock Threshold
                </p>
  
                <p className="mt-1 text-white">
                  5 Units
                </p>
              </div>
  
              <div>
                <p className="text-sm text-zinc-500">
                  Currency
                </p>
  
                <p className="mt-1 text-white">
                  INR (₹)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }