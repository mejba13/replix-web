import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, LayoutTemplate, Star, Copy, Edit, MoreHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Templates",
  description: "Manage your content generation templates",
};

const systemTemplates = [
  {
    id: "1",
    name: "Twitter Thread",
    description: "Convert long content into engaging Twitter threads",
    platform: "TWITTER",
    isSystem: true,
    isPopular: true,
  },
  {
    id: "2",
    name: "LinkedIn Article",
    description: "Transform content into professional LinkedIn posts",
    platform: "LINKEDIN",
    isSystem: true,
    isPopular: true,
  },
  {
    id: "3",
    name: "Instagram Carousel",
    description: "Create slide-by-slide carousel content",
    platform: "INSTAGRAM",
    isSystem: true,
    isPopular: false,
  },
  {
    id: "4",
    name: "Email Newsletter",
    description: "Structure content for email newsletters",
    platform: "EMAIL",
    isSystem: true,
    isPopular: true,
  },
  {
    id: "5",
    name: "Blog Summary",
    description: "Create concise blog post summaries",
    platform: "BLOG",
    isSystem: true,
    isPopular: false,
  },
  {
    id: "6",
    name: "YouTube Script",
    description: "Convert content to video scripts",
    platform: "YOUTUBE_LONG",
    isSystem: true,
    isPopular: true,
  },
];

const platformColors: Record<string, string> = {
  TWITTER: "bg-blue-500/10 text-blue-500",
  LINKEDIN: "bg-sky-500/10 text-sky-500",
  INSTAGRAM: "bg-pink-500/10 text-pink-500",
  EMAIL: "bg-amber-500/10 text-amber-500",
  BLOG: "bg-green-500/10 text-green-500",
  YOUTUBE_LONG: "bg-red-500/10 text-red-500",
};

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-1">
            Reusable templates for consistent content generation
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* System Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">System Templates</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {systemTemplates.map((template) => (
            <Card key={template.id} className="border-border/50 hover:border-primary/50 transition-colors group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={platformColors[template.platform] || "bg-gray-500/10 text-gray-500"}
                  >
                    {template.platform.replace("_", " ")}
                  </Badge>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-base flex items-center gap-2">
                  {template.name}
                  {template.isPopular && (
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  )}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Custom Templates</h2>
        <Card className="border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <LayoutTemplate className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No custom templates yet</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Create custom templates to generate content with your specific style and format requirements.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
