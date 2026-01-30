"use client";

import { useWorkspace, Workspace } from "@/hooks/use-workspace";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, Plus, Settings, LogOut, User, CreditCard } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-xl px-6">
      {/* Workspace Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
              {currentWorkspace?.name?.[0]?.toUpperCase() || "W"}
            </div>
            <span className="font-medium">{currentWorkspace?.name || "Select Workspace"}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workspaces.map((workspace: Workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onClick={() => setCurrentWorkspace(workspace)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {workspace.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-sm">{workspace.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {workspace.subscription?.plan || "Free"} • {workspace.memberCount} members
                  </div>
                </div>
              </div>
              {currentWorkspace?.id === workspace.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings/workspaces/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Workspace
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Usage indicator */}
        {currentWorkspace?.subscription && (
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {currentWorkspace.subscription.jobsUsedThisMonth} / {currentWorkspace.subscription.jobsLimit === -1 ? "∞" : currentWorkspace.subscription.jobsLimit} jobs
            </span>
            <Badge variant="outline" className="text-xs">
              {currentWorkspace.subscription.plan}
            </Badge>
          </div>
        )}

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
