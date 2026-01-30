"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { WorkspaceProvider, Workspace } from "@/hooks/use-workspace";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  workspaces: Workspace[];
}

export function DashboardShell({ children, user, workspaces }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <WorkspaceProvider initialWorkspaces={workspaces}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header user={user} />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
