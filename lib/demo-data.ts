import {
  Campaign,
  Customer,
  Job,
  Lead,
  LeadStatus,
  PermissionSet,
  Role,
  Tenant,
  User,
} from "./types";

const makeDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const tenantList: Tenant[] = [
  {
    id: "demo",
    name: "Demo Services",
    domain: "demo.callstack.app",
    createdAt: makeDate(120),
  },
  {
    id: "northstar",
    name: "Northstar Heating & Air",
    domain: "northstar.callstack.app",
    createdAt: makeDate(240),
  },
];

const users: User[] = [
  {
    id: "user-1",
    tenantId: "demo",
    email: "avery@demo.biz",
    name: "Avery Moss",
    role: "owner",
    createdAt: makeDate(90),
    lastLogin: makeDate(1),
  },
  {
    id: "user-2",
    tenantId: "demo",
    email: "jordan@demo.biz",
    name: "Jordan Lee",
    role: "staff",
    createdAt: makeDate(80),
    lastLogin: makeDate(2),
  },
  {
    id: "user-3",
    tenantId: "demo",
    email: "riley@demo.biz",
    name: "Riley Chen",
    role: "staff",
    createdAt: makeDate(70),
    lastLogin: makeDate(4),
  },
  {
    id: "user-4",
    tenantId: "northstar",
    email: "cora@northstar.biz",
    name: "Cora Fields",
    role: "owner",
    createdAt: makeDate(200),
    lastLogin: makeDate(3),
  },
  {
    id: "user-5",
    tenantId: "northstar",
    email: "luis@northstar.biz",
    name: "Luis Torres",
    role: "staff",
    createdAt: makeDate(180),
    lastLogin: makeDate(7),
  },
];

const leadSources = ["Website", "Campaign", "Referral", "Phone"];
const leadStatuses: LeadStatus[] = ["new", "contacted", "converted", "lost"];

const makeLead = (
  tenantId: string,
  idx: number,
  total: number,
  staff: User[],
): Lead => {
  const staffer = staff[idx % staff.length];
  return {
    id: `${tenantId}-lead-${idx + 1}`,
    tenantId,
    name: `Lead ${idx + 1}`,
    phone: `+1 (555) 01${(idx % 10).toString().padStart(2, "0")}-${(
      1000 +
      idx
    )
      .toString()
      .slice(-4)}`,
    email: `lead${idx + 1}@${tenantId}.mail`,
    source: leadSources[idx % leadSources.length],
    status: leadStatuses[idx % leadStatuses.length],
    assignedStaffId: staffer.id,
    createdAt: makeDate(total - idx),
    updatedAt: makeDate(Math.max(0, total - idx - 2)),
  };
};

const buildLeads = (tenantId: string, count: number, staff: User[]): Lead[] =>
  Array.from({ length: count }, (_, idx) =>
    makeLead(tenantId, idx, Math.max(count, 30), staff),
  );

const buildCustomers = (tenantId: string, count: number): Customer[] =>
  Array.from({ length: count }, (_, idx) => ({
    id: `${tenantId}-cust-${idx + 1}`,
    tenantId,
    name: `Customer ${idx + 1}`,
    phone: `+1 (555) 21${(idx % 10).toString().padStart(2, "0")}-${(
      4000 +
      idx
    )
      .toString()
      .slice(-4)}`,
    email: `customer${idx + 1}@${tenantId}.mail`,
    totalJobs: (idx % 6) + 1,
    lastContacted: makeDate(idx % 15),
  }));

