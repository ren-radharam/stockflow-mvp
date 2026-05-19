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
        flex
        min-h-screen
        bg-black
        text-white
      "
    >
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