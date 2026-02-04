import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Newspaper, X, Check, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { supabase as supabaseClient } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  category: string;
  link: string | null;
  is_active: boolean;
  display_order: number;
}

const categories = [
  { value: "Campaign", label: "Campaign" },
  { value: "New Plan", label: "New Plan" },
  { value: "Tax", label: "Tax" },
  { value: "Finance", label: "Finance" },
  { value: "Children", label: "Children" },
  { value: "Pension", label: "Pension" },
  { value: "Health", label: "Health" },
  { value: "General", label: "General" },
];

export function NewsManagement() {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingAI, setIsFetchingAI] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAINews = async () => {
    setIsFetchingAI(true);
    try {
      const { data, error } = await supabaseClient.functions.invoke("fetch-lic-news", {
        method: "POST",
      });
      
      if (error) throw error;
      
      toast({ 
        title: "News Fetched", 
        description: `${data.items} news items processed` 
      });
      fetchNews();
    } catch (err) {
      console.error("AI fetch error:", err);
      toast({
        title: "Error",
        description: "Failed to fetch AI news",
        variant: "destructive",
      });
    } finally {
      setIsFetchingAI(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      toast({
        title: "Error",
        description: "Failed to load news",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSource("");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setExcerpt("");
    setCategory("");
    setLink("");
    setEditingId(null);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSource(item.source);
    setDate(item.date);
    setExcerpt(item.excerpt);
    setCategory(item.category);
    setLink(item.link || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !source || !excerpt || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from("news")
          .update({
            title,
            source,
            date,
            excerpt,
            category,
            link: link || null,
          })
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Success", description: "News updated successfully" });
      } else {
        // Create new
        const { error } = await supabase
          .from("news")
          .insert({
            title,
            source,
            date,
            excerpt,
            category,
            link: link || null,
            display_order: news.length,
          });

        if (error) throw error;
        toast({ title: "Success", description: "News added successfully" });
      }

      resetForm();
      fetchNews();
    } catch (err) {
      console.error("Submit error:", err);
      toast({
        title: "Error",
        description: "Failed to save news",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "News deleted successfully" });
      fetchNews();
    } catch (err) {
      console.error("Delete error:", err);
      toast({
        title: "Error",
        description: "Failed to delete news",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from("news")
        .update({ is_active: !currentState })
        .eq("id", id);
      if (error) throw error;
      fetchNews();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingId ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {editingId ? "Edit News" : "Add News"}
          </CardTitle>
          <CardDescription>
            {editingId ? "Update the news item" : "Add a new LIC news item"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="News headline"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source *</Label>
                <Input
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g., LIC India"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the news..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link (optional)</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingId ? "Update" : "Add News"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  News Items ({news.length})
                </CardTitle>
                <CardDescription>
                  Manage your LIC news updates. Click edit to modify.
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={fetchAINews} 
                disabled={isFetchingAI}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isFetchingAI ? "animate-spin" : ""}`} />
                {isFetchingAI ? "Fetching..." : "Fetch AI News"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading news...
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No news added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      item.is_active ? "bg-card" : "bg-muted/50 opacity-60"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(item.date), "dd/MM/yyyy")}
                        </span>
                        {!item.is_active && (
                          <span className="text-xs text-destructive font-medium">Hidden</span>
                        )}
                      </div>
                      <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleActive(item.id, item.is_active)}
                        title={item.is_active ? "Hide" : "Show"}
                      >
                        <Check className={`w-4 h-4 ${item.is_active ? "text-green-600" : "text-muted-foreground"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
