import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import { UrlState } from "@/context";

export default function Footer() {
  const { user } = UrlState();
  const isAuthenticated = !!user?.id;

  return (
    <footer className="bg-background text-foreground border-t border-border mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-yellow-500" />
              <h2 className="text-lg font-bold text-yellow-500">PrepMate</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Your personal Q&A bank for Computer Science interview prep. 
              Organize, revise & crack interviews with confidence.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {[
                { href: "https://x.com/Arunava17818355", icon: Twitter, label: "Twitter" },
                { href: "https://github.com/arunava2018", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/arunava-banerjee1/", icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-500 mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/changelog" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  What's New
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Mobile App
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-500 mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                {!isAuthenticated ? (
                  <Link
                    to="/auth/signup"
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                <Link to="/interview-experiences" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Interview Experiences
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Study Guides
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Help Center
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-500 mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about-us" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-500 mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                {!isAuthenticated ? (
                  <Link
                    to="/auth/signup"
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    Get Started
                  </Link>
                ) : (
                  <Link to="/dashboard" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                    My Account
                  </Link>
                )}
              </li>
              <li>
                <a 
                  href="mailto:support@prepmate.com"
                  className="text-muted-foreground hover:text-yellow-500 transition-colors inline-flex items-center gap-1"
                >
                  <Mail size={14} />
                  Support
                </a>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} PrepMate. All rights reserved.</span>
              <Link
                to="/cookies"
                className="hover:text-yellow-500 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              Made by{" "}
              <Link
                to="https://arunava-banerjee.vercel.app/"
                target="_blank"
                className="hover:text-yellow-500 font-medium transition-colors"
              >
                Arunava
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
