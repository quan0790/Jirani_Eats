import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";

const Contacts = () => {
  return (
    <>
      <Navbar />

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Contact Us
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions, suggestions, or want to partner with us? Reach out below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="space-y-4">
              <Input placeholder="Your Name" className="w-full" />
              <Input placeholder="Your Email" type="email" className="w-full" />
              <Textarea placeholder="Your Message" className="w-full h-32" />
              <Button className="w-full">Send Message</Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Phone className="text-primary" />
                <p className="text-sm text-muted-foreground">+254 790 264 792</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary" />
                <p className="text-sm text-muted-foreground">support@jiranieat.org</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary" />
                <p className="text-sm text-muted-foreground">Busia, Kenya</p>
              </div>

              {/* Social Media */}
              <div className="flex flex-wrap gap-4 mt-6">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/254790264792"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Facebook className="h-5 w-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90"
                >
                  <Instagram className="h-5 w-5" />
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black text-white hover:bg-neutral-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 1227"
                    className="h-5 w-5 fill-white"
                  >
                    <path d="M714.163 519.284L1160.89 0H1051.58L665.001 450.887L364.185 0H0L468.75 681.871L0 1226.98H109.315L517.782 745.7L835.815 1226.98H1200L714.137 519.284H714.163ZM573.594 682.914L522.486 609.871L149.1 79.6176H313.269L603.392 498.654L654.5 571.696L1056.92 1150.48H892.75L573.594 682.914Z" />
                  </svg>
                </a>

                {/* Snapchat */}
                <a
                  href="https://snapchat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-yellow-400 text-black hover:bg-yellow-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 2C9.27 2 7.1 4.17 7.1 6.9v.67c-1.19.46-2.03 1.61-2.03 2.94v.06c0 .7.56 1.26 1.26 1.26.14 0 .28-.02.41-.06.08.3.2.59.35.86-.27.15-.57.24-.9.24-.87 0-1.57.7-1.57 1.57v.06c0 .7.56 1.26 1.26 1.26.1 0 .2-.01.29-.03.19.72.61 1.35 1.18 1.83v.68c0 2.73 2.17 4.9 4.9 4.9s4.9-2.17 4.9-4.9v-.68c.57-.48.99-1.11 1.18-1.83.09.02.19.03.29.03.7 0 1.26-.56 1.26-1.26v-.06c0-.87-.7-1.57-1.57-1.57-.32 0-.63-.09-.9-.24.15-.27.27-.56.35-.86.13.04.27.06.41.06.7 0 1.26-.56 1.26-1.26v-.06c0-1.33-.84-2.48-2.03-2.94v-.67C16.9 4.17 14.73 2 12 2Z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-sky-400 text-white hover:bg-sky-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 240 240"
                    className="h-5 w-5 fill-white"
                  >
                    <path d="M120 0C53.8 0 0 53.8 0 120s53.8 120 120 120 120-53.8 120-120S186.2 0 120 0zm58.9 85.4l-21.3 100.3c-1.6 7.2-5.8 9-11.8 5.6l-32.6-24.1-15.7 15.1c-1.7 1.7-3.2 3.2-6.5 3.2l2.3-33.2 60.4-54.5c2.6-2.3-.6-3.6-4-1.3l-74.7 47-32.2-10c-7-2.2-7.2-7-1.6-10.3l125.9-48.5c5.8-2.2 10.9 1.3 9.1 9.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-12">
            <iframe
              title="Busia Map"
              src="https://www.google.com/maps?q=Busia,Kenya&output=embed"
              width="100%"
              height="350"
              className="rounded-lg border border-border"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contacts;
