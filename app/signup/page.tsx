import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
            <UserRoundPlus className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Create your account</h1>
          <p className="text-sm text-neutral-300">
            Get started with multi-tenant, role-aware access.
          </p>
        </div>
        <div className="card space-y-4">
          <label className="space-y-2 text-sm text-neutral-300">
            Name
            <input type="text" placeholder="Full name" />
          </label>
          <label className="space-y-2 text-sm text-neutral-300">
            Email
            <input type="email" placeholder="you@business.com" />
          </label>
          <label className="space-y-2 text-sm text-neutral-300">
            Password
            <input type="password" placeholder="Create a password" />
          </label>
          <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Sign up
          </button>
          <p className="text-center text-xs text-neutral-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-300 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
