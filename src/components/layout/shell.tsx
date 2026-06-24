"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

export function Shell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useUIStore();
  const pathname = usePathname();

  return (
    <div className="min-h-dvh bg-background">
      {/* Subtle gradient mesh background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60 dark:opacity-40"
        style={{
          background:
            "radial-gradient(at 0% 0%,rgba(59,130,246,.12) 0,transparent 55%)," +
            "radial-gradient(at 100% 0%,rgba(139,92,246,.10) 0,transparent 55%)," +
            "radial-gradient(at 50% 100%,rgba(6,182,212,.08) 0,transparent 55%)",
        }}
      />

      <Sidebar />

      {/* Main area shifts right on desktop to clear the sidebar */}
      <div
        className={cn(
          "relative z-10 flex flex-col min-h-dvh transition-[padding] duration-300",
          sidebarCollapsed ? "lg:pl-[76px]" : "lg:pl-64"
        )}
      >
        <Navbar />

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 px-3 sm:px-5 lg:px-6 xl:px-8 pb-10 pt-3 w-full max-w-[1600px] mx-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
