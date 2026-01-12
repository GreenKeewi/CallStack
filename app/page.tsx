import { ArrowRight, BarChart3, Shield, PhoneCall, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Lead intelligence",
    description:
      "Track leads, assignments, and conversions with role-aware controls and demo-safe updates.",
    icon: Users,
  },
  {
    title: "Job scheduling",
    description:
      "Schedule, reassign, and complete jobs while keeping dashboards in sync in real time.",
    icon: PhoneCall,
  },
  {
    title: "Campaigns & metrics",
    description:
      "Launch semi-annual campaigns and see performance at a glance with built-in charts.",
    icon: BarChart3,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_45%)]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 lg:px-12">
          <header className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <span className="pill w-fit">
                <Shield className="h-4 w-4 text-indigo-400" />
                Multi-tenant, role-based
              </span>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] text-white sm:text-5xl">
                Every Missed Call Is a Booked Job
              </h1>
              <p className="max-w-2xl text-lg text-neutral-300">
                Callstack is a SaaS portal for service businesses. Explore the demo
                tenant, switch roles, and see how dashboard metrics, leads, jobs, and
                campaigns stay in sync.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/app/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700"
                >
                  Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-800"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="card w-full max-w-xl space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-neutral-400">Demo tenant</p>
                  <p className="text-2xl font-semibold text-white">businessId = demo</p>
                </div>
                <div className="rounded-full bg-indigo-600/20 px-3 py-1 text-xs font-semibold text-indigo-200">
                  Sandbox
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-neutral-900 p-3">
                  <p className="text-xs text-neutral-400">Leads</p>
                  <p className="text-2xl font-semibold">25</p>
                  <p className="text-xs text-emerald-400">Demo-safe edits</p>
                </div>
                <div className="rounded-lg bg-neutral-900 p-3">
                  <p className="text-xs text-neutral-400">Jobs</p>
                  <p className="text-2xl font-semibold">10</p>
                  <p className="text-xs text-emerald-400">5 completed</p>
                </div>
                <div className="rounded-lg bg-neutral-900 p-3">
                  <p className="text-xs text-neutral-400">Customers</p>
                  <p className="text-2xl font-semibold">15</p>
                  <p className="text-xs text-indigo-300">Profiles + history</p>
                </div>
                <div className="rounded-lg bg-neutral-900 p-3">
                  <p className="text-xs text-neutral-400">Campaigns</p>
                  <p className="text-2xl font-semibold">2</p>
                  <p className="text-xs text-indigo-300">Semi-annual</p>
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-indigo-600/15 p-2 text-indigo-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-neutral-300">{feature.description}</p>
              </div>
            ))}
          </section>

          <section className="card flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="pill mb-3 w-fit">
                <Shield className="h-4 w-4 text-indigo-400" />
                Demo Mode – No real messages or billing
              </p>
              <h3 className="text-2xl font-semibold text-white">
                Built for owners, managers, and demo teams
              </h3>
              <p className="max-w-2xl text-sm text-neutral-300">
                Role-based UI ensures owners can manage staff, campaigns, and exports,
                while staff focus on leads and jobs. Demo users exercise every feature in
                a safe sandbox with seeded data.
              </p>
            </div>
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700"
            >
              Explore dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
