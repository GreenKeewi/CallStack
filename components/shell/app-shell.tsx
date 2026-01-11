"use client";

import {
  Briefcase,
  LayoutDashboard,
  Megaphone,
  NotebookTabs,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoData } from "@/components/providers/demo-data-provider";

type AppShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/app/leads", icon: NotebookTabs },
  { name: "Customers", href: "/app/customers", icon: Users },
  { name: "Jobs", href: "/app/jobs", icon: Briefcase },
  { name: "Campaigns", href: "/app/campaigns", icon: Megaphone },
  { name: "Staff", href: "/app/staff", icon: ShieldCheck },
  { name: "Settings", href: "/app/settings", icon: Settings },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { tenantId, setTenantId, role, setRole, permissions, tenants } = useDemoData();

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <aside className="hidden w-64 flex-col border-r border-neutral-900 bg-neutral-950/70 p-4 lg:flex">
        <Link href="/app/dashboard" className="mb-6 inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            CS
          </div>
          <div>
            <p className="text-sm text-neutral-300">Callstack</p>
            <p className="text-lg font-semibold text-white">Service HQ</p>
          </div>
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-neutral-900 text-white border border-neutral-800"
                    : "text-neutral-300 hover:bg-neutral-900/70"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-lg border border-neutral-900 bg-neutral-900/60 p-3 text-xs text-neutral-300">
          <p className="font-semibold text-white">Permissions</p>
          <p>Role: {role}</p>
          <p>
            Can manage campaigns:{" "}
            <span className={permissions.manageCampaigns ? "text-emerald-400" : "text-red-400"}>
              {permissions.manageCampaigns ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex flex-col gap-3 border-b border-neutral-900 bg-neutral-950/80 px-5 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/app/dashboard" className="text-xl font-semibold text-white">
              Callstack Portal
            </Link>
            <span className="pill">tenantId: {tenantId}</span>
            <span className="pill">role: {role}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              Tenant
              <select
                className="border border-neutral-800 bg-neutral-900 text-sm"
                value={tenantId}
                onChange={(event) => setTenantId(event.target.value)}
              >
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              Role
              <select
                className="border border-neutral-800 bg-neutral-900 text-sm"
                value={role}
                onChange={(event) => setRole(event.target.value as typeof role)}
              >
                <option value="demo">Demo</option>
                <option value="owner">Owner</option>
                <option value="staff">Staff</option>
              </select>
            </label>
            <div className="ml-auto flex gap-2 text-sm">
              <Link
                href="/demo"
                className="inline-flex items-center rounded-lg border border-neutral-800 px-3 py-2 font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-900"
              >
                Demo banner
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
              >
                Logout
              </Link>
            </div>
          </div>
        </header>
        {tenantId === "demo" && (
          <div className="flex items-center gap-3 border-b border-indigo-800/60 bg-indigo-950/40 px-5 py-3 text-sm text-indigo-100">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
            Demo Mode – No real messages or billing. Actions update seeded data in
            real-time.
          </div>
        )}
        <main className="flex-1 space-y-6 px-5 py-6">{children}</main>
      </div>
    </div>
  );
}
