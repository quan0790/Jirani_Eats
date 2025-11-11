import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Gift, Handshake, MapPin } from "lucide-react";

const HowItWorks = () => {
  const stepsDonor = [
    {
      id: 1,
      title: "Sign Up",
      desc: "Create your free account and set up your profile — it takes less than a minute to get started.",
      icon: <Users className="w-8 h-8 text-green-600" />,
    },
    {
      id: 2,
      title: "List Your Food",
      desc: "Add details about the food you want to share — type, quantity, and expiry date. Upload photos to help receivers.",
      icon: <Gift className="w-8 h-8 text-green-600" />,
    },
    {
      id: 3,
      title: "Get Matched",
      desc: "Receive instant notifications when someone requests your food. Review their profile and approve the request.",
      icon: <Handshake className="w-8 h-8 text-green-600" />,
    },
    {
      id: 4,
      title: "Coordinate Pickup",
      desc: "Arrange a convenient time and place for collection. Make a real impact in your community!",
      icon: <MapPin className="w-8 h-8 text-green-600" />,
    },
  ];

  const stepsReceiver = [
    {
      id: 1,
      title: "Create Account",
      desc: "Sign up for free and complete your profile to start exploring available donations.",
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 2,
      title: "Browse Donations",
      desc: "Search for available food in your neighborhood. Filter by category, distance, or pickup time.",
      icon: <Gift className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 3,
      title: "Request Food",
      desc: "Submit a request for the food items you need. The donor will review and confirm availability.",
      icon: <Handshake className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 4,
      title: "Pick Up & Enjoy",
      desc: "Once approved, coordinate with the donor to pick up your meal. Enjoy your food — and the power of community sharing!",
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Navbar at the top */}
      <Navbar />

      {/* ✅ Main Content */}
      <main className="flex-1 py-16 px-6 md:px-20">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-800"
          >
            How It Works
          </motion.h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Sharing and receiving food has never been easier. Follow these simple steps to start making a difference today.
          </p>
        </div>

        {/* For Donors */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-green-700 text-center mb-8">
            For Donors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepsDonor.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{step.desc}</p>
                <span className="text-gray-400 text-xs mt-3 block">Step {step.id}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* For Receivers */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 text-center mb-8">
            For Receivers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepsReceiver.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{step.desc}</p>
                <span className="text-gray-400 text-xs mt-3 block">Step {step.id}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ✅ Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default HowItWorks;
