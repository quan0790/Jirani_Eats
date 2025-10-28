import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, TrendingDown, Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-extrabold leading-tight">
                JiraniEat<span className="text-primary"> Share Love</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-4">
                Connect with your community to reduce food waste and fight hunger.
                Every meal shared makes a difference.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <Button size="lg" asChild>
                  <Link to="/auth">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Meals Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">1K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Communities</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Community members sharing food"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Why JiraniEat?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Making a positive impact has never been easier. Join the movement today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Reduce Waste</CardTitle>
                <CardDescription>
                  Help minimize food waste by sharing surplus with those who need it.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Build Community</CardTitle>
                <CardDescription>
                  Connect with neighbors and strengthen bonds through sharing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingDown className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Fight Hunger</CardTitle>
                <CardDescription>
                  Ensure nutritious meals reach community members in need.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Make Impact</CardTitle>
                <CardDescription>
                  Track your contributions and see the difference you're making.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-hero rounded-3xl p-12 text-center max-w-2xl mx-auto opacity-90">
            <p className="text-2xl md:text-4xl font-semibold mb-6">
              Join thousands of community members who are already reducing food waste
              and helping neighbors in need.
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

      <Footer />
    </div>
  );
};

export default Index;
