PROJECT NAME

Callstack
Tagline: “Every Missed Call Is a Booked Job”

SaaS portal for service businesses

Demo portal for exploration/testing

Multi-tenant, role-based, scalable

PROJECT INIT
npx shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=nova&baseColor=neutral&theme=indigo&iconLibrary=lucide&font=public-sans&menuAccent=subtle&menuColor=inverted&radius=medium&template=next" --template next


Framework: Next.js + shadCN UI (Nova)
Font: Public Sans
Primary Color: Indigo 600
Background: Neutral 950
Icons: Lucide
Database: Convex DB
Auth: Convex Auth

DESIGN SYSTEM

Color Palette

Primary: Indigo 600 / Hover: Indigo 700

Accent: Indigo 500

Background: Neutral 950

Surface/Card: Neutral 900

Text Primary: Neutral 100

Text Secondary: Neutral 400

Success: Emerald 500

Warning: Amber 500

Error: Red 500

Typography

Public Sans

Headings: 600 weight, line-height 1.3

Body: 400 weight, line-height 1.5

Radius

Medium for buttons, cards, modals, inputs

Button Styles

Primary: Indigo 600, hover Indigo 700, white text

Secondary: Neutral 800, hover Neutral 700

Card/Surface

Background: Neutral 900

Border: Neutral 800

Padding: p-4 default

INFORMATION ARCHITECTURE
Public Pages

/ — Landing Page

/demo — Demo portal with seeded data

/login — Login page

/signup — Signup page

Authenticated App Pages

/app/dashboard — Key metrics + overview

/app/leads — Lead management, statuses, filters

/app/customers — Customer profiles + history

/app/jobs — Job scheduling, completion

/app/campaigns — Semi-annual campaigns management

/app/staff — Staff management, permissions

/app/settings — Account, business info

AUTH & ROLES
Roles

Owner — Full control

Manager/Staff — Limited access

Demo — Sandbox access only

Permissions Table
Action	Owner	Staff	Demo
View Dashboard	✅	✅	✅
View Leads	✅	✅	✅
Edit Leads	✅	✅	✅ (demo only)
Convert Lead → Job	✅	✅	✅ (demo)
View Customers	✅	✅	✅ (demo)
Edit Customers	✅	✅	✅ (demo)
Create Job	✅	✅	✅ (demo)
Complete Job	✅	✅	✅ (demo)
Manage Campaigns	✅	❌	✅ (demo)
Invite Staff	✅	❌	❌
Manage Staff Roles	✅	❌	❌
Export Data	✅	❌	✅ (demo, fake data)
DEMO MODE

Sandbox data:

Leads, jobs, customers, campaigns, staff

Demo actions modify data simulated in real-time

Demo banner: “Demo Mode – No real messages or billing”

Demo tenant: businessId = "demo"

Demo users can interact with all features except billing or Twilio connections

CONVEX DB SCHEMA
Tenants
tenants = {
  id: string, // businessId
  name: string,
  domain: string,
  createdAt: datetime
}

Users
users = {
  id: string,
  tenantId: string, // FK tenants.id
  email: string,
  name: string,
  role: enum("owner", "staff", "demo"),
  createdAt: datetime,
  lastLogin: datetime
}

Leads
leads = {
  id: string,
  tenantId: string,
  name: string,
  phone: string,
  email: string,
  source: string, // eg website, campaign
  status: enum("new", "contacted", "converted", "lost"),
  assignedStaffId: string,
  createdAt: datetime,
  updatedAt: datetime
}

Customers
customers = {
  id: string,
  tenantId: string,
  name: string,
  phone: string,
  email: string,
  totalJobs: int,
  lastContacted: datetime
}

Jobs
jobs = {
  id: string,
  tenantId: string,
  customerId: string,
  assignedStaffId: string,
  title: string,
  description: string,
  scheduledAt: datetime,
  status: enum("scheduled", "in_progress", "completed"),
  createdAt: datetime,
  updatedAt: datetime
}

Campaigns
campaigns = {
  id: string,
  tenantId: string,
  name: string,
  type: enum("semi-annual"),
  messageTemplate: string,
  audienceLeadIds: [string],
  scheduledAt: datetime,
  createdAt: datetime,
  updatedAt: datetime
}

StaffRoles / Permissions
permissions = {
  id: string,
  tenantId: string,
  userId: string,
  role: enum("owner","staff"),
  allowedActions: [string] // granular control
}

DEMO DATA SEED

Leads: 25

Customers: 15

Jobs: 10 (5 completed)

Campaigns: 2

Staff: 3 demo users

Actions: Marking jobs complete modifies job status + triggers fake campaign metrics

PAGE / COMPONENT DETAILS
1. Dashboard

Cards:

Leads Generated

Jobs Scheduled

Jobs Completed

Active Campaigns

Charts (Recharts):

Leads over 7/30/90 days

Jobs completed over time

Quick actions:

Create Job

Launch Campaign

2. Leads

Table columns:

Name, Phone, Email, Source, Status, Assigned Staff, CreatedAt

Actions:

View lead details

Convert → Job

Assign staff

Filters:

Status, Staff, Source

3. Customers

Table columns:

Name, Phone, Email, Total Jobs, Last Contacted

Actions:

View profile

Edit contact info

Link to jobs/campaigns

4. Jobs

Table columns:

Title, Customer, Staff, Date/Time, Status

Actions:

Mark as Completed

Reassign staff

Filtering & sorting by date, status, staff

5. Campaigns

Semi-annual campaigns only

Fields:

Name, Message, Audience (lead selection)

Schedule date

Actions:

Edit, Preview, Delete

Track metrics (demo only)

6. Staff Management

Table:

Name, Email, Role, Status

Actions:

Invite staff (email)

Assign role

Remove access

Role-based UI: Only owners see invite/remove

7. Settings

Business info: Name, domain

Profile info: Name, email

Theme toggle: Dark / Light

Demo banner: Displayed if tenant = demo

UI COMPONENTS

Navbar: App logo, user menu, logout

Sidebar: Dashboard, Leads, Customers, Jobs, Campaigns, Staff, Settings

Tables: Tailwind + shadCN Table components, sortable, filterable

Buttons: Primary (indigo), secondary (neutral), disabled state

Modals: Add/Edit Lead, Add Job, Add Campaign, Invite Staff

Notifications: Toasts on action success/fail

Cards: For metrics, job summary, campaign overview

Charts: Recharts with tooltips, legends, filters

MULTI-TENANT LOGIC

tenantId included in every DB table

Demo tenant: businessId = demo

Every query scoped by tenantId → prevents cross-tenant data leaks

Demo tenant actions modify only seeded data

INTERACTIONS

Mark Job Complete → updates job.status, updates dashboard metrics, triggers demo campaign metrics update

Assign Staff → updates lead/job assignments, visible on tables

Edit Campaign → updates message + audience list

Demo portal → simulates full functionality, no external API calls

Role-based UI → buttons and modals hidden/disabled according to permissions

DEPLOYMENT

Vercel recommended for Next.js

Convex backend hosted with DB + Auth

All styles and components built using shadCN Nova preset

Demo tenant included by default
