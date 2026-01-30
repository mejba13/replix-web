"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Link as LinkIcon,
  Youtube,
  FileUp,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SourceType = "TEXT" | "URL" | "YOUTUBE" | "PDF";

type Platform = {
  id: string;
  name: string;
  description: string;
  category: string;
};

const platforms: Platform[] = [
  { id: "TWITTER", name: "Twitter/X", description: "280 character posts", category: "Social" },
  { id: "LINKEDIN", name: "LinkedIn", description: "Professional posts", category: "Social" },
  { id: "INSTAGRAM", name: "Instagram", description: "Caption & hashtags", category: "Social" },
  { id: "FACEBOOK", name: "Facebook", description: "Engaging posts", category: "Social" },
  { id: "TIKTOK", name: "TikTok", description: "Short-form scripts", category: "Video" },
  { id: "YOUTUBE_SHORT", name: "YouTube Shorts", description: "60-second scripts", category: "Video" },
  { id: "YOUTUBE_LONG", name: "YouTube Video", description: "Full video scripts", category: "Video" },
  { id: "THREAD", name: "Thread", description: "Multi-post threads", category: "Social" },
  { id: "CAROUSEL", name: "Carousel", description: "Slide-by-slide content", category: "Social" },
  { id: "BLOG", name: "Blog Post", description: "Long-form articles", category: "Written" },
  { id: "EMAIL", name: "Email", description: "Marketing emails", category: "Written" },
  { id: "NEWSLETTER", name: "Newsletter", description: "Subscriber updates", category: "Written" },
  { id: "PODCAST_NOTES", name: "Podcast Notes", description: "Show notes & summaries", category: "Audio" },
  { id: "MEDIUM", name: "Medium", description: "Publication articles", category: "Written" },
  { id: "SUBSTACK", name: "Substack", description: "Newsletter content", category: "Written" },
  { id: "REDDIT", name: "Reddit", description: "Community posts", category: "Social" },
];

const tones = [
  { id: "professional", name: "Professional", description: "Formal and business-appropriate" },
  { id: "casual", name: "Casual", description: "Friendly and conversational" },
  { id: "witty", name: "Witty", description: "Clever and humorous" },
  { id: "educational", name: "Educational", description: "Informative and teaching" },
  { id: "inspirational", name: "Inspirational", description: "Motivating and uplifting" },
  { id: "persuasive", name: "Persuasive", description: "Compelling and convincing" },
];

const goals = [
  { id: "awareness", name: "Brand Awareness", description: "Increase visibility" },
  { id: "engagement", name: "Engagement", description: "Drive interactions" },
  { id: "traffic", name: "Website Traffic", description: "Drive clicks" },
  { id: "leads", name: "Lead Generation", description: "Capture contacts" },
  { id: "sales", name: "Sales", description: "Drive purchases" },
  { id: "education", name: "Education", description: "Share knowledge" },
];

const steps = [
  { id: 1, name: "Content", description: "Add your source content" },
  { id: 2, name: "Goal", description: "Set your objective" },
  { id: 3, name: "Tone", description: "Choose your voice" },
  { id: 4, name: "Platforms", description: "Select outputs" },
  { id: 5, name: "Review", description: "Generate content" },
];

export default function NewRepurposePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form state
  const [sourceType, setSourceType] = useState<SourceType>("TEXT");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return sourceType === "TEXT" ? content.length > 50 : url.length > 10;
      case 2:
        return selectedGoal !== "";
      case 3:
        return selectedTone !== "";
      case 4:
        return selectedPlatforms.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Implement actual generation API call
    router.push("/outputs");
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const selectAllPlatforms = () => {
    setSelectedPlatforms(platforms.map((p) => p.id));
  };

  const clearPlatforms = () => {
    setSelectedPlatforms([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-full h-0.5 mx-2 transition-colors",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )}
                  style={{ width: "60px" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "text-center",
                currentStep === step.id ? "text-foreground" : "text-muted-foreground"
              )}
              style={{ width: "80px" }}
            >
              <div className="text-sm font-medium">{step.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Content Input */}
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { type: "TEXT" as SourceType, icon: FileText, label: "Text" },
                  { type: "URL" as SourceType, icon: LinkIcon, label: "URL" },
                  { type: "YOUTUBE" as SourceType, icon: Youtube, label: "YouTube" },
                  { type: "PDF" as SourceType, icon: FileUp, label: "PDF" },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setSourceType(item.type)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors",
                      sourceType === item.type
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <item.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {sourceType === "TEXT" ? (
                <div className="space-y-2">
                  <Label htmlFor="content">Paste your content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your blog post, article, transcript, or any text content here..."
                    className="min-h-[200px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {content.length} characters • Minimum 50 characters recommended
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="url">
                    {sourceType === "URL"
                      ? "Enter blog/article URL"
                      : sourceType === "YOUTUBE"
                      ? "Enter YouTube URL"
                      : "Upload PDF file"}
                  </Label>
                  <Input
                    id="url"
                    type={sourceType === "PDF" ? "file" : "url"}
                    placeholder={
                      sourceType === "URL"
                        ? "https://example.com/blog-post"
                        : "https://youtube.com/watch?v=..."
                    }
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    accept={sourceType === "PDF" ? ".pdf" : undefined}
                  />
                </div>
              )}
            </>
          )}

          {/* Step 2: Goal Selection */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "flex flex-col items-start p-4 rounded-lg border-2 transition-colors text-left",
                    selectedGoal === goal.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">{goal.description}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Tone Selection */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-3">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    "flex flex-col items-start p-4 rounded-lg border-2 transition-colors text-left",
                    selectedTone === tone.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium">{tone.name}</span>
                  <span className="text-sm text-muted-foreground">{tone.description}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Platform Selection */}
          {currentStep === 4 && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary">
                    {selectedPlatforms.length} selected
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllPlatforms}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearPlatforms}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedPlatforms.includes(platform.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <div>
                      <div className="font-medium text-sm">{platform.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {platform.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title (optional)</Label>
                <Input
                  id="title"
                  placeholder="e.g., Q1 Product Launch Content"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-border p-4 space-y-4">
                <h4 className="font-medium">Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Source:</span>
                    <span className="ml-2 font-medium">
                      {sourceType === "TEXT"
                        ? `${content.length} characters`
                        : url || "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Goal:</span>
                    <span className="ml-2 font-medium">
                      {goals.find((g) => g.id === selectedGoal)?.name || "Not selected"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tone:</span>
                    <span className="ml-2 font-medium">
                      {tones.find((t) => t.id === selectedTone)?.name || "Not selected"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Platforms:</span>
                    <span className="ml-2 font-medium">{selectedPlatforms.length}</span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Selected platforms:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedPlatforms.map((platformId) => {
                      const platform = platforms.find((p) => p.id === platformId);
                      return (
                        <Badge key={platformId} variant="secondary" className="text-xs">
                          {platform?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                This will generate {selectedPlatforms.length} outputs and use 1 job credit.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {currentStep < 5 ? (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleGenerate} disabled={isGenerating || !canProceed()}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
