import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl text-foreground max-w-2xl mx-auto">
              We're on a mission to connect communities, reduce food waste, and ensure no one goes hungry.
            </h1>
          </section>

          <section className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-4 text-center p-6 rounded-xl bg-gradient-card border border-border">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground">
                To create a world where surplus food reaches those who need it most, building stronger communities in the process.
              </p>
            </div>

            <div className="space-y-4 text-center p-6 rounded-xl bg-gradient-card border border-border">
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground">
                A sustainable future where food waste is minimized and every community member has access to nutritious meals.
              </p>
            </div>

            <div className="space-y-4 text-center p-6 rounded-xl bg-gradient-card border border-border">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Our Community</h3>
              <p className="text-muted-foreground">
                Thousands of donors and receivers working together to make a positive impact in their neighborhoods.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                JiraniEat was born from a simple observation, 
                others in the same neighborhood struggle to put meals on the table. We knew there had to be a better way 
                to connect these two groups.
              </p>
              <p>
                Our platform makes it easy for anyone to share or receive food in their community. Whether you're a 
                restaurant with excess inventory, a family with leftover groceries, or someone who could use a helping hand, 
                JiraniEat brings people together through the universal language of food.
              </p>
              <p>
                Together, we're not just fighting hunger and food waste – we're building bridges between neighbors and 
                creating a more connected, compassionate community.
              </p>
            </div>
          </section>

          <section className="bg-gradient-hero rounded-2xl p-8 md:text-3xl text-lg max-w-2xl mx-auto opacity-90">
            <p>
              Every meal shared is a step toward a more sustainable and caring community. 
              Be part of the change.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="text-center">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-sm opacity-90">Meals Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">2.5K+</div>
                <div className="text-sm opacity-90">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm opacity-90">Communities</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
