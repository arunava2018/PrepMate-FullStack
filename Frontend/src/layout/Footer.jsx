import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import { UrlState } from "@/context";
import { socialLinks } from "../constants.js";
export default function Footer() {
  const { user } = UrlState();
  const isAuthenticated = !!user?.id;

  return (
    <footer className="bg-background text-foreground border-t border-border mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center sm:text-left">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 sm:mb-0">
            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <GraduationCap className="h-7 w-7 text-yellow-500" />
              <h2 className="text-lg font-bold text-yellow-500">PrepMate</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto sm:mx-0">
              Your personal Q&A bank for Computer Science interview prep.
              Organize, revise & crack interviews with confidence.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mb-6 flex-wrap justify-center sm:justify-start">
              {socialLinks.map(({ href, icon: Icon, label }, i) => (
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
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  What's New
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Mobile App</span>
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
                    className="text-muted-foreground hover:text-yellow-500"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="text-muted-foreground hover:text-yellow-500"
                  >
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                <Link
                  to="/view-interview-experiences"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  Interview Experiences
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Study Guides</span>
              </li>
              <li>
                <span className="text-muted-foreground">Help Center</span>
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
                <Link
                  to="/about-us"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-yellow-500"
                >
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
                    className="text-muted-foreground hover:text-yellow-500"
                  >
                    Get Started
                  </Link>
                ) : (
                  <Link
                    to={`/profile/${user.id}`}
                    className="text-muted-foreground hover:text-yellow-500"
                  >
                    <span className="sm:inline hidden">My Account</span>
                    <span className="inline sm:hidden">Account</span>
                  </Link>
                )}
              </li>
              <li>
                <div className="text-muted-foreground hover:text-yellow-500 flex items-center gap-2 justify-center sm:justify-start cursor-pointer">
                  <Mail size={14} />
                  <span className="sm:inline hidden">Support</span>
                  <span className="inline sm:hidden">Help</span>
                </div>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  <span className="sm:inline hidden">Status</span>
                  <span className="inline sm:hidden">Site</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  <span className="sm:inline hidden">Community</span>
                  <span className="inline sm:hidden">Forum</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-muted-foreground">
              <span>
                © {new Date().getFullYear()} PrepMate. All rights reserved.
              </span>
              <Link to="/cookies" className="hover:text-yellow-500">
                Cookie Policy
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              Made by{" "}
              <Link
                to="https://arunava-banerjee.vercel.app/"
                target="_blank"
                className="hover:text-yellow-500 font-medium"
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
