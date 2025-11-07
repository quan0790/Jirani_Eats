import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, Upload, Bell, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ✅ Navbar */}
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* INTRO SECTION */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">
              Sharing and receiving food has never been easier.
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow these simple steps to start making a difference today.
            </p>
          </section>

          {/* FOR DONORS */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">For Donors</h2>
              <p className="text-muted-foreground">
                Have surplus food? Share it with your community in 4 easy steps.
              </p>
            </div>

            {[
              {
                step: 1,
                icon: <UserPlus className="h-5 w-5 text-primary" />,
                title: "Sign Up",
                text: "Create your free account and set up your profile. It takes less than a minute to get started.",
              },
              {
                step: 2,
                icon: <Upload className="h-5 w-5 text-primary" />,
                title: "List Your Food",
                text: "Add details about the food you want to share – type, quantity, and expiry date. Add photos to help receivers.",
              },
              {
                step: 3,
                icon: <Bell className="h-5 w-5 text-primary" />,
                title: "Get Matched",
                text: "Receive notifications when someone requests your food. Review and approve the request.",
              },
              {
                step: 4,
                icon: <HandHeart className="h-5 w-5 text-primary" />,
                title: "Coordinate Pickup",
                text: "Arrange a convenient time and place for the receiver to collect the food. Make an impact!",
              },
            ].map(({ step, icon, title, text }) => (
              <div
                key={step}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:bg-muted/40 transition"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{step}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>
                  <p className="text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </section>

          {/* FOR RECEIVERS */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">For Receivers</h2>
              <p className="text-muted-foreground">
                Need food assistance? Access nutritious meals in your community.
              </p>
            </div>

            {[
              {
                step: 1,
                title: "Create Account",
                text: "Sign up for free and complete your profile to start browsing available food donations.",
              },
              {
                step: 2,
                title: "Browse Donations",
                text: "Search for available food in your area. Filter by type, distance, and pickup time.",
              },
              {
                step: 3,
                title: "Request Food",
                text: "Submit a request for food items you need. Donors will review and respond to your request.",
              },
              {
                step: 4,
                title: "Pick Up & Enjoy",
                text: "Once approved, coordinate with the donor to pick up your food. Enjoy your meal!",
              },
            ].map(({ step, title, text }) => (
              <div
                key={step}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:bg-muted/40 transition"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">{step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </section>

          {/* CALL TO ACTION */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:text-2xl text-lg max-w-3xl mx-auto">
            <p className="mb-6">
              Join thousands of community members making a difference through food sharing.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth">Join JiraniEats Today</Link>
            </Button>
          </section>
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default HowItWorks;
