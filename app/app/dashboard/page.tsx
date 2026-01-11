"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { useDemoData } from "@/components/providers/demo-data-provider";

const timeBuckets = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

const formatDateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function DashboardPage() {
  const { leads, jobs, campaigns, permissions } = useDemoData();

  const stats = useMemo(() => {
    const leadsGenerated = leads.length;
    const jobsCompleted = jobs.filter((job) => job.status === "completed").length;
    const jobsScheduled = jobs.filter((job) => job.status !== "completed").length;
    const activeCampaigns = campaigns.length;
    return { leadsGenerated, jobsCompleted, jobsScheduled, activeCampaigns };
  }, [campaigns, jobs, leads]);

  const trendData = useMemo(
    () =>
      timeBuckets.map((bucket) => {
        const leadsCount = leads.filter((lead) => {
          const diff =
            (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24);
          return diff <= bucket.days;
        }).length;
        const jobsCount = jobs.filter((job) => {
          const diff =
            (Date.now() - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
          return diff <= bucket.days && job.status === "completed";
        }).length;
        return { label: bucket.label, leads: leadsCount, jobs: jobsCount };
      }),
    [jobs, leads],
  );

  const jobTimeline = useMemo(() => {
    const sorted = [...jobs]
      .filter((job) => job.status === "completed")
      .sort(
        (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      )
      .slice(-8);
    return sorted.map((job) => ({
      name: formatDateLabel(job.updatedAt),
      completed: 1,
    }));
  }, [jobs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Dashboard</p>
          <h1 className="text-2xl font-semibold text-white">Key metrics</h1>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Link
            href="/app/jobs"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Create Job
          </Link>
          <Link
            href="/app/campaigns"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-800"
          >
            Launch Campaign
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leads Generated" value={stats.leadsGenerated} delta="+12% vs last period" />
        <StatCard label="Jobs Scheduled" value={stats.jobsScheduled} delta="+4% vs last week" />
        <StatCard label="Jobs Completed" value={stats.jobsCompleted} delta="+9% vs last week" />
        <StatCard label="Active Campaigns" value={stats.activeCampaigns} delta="Running 2 sequences" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Trends</p>
              <h2 className="text-lg font-semibold text-white">Leads & Jobs</h2>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="label" stroke="#a3a3a3" />
                <Tooltip
                  contentStyle={{
                    background: "#0f1115",
                    border: "1px solid #262626",
                    borderRadius: 12,
                    color: "#f5f5f5",
                  }}
                />
                <Bar dataKey="leads" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="jobs" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Jobs completed over time</p>
              <h2 className="text-lg font-semibold text-white">Completion velocity</h2>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={jobTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#a3a3a3" />
                <Tooltip
                  contentStyle={{
                    background: "#0f1115",
                    border: "1px solid #262626",
                    borderRadius: 12,
                    color: "#f5f5f5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#22c55e"
                  fill="#22c55e33"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Data export</p>
          <p className="text-sm text-neutral-300">
            Demo-only export delivers safe sample data for reporting.
          </p>
        </div>
        <button
          disabled={!permissions.exportData}
          className="ml-auto inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-indigo-600/80 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Export data
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: number;
  delta: string;
}) {
  return (
    <div className="card space-y-3">
      <p className="text-sm text-neutral-400">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
          <ArrowUpRight className="h-4 w-4" />
          {delta}
        </span>
      </div>
    </div>
  );
}
