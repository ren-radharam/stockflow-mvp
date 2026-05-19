import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-black
        px-4
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,#1a1a2e,transparent_40%)]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          right-0
          top-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </main>
  );
}