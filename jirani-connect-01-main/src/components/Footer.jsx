import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <span className="text-xl font-bold text-primary-foreground">JE</span>
              </div>
              <span className="text-xl font-bold text-foreground">JiraniEat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting communities to reduce food waste and curb hunger.
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/support"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 JiraniEat. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-2 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive" />
            <span>for the community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
