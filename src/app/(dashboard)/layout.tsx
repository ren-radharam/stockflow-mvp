import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-zinc-950
        via-[#0b1120]
        to-zinc-900
        text-white
      "
    >
      {/* Background Glow Effects */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-[-10%]
            top-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-10%]
            right-[-10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />
      </div>

      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </main>
  );
}