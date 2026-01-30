import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user's workspaces
  const workspaceMembers = await prisma.workspaceMember.findMany({
    where: { userId: session.user.id },
    include: {
      workspace: {
        include: {
          subscription: true,
          _count: {
            select: { members: true },
          },
        },
      },
    },
  });

  const workspaces = workspaceMembers.map((member: typeof workspaceMembers[number]) => ({
    id: member.workspace.id,
    name: member.workspace.name,
    slug: member.workspace.slug,
    logo: member.workspace.logo,
    role: member.role,
    subscription: member.workspace.subscription
      ? {
          plan: member.workspace.subscription.plan,
          jobsLimit: member.workspace.subscription.jobsLimit,
          jobsUsedThisMonth: member.workspace.subscription.jobsUsedThisMonth,
          outputsLimit: member.workspace.subscription.outputsLimit,
          outputsUsedThisMonth: member.workspace.subscription.outputsUsedThisMonth,
        }
      : null,
    memberCount: member.workspace._count.members,
  }));

  return (
    <DashboardShell
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
      workspaces={workspaces}
    >
      {children}
    </DashboardShell>
  );
}
