import {
  ActivityItem,
  CalendarEvent,
  ChatMessage,
  Column,
  Conversation,
  Customer,
  Order,
  Task,
  TeamMember,
} from "@/types";

export const STATS = {
  revenue: { value: 1245000, change: 12.4, trend: "up" as const },
  users: { value: 48230, change: 8.1, trend: "up" as const },
  newCustomers: { value: 1820, change: -3.2, trend: "down" as const },
  growthRate: { value: 24.6, change: 4.7, trend: "up" as const },
};

export const REVENUE_DATA = [
  { month: "Jan", revenue: 82000, profit: 24000 },
  { month: "Feb", revenue: 91000, profit: 27000 },
  { month: "Mar", revenue: 112000, profit: 35000 },
  { month: "Apr", revenue: 94000, profit: 29000 },
  { month: "May", revenue: 101000, profit: 31000 },
  { month: "Jun", revenue: 107000, profit: 33000 },
  { month: "Jul", revenue: 118000, profit: 39000 },
  { month: "Aug", revenue: 156000, profit: 52000 },
  { month: "Sep", revenue: 128000, profit: 42000 },
  { month: "Oct", revenue: 68000, profit: 18000 },
  { month: "Nov", revenue: 142000, profit: 48000 },
  { month: "Dec", revenue: 121000, profit: 40000 },
];

export const USER_GROWTH_DATA = [
  { month: "Jan", users: 12400, active: 8200 },
  { month: "Feb", users: 14100, active: 9100 },
  { month: "Mar", users: 16800, active: 10600 },
  { month: "Apr", users: 19200, active: 12300 },
  { month: "May", users: 22500, active: 14800 },
  { month: "Jun", users: 26100, active: 17200 },
  { month: "Jul", users: 30800, active: 20100 },
  { month: "Aug", users: 35400, active: 23800 },
  { month: "Sep", users: 38900, active: 26200 },
  { month: "Oct", users: 41200, active: 27900 },
  { month: "Nov", users: 45100, active: 30400 },
  { month: "Dec", users: 48230, active: 32700 },
];

export const SALES_DISTRIBUTION = [
  { name: "Software", value: 38, color: "#3B82F6" },
  { name: "Hardware", value: 22, color: "#8B5CF6" },
  { name: "Services", value: 26, color: "#06B6D4" },
  { name: "Add-ons", value: 14, color: "#10B981" },
];

export const MONTHLY_PERFORMANCE = [
  { month: "Jan", target: 90000, actual: 82000 },
  { month: "Feb", target: 95000, actual: 91000 },
  { month: "Mar", target: 100000, actual: 112000 },
  { month: "Apr", target: 100000, actual: 94000 },
  { month: "May", target: 105000, actual: 101000 },
  { month: "Jun", target: 110000, actual: 107000 },
];

export const TRAFFIC_SOURCES = [
  { name: "Organic Search", value: 42, color: "#3B82F6" },
  { name: "Direct", value: 24, color: "#8B5CF6" },
  { name: "Social", value: 18, color: "#06B6D4" },
  { name: "Referral", value: 11, color: "#10B981" },
  { name: "Email", value: 5, color: "#F59E0B" },
];

export const CONVERSION_FUNNEL = [
  { stage: "Visitors", value: 100000 },
  { stage: "Signups", value: 24500 },
  { stage: "Trials", value: 9200 },
  { stage: "Paid", value: 3100 },
];

export const DEVICE_ANALYTICS = [
  { name: "Desktop", value: 54, color: "#3B82F6" },
  { name: "Mobile", value: 38, color: "#8B5CF6" },
  { name: "Tablet", value: 8, color: "#06B6D4" },
];

export const ACTIVITIES: ActivityItem[] = [
  { id: "a1", type: "user", title: "New user joined", description: "Amelia Frost created an account", time: "2 min ago" },
  { id: "a2", type: "payment", title: "Payment received", description: "$1,240 from Horizon Labs", time: "18 min ago" },
  { id: "a3", type: "project", title: "New project created", description: "“Atlas Redesign” was started", time: "1 hr ago" },
  { id: "a4", type: "team", title: "Team update", description: "Marcus joined the Design team", time: "3 hr ago" },
  { id: "a5", type: "payment", title: "Payment received", description: "$890 from Pixel Forge", time: "5 hr ago" },
  { id: "a6", type: "user", title: "New user joined", description: "Daniel Kim created an account", time: "Yesterday" },
];

