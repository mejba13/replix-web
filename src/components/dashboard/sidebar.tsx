"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Wand2,
  FileText,
  LayoutTemplate,
  Mic2,
  FolderKanban,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Repurpose", href: "/repurpose/new", icon: Wand2, highlight: true },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Outputs", href: "/outputs", icon: FileText },
      { name: "Templates", href: "/templates", icon: LayoutTemplate },
      { name: "Brand Voice", href: "/brand-voice", icon: Mic2 },
      { name: "Projects", href: "/projects", icon: FolderKanban },
    ],
  },
  {
    title: "Workspace",
    items: [
      { name: "Team", href: "/team", icon: Users },
      { name: "Billing", href: "/billing", icon: CreditCard },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border/40 bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border/40 px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary-foreground">R</span>
          </div>
          {!collapsed && <span className="text-xl font-bold">Replix</span>}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <div className="space-y-6 px-3">
          {navigation.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          collapsed && "justify-center px-2",
                          item.highlight && !isActive && "text-primary hover:text-primary"
                        )}
                        size={collapsed ? "icon" : "default"}
                      >
                        <item.icon className={cn("h-4 w-4 shrink-0", item.highlight && "text-primary")} />
                        {!collapsed && <span>{item.name}</span>}
                        {!collapsed && item.highlight && (
                          <Plus className="ml-auto h-3 w-3" />
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Toggle button */}
      <div className="border-t border-border/40 p-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full", collapsed && "px-2")}
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
