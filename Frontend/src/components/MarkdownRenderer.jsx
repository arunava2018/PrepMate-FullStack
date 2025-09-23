import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
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

  // Copy code to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Markdown custom components
  const markdownComponents = {
    // --- CODE BLOCKS ---
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      return !inline && match ? (
        <div className="relative group my-4 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
          {/* Header bar */}
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-1.5">
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {match[1]}
            </span>
            <button
              onClick={() => copyToClipboard(codeString)}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-amber-500 hover:text-white transition-colors"
            >
              {copiedCode === codeString ? (
                <>
                  <Check className="w-3 h-3" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighter */}
          <SyntaxHighlighter
            style={isDarkMode ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            className="!mt-0 !rounded-t-none text-sm leading-relaxed !bg-transparent px-0"
            showLineNumbers
            wrapLines
            lineNumberStyle={{
              display: "inline-block",
              width: "2.5em",
              paddingRight: "0.75em",
              textAlign: "right",
              color: isDarkMode ? "#6b7280" : "#9ca3af", // Tailwind gray shades
              userSelect: "none",
              fontSize: "0.75rem",
            }}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-1 py-0.5 rounded text-[0.85rem] font-mono text-amber-800 dark:text-amber-200 font-medium">
          {children}
        </code>
      );
    },

    // --- HEADINGS ---
    h1({ children, ...props }) {
      return (
        <h1
          className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white"
          {...props}
        >
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {children}
          </span>
        </h1>
      );
    },

    h2({ children, ...props }) {
      return (
        <h2
          className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2"
          {...props}
        >
          <div className="w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
          {children}
        </h2>
      );
    },

    h3({ children, ...props }) {
      return (
        <h3
          className="text-xl font-semibold mt-6 mb-2 text-gray-700 dark:text-gray-200 border-l-4 border-amber-400 pl-2"
          {...props}
        >
          {children}
        </h3>
      );
    },

    // --- TEXT ---
    p({ children, ...props }) {
      return (
        <p
          className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4"
          {...props}
        >
          {children}
        </p>
      );
    },

    blockquote({ children, ...props }) {
      return (
        <blockquote
          className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/10 pl-4 pr-3 py-2 my-4 rounded-r-md italic text-gray-700 dark:text-gray-300 text-sm"
          {...props}
        >
          {children}
        </blockquote>
      );
    },

    ul({ children, ...props }) {
      return (
        <ul className="space-y-1.5 my-4 ml-5 list-disc marker:text-amber-500 dark:marker:text-amber-400" {...props}>
          {children}
        </ul>
      );
    },

    ol({ children, ...props }) {
      return (
        <ol className="space-y-1.5 my-4 ml-5 list-decimal marker:text-amber-500 dark:marker:text-amber-400" {...props}>
          {children}
        </ol>
      );
    },

    li({ children, ...props }) {
      return (
        <li
          className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
          {...props}
        >
          {children}
        </li>
      );
    },

    // --- COMPACT TABLES ---
    table({ children, ...props }) {
      return (
        <div className="overflow-x-auto my-3 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none">
          <table
            className="min-w-full border-collapse text-sm text-gray-700 dark:text-gray-300"
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },

    thead({ children, ...props }) {
      return (
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {children}
        </thead>
      );
    },

    tbody({ children, ...props }) {
      return <tbody>{children}</tbody>;
    },

    tr({ children, ...props }) {
      return (
        <tr
          className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
          {...props}
        >
          {children}
        </tr>
      );
    },

    th({ children, ...props }) {
      return (
        <th
          className="px-3 py-2 text-xs font-semibold uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 text-left"
          {...props}
        >
          {children}
        </th>
      );
    },

    td({ children, ...props }) {
      return (
        <td
          className="px-3 py-2 whitespace-nowrap border-b border-gray-100 dark:border-gray-800"
          {...props}
        >
          {children}
        </td>
      );
    },
  };

  return (
    <div className="prose prose-base dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
