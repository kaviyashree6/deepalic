import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import {
  useSiteContent,
  useUpdateSiteContent,
  HeroContent,
  AboutContent,
  InsuranceContent,
} from "@/hooks/useSiteContent";

function HeroEditor() {
  const { data: content, isLoading } = useSiteContent<HeroContent>("hero");
  const updateMutation = useUpdateSiteContent<HeroContent>("hero");
  const [localContent, setLocalContent] = useState<HeroContent | null>(null);

  const currentContent = localContent || content;

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!currentContent) return null;

  const handleChange = (field: keyof HeroContent, value: any) => {
    setLocalContent({ ...currentContent, [field]: value });
  };

  const handleStatChange = (index: number, field: "label" | "value", value: string) => {
    const newStats = [...currentContent.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setLocalContent({ ...currentContent, stats: newStats });
  };

  const handleSave = () => {
    if (localContent) {
      updateMutation.mutate(localContent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Badge Text</Label>
          <Input
            value={currentContent.badge}
            onChange={(e) => handleChange("badge", e.target.value)}
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            value={currentContent.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
          />
        </div>
        <div>
          <Label>Title</Label>
          <Input
            value={currentContent.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={currentContent.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Stats</Label>
        <div className="grid grid-cols-2 gap-4">
          {currentContent.stats.map((stat, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Value"
                value={stat.value}
                onChange={(e) => handleStatChange(index, "value", e.target.value)}
                className="w-24"
              />
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => handleStatChange(index, "label", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} disabled={updateMutation.isPending}>
        {updateMutation.isPending ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save Hero Content
      </Button>
    </div>
  );
}

function AboutEditor() {
  const { data: content, isLoading } = useSiteContent<AboutContent>("about");
  const updateMutation = useUpdateSiteContent<AboutContent>("about");
  const [localContent, setLocalContent] = useState<AboutContent | null>(null);

  const currentContent = localContent || content;

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!currentContent) return null;

  const handleChange = (field: keyof AboutContent, value: any) => {
    setLocalContent({ ...currentContent, [field]: value });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...currentContent.highlights];
    newHighlights[index] = value;
    setLocalContent({ ...currentContent, highlights: newHighlights });
  };

  const addHighlight = () => {
    setLocalContent({
      ...currentContent,
      highlights: [...currentContent.highlights, "New highlight"],
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = currentContent.highlights.filter((_, i) => i !== index);
    setLocalContent({ ...currentContent, highlights: newHighlights });
  };

  const handleSave = () => {
    if (localContent) {
      updateMutation.mutate(localContent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={currentContent.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <Label>Badge Text</Label>
          <Input
            value={currentContent.badge}
            onChange={(e) => handleChange("badge", e.target.value)}
          />
        </div>
        <div>
          <Label>Description (Paragraph 1)</Label>
          <Textarea
            rows={4}
            value={currentContent.description1}
            onChange={(e) => handleChange("description1", e.target.value)}
          />
        </div>
        <div>
          <Label>Description (Paragraph 2)</Label>
          <Textarea
            rows={4}
            value={currentContent.description2}
            onChange={(e) => handleChange("description2", e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Highlights</Label>
          <Button size="sm" variant="outline" onClick={addHighlight}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {currentContent.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive"
                onClick={() => removeHighlight(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} disabled={updateMutation.isPending}>
        {updateMutation.isPending ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save About Content
      </Button>
    </div>
  );
}

function InsuranceEditor() {
  const { data: content, isLoading } = useSiteContent<InsuranceContent>("insurance");
  const updateMutation = useUpdateSiteContent<InsuranceContent>("insurance");
  const [localContent, setLocalContent] = useState<InsuranceContent | null>(null);

  const currentContent = localContent || content;

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!currentContent) return null;

  const handleChange = (field: keyof InsuranceContent, value: string) => {
    setLocalContent({ ...currentContent, [field]: value });
  };

  const handleSave = () => {
    if (localContent) {
      updateMutation.mutate(localContent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Section Title</Label>
          <Input
            value={currentContent.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div>
          <Label>Section Description</Label>
          <Textarea
            rows={3}
            value={currentContent.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleSave} disabled={updateMutation.isPending}>
        {updateMutation.isPending ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Save Insurance Content
      </Button>
    </div>
  );
}

export function ContentManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hero">
          <TabsList className="mb-6">
            <TabsTrigger value="hero">Home</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>

          <TabsContent value="about">
            <AboutEditor />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceEditor />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
