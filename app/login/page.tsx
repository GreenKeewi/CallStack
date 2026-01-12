import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_45%)]" />
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
