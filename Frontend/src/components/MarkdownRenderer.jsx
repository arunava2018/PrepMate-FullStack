import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function MarkdownRenderer({ content }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
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
      console.error('Failed to copy code:', err);
    }
  };

  // Markdown custom components
  const markdownComponents = {
    // --- CODE BLOCKS ---
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <div className="group relative my-4 overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-black/10 bg-[#efe9df] px-3 py-2 dark:border-white/10 dark:bg-[#262421]">
            <span className="text-xs font-mono text-muted-foreground">
              {match[1]}
            </span>
            <button
              onClick={() => copyToClipboard(codeString)}
              className="flex h-7 items-center gap-1.5 rounded-md border border-black/10 px-2 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:border-white/10 dark:hover:bg-[#1c1a18]">
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
            className="!mt-0 !rounded-t-none px-0 text-sm leading-relaxed !bg-transparent"
            showLineNumbers
            wrapLines
            lineNumberStyle={{
              display: 'inline-block',
              width: '2.5em',
              paddingRight: '0.75em',
              textAlign: 'right',
              color: isDarkMode ? '#6b7280' : '#9ca3af', // Tailwind gray shades
              userSelect: 'none',
              fontSize: '0.75rem',
            }}
            {...props}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-muted border border-border px-1.5 py-0.5 rounded text-[0.85rem] font-mono text-foreground font-semibold">
          {children}
        </code>
      );
    },

    // --- HEADINGS ---
    h1({ children, ...props }) {
      return (
        <h1
          className="mb-4 mt-8 text-2xl font-medium leading-tight text-foreground"
          {...props}>
          {children}
        </h1>
      );
    },

    h2({ children, ...props }) {
      return (
        <h2
          className="mb-3 mt-7 text-xl font-medium leading-tight text-foreground"
          {...props}>
          {children}
        </h2>
      );
    },

    h3({ children, ...props }) {
      return (
        <h3
          className="mb-2 mt-6 text-lg font-medium leading-6 text-foreground"
          {...props}>
          {children}
        </h3>
      );
    },

    // --- TEXT ---
    p({ children, ...props }) {
      return (
        <p
          className="mb-4 text-[15px] leading-6 text-[#5e554a] dark:text-[#aaa398]"
          {...props}>
          {children}
        </p>
      );
    },

    blockquote({ children, ...props }) {
      return (
        <blockquote
          className="my-4 rounded-r-md border-l-2 border-[#386eb8] bg-[#f7f4ee] py-2 pl-4 pr-3 text-sm leading-6 text-[#5e554a] dark:border-[#a8c7f3] dark:bg-[#161513] dark:text-[#aaa398]"
          {...props}>
          {children}
        </blockquote>
      );
    },

    ul({ children, ...props }) {
      return (
        <ul
          className="my-4 ml-5 list-disc space-y-1.5 marker:text-[#386eb8] dark:marker:text-[#a8c7f3]"
          {...props}>
          {children}
        </ul>
      );
    },

    ol({ children, ...props }) {
      return (
        <ol
          className="my-4 ml-5 list-decimal space-y-1.5 marker:text-[#386eb8] dark:marker:text-[#a8c7f3]"
          {...props}>
          {children}
        </ol>
      );
    },

    li({ children, ...props }) {
      return (
        <li
          className="text-[15px] leading-6 text-[#5e554a] dark:text-[#aaa398]"
          {...props}>
          {children}
        </li>
      );
    },

    // --- COMPACT TABLES ---
    table({ children, ...props }) {
      return (
        <div className="my-3 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
          <table
            className="min-w-full border-collapse text-sm text-[#5e554a] dark:text-[#aaa398]"
            {...props}>
            {children}
          </table>
        </div>
      );
    },

    thead({ children, ...props }) {
      return (
        <thead className="bg-[#efe9df] text-[#1f1b16] dark:bg-[#262421] dark:text-[#efe9de]">
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
          className="odd:bg-[#fdfbf7] even:bg-[#f7f4ee] hover:bg-[#efe9df] transition-colors dark:odd:bg-[#1c1a18] dark:even:bg-[#161513] dark:hover:bg-[#262421]"
          {...props}>
          {children}
        </tr>
      );
    },

    th({ children, ...props }) {
      return (
        <th
          className="border-b border-black/10 px-3 py-2 text-left text-xs font-medium dark:border-white/10"
          {...props}>
          {children}
        </th>
      );
    },

    td({ children, ...props }) {
      return (
        <td
          className="border-b border-black/10 px-3 py-2 dark:border-white/10"
          {...props}>
          {children}
        </td>
      );
    },
  };

  return (
    <div className="prose prose-base dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
