"use client";

import { useMemo } from "react";
import { ArrowRight, Edit3 } from "lucide-react";
import Link from "next/link";
import { useDemoData } from "@/components/providers/demo-data-provider";

export default function CustomersPage() {
  const { customers } = useDemoData();

  const sorted = useMemo(
    () =>
      [...customers].sort(
        (a, b) =>
          new Date(b.lastContacted).getTime() - new Date(a.lastContacted).getTime(),
      ),
    [customers],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Customer profiles</p>
          <h1 className="text-2xl font-semibold text-white">Customers</h1>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total Jobs</th>
                <th>Last Contacted</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((customer) => (
                <tr key={customer.id} className="text-sm">
                  <td className="font-semibold text-white">{customer.name}</td>
                  <td className="text-neutral-300">{customer.phone}</td>
                  <td className="text-neutral-300">{customer.email}</td>
                  <td className="text-neutral-300">{customer.totalJobs}</td>
                  <td className="text-neutral-400">
                    {new Date(customer.lastContacted).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-600/70">
                        <Edit3 className="h-3 w-3" />
                        Edit
                      </button>
                      <Link
                        href="/app/jobs"
                        className="inline-flex items-center gap-1 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-600/70 hover:bg-neutral-800"
                      >
                        Jobs
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
