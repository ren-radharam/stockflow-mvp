export function Topbar() {
    return (
      <header
        className="
          flex
          h-16
          items-center
          justify-between
          border-b
          border-white/10
          bg-black/30
          px-6
          backdrop-blur-xl
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Dashboard
          </h2>
  
          <p className="text-sm text-zinc-500">
            Manage your inventory
          </p>
        </div>
  
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              font-medium
              text-black
            "
          >
            R
          </div>
        </div>
      </header>
    );
}