import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Briefcase, ExternalLink, Github, Linkedin, User } from "lucide-react";

function ExperienceCard({ experience, index }) {
  const {
    id,
    role,
    content,
    linkedin_url,
    github_url,
    offer_type,
    users,
  } = experience;

  const userName = users?.full_name || "Anonymous User";

  // Markdown renderers with theme support
  const markdownComponents = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={
            typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
              ? oneDark
              : oneLight
          }
          language={match[1]}
          PreTag="div"
          className="rounded-md !mt-4 !mb-4"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-amber-700 dark:text-amber-300">
          {children}
        </code>
      );
    },
  };

  // Badge style and text by offer type
  const getOfferBadgeConfig = (type) => {
    switch (type) {
      case "full_time":
        return {
          className: "bg-green-500 hover:bg-green-600 text-white",
          text: "Full Time",
        };
      case "internship_ppo":
        return {
          className: "bg-purple-500 hover:bg-purple-600 text-white",
          text: "Internship Ppo",
        };
      case "internship":
        return {
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          text: "Internship",
        };
      default:
        return {
          className: "bg-gray-500 hover:bg-gray-600 text-white",
          text: type || "Unknown",
        };
    }
  };

  const badgeConfig = getOfferBadgeConfig(offer_type);

  return (
    <AccordionItem
      value={`${id}-${index}`}
      className="w-full border border-gray-200 dark:border-slate-600/30 rounded-xl bg-white dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4 backdrop-blur-sm"
    >
      <AccordionTrigger className="w-full px-6 py-5 hover:no-underline group hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors duration-200">
        <div className="w-full flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {/* Index circle */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-md flex-shrink-0">
              {index + 1}
            </div>

            {/* User details */}
            <div className="w-full min-w-0 flex-1">
              <div className="w-full flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                <h3
                  className="text-lg font-semibold text-gray-900 dark:text-white truncate flex-1"
                  title={userName}
                >
                  {userName}
                </h3>
              </div>

              <div className="w-full flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-500 dark:text-slate-400 flex-shrink-0" />
                <p
                  className="text-sm text-gray-600 dark:text-slate-400 truncate flex-1"
                  title={role || "Position Not Specified"}
                >
                  {role || "Position Not Specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Offer type badge */}
          {offer_type && (
            <Badge
              className={`ml-4 px-3 py-1 text-xs font-medium transition-colors duration-200 flex-shrink-0 ${badgeConfig.className}`}
            >
              {badgeConfig.text}
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="w-full px-6 pb-6">
        <div className="w-full pt-4 space-y-4">
          {/* Experience content */}
          {content ? (
            <div className="w-full prose prose-sm dark:prose-invert max-w-none prose-gray">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="w-full italic text-gray-500 dark:text-slate-400 text-center py-6 text-sm">
              No details provided for this experience.
            </p>
          )}

          {/* Links */}
          {(linkedin_url || github_url) && (
            <div className="w-full flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-slate-600/30">
              {linkedin_url && (
                <a
                  href={linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {github_url && (
                <a
                  href={github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200 hover:underline"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default ExperienceCard;