export const ORDERS: Order[] = [
  { id: "ORD-7731", customer: "Amelia Frost", product: "Pro Plan (Annual)", date: "2026-06-18", status: "completed", amount: 588 },
  { id: "ORD-7730", customer: "Horizon Labs", product: "Enterprise Bundle", date: "2026-06-18", status: "processing", amount: 4200 },
  { id: "ORD-7729", customer: "Daniel Kim", product: "Starter Plan", date: "2026-06-17", status: "pending", amount: 29 },
  { id: "ORD-7728", customer: "Pixel Forge", product: "Pro Plan (Monthly)", date: "2026-06-17", status: "completed", amount: 49 },
  { id: "ORD-7727", customer: "Nova Studio", product: "Add-on: Analytics", date: "2026-06-16", status: "cancelled", amount: 15 },
  { id: "ORD-7726", customer: "Marcus Webb", product: "Pro Plan (Annual)", date: "2026-06-16", status: "completed", amount: 588 },
  { id: "ORD-7725", customer: "Lila Chen", product: "Starter Plan", date: "2026-06-15", status: "completed", amount: 29 },
  { id: "ORD-7724", customer: "Quantum Apps", product: "Enterprise Bundle", date: "2026-06-15", status: "processing", amount: 6800 },
  { id: "ORD-7723", customer: "Ravi Patel", product: "Pro Plan (Monthly)", date: "2026-06-14", status: "completed", amount: 49 },
  { id: "ORD-7722", customer: "Sofia Reyes", product: "Add-on: Storage", date: "2026-06-14", status: "pending", amount: 9 },
  { id: "ORD-7721", customer: "Bright Path", product: "Pro Plan (Annual)", date: "2026-06-13", status: "completed", amount: 588 },
  { id: "ORD-7720", customer: "Owen Brooks", product: "Starter Plan", date: "2026-06-12", status: "cancelled", amount: 29 },
];

const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];
const colorFor = (i: number) => colors[i % colors.length];

export const CUSTOMERS: Customer[] = [
  { id: "c1", name: "Amelia Frost", email: "amelia@frostdesign.co", company: "Frost Design", status: "active", spend: 12400, joined: "2024-02-11", avatarColor: colorFor(0) },
  { id: "c2", name: "Horizon Labs", email: "hello@horizonlabs.io", company: "Horizon Labs", status: "active", spend: 48200, joined: "2023-11-02", avatarColor: colorFor(1) },
  { id: "c3", name: "Daniel Kim", email: "daniel.kim@mail.com", company: "Freelance", status: "pending", spend: 290, joined: "2026-05-30", avatarColor: colorFor(2) },
  { id: "c4", name: "Pixel Forge", email: "team@pixelforge.studio", company: "Pixel Forge", status: "active", spend: 8900, joined: "2024-07-19", avatarColor: colorFor(3) },
  { id: "c5", name: "Nova Studio", email: "contact@novastudio.com", company: "Nova Studio", status: "inactive", spend: 1500, joined: "2023-04-05", avatarColor: colorFor(4) },
  { id: "c6", name: "Marcus Webb", email: "marcus@webbcreative.com", company: "Webb Creative", status: "active", spend: 5880, joined: "2024-09-21", avatarColor: colorFor(5) },
  { id: "c7", name: "Lila Chen", email: "lila.chen@chenco.com", company: "Chen & Co", status: "active", spend: 2900, joined: "2025-01-14", avatarColor: colorFor(6) },
  { id: "c8", name: "Quantum Apps", email: "support@quantumapps.dev", company: "Quantum Apps", status: "active", spend: 68000, joined: "2022-12-01", avatarColor: colorFor(0) },
  { id: "c9", name: "Ravi Patel", email: "ravi.patel@gmail.com", company: "Patel Consulting", status: "pending", spend: 490, joined: "2026-06-10", avatarColor: colorFor(1) },
  { id: "c10", name: "Sofia Reyes", email: "sofia@reyesmedia.com", company: "Reyes Media", status: "inactive", spend: 990, joined: "2023-08-23", avatarColor: colorFor(2) },
  { id: "c11", name: "Bright Path", email: "hello@brightpath.org", company: "Bright Path", status: "active", spend: 15880, joined: "2024-03-17", avatarColor: colorFor(3) },
  { id: "c12", name: "Owen Brooks", email: "owen.b@brooksdev.io", company: "Brooks Dev", status: "active", spend: 3290, joined: "2025-06-02", avatarColor: colorFor(4) },
];

