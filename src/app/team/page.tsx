"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, TrendingUp, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TEAM_MEMBERS } from "@/constants/mock-data";
import { TeamMember } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_DOT: Record<TeamMember["status"], string> = {
  active: "bg-success",
  away: "bg-warning",
  offline: "bg-muted",
};

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -3 }}
    >
      <Card glow className="h-full">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar name={member.name} color={member.avatarColor} size={52} />
            <span
              className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-surface",
                STATUS_DOT[member.status]
              )}
            />
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold truncate">{member.name}</p>
            <p className="text-sm text-muted truncate">{member.role}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {member.skills.map((s) => (
            <Badge key={s} variant="muted">
              {s}
            </Badge>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted">Workload capacity</span>
            <span className="font-mono-data font-medium">{member.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${member.progress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full bg-brand-gradient"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" /> {member.projects} projects
          </span>
          <span className="capitalize">{member.status}</span>
        </div>
      </Card>
    </motion.div>
  );
}

export default function TeamPage() {
  const activeCount = TEAM_MEMBERS.filter((m) => m.status === "active").length;
  const avgProgress = Math.round(
    TEAM_MEMBERS.reduce((sum, m) => sum + m.progress, 0) / TEAM_MEMBERS.length
  );
  const totalProjects = TEAM_MEMBERS.reduce((sum, m) => sum + m.projects, 0);

  return (
    <div className="space-y-6 pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
              <Users className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Team members</p>
              <p className="font-mono-data text-xl font-semibold">{TEAM_MEMBERS.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted">Active now</p>
              <p className="font-mono-data text-xl font-semibold">{activeCount}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10">
              <Award className="h-5 w-5 text-brand-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg. capacity / Total projects</p>
              <p className="font-mono-data text-xl font-semibold">
                {avgProgress}% · {totalProjects}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <CardHeader className="px-0">
          <CardTitle>All members</CardTitle>
          <CardDescription>Skills, current workload, and active projects</CardDescription>
        </CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TEAM_MEMBERS.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
