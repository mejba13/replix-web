import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic2, Check, Edit, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Voice",
  description: "Configure your brand voice settings",
};

export default function BrandVoicePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brand Voice</h1>
          <p className="text-muted-foreground mt-1">
            Define your unique voice and style for consistent content
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Brand Voice
        </Button>
      </div>

      {/* Info Card */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mic2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">What is Brand Voice?</h3>
              <p className="text-sm text-muted-foreground">
                Brand Voice helps AI understand your unique writing style. By defining tone,
                style rules, and providing examples, every piece of generated content will
                sound authentically like your brand.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Voices */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Brand Voices</h2>
        <Card className="border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mic2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No brand voices configured</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Create a brand voice to ensure all generated content matches your unique style and tone.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Brand Voice
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Brand Voice Settings Preview */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Brand Voice Settings Include</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Tone & Style</h4>
              <div className="flex flex-wrap gap-2">
                {["Professional", "Friendly", "Authoritative", "Casual", "Witty"].map((tone) => (
                  <Badge key={tone} variant="outline" className="text-xs">
                    {tone}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Style Rules</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  Writing guidelines
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  Preferred vocabulary
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  Formatting preferences
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Do Examples</h4>
              <p className="text-sm text-muted-foreground">
                Examples of content that represents your brand voice well.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Don&apos;t Examples</h4>
              <p className="text-sm text-muted-foreground">
                Examples of content that doesn&apos;t match your brand voice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
