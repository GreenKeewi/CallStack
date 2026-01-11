import Link from "next/link";
import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="text-sm text-neutral-300">
            Login to access your Callstack workspace.
          </p>
        </div>
        <div className="card space-y-4">
          <label className="space-y-2 text-sm text-neutral-300">
            Email
            <input type="email" placeholder="you@business.com" />
          </label>
          <label className="space-y-2 text-sm text-neutral-300">
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Login
          </button>
          <p className="text-center text-xs text-neutral-400">
            Demo user?{" "}
            <Link href="/demo" className="text-indigo-300 underline">
              Explore the sandbox
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
