"use client";

import { ShieldCheck, UserPlus, X } from "lucide-react";
import { useDemoData } from "@/components/providers/demo-data-provider";
import { useEffect, useState } from "react";

export default function StaffPage() {
  const { users, permissions } = useDemoData();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Roles & access</p>
          <h1 className="text-2xl font-semibold text-white">Staff</h1>
        </div>
        <button
          disabled={!permissions.inviteStaff}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-neutral-800"
        >
          <UserPlus className="h-4 w-4" />
          Invite staff
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isActive =
                  (now - new Date(user.lastLogin).getTime()) / 86400000 < 14;
                return (
                  <tr key={user.id} className="text-sm">
                    <td className="font-semibold text-white">{user.name}</td>
                    <td className="text-neutral-300">{user.email}</td>
                    <td className="text-neutral-300 capitalize">{user.role}</td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          isActive
                            ? "bg-emerald-500/15 text-emerald-200"
                            : "bg-neutral-800 text-neutral-300"
                        }`}
                      >
                        <ShieldCheck className="h-3 w-3" />
                        {isActive ? "Active" : "Dormant"}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={!permissions.manageStaffRoles}
                          className="rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-600/70 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Assign role
                        </button>
                        <button
                          disabled={!permissions.manageStaffRoles}
                          className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-red-500/70 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <X className="h-3 w-3" />
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
