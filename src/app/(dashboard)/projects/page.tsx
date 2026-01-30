import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderKanban, MoreHorizontal, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Organize your content into projects",
};

const projectColors = [
  "bg-red-500/10 text-red-500 border-red-500/20",
  "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "bg-green-500/10 text-green-500 border-green-500/20",
  "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "bg-pink-500/10 text-pink-500 border-pink-500/20",
];

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  // Get user's workspace and projects
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: {
      workspace: {
        include: {
          projects: {
            orderBy: { createdAt: "desc" },
            include: {
              _count: {
                select: { repurposeJobs: true },
              },
            },
          },
        },
      },
    },
  });

  if (!workspaceMember) {
    return null;
  }

  const projects = workspaceMember.workspace.projects;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Organize your content into projects
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
              Create projects to organize your content repurposing jobs by campaign,
              client, or topic.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="border-border/50 hover:border-primary/50 transition-colors h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        project.color || projectColors[index % projectColors.length].split(" ")[0]
                      }`}
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  {project.description && (
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {project._count.repurposeJobs} jobs
                    </div>
                    <div>
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Add Project Card */}
          <Card className="border-border/50 border-dashed hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[160px]">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Create Project</span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
