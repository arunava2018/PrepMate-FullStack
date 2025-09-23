
import React, { useState, useEffect } from "react";import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from "lucide-react";
export default function MarkdownRenderer({ content }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Copy code
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Markdown components
  const markdownComponents = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      return !inline && match ? (
        <div className="relative group my-6">
          <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 rounded-t-lg border-b border-gray-700">
            <span className="text-sm font-mono text-gray-300 capitalize">
              {match[1]}
            </span>
            <button
              onClick={() => copyToClipboard(codeString)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
            >
              {copiedCode === codeString ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <SyntaxHighlighter
            style={isDarkMode ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            className="!mt-0 !rounded-t-none text-sm leading-relaxed"
            showLineNumbers={codeString.split("\n").length > 5}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-2 py-1 rounded-md text-sm font-mono text-amber-800 dark:text-amber-200 font-medium">
          {children}
        </code>
      );
    },

    h1({ children, ...props }) {
      return (
        <h1
          className="text-3xl font-bold mt-12 mb-6 pb-3 border-b-2 border-gradient-to-r from-amber-400 to-orange-500 text-gray-900 dark:text-white relative group"
          {...props}
        >
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          {children}
        </h1>
      );
    },

    h2({ children, ...props }) {
      return (
        <h2
          className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2"
          {...props}
        >
          <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
          {children}
        </h2>
      );
    },

    h3({ children, ...props }) {
      return (
        <h3
          className="text-xl font-semibold mt-8 mb-3 text-gray-700 dark:text-gray-200 border-l-4 border-amber-400 pl-4"
          {...props}
        >
          {children}
        </h3>
      );
    },

    p({ children, ...props }) {
      return (
        <p
          className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
          {...props}
        >
          {children}
        </p>
      );
    },

    blockquote({ children, ...props }) {
      return (
        <blockquote
          className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/10 pl-6 pr-4 py-4 my-6 rounded-r-lg italic text-gray-700 dark:text-gray-300"
          {...props}
        >
          {children}
        </blockquote>
      );
    },

    ul({ children, ...props }) {
      return (
        <ul className="space-y-2 my-6 ml-6" {...props}>
          {children}
        </ul>
      );
    },

    ol({ children, ...props }) {
      return (
        <ol className="space-y-2 my-6 ml-6 list-decimal" {...props}>
          {children}
        </ol>
      );
    },

    li({ children, ...props }) {
      return (
        <li
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2"
          {...props}
        >
          <span className="w-2 h-2 bg-amber-400 rounded-full mt-3 flex-shrink-0"></span>
          <span>{children}</span>
        </li>
      );
    },

    table({ children, ...props }) {
      return (
        <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },

    thead({ children, ...props }) {
      return (
        <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
          {children}
        </thead>
      );
    },

    th({ children, ...props }) {
      return (
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          {...props}
        >
          {children}
        </th>
      );
    },

    td({ children, ...props }) {
      return (
        <td
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
          {...props}
        >
          {children}
        </td>
      );
    },
  };

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
