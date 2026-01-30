import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, MoreHorizontal, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Team",
  description: "Manage your workspace team members",
};

const roleColors: Record<string, string> = {
  OWNER: "bg-amber-500/10 text-amber-500",
  ADMIN: "bg-purple-500/10 text-purple-500",
  MEMBER: "bg-blue-500/10 text-blue-500",
  VIEWER: "bg-gray-500/10 text-gray-500",
};

export default async function TeamPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const currentUserId = session.user.id;

  // Get user's workspace and members
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: currentUserId },
    include: {
      workspace: {
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
            orderBy: { joinedAt: "asc" },
          },
          invitations: {
            where: { status: "PENDING" },
          },
        },
      },
    },
  });

  if (!workspaceMember) {
    return null;
  }

  const { workspace } = workspaceMember;
  const members = workspace.members;
  const pendingInvitations = workspace.invitations;
  const isAdmin = workspaceMember.role === "OWNER" || workspaceMember.role === "ADMIN";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage members and permissions for {workspace.name}
          </p>
        </div>
        {isAdmin && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{members.length}</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingInvitations.length}</div>
                <div className="text-sm text-muted-foreground">Pending Invitations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {members.filter((m: typeof members[number]) => m.role === "ADMIN" || m.role === "OWNER").length}
                </div>
                <div className="text-sm text-muted-foreground">Admins</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>People with access to this workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member: typeof members[number]) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.user.image || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {member.user.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || member.user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {member.user.name || "Unnamed User"}
                      {member.user.id === currentUserId && (
                        <span className="text-muted-foreground ml-2">(You)</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{member.user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={roleColors[member.role]}>
                    {member.role.toLowerCase()}
                  </Badge>
                  {isAdmin && member.user.id !== currentUserId && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Invitations that haven&apos;t been accepted yet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingInvitations.map((invitation: typeof pendingInvitations[number]) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-muted">
                        {invitation.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{invitation.email}</div>
                      <div className="text-sm text-muted-foreground">
                        Invited {new Date(invitation.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={roleColors[invitation.role]}>
                      {invitation.role.toLowerCase()}
                    </Badge>
                    <Badge variant="outline" className="text-amber-500 border-amber-500/20">
                      Pending
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