export const TASKS: Task[] = [
  { id: "t1", title: "Design new pricing page", description: "Explore 3 layout directions for the updated pricing tiers.", priority: "high", assignee: "Amelia Frost", avatarColor: colorFor(0), dueDate: "2026-06-25", tags: ["Design"] },
  { id: "t2", title: "Fix mobile nav overlap", description: "Drawer overlaps the header CTA on small screens.", priority: "medium", assignee: "Marcus Webb", avatarColor: colorFor(5), dueDate: "2026-06-23", tags: ["Bug"] },
  { id: "t3", title: "Write Q3 release notes", description: "Summarize new features shipped this quarter.", priority: "low", assignee: "Lila Chen", avatarColor: colorFor(6), dueDate: "2026-06-28", tags: ["Docs"] },
  { id: "t4", title: "Integrate Stripe webhooks", description: "Handle subscription updates and failed payments.", priority: "high", assignee: "Daniel Kim", avatarColor: colorFor(2), dueDate: "2026-06-22", tags: ["Backend"] },
  { id: "t5", title: "Audit accessibility", description: "Run an a11y pass across the dashboard pages.", priority: "medium", assignee: "Sofia Reyes", avatarColor: colorFor(3), dueDate: "2026-06-26", tags: ["QA"] },
  { id: "t6", title: "Onboard Horizon Labs", description: "Kickoff call and workspace setup.", priority: "high", assignee: "Ravi Patel", avatarColor: colorFor(1), dueDate: "2026-06-21", tags: ["Customer"] },
  { id: "t7", title: "Refactor chart components", description: "Share a base wrapper across recharts components.", priority: "low", assignee: "Owen Brooks", avatarColor: colorFor(4), dueDate: "2026-06-30", tags: ["Tech Debt"] },
  { id: "t8", title: "User interview synthesis", description: "Summarize themes from last week's 6 interviews.", priority: "medium", assignee: "Amelia Frost", avatarColor: colorFor(0), dueDate: "2026-06-24", tags: ["Research"] },
];

export const COLUMNS: Column[] = [
  { id: "todo", title: "Todo", taskIds: ["t1", "t3", "t7"] },
  { id: "in-progress", title: "In Progress", taskIds: ["t2", "t4"] },
  { id: "review", title: "Review", taskIds: ["t5", "t8"] },
  { id: "completed", title: "Completed", taskIds: ["t6"] },
];

export const CONVERSATIONS: Conversation[] = [
  { id: "conv1", name: "Amelia Frost", avatarColor: colorFor(0), online: true, lastMessage: "Sounds great, let's ship it 🚀", lastMessageTime: "2m", unread: 2 },
  { id: "conv2", name: "Horizon Labs", avatarColor: colorFor(1), online: true, lastMessage: "Can you resend the invoice?", lastMessageTime: "14m", unread: 0 },
  { id: "conv3", name: "Marcus Webb", avatarColor: colorFor(5), online: false, lastMessage: "Pushed the fix, check staging", lastMessageTime: "1h", unread: 0 },
  { id: "conv4", name: "Lila Chen", avatarColor: colorFor(6), online: true, lastMessage: "Release notes draft is ready", lastMessageTime: "3h", unread: 1 },
  { id: "conv5", name: "Quantum Apps", avatarColor: colorFor(0), online: false, lastMessage: "Thanks for the quick turnaround!", lastMessageTime: "Yesterday", unread: 0 },
  { id: "conv6", name: "Sofia Reyes", avatarColor: colorFor(3), online: true, lastMessage: "Accessibility audit attached", lastMessageTime: "Yesterday", unread: 0 },
];

