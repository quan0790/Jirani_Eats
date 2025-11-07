import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Users, TrendingDown, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ✅ Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 🏠 HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 pointer-events-none z-0" />

          <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* LEFT SIDE TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                JiraniEat <span className="text-primary">Share Love</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-xl">
                Connect with your community to reduce food waste and fight hunger.
                Every meal shared makes a difference.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="lg" asChild>
                  <Link to="/auth">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div>
                  <div className="text-4xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Meals Shared</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary">1K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Communities</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl pointer-events-none" />
              <img
                src={heroImage}
                alt="Community members sharing food"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* 🌿 WHY JIRANIEAT */}
        <section className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Why JiraniEat?</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Making a positive impact has never been easier. Join the movement today.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="h-6 w-6 text-primary" />,
                title: "Reduce Waste",
                desc: "Help minimize food waste by sharing surplus with those who need it.",
                color: "primary",
              },
              {
                icon: <Users className="h-6 w-6 text-secondary" />,
                title: "Build Community",
                desc: "Connect with neighbors and strengthen bonds through sharing.",
                color: "secondary",
              },
              {
                icon: <TrendingDown className="h-6 w-6 text-accent" />,
                title: "Fight Hunger",
                desc: "Ensure nutritious meals reach community members in need.",
                color: "accent",
              },
              {
                icon: <Heart className="h-6 w-6 text-primary" />,
                title: "Make Impact",
                desc: "Track your contributions and see the difference you're making.",
                color: "primary",
              },
            ].map(({ icon, title, desc, color }, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 border-border"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center mb-4`}
                  >
                    {icon}
                  </div>
                  <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* 💛 CTA SECTION */}
        <section className="container mx-auto px-4 py-20 relative z-10">
          <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl p-12 text-center max-w-3xl mx-auto backdrop-blur-sm shadow-xl">
            <p className="text-2xl md:text-4xl font-semibold mb-6">
              Join thousands of community members reducing food waste and helping
              neighbors in need.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth">
                  Start Sharing Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Index;
