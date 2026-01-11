"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { buildInitialData, rolePermissions } from "@/lib/demo-data";
import {
  Campaign,
  Customer,
  Job,
  Lead,
  PermissionSet,
  Role,
  Tenant,
  User,
} from "@/lib/types";

type TenantSnapshot = {
  tenants: Tenant[];
  users: User[];
  leads: Lead[];
  customers: Customer[];
  jobs: Job[];
  campaigns: Campaign[];
};

type DemoDataContextValue = {
  tenantId: string;
  role: Role;
  permissions: PermissionSet;
  tenants: Tenant[];
  users: User[];
  leads: Lead[];
  customers: Customer[];
  jobs: Job[];
  campaigns: Campaign[];
  setTenantId: (tenantId: string) => void;
  setRole: (role: Role) => void;
  markJobComplete: (jobId: string) => void;
  convertLeadToJob: (leadId: string) => void;
  assignLeadStaff: (leadId: string, staffId: string) => void;
  assignJobStaff: (jobId: string, staffId: string) => void;
};

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

const initialData = buildInitialData();

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantId] = useState<string>("demo");
  const [role, setRole] = useState<Role>("demo");
  const [data, setData] = useState<Record<string, TenantSnapshot>>(initialData);

  const currentTenantData = data[tenantId] ?? data.demo;

  const markJobComplete = (jobId: string) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const tenant = next[tenantId];
      if (!tenant) return prev;
      tenant.jobs = tenant.jobs.map((job) =>
        job.id === jobId
          ? { ...job, status: "completed", updatedAt: new Date().toISOString() }
          : job,
      );
      return next;
    });
  };

  const assignLeadStaff = (leadId: string, staffId: string) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const tenant = next[tenantId];
      if (!tenant) return prev;
      tenant.leads = tenant.leads.map((lead) =>
        lead.id === leadId
          ? { ...lead, assignedStaffId: staffId, updatedAt: new Date().toISOString() }
          : lead,
      );
      return next;
    });
  };

  const convertLeadToJob = (leadId: string) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const tenant = next[tenantId];
      if (!tenant) return prev;
      const lead = tenant.leads.find((item) => item.id === leadId);
      if (!lead) return prev;
      const now = new Date().toISOString();

      tenant.leads = tenant.leads.map((item) =>
        item.id === leadId ? { ...item, status: "converted", updatedAt: now } : item,
      );

      const existingCustomer = tenant.customers.find(
        (customer) => customer.email === lead.email,
      );

      let customerId = existingCustomer?.id;
      if (!existingCustomer) {
        const newCustomer: Customer = {
          id: `${tenantId}-customer-${tenant.customers.length + 1}`,
          tenantId,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          totalJobs: 1,
          lastContacted: now,
        };
        tenant.customers = [newCustomer, ...tenant.customers];
        customerId = newCustomer.id;
      } else {
        tenant.customers = tenant.customers.map((customer) =>
          customer.id === existingCustomer.id
            ? { ...customer, totalJobs: customer.totalJobs + 1, lastContacted: now }
            : customer,
        );
      }

      const newJob: Job = {
        id: `${tenantId}-job-${tenant.jobs.length + 1}-converted`,
        tenantId,
        customerId: customerId ?? tenant.customers[0]?.id ?? lead.id,
        assignedStaffId: lead.assignedStaffId,
        title: `Job for ${lead.name}`,
        description: `Converted from lead ${lead.name}`,
        scheduledAt: now,
        status: "scheduled",
        createdAt: now,
        updatedAt: now,
      };

      tenant.jobs = [newJob, ...tenant.jobs];

      return next;
    });
  };

  const assignJobStaff = (jobId: string, staffId: string) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const tenant = next[tenantId];
      if (!tenant) return prev;
      tenant.jobs = tenant.jobs.map((job) =>
        job.id === jobId
          ? { ...job, assignedStaffId: staffId, updatedAt: new Date().toISOString() }
          : job,
      );
      return next;
    });
  };

  const tenants = currentTenantData.tenants;
  const users = currentTenantData.users.filter((user) => user.tenantId === tenantId);
  const leads = currentTenantData.leads.filter((lead) => lead.tenantId === tenantId);
  const customers = currentTenantData.customers.filter(
    (customer) => customer.tenantId === tenantId,
  );
  const jobs = currentTenantData.jobs.filter((job) => job.tenantId === tenantId);
  const campaigns = currentTenantData.campaigns.filter(
    (campaign) => campaign.tenantId === tenantId,
  );

  const value: DemoDataContextValue = {
    tenantId,
    role,
    permissions: rolePermissions[role],
    tenants,
    users,
    leads,
    customers,
    jobs,
    campaigns,
    setTenantId,
    setRole,
    markJobComplete,
    convertLeadToJob,
    assignLeadStaff,
    assignJobStaff,
  };

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
}

export const useDemoData = () => {
  const ctx = useContext(DemoDataContext);
  if (!ctx) {
    throw new Error("useDemoData must be used within DemoDataProvider");
  }
  return ctx;
};
