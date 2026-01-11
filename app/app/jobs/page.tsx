"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { useDemoData } from "@/components/providers/demo-data-provider";

const statusColor: Record<string, string> = {
  scheduled: "bg-indigo-600/20 text-indigo-200",
  in_progress: "bg-amber-500/20 text-amber-200",
  completed: "bg-emerald-500/20 text-emerald-200",
};

export default function JobsPage() {
  const { jobs, customers, users, markJobComplete, assignJobStaff, permissions } =
    useDemoData();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [staffFilter, setStaffFilter] = useState<string>("all");

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        return (
          (statusFilter === "all" || job.status === statusFilter) &&
          (staffFilter === "all" || job.assignedStaffId === staffFilter)
        );
      }),
    [jobs, staffFilter, statusFilter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Scheduling & completion</p>
          <h1 className="text-2xl font-semibold text-white">Jobs</h1>
        </div>
        <div className="ml-auto flex gap-3 text-sm text-neutral-300">
          <label className="flex items-center gap-2">
            Status
            <select
              className="border border-neutral-800 bg-neutral-900 text-sm"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
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
                <th>Title</th>
                <th>Customer</th>
                <th>Staff</th>
                <th>Date / Time</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => {
                const customer = customers.find((c) => c.id === job.customerId);
                const staff = users.find((user) => user.id === job.assignedStaffId);
                return (
                  <tr key={job.id} className="text-sm">
                    <td className="font-semibold text-white">{job.title}</td>
                    <td className="text-neutral-300">{customer?.name ?? "—"}</td>
                    <td className="text-neutral-300">{staff?.name ?? "Unassigned"}</td>
                    <td className="text-neutral-400">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="h-4 w-4" />
                        {new Date(job.scheduledAt).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor[job.status]}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <select
                          className="border border-neutral-800 bg-neutral-900 text-xs"
                          value={job.assignedStaffId}
                          onChange={(event) => assignJobStaff(job.id, event.target.value)}
                        >
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                        <button
                          disabled={!permissions.completeJob || job.status === "completed"}
                          onClick={() => markJobComplete(job.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-800"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Mark Complete
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