const buildJobs = (
  tenantId: string,
  customers: Customer[],
  staff: User[],
): Job[] => {
  const staffPool =
    staff.length > 0
      ? staff
      : [
          {
            id: `${tenantId}-staff-placeholder`,
            tenantId,
            email: "placeholder@tenant.mail",
            name: "Unassigned",
            role: "staff",
            createdAt: makeDate(1),
            lastLogin: makeDate(1),
          },
        ];
  return Array.from({ length: 10 }, (_, idx) => {
    const customer = customers[idx % customers.length];
    const status: Job["status"] =
      idx % 2 === 0 ? "completed" : idx % 3 === 0 ? "in_progress" : "scheduled";
    const scheduledOffset = 14 - idx * 2;
    return {
      id: `${tenantId}-job-${idx + 1}`,
      tenantId,
      customerId: customer.id,
      assignedStaffId: staffPool[idx % staffPool.length]?.id ?? staffPool[0].id,
      title: `Job ${idx + 1}: ${customer.name}`,
      description: `Service visit for ${customer.name}`,
      scheduledAt: makeDate(Math.max(1, scheduledOffset)),
      status,
      createdAt: makeDate(20 + idx),
      updatedAt: makeDate(status === "completed" ? 1 : 3),
    };
  });
};

const buildCampaigns = (tenantId: string, leads: Lead[]): Campaign[] => [
  {
    id: `${tenantId}-campaign-1`,
    tenantId,
    name: "Semi-Annual Tune Up",
    type: "semi-annual",
    messageTemplate:
      "Schedule your seasonal maintenance to keep things running smoothly.",
    audienceLeadIds: leads.slice(0, 8).map((lead) => lead.id),
    scheduledAt: makeDate(-3),
    createdAt: makeDate(30),
    updatedAt: makeDate(1),
  },
  {
    id: `${tenantId}-campaign-2`,
    tenantId,
    name: "Loyalty Check-In",
    type: "semi-annual",
    messageTemplate: "We appreciate you—reply to book your next visit.",
    audienceLeadIds: leads.slice(8, 16).map((lead) => lead.id),
    scheduledAt: makeDate(14),
    createdAt: makeDate(60),
    updatedAt: makeDate(5),
  },
];

export const rolePermissions: Record<Role, PermissionSet> = {
  owner: {
    viewDashboard: true,
    viewLeads: true,
    editLeads: true,
    convertLead: true,
    viewCustomers: true,
    editCustomers: true,
    createJob: true,
    completeJob: true,
    manageCampaigns: true,
    inviteStaff: true,
    manageStaffRoles: true,
    exportData: true,
  },
  staff: {
    viewDashboard: true,
    viewLeads: true,
    editLeads: true,
    convertLead: true,
    viewCustomers: true,
    editCustomers: true,
    createJob: true,
    completeJob: true,
    manageCampaigns: false,
    inviteStaff: false,
    manageStaffRoles: false,
    exportData: false,
  },
  demo: {
    viewDashboard: true,
    viewLeads: true,
    editLeads: true,
    convertLead: true,
    viewCustomers: true,
    editCustomers: true,
    createJob: true,
    completeJob: true,
    manageCampaigns: true,
    inviteStaff: false,
    manageStaffRoles: false,
    exportData: true,
  },
};

export const buildInitialData = () => {
  const tenantData = tenantList.reduce<
    Record<
      string,
      {
        tenants: Tenant[];
        users: User[];
        leads: Lead[];
        customers: Customer[];
        jobs: Job[];
        campaigns: Campaign[];
      }
    >
  >((acc, tenant) => {
    const tenantUsers = users.filter((user) => user.tenantId === tenant.id);
    const leads =
      tenant.id === "demo"
        ? buildLeads(tenant.id, 25, tenantUsers)
        : buildLeads(tenant.id, 12, tenantUsers);
    const customers =
      tenant.id === "demo" ? buildCustomers(tenant.id, 15) : buildCustomers(tenant.id, 8);
    const jobs = buildJobs(tenant.id, customers, tenantUsers);
    const campaigns = buildCampaigns(tenant.id, leads);

    acc[tenant.id] = {
      tenants: tenantList,
      users,
      leads,
      customers,
      jobs,
      campaigns,
    };
    return acc;
  }, {});

  return tenantData;
};
