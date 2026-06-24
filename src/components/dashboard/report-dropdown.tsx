"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  Download,
  FileText,
  FileSpreadsheet,
  File,
  Printer,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ORDERS } from "@/constants/mock-data";

import {
  exportPDF,
  exportCSV,
  exportExcel,
  printLight,
} from "@/lib/export";

export function ReportDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="min-w-[240px] rounded-xl border bg-background p-2 shadow-xl z-50"
        >
          {/* PDF Submenu */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer hover:bg-muted outline-none">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Export PDF
              </span>

              <ChevronRight className="h-4 w-4" />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="min-w-[180px] rounded-xl border bg-background p-2 shadow-xl z-50">
                <DropdownMenu.Item
                  onClick={() => exportPDF(ORDERS, "light")}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted"
                >
                  <Sun className="h-4 w-4" />
                  Light Theme
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onClick={() => exportPDF(ORDERS, "dark")}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted"
                >
                  <Moon className="h-4 w-4" />
                  Dark Theme
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="my-2 h-px bg-border" />

          {/* CSV */}
          <DropdownMenu.Item
            onClick={() => exportCSV(ORDERS)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </DropdownMenu.Item>

          {/* Excel */}
          <DropdownMenu.Item
            onClick={() => exportExcel(ORDERS)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted"
          >
            <File className="h-4 w-4" />
            Export Excel
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-border" />

          {/* Print */}
          <DropdownMenu.Item
            onClick={printLight}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted"
          >
            <Printer className="h-4 w-4" />
            Print Report
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}