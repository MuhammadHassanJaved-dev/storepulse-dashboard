"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Menu, Moon, Search, Sun, LogOut, Settings as SettingsIcon,
  User as UserIcon, X, ChevronDown,
} from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_ITEMS } from "@/constants/nav";
import { ACTIVITIES, CUSTOMERS, CONVERSATIONS } from "@/constants/mock-data";
import { cn } from "@/lib/utils";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard", "/analytics": "Analytics", "/customers": "Customers",
  "/projects": "Projects", "/messages": "Messages", "/calendar": "Calendar",
  "/team": "Team", "/settings": "Settings",
};

function useScrolled() {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setS(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return s;
}

function GlobalSearch({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  React.useEffect(() => { inputRef.current?.focus(); }, []);

  const q = query.trim().toLowerCase();
  const customers = q ? CUSTOMERS.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3) : [];
  const pages = q ? NAV_ITEMS.filter(n => n.label.toLowerCase().includes(q)) : [];
  const convos = q ? CONVERSATIONS.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3) : [];
  const hasResults = customers.length || pages.length || convos.length;

  return (
    <div ref={ref} className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        ref={inputRef}
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search customers, projects, messages…"
        className="h-10 w-full rounded-xl border border-border bg-surface2/60 pl-9 pr-3 text-sm placeholder:text-muted focus-ring transition-colors"
      />
      <AnimatePresence>
        {open && q && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-2 shadow-glass max-h-72 overflow-y-auto"
          >
            {!hasResults && (
              <p className="px-3 py-8 text-center text-sm text-muted">No results for &ldquo;{query}&rdquo;</p>
            )}
            {pages.length > 0 && (
              <div className="mb-1">
                <p className="px-3 py-1 text-xs font-medium text-muted uppercase tracking-wider">Pages</p>
                {pages.map(p => (
                  <Link key={p.href} href={p.href} onClick={() => { setOpen(false); onClose?.(); }}
                    className="block rounded-xl px-3 py-2 text-sm hover:bg-surface2 transition-colors">
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
            {customers.length > 0 && (
              <div className="mb-1">
                <p className="px-3 py-1 text-xs font-medium text-muted uppercase tracking-wider">Customers</p>
                {customers.map(c => (
                  <Link key={c.id} href="/customers" onClick={() => { setOpen(false); onClose?.(); }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface2 transition-colors">
                    <Avatar name={c.name} color={c.avatarColor} size={24} />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            )}
            {convos.length > 0 && (
              <div>
                <p className="px-3 py-1 text-xs font-medium text-muted uppercase tracking-wider">Messages</p>
                {convos.map(c => (
                  <Link key={c.id} href="/messages" onClick={() => { setOpen(false); onClose?.(); }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface2 transition-colors">
                    <Avatar name={c.name} color={c.avatarColor} size={24} />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface2 hover:text-foreground transition-colors focus-ring" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-accent ring-2 ring-surface" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ACTIVITIES.slice(0, 4).map(a => (
          <DropdownMenuItem key={a.id} className="flex-col items-start gap-0.5 cursor-pointer">
            <span className="text-sm font-medium">{a.title}</span>
            <span className="text-xs text-muted">{a.description}</span>
            <span className="text-[11px] text-muted/60 mt-0.5">{a.time}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface2 hover:text-foreground transition-colors focus-ring"
      aria-label="Toggle theme"
    >
      {mounted && resolvedTheme === "dark"
        ? <Sun className="h-[18px] w-[18px]" />
        : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-xl p-1 pr-2 hover:bg-surface2 transition-colors focus-ring">
          <Avatar name="Hassan Javed" color="#3B82F6" size={34} ring />
          <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">Hassan</span>
          <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-muted shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-semibold text-sm text-foreground">Hassan Javed</p>
          <p className="text-xs text-muted font-normal">hassan@storepulse.io</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/settings"><UserIcon className="h-4 w-4" />Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/settings"><SettingsIcon className="h-4 w-4" />Settings</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-danger hover:!bg-danger/10 cursor-pointer">
          <LogOut className="h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const { setMobileSidebarOpen } = useUIStore();
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className={cn(
      "sticky top-0 z-20 transition-all duration-300 safe-top",
      scrolled ? "bg-surface/80 backdrop-blur-xl border-b border-border shadow-soft" : "bg-transparent"
    )}>
      <div className="flex h-16 items-center gap-2 px-3 sm:px-5 lg:px-6">
        {/* Hamburger - mobile only */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-surface2 lg:hidden focus-ring"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page title */}
        <h1 className="font-display text-lg sm:text-xl font-semibold tracking-tight shrink-0">
          {title}
        </h1>

        {/* Desktop search */}
        <div className="hidden md:block flex-1 max-w-sm ml-4">
          <GlobalSearch />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen(s => !s)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface2 md:hidden focus-ring"
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
          >
            {mobileSearchOpen
              ? <X className="h-[18px] w-[18px]" />
              : <Search className="h-[18px] w-[18px]" />}
          </button>

          <NotificationsDropdown />
          <ThemeToggle />
          <div className="hidden sm:block h-5 w-px bg-border mx-0.5" />
          <ProfileDropdown />
        </div>
      </div>

      {/* Mobile search bar (slides in below the navbar) */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-3 pb-3">
              <GlobalSearch onClose={() => setMobileSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
