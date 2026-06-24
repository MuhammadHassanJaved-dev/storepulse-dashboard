"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  bio: z.string().max(160, "Bio must be under 160 characters").optional(),
});
type ProfileValues = z.infer<typeof profileSchema>;

const securitySchema = z
  .object({
    currentPassword: z.string().min(8, "Must be at least 8 characters"),
    newPassword: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type SecurityValues = z.infer<typeof securitySchema>;

function ProfileTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Hassan Javed", email: "hassan@storepulse.io", bio: "Product lead at StorePulse." },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This information will be visible to your team.</CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(() => toast.success("Profile updated"))}
        className="space-y-5 max-w-lg"
      >
        <div className="flex items-center gap-4">
          <Avatar name="Hassan Javed" color="#3B82F6" size={64} />
          <div>
            <Button type="button" variant="secondary" size="sm">
              Change avatar
            </Button>
            <p className="text-xs text-muted mt-1.5">JPG or PNG, up to 2MB.</p>
          </div>
        </div>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" {...register("bio")} />
          {errors.bio && <p className="text-xs text-danger mt-1">{errors.bio.message}</p>}
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Card>
  );
}

function AccountTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your workspace and regional preferences.</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Account preferences saved");
        }}
        className="space-y-5 max-w-lg"
      >
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" defaultValue="StorePulse Inc." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Timezone</Label>
            <Select defaultValue="pkt">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pkt">Pakistan (PKT)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern (EST)</SelectItem>
                <SelectItem value="pst">Pacific (PST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Card>
  );
}

function SecurityTab() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecurityValues>({ resolver: zodResolver(securitySchema) });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Update your password and manage two-factor authentication.</CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(() => {
          toast.success("Password updated");
          reset();
        })}
        className="space-y-5 max-w-lg"
      >
        <div>
          <Label htmlFor="currentPassword">Current password</Label>
          <Input id="currentPassword" type="password" {...register("currentPassword")} />
          {errors.currentPassword && (
            <p className="text-xs text-danger mt-1">{errors.currentPassword.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="newPassword">New password</Label>
          <Input id="newPassword" type="password" {...register("newPassword")} />
          {errors.newPassword && <p className="text-xs text-danger mt-1">{errors.newPassword.message}</p>}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs text-danger mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit">Update password</Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between max-w-lg">
        <div>
          <p className="font-medium text-sm">Two-factor authentication</p>
          <p className="text-xs text-muted mt-0.5">Add an extra layer of security to your account.</p>
        </div>
        <Switch />
      </div>
    </Card>
  );
}

function NotificationsTab() {
  const items = [
    { key: "product", label: "Product updates", description: "New features and improvements." },
    { key: "payments", label: "Payment alerts", description: "Receipts and failed payments." },
    { key: "team", label: "Team activity", description: "Mentions and assignment updates." },
    { key: "marketing", label: "Marketing emails", description: "Tips, offers, and newsletters." },
  ];
  const [state, setState] = React.useState<Record<string, boolean>>({
    product: true,
    payments: true,
    team: true,
    marketing: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <div className="space-y-1 max-w-lg">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between py-3.5 border-b border-border last:border-0"
          >
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted mt-0.5">{item.description}</p>
            </div>
            <Switch
              checked={state[item.key]}
              onCheckedChange={(v) => {
                setState((s) => ({ ...s, [item.key]: v }));
                toast.success(`${item.label} ${v ? "enabled" : "disabled"}`);
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

function AppearanceTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how StorePulse looks on your device.</CardDescription>
      </CardHeader>
      <div className="max-w-lg">
        <Label>Theme</Label>
        <div className="grid grid-cols-3 gap-3">
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = mounted && theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors",
                  active ? "border-brand-primary bg-brand-primary/5" : "border-border hover:bg-surface2/50"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-brand-primary" : "text-muted")} />
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted mt-3">
          Your preference is saved automatically and persists across sessions.
        </p>
      </div>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-5 pb-2">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
