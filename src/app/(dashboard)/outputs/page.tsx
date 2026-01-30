import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Filter,
  Copy,
  Edit,
  Star,
  MoreHorizontal,
  Plus,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Outputs",
  description: "View and manage your generated content",
};

const platformColors: Record<string, string> = {
  TWITTER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  LINKEDIN: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  INSTAGRAM: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  FACEBOOK: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  TIKTOK: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  YOUTUBE_SHORT: "bg-red-500/10 text-red-500 border-red-500/20",
  YOUTUBE_LONG: "bg-red-500/10 text-red-500 border-red-500/20",
  BLOG: "bg-green-500/10 text-green-500 border-green-500/20",
  EMAIL: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  NEWSLETTER: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  THREAD: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  CAROUSEL: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  MEDIUM: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  SUBSTACK: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  REDDIT: "bg-orange-600/10 text-orange-600 border-orange-600/20",
};

const platformNames: Record<string, string> = {
  TWITTER: "Twitter/X",
  LINKEDIN: "LinkedIn",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  TIKTOK: "TikTok",
  YOUTUBE_SHORT: "YouTube Shorts",
  YOUTUBE_LONG: "YouTube Video",
  BLOG: "Blog Post",
  EMAIL: "Email",
  NEWSLETTER: "Newsletter",
  THREAD: "Thread",
  CAROUSEL: "Carousel",
  MEDIUM: "Medium",
  SUBSTACK: "Substack",
  REDDIT: "Reddit",
};

export default async function OutputsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  // Get user's outputs
  const outputs = await prisma.output.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      job: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Outputs</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your generated content
          </p>
        </div>
        <Link href="/repurpose/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search outputs..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Outputs Grid */}
      {outputs.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No outputs yet</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
              Create your first repurpose job to generate platform-optimized
              content from your source material.
            </p>
            <Link href="/repurpose/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First Job
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outputs.map((output) => (
            <Card
              key={output.id}
              className="border-border/50 hover:border-primary/50 transition-colors group"
            >
              <CardContent className="p-4">
                {/* Platform Badge & Actions */}
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      platformColors[output.platform] || "bg-gray-500/10 text-gray-500"
                    )}
                  >
                    {platformNames[output.platform] || output.platform}
                  </Badge>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star
                        className={cn(
                          "h-4 w-4",
                          output.isFavorite && "fill-amber-500 text-amber-500"
                        )}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="mb-3">
                  <p className="text-sm line-clamp-4">{output.content}</p>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{output.job?.title || "Untitled Job"}</span>
                  <span>{new Date(output.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mt-3">
                  <Badge
                    variant={
                      output.status === "APPROVED"
                        ? "default"
                        : output.status === "PUBLISHED"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {output.status.toLowerCase()}
                  </Badge>
                  {output.version > 1 && (
                    <span className="text-xs text-muted-foreground">
                      v{output.version}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
