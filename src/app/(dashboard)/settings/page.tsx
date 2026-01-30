import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Building, Bell, Shield, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account and workspace settings",
};

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: {
      workspace: true,
    },
  });

  if (!user || !workspaceMember) {
    return null;
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and workspace preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Your personal account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Contact support to change your email address
              </p>
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Workspace Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <CardTitle>Workspace</CardTitle>
          </div>
          <CardDescription>Settings for {workspaceMember.workspace.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input id="workspace-name" defaultValue={workspaceMember.workspace.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workspace-slug">Workspace URL</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">replix.app/</span>
                <Input id="workspace-slug" defaultValue={workspaceMember.workspace.slug} />
              </div>
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Job Completion</div>
              <div className="text-sm text-muted-foreground">
                Get notified when content generation completes
              </div>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Weekly Summary</div>
              <div className="text-sm text-muted-foreground">
                Receive a weekly summary of your content activity
              </div>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Product Updates</div>
              <div className="text-sm text-muted-foreground">
                Learn about new features and improvements
              </div>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Password</div>
              <div className="text-sm text-muted-foreground">
                Last changed: Never
              </div>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security
              </div>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-500">
            <Trash2 className="h-5 w-5" />
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </div>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
