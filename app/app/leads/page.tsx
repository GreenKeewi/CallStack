"use client";

import { useMemo, useState } from "react";
import { ArrowRight, UserRoundCheck } from "lucide-react";
import { useDemoData } from "@/components/providers/demo-data-provider";

const statusColors: Record<string, string> = {
  new: "bg-indigo-600/20 text-indigo-200",
  contacted: "bg-amber-500/20 text-amber-200",
  converted: "bg-emerald-500/20 text-emerald-200",
  lost: "bg-red-500/20 text-red-200",
};

export default function LeadsPage() {
  const { leads, users, convertLeadToJob, assignLeadStaff, permissions } =
    useDemoData();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [staffFilter, setStaffFilter] = useState<string>("all");

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        return (
          (statusFilter === "all" || lead.status === statusFilter) &&
          (sourceFilter === "all" || lead.source === sourceFilter) &&
          (staffFilter === "all" || lead.assignedStaffId === staffFilter)
        );
      }),
    [leads, sourceFilter, staffFilter, statusFilter],
  );

  const sources = Array.from(new Set(leads.map((lead) => lead.source)));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Lead management</p>
          <h1 className="text-2xl font-semibold text-white">Leads</h1>
        </div>
        <div className="ml-auto flex flex-wrap gap-3 text-sm text-neutral-300">
          <label className="flex items-center gap-2">
            Status
            <select
              className="border border-neutral-800 bg-neutral-900 text-sm"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            Source
            <select
              className="border border-neutral-800 bg-neutral-900 text-sm"
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
            >
              <option value="all">All</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Staff
            <select
              className="border border-neutral-800 bg-neutral-900 text-sm"
              value={staffFilter}
              onChange={(event) => setStaffFilter(event.target.value)}
            >
              <option value="all">All</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
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
                <th>Source</th>
                <th>Status</th>
                <th>Assigned Staff</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                return (
                  <tr key={lead.id} className="text-sm">
                    <td className="font-semibold text-white">{lead.name}</td>
                    <td className="text-neutral-300">{lead.phone}</td>
                    <td className="text-neutral-300">{lead.email}</td>
                    <td className="text-neutral-300">{lead.source}</td>
                    <td>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[lead.status]}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <UserRoundCheck className="h-4 w-4 text-neutral-400" />
                        <select
                          className="border border-neutral-800 bg-neutral-900 text-xs"
                          value={lead.assignedStaffId}
                          onChange={(event) =>
                            assignLeadStaff(lead.id, event.target.value)
                          }
                        >
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="text-neutral-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-600/70">
                          View
                        </button>
                        <button
                          disabled={!permissions.convertLead}
                          onClick={() => convertLeadToJob(lead.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-neutral-800"
                        >
                          Convert
                          <ArrowRight className="h-3 w-3" />
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
