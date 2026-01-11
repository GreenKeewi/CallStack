"use client";

import { Moon, Save } from "lucide-react";
import { useDemoData } from "@/components/providers/demo-data-provider";

export default function SettingsPage() {
  const { tenants, tenantId, users } = useDemoData();
  const tenant = tenants.find((item) => item.id === tenantId);
  const primaryUser = users[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-400">Preferences</p>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700">
          <Save className="h-4 w-4" />
          Save changes
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-4">
          <div>
            <p className="text-sm text-neutral-400">Business info</p>
            <h2 className="text-lg font-semibold text-white">{tenant?.name}</h2>
          </div>
          <label className="space-y-2 text-sm text-neutral-300">
            Business name
            <input defaultValue={tenant?.name} />
          </label>
          <label className="space-y-2 text-sm text-neutral-300">
            Domain
            <input defaultValue={tenant?.domain} />
          </label>
        </div>

        <div className="card space-y-4">
          <div>
            <p className="text-sm text-neutral-400">Profile</p>
            <h2 className="text-lg font-semibold text-white">
              {primaryUser?.name ?? "User"}
            </h2>
          </div>
          <label className="space-y-2 text-sm text-neutral-300">
            Name
            <input defaultValue={primaryUser?.name} />
          </label>
          <label className="space-y-2 text-sm text-neutral-300">
            Email
            <input defaultValue={primaryUser?.email} />
          </label>
          <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
            <div>
              <p className="text-sm font-semibold text-white">Theme</p>
              <p className="text-xs text-neutral-400">Dark / Light</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-900">
              <Moon className="h-4 w-4" />
              Toggle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
