import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
