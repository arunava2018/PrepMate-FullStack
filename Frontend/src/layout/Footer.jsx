import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin } from "lucide-react";
import logo from "@/assets/logo.jpg";
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-950 text-neutral-700 dark:text-gray-300 mt-10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 tracking-wide">
            <img src={logo} alt="PrepMate Logo" className="h-8 w-8 rounded-full" /> 
              PrepMate
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-gray-400 leading-relaxed">
            Your personal Q&A bank for Computer Science interview prep.  
            <br />Organize, revise & crack your interviews.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <a href="#features" className="hover:text-yellow-500 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-yellow-500 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <Link to="/auth/signup" className="hover:text-yellow-500 transition-colors">
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            Resources
          </h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Docs</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            Connect
          </h3>
          <div className="mt-4 flex justify-center md:justify-start space-x-5">
            <a href="https://x.com/Arunava17818355" className="hover:text-yellow-500 transition-colors">
              <Twitter size={22} />
            </a>
            <a href="https://github.com/arunava2018" className="hover:text-yellow-500 transition-colors">
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/arunava-banerjee1/"
              className="hover:text-yellow-500 transition-colors"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 dark:border-gray-800 py-5 text-center text-sm text-neutral-600 dark:text-gray-500 transition-colors">
        <p>
          Made with <span className="text-yellow-500">❤️</span> by{" "}
          <span className="font-medium text-neutral-800 dark:text-gray-300">Arunava</span> • ©{" "}
          {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
