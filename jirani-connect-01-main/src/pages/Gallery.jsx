import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// ✅ Local images
import img1 from "@/assets/istockphoto-2177023240-1024x1024.jpg";
import img2 from "@/assets/pexels-orlovamaria-4946998.jpg";
import img3 from "@/assets/pexels-rdne-5738245.jpg";
import img4 from "@/assets/pexels-anastasia-shuraeva-8466773.jpg";
import img5 from "@/assets/pexels-askar-abayev-5638704.jpg";
import img6 from "@/assets/pexels-cedric-fauntleroy-7221276.jpg";
import img7 from "@/assets/pexels-mostafameraji-3079261.jpg";
import img8 from "@/assets/pexels-greta-hoffman-9706056.jpg";

const galleryImages = [
  { url: img1, caption: "Volunteers preparing nutritious meals", category: "Volunteers" },
  { url: img2, caption: "Freshly prepared food ready for sharing", category: "Meals" },
  { url: img3, caption: "Community members receiving donated food", category: "Community" },
  { url: img4, caption: "Grateful smiles — the impact of your donations", category: "Events" },
  { url: img5, caption: "Chefs preparing meals with care and love", category: "Meals" },
  { url: img6, caption: "Health and nutrition awareness sessions", category: "Events" },
  { url: img7, caption: "Volunteers packaging food for families", category: "Volunteers" },
  { url: img8, caption: "Moments of gratitude from the community", category: "Community" },
];

const categories = ["All", "Volunteers", "Meals", "Community", "Events"];

const Gallery = () => {
  const [index, setIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ Filtered images by category
  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/20 to-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-16">
        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore moments of kindness, compassion, and shared meals that connect our community.
          </p>
        </motion.div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-primary/10"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.url}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setIndex(idx)}
                className="cursor-pointer group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-64 object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <p className="text-white text-sm p-4">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ✅ LIGHTBOX VIEWER */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={filteredImages.map((img) => ({
            src: img.url,
            description: img.caption,
          }))}
          animation={{ fade: 300, swipe: 400 }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
            description: { color: "#eee", fontSize: "0.9rem" },
          }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
