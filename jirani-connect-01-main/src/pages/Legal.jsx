import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Legal = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* 🌿 Navbar */}
      <Navbar />

      {/* 🌟 Hero Section */}
      <header className="bg-green-600 text-white py-16 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Legal & Privacy Policy
          </h1>
          <p className="text-green-100 max-w-2xl mx-auto text-lg">
            Your trust is our priority — learn how JiraniEat protects your information
            and ensures transparency.
          </p>
        </motion.div>
      </header>

      {/* 📜 Main Content */}
      <main className="flex-grow container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="space-y-10"
        >
          {/* Intro */}
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-green-500"
          >
            <p className="text-gray-700 leading-relaxed">
              At <strong>JiraniEat</strong>, we value your privacy and are committed to
              protecting your personal data. This policy explains how we collect, use,
              and safeguard your information.
            </p>
          </motion.div>

          {/* Section 1 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              1. Data Collection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect basic personal information such as your name, email address,
              and location to enable community food sharing and facilitate communication
              between donors and recipients.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              2. Data Usage
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is used exclusively for platform operations — to connect users,
              manage donations, and ensure a safe community experience. We never sell
              or share your information with third parties for marketing purposes.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              3. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Have questions about your data or our policies? Reach out anytime at{" "}
              <a
                href="mailto:legal@jiranieat.org"
                className="text-green-600 font-medium hover:underline"
              >
                legal@jiranieat.org
              </a>{" "}
              and our team will be happy to assist.
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* 🌿 Footer */}
      <Footer />
    </div>
  );
};

export default Legal;
