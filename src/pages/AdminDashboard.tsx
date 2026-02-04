import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, Image, Newspaper, MessageSquare, FileText, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GalleryManagement } from "@/components/admin/GalleryManagement";
import { NewsManagement } from "@/components/admin/NewsManagement";
import { ReviewsManagement } from "@/components/admin/ReviewsManagement";
import { ContentManagement } from "@/components/admin/ContentManagement";
import { PlansManagement } from "@/components/admin/PlansManagement";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold">KD</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">Admin Dashboard</h1>
              <p className="text-primary-foreground/70 text-xs">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-primary-foreground hover:text-accent">
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground hover:text-accent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="content" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5 h-auto">
            <TabsTrigger value="content" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <FileText className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <ClipboardList className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Plans</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <Image className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <Newspaper className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Reviews</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="plans">
            <PlansManagement />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>

          <TabsContent value="news">
            <NewsManagement />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
