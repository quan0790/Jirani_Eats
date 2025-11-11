import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Heart } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        {/* ✨ Hero Section */}
        <motion.section
          className="text-center space-y-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight max-w-3xl mx-auto">
            We’re on a mission to connect communities, reduce food waste, and ensure no one goes hungry.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every shared meal tells a story — of compassion, sustainability, and community.
          </p>
        </motion.section>

        {/* 🌍 Mission, Vision, Community Cards */}
        <section className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Heart className="h-8 w-8 text-primary" />,
              title: "Our Mission",
              text: "To create a world where surplus food reaches those who need it most, building stronger communities in the process.",
            },
            {
              icon: <Target className="h-8 w-8 text-secondary" />,
              title: "Our Vision",
              text: "A sustainable future where food waste is minimized and every community member has access to nutritious meals.",
            },
            {
              icon: <Users className="h-8 w-8 text-accent" />,
              title: "Our Community",
              text: "Thousands of donors and receivers working together to make a positive impact in their neighborhoods.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl bg-card shadow-md hover:shadow-lg border border-border hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </section>

        {/* 💚 Our Story Card with Gradient + Decorative Background */}
        <motion.section
          className="mt-24 max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative background elements */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-primary/10 rounded-full filter blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-accent/10 rounded-full filter blur-3xl pointer-events-none"></div>

          {/* Main card content */}
          <div className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 border border-border rounded-3xl shadow-lg p-10 md:p-14 hover:shadow-2xl transition-all duration-500">
            <h2 className="text-3xl font-bold text-center text-foreground mb-6">
              Our Story
            </h2>
            <div className="text-muted-foreground text-center space-y-5 leading-relaxed">
              <p>
                <strong className="text-primary">JiraniEat</strong> was born from a simple realization — while some have surplus food, 
                others in the same neighborhood struggle to put meals on the table. 
                We knew there had to be a better way to connect these two groups.
              </p>
              <p>
                Our platform makes it easy for anyone to share or receive food in their community. 
                Whether you're a restaurant with excess inventory, a family with leftover groceries, 
                or someone who could use a helping hand, JiraniEat brings people together through the 
                universal language of food.
              </p>
              <p>
                Together, we're not just fighting hunger and food waste — we're building bridges between neighbors 
                and creating a more connected, compassionate community.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 🌈 Stats Highlight Section */}
        <motion.section
          className="bg-gradient-to-r from-primary/80 via-accent/70 to-secondary/70 text-white text-center rounded-3xl p-10 mt-20 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl font-semibold mb-6">
            Every meal shared is a step toward a more sustainable and caring community. Be part of the change.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <Stat number="10K+" label="Meals Shared" />
            <Stat number="2.5K+" label="Active Users" />
            <Stat number="500+" label="Communities" />
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

// ✅ Small reusable Stat component
const Stat = ({ number, label }) => (
  <motion.div
    className="text-center"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-4xl font-extrabold">{number}</div>
    <div className="text-sm opacity-90">{label}</div>
  </motion.div>
);

export default About;
