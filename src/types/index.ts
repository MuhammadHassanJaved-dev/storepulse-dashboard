export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive" | "pending";
  spend: number;
  joined: string;
  avatarColor: string;
};

export type OrderStatus = "completed" | "processing" | "pending" | "cancelled";

export type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  status: OrderStatus;
  amount: number;
};

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  avatarColor: string;
  dueDate: string;
  tags: string[];
};

export type Column = {
  id: "todo" | "in-progress" | "review" | "completed";
  title: string;
  taskIds: string[];
};

export type Conversation = {
  id: string;
  name: string;
  avatarColor: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: "me" | "them";
  text: string;
  time: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // yyyy-MM-dd
  time: string;
  color: string;
  description?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  skills: string[];
  progress: number;
  projects: number;
  status: "active" | "away" | "offline";
};

export type ActivityItem = {
  id: string;
  type: "user" | "payment" | "project" | "team";
  title: string;
  description: string;
  time: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};
