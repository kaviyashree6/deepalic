import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Users, Trophy, Star, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
}

const defaultItems = [
  { 
    id: "default-1",
    title: "Moments of Honor", 
    category: "Awards",
    icon: Star,
    description: "Celebrating milestones and achievements in our insurance journey"
  },
  { 
    id: "default-2",
    title: "Our Certificates", 
    category: "Achievements",
    icon: Award,
    description: "Professional certifications and recognition from LIC India"
  },
  { 
    id: "default-3",
    title: "Client Meetings", 
    category: "Events",
    icon: Users,
    description: "Building trust and relationships with our valued clients"
  },
  { 
    id: "default-4",
    title: "Award Ceremony", 
    category: "Awards",
    icon: Trophy,
    description: "MDRT 2025 Malaysia Award & Club Member recognition"
  },
  { 
    id: "default-5",
    title: "Team Celebrations", 
    category: "Events",
    icon: Users,
    description: "Celebrating success with our dedicated team"
  },
  { 
    id: "default-6",
    title: "Recognition", 
    category: "Awards",
    icon: Star,
    description: "Industry recognition for outstanding performance"
  },
];

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    }
  };

  const hasUploadedImages = images.length > 0;

  return (
    <section id="gallery" className="py-12 md:py-20 bg-card overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="section-title mx-auto">Gallery</h2>
          <p className="text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            A glimpse into our achievements and memorable moments
          </p>
        </motion.div>

        {/* Auto-scrolling gallery */}
        <div 
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
            {hasUploadedImages ? (
              // Show uploaded images from database - duplicated for seamless loop
              [...images, ...images].map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="group relative rounded-xl overflow-hidden cursor-pointer w-[260px] sm:w-[300px] md:w-[320px] aspect-square flex-shrink-0"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-primary-foreground font-semibold text-sm sm:text-base md:text-lg">
                      {image.title}
                    </h3>
                    <span className="text-primary-foreground/70 text-xs sm:text-sm capitalize">
                      {image.category}
                    </span>
                    {image.description && (
                      <p className="text-primary-foreground/80 text-xs mt-1 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Show default placeholder items - duplicated for seamless loop
              [...defaultItems, ...defaultItems].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="group relative bg-gradient-to-br from-secondary to-muted rounded-xl overflow-hidden cursor-pointer w-[260px] sm:w-[300px] md:w-[320px] aspect-square flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-accent/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <h3 className="text-foreground font-semibold text-sm sm:text-base md:text-lg group-hover:text-primary-foreground transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-muted-foreground text-xs sm:text-sm group-hover:text-primary-foreground/70 transition-colors mb-2">
                      {item.category}
                    </span>
                    <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1 sm:mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 text-primary-foreground text-xs">
                      <Image className="w-3 h-3" /> View Photos
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-lg">
                <h3 className="text-white font-semibold text-lg sm:text-xl">{selectedImage.title}</h3>
                <p className="text-white/70 capitalize text-sm sm:text-base">{selectedImage.category}</p>
                {selectedImage.description && (
                  <p className="text-white/80 text-xs sm:text-sm mt-2">{selectedImage.description}</p>
                )}
              </div>
              <button
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
