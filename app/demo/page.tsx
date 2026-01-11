import Link from "next/link";
import { Megaphone, Sparkles, Users } from "lucide-react";
import { buildInitialData } from "@/lib/demo-data";

const demoData = buildInitialData().demo;

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-12 text-neutral-100 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="rounded-xl border border-indigo-800/50 bg-indigo-950/40 p-4 text-sm text-indigo-100">
          Demo Mode – No real messages or billing. Sandbox tenantId = <b>demo</b>.
        </div>

        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="pill w-fit">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              Seeded sandbox
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Explore the Callstack demo portal
            </h1>
            <p className="max-w-2xl text-neutral-300">
              Leads, jobs, customers, campaigns, and staff are preloaded. Switch to the
              app experience to interact with role-based UI and live-updating metrics.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700"
            >
              Open app
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-5 py-3 text-sm font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-900"
            >
              Create account
            </Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DemoStat label="Leads" value={demoData.leads.length} accent="text-indigo-200" />
          <DemoStat label="Customers" value={demoData.customers.length} accent="text-indigo-200" />
          <DemoStat
            label="Jobs"
            value={`${demoData.jobs.length} (5 completed)`}
            accent="text-emerald-300"
          />
          <DemoStat
            label="Campaigns"
            value={demoData.campaigns.length}
            accent="text-indigo-200"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Users className="h-4 w-4 text-indigo-300" />
              Roles
            </h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>Owner — Full control</li>
              <li>Staff — Limited access</li>
              <li>Demo — Sandbox access across features</li>
            </ul>
          </div>
          <div className="card space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Megaphone className="h-4 w-4 text-indigo-300" />
              Quick links
            </h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>Dashboard metrics stay in sync with job completions</li>
              <li>Campaign audience selections reference seeded leads</li>
              <li>Demo banner persists across app routes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div className="card space-y-2">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}
