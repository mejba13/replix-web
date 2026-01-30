"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  role: WorkspaceRole;
  subscription: {
    plan: string;
    jobsLimit: number;
    jobsUsedThisMonth: number;
    outputsLimit: number;
    outputsUsedThisMonth: number;
  } | null;
  memberCount: number;
};

type WorkspaceContextType = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace) => void;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({
  children,
  initialWorkspaces = [],
}: {
  children: ReactNode;
  initialWorkspaces?: Workspace[];
}) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [currentWorkspace, setCurrentWorkspaceState] = useState<Workspace | null>(
    initialWorkspaces[0] || null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load saved workspace from localStorage
  useEffect(() => {
    const savedWorkspaceId = localStorage.getItem("currentWorkspaceId");
    if (savedWorkspaceId && workspaces.length > 0) {
      const savedWorkspace = workspaces.find((w) => w.id === savedWorkspaceId);
      if (savedWorkspace) {
        setCurrentWorkspaceState(savedWorkspace);
      }
    }
  }, [workspaces]);

  const setCurrentWorkspace = (workspace: Workspace) => {
    setCurrentWorkspaceState(workspace);
    localStorage.setItem("currentWorkspaceId", workspace.id);
  };

  const refetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workspaces");
      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);

        // Update current workspace if it still exists
        if (currentWorkspace) {
          const updated = data.find((w: Workspace) => w.id === currentWorkspace.id);
          if (updated) {
            setCurrentWorkspaceState(updated);
          } else if (data.length > 0) {
            setCurrentWorkspace(data[0]);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        setCurrentWorkspace,
        isLoading,
        refetch,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}

// Helper hook to check if user has specific role
export function useHasRole(requiredRoles: WorkspaceRole[]) {
  const { currentWorkspace } = useWorkspace();
  if (!currentWorkspace) return false;
  return requiredRoles.includes(currentWorkspace.role);
}

// Helper hook to check usage limits
export function useUsageLimits() {
  const { currentWorkspace } = useWorkspace();

  if (!currentWorkspace?.subscription) {
    return {
      canCreateJob: false,
      jobsRemaining: 0,
      outputsRemaining: 0,
      isUnlimited: false,
    };
  }

  const { jobsLimit, jobsUsedThisMonth, outputsLimit, outputsUsedThisMonth } =
    currentWorkspace.subscription;

  const isUnlimited = jobsLimit === -1;

  return {
    canCreateJob: isUnlimited || jobsUsedThisMonth < jobsLimit,
    jobsRemaining: isUnlimited ? Infinity : jobsLimit - jobsUsedThisMonth,
    outputsRemaining: isUnlimited ? Infinity : outputsLimit - outputsUsedThisMonth,
    isUnlimited,
  };
}
