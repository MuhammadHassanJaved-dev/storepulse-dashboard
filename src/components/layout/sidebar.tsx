"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, Sparkles, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/nav";
import { ICONS } from "@/lib/icons";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

function NavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 px-2">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-ring",
              active
                ? "text-foreground"
                : "text-muted hover:text-foreground hover:bg-surface2/70"
            )}
          >
            {active && (
              <motion.div
                layoutId="active-nav-pill"
                className="absolute inset-0 rounded-xl bg-brand-primary/10 border border-brand-primary/20"
                transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 h-[18px] w-[18px] shrink-0 transition-colors",
                active ? "text-brand-primary" : "text-muted group-hover:text-foreground"
              )}
            />
            <span
              className={cn(
                "relative z-10 truncate transition-[opacity,width]",
                collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              )}
            >
              {item.label}
            </span>
            {active && !collapsed && (
              <span className="absolute right-3 z-10 h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse-dot" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useUIStore();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed inset-y-0 left-0 z-30",
          "border-r border-border bg-surface/80 backdrop-blur-xl",
          "transition-[width] duration-300 ease-in-out",
          sidebarCollapsed ? "w-[76px]" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-3 px-4 border-b border-border overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
            <Sparkles className="h-[18px] w-[18px] text-white" />
          </div>
          <span
            className={cn(
              "font-display font-bold text-lg tracking-tight whitespace-nowrap",
              "transition-[opacity,width] duration-200",
              sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
            )}
          >
            StorePulse
          </span>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <NavLinks collapsed={sidebarCollapsed} />
        </div>

        {/* Collapse toggle */}
        <div className="shrink-0 p-2 border-t border-border">
          <button
            onClick={toggleSidebarCollapsed}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-surface2/70 hover:text-foreground transition-colors focus-ring"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronsLeft
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-transform duration-300",
                sidebarCollapsed && "rotate-180"
              )}
            />
            <span className={cn(sidebarCollapsed ? "opacity-0 w-0" : "opacity-100")}>
              Collapse
            </span>
          </button>
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] flex flex-col bg-surface border-r border-border lg:hidden safe-top safe-bottom"
            >
              {/* Header */}
              <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                    <Sparkles className="h-[18px] w-[18px] text-white" />
                  </div>
                  <span className="font-display font-bold text-lg tracking-tight">
                    StorePulse
                  </span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:bg-surface2 transition-colors focus-ring"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav */}
              <div className="flex-1 overflow-y-auto py-4">
                <NavLinks
                  collapsed={false}
                  onNavigate={() => setMobileSidebarOpen(false)}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
