import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, GraduationCap, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { UrlState } from "@/context";
export default function Footer() {
  const {user} = UrlState();
  const isAuthenticated = !!user?.id;
  return (
    <footer className="bg-white dark:bg-neutral-950 text-neutral-700 dark:text-gray-300 mt-12 transition-colors">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-15 justify-items-center md:justify-items-start text-center md:text-left">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start sm:max-w-xs">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-10 w-10 rounded-full  text-yellow-600 dark:text-yellow-400  shadow-md" />
            <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 tracking-wide">
              PrepMate
            </h2>
          </div>
          <p className="mt-4 text-sm text-neutral-600 dark:text-gray-400 leading-relaxed max-w-xs">
            Your personal Q&A bank for Computer Science interview prep.  
            <br />Organize, revise & crack your interviews.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3">
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
              {!isAuthenticated ? <Link
                to="/auth/signup"
                className="inline-block px-4 py-2 dark:text-white font-medium hover:underline"
              >
                Get Started
              </Link> : <Link
                to="/"
                className="inline-block px-4 py-2 dark:text-white font-medium hover:underline"
              >
                Get Started
              </Link> }
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            Connect
          </h3>
          <div className="mt-5 flex gap-4">
            {[
              { href: "https://x.com/Arunava17818355", icon: Twitter },
              { href: "https://github.com/arunava2018", icon: Github },
              { href: "https://www.linkedin.com/in/arunava-banerjee1/", icon: Linkedin },
            ].map(({ href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 dark:border-gray-700 hover:bg-yellow-500 hover:text-white transition"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 dark:border-gray-800 py-5 text-center text-sm text-neutral-600 dark:text-gray-500 transition-colors">
        <p>
          Made <span className="text-yellow-500"></span> by{" "}
          <span className="font-medium text-neutral-800 dark:text-gray-300"><Link to="https://arunava-banerjee.vercel.app/" target="_blank" className="hover:text-yellow-500">Arunava</Link></span> • ©{" "}
          {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
