"use client";

import { Megaphone, PencilLine, Play, Trash2 } from "lucide-react";
import { useDemoData } from "@/components/providers/demo-data-provider";

export default function CampaignsPage() {
  const { campaigns, leads, permissions } = useDemoData();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-neutral-400">Semi-annual outreach</p>
          <h1 className="text-2xl font-semibold text-white">Campaigns</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((campaign) => {
          const audience = leads.filter((lead) =>
            campaign.audienceLeadIds.includes(lead.id),
          );
          return (
            <div key={campaign.id} className="card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-indigo-600/20 p-2 text-indigo-200">
                    <Megaphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-indigo-200">
                      {campaign.type}
                    </p>
                    <h2 className="text-lg font-semibold text-white">{campaign.name}</h2>
                  </div>
                </div>
                <span className="pill">{audience.length} recipients</span>
              </div>
              <p className="rounded-lg border border-neutral-900 bg-neutral-900/70 p-3 text-sm text-neutral-200">
                {campaign.messageTemplate}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300">
                <span className="pill">
                  Scheduled: {new Date(campaign.scheduledAt).toLocaleDateString()}
                </span>
                <span className="pill">
                  Updated: {new Date(campaign.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={!permissions.manageCampaigns}
                  className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-indigo-600/70 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PencilLine className="h-3 w-3" />
                  Edit
                </button>
                <button className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700">
                  <Play className="h-3 w-3" />
                  Preview
                </button>
                <button
                  disabled={!permissions.manageCampaigns}
                  className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 px-3 py-2 text-xs font-semibold text-white transition hover:border-red-500/70 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