export const MESSAGES: ChatMessage[] = [
  { id: "m1", conversationId: "conv1", sender: "them", text: "Hey! Just reviewed the new pricing mockups.", time: "10:02 AM" },
  { id: "m2", conversationId: "conv1", sender: "me", text: "What did you think of the third option?", time: "10:03 AM" },
  { id: "m3", conversationId: "conv1", sender: "them", text: "Loved it — the tier comparison is way clearer now.", time: "10:05 AM" },
  { id: "m4", conversationId: "conv1", sender: "me", text: "Great, I'll prep it for dev handoff today.", time: "10:06 AM" },
  { id: "m5", conversationId: "conv1", sender: "them", text: "Sounds great, let's ship it 🚀", time: "10:07 AM" },
  { id: "m6", conversationId: "conv2", sender: "them", text: "Can you resend the invoice for May?", time: "9:40 AM" },
  { id: "m7", conversationId: "conv2", sender: "me", text: "Sending it over now!", time: "9:41 AM" },
  { id: "m8", conversationId: "conv3", sender: "them", text: "Pushed the fix, check staging when you can.", time: "Yesterday" },
  { id: "m9", conversationId: "conv4", sender: "them", text: "Release notes draft is ready for review.", time: "Yesterday" },
];

const todayISO = new Date().toISOString().slice(0, 10);
const plus = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "e1", title: "Product sync", date: todayISO, time: "10:00 AM", color: "#3B82F6", description: "Weekly cross-team product sync." },
  { id: "e2", title: "Design review", date: todayISO, time: "2:00 PM", color: "#8B5CF6", description: "Review pricing page mockups." },
  { id: "e3", title: "Horizon Labs onboarding", date: plus(1), time: "11:30 AM", color: "#06B6D4", description: "Kickoff call with new enterprise customer." },
  { id: "e4", title: "Sprint planning", date: plus(2), time: "9:00 AM", color: "#10B981" },
  { id: "e5", title: "Investor update", date: plus(4), time: "4:00 PM", color: "#F59E0B" },
  { id: "e6", title: "Team offsite", date: plus(6), time: "All day", color: "#EC4899" },
  { id: "e7", title: "1:1 with Marcus", date: plus(-2), time: "3:00 PM", color: "#3B82F6" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "tm1", name: "Amelia Frost", role: "Product Designer", avatarColor: colorFor(0), skills: ["Figma", "Design Systems", "Prototyping"], progress: 86, projects: 6, status: "active" },
  { id: "tm2", name: "Marcus Webb", role: "Frontend Engineer", avatarColor: colorFor(5), skills: ["React", "TypeScript", "Next.js"], progress: 72, projects: 9, status: "active" },
  { id: "tm3", name: "Lila Chen", role: "Content Strategist", avatarColor: colorFor(6), skills: ["Copywriting", "SEO", "Docs"], progress: 64, projects: 4, status: "away" },
  { id: "tm4", name: "Daniel Kim", role: "Backend Engineer", avatarColor: colorFor(2), skills: ["Node.js", "Postgres", "APIs"], progress: 91, projects: 7, status: "active" },
  { id: "tm5", name: "Sofia Reyes", role: "QA Engineer", avatarColor: colorFor(3), skills: ["Testing", "Accessibility", "Automation"], progress: 58, projects: 5, status: "offline" },
  { id: "tm6", name: "Ravi Patel", role: "Customer Success", avatarColor: colorFor(1), skills: ["Onboarding", "Support", "Strategy"], progress: 78, projects: 11, status: "active" },
  { id: "tm7", name: "Owen Brooks", role: "Platform Engineer", avatarColor: colorFor(4), skills: ["AWS", "CI/CD", "Monitoring"], progress: 67, projects: 6, status: "away" },
  { id: "tm8", name: "Nova Reed", role: "Marketing Lead", avatarColor: colorFor(0), skills: ["Growth", "Campaigns", "Analytics"], progress: 82, projects: 8, status: "active" },
];
