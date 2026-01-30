import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  BarChart3,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your content repurposing activity",
};

const platformColors: Record<string, string> = {
  TWITTER: "bg-blue-500/10 text-blue-500",
  LINKEDIN: "bg-sky-500/10 text-sky-500",
  INSTAGRAM: "bg-pink-500/10 text-pink-500",
  FACEBOOK: "bg-indigo-500/10 text-indigo-500",
  TIKTOK: "bg-purple-500/10 text-purple-500",
  YOUTUBE_SHORT: "bg-red-500/10 text-red-500",
  BLOG: "bg-green-500/10 text-green-500",
  EMAIL: "bg-amber-500/10 text-amber-500",
  NEWSLETTER: "bg-orange-500/10 text-orange-500",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  // Get user's first workspace
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: {
      workspace: {
        include: {
          subscription: true,
          repurposeJobs: {
            orderBy: { createdAt: "desc" },
            take: 5,
            include: {
              _count: { select: { outputs: true } },
            },
          },
          _count: {
            select: {
              repurposeJobs: true,
            },
          },
        },
      },
    },
  });

  if (!workspaceMember) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h2 className="text-xl font-semibold">No workspace found</h2>
        <p className="text-muted-foreground">Create a workspace to get started</p>
      </div>
    );
  }

  const { workspace } = workspaceMember;
  const subscription = workspace.subscription;
  const recentJobs = workspace.repurposeJobs;
  const totalJobs = workspace._count.repurposeJobs;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {session.user.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your content today
          </p>
        </div>
        <Link href="/repurpose/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Repurpose Job
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jobs This Month
            </CardTitle>
            <Wand2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscription?.jobsUsedThisMonth || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              of {subscription?.jobsLimit === -1 ? "unlimited" : subscription?.jobsLimit || 10} available
            </p>
            <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${Math.min(
                    ((subscription?.jobsUsedThisMonth || 0) / (subscription?.jobsLimit || 10)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outputs Generated
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscription?.outputsUsedThisMonth || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              of {subscription?.outputsLimit === -1 ? "unlimited" : subscription?.outputsLimit || 50} available
            </p>
            <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${Math.min(
                    ((subscription?.outputsUsedThisMonth || 0) / (subscription?.outputsLimit || 50)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Jobs
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              all time
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Plan
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscription?.plan || "Free"}</div>
            <Link href="/billing" className="text-xs text-primary hover:underline">
              Upgrade plan
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
          <Link href="/repurpose/new">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Start Repurposing</h3>
                  <p className="text-sm text-muted-foreground">
                    Transform content into 30+ formats
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
          <Link href="/templates">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Browse Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Use pre-built content templates
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
          <Link href="/brand-voice">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Set Brand Voice</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your unique style
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Your latest content repurposing jobs</CardDescription>
          </div>
          <Link href="/outputs">
            <Button variant="ghost" size="sm" className="gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <Wand2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No jobs yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by creating your first repurpose job
              </p>
              <Link href="/repurpose/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Job
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/outputs?job=${job.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {job.title || `Job ${job.id.slice(0, 8)}`}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            job.status === "COMPLETED"
                              ? "default"
                              : job.status === "PROCESSING"
                              ? "secondary"
                              : job.status === "FAILED"
                              ? "destructive"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {job.status.toLowerCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {job._count.outputs} outputs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {job.targetPlatforms.slice(0, 3).map((platform) => (
                        <div
                          key={platform}
                          className={`px-2 py-0.5 rounded text-xs ${
                            platformColors[platform] || "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          {platform.replace("_", " ").toLowerCase()}
                        </div>
                      ))}
                      {job.targetPlatforms.length > 3 && (
                        <div className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
                          +{job.targetPlatforms.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
