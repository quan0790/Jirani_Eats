import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Support</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Need help or have a question? Our support team is here for you.  
          You can reach us at{" "}
          <a href="mailto:support@jiranieat.org" className="text-primary underline">
            support@jiranieat.org
          </a>{" "}
          or use the contact form below.
        </p>

        <form className="max-w-lg mx-auto mt-10 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-md p-3 min-h-[120px]"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition"
          >
            Send Message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ContactSupport;
