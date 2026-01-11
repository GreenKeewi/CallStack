export type Role = "owner" | "staff" | "demo";

export type Tenant = {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
};

export type User = {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  lastLogin: string;
};

export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export type Lead = {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: LeadStatus;
  assignedStaffId: string;
  createdAt: string;
  updatedAt: string;
};

export type Customer = {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email: string;
  totalJobs: number;
  lastContacted: string;
};

export type JobStatus = "scheduled" | "in_progress" | "completed";

export type Job = {
  id: string;
  tenantId: string;
  customerId: string;
  assignedStaffId: string;
  title: string;
  description: string;
  scheduledAt: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
};

export type CampaignType = "semi-annual";

export type Campaign = {
  id: string;
  tenantId: string;
  name: string;
  type: CampaignType;
  messageTemplate: string;
  audienceLeadIds: string[];
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
};

export type PermissionKey =
  | "viewDashboard"
  | "viewLeads"
  | "editLeads"
  | "convertLead"
  | "viewCustomers"
  | "editCustomers"
  | "createJob"
  | "completeJob"
  | "manageCampaigns"
  | "inviteStaff"
  | "manageStaffRoles"
  | "exportData";

export type PermissionSet = Record<PermissionKey, boolean>;
