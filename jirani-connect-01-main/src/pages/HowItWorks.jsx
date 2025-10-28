import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, Upload, Bell, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground max-w-2xl mx-auto">
              Sharing and receiving food has never been easier. Follow these simple steps to get started.
            </h1>
          </section>

          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">For Donors</h2>
              <p className="text-muted-foreground">Have surplus food? Share it with your community in 4 easy steps.</p>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Sign Up</h3>
                </div>
                <p className="text-muted-foreground">
                  Create your free account and set up your profile. It takes less than a minute to get started.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">List Your Food</h3>
                </div>
                <p className="text-muted-foreground">
                  Add details about the food you want to share – type, quantity, and expiry date. Add photos to help receivers.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Get Matched</h3>
                </div>
                <p className="text-muted-foreground">
                  Receive notifications when someone requests your food. Review and approve the request.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Coordinate Pickup</h3>
                </div>
                <p className="text-muted-foreground">
                  Arrange a convenient time and place for the receiver to collect the food. Make an impact!
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">For Receivers</h2>
              <p className="text-muted-foreground">Need food assistance? Access nutritious meals in your community.</p>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">1</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-secondary" />
                  <h3 className="text-xl font-semibold text-foreground">Create Account</h3>
                </div>
                <p className="text-muted-foreground">
                  Sign up for free and complete your profile to start browsing available food donations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Browse Donations</h3>
                <p className="text-muted-foreground">
                  Search for available food in your area. Filter by type, distance, and pickup time.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Request Food</h3>
                <p className="text-muted-foreground">
                  Submit a request for food items you need. Donors will review and respond to your request.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl bg-gradient-card border border-border hover:flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">4</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Pick Up & Enjoy</h3>
                <p className="text-muted-foreground">
                  Once approved, coordinate with the donor to pick up your food. Enjoy your meal!
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-hero rounded-2xl p-8 md:text-3xl text-lg max-w-2xl mx-auto opacity-90">
            <p className="mb-6">
              Join thousands of community members making a difference through food sharing.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth">Join JiraniEat Today</Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
