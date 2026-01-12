import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_45%)]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 lg:px-12">
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            <div className="space-y-4">
              <div className="text-8xl font-bold text-indigo-500/30">404</div>
              <h1 className="text-4xl font-semibold text-neutral-100">
                Page not found
              </h1>
              <p className="max-w-md text-lg text-neutral-400">
                Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700"
              >
                <Home className="h-4 w-4" />
                Go to home
              </Link>
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-800"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
