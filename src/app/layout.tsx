import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Shell } from "@/components/layout/shell";

export const metadata: Metadata = {
  title: {
    default: "StorePulse — SaaS Analytics Dashboard",
    template: "%s · StorePulse",
  },
  description:
    "A premium SaaS analytics dashboard with real-time revenue tracking, customer management, project boards, and team insights.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
