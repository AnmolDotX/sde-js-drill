'use client';

import React, { useState, useMemo } from 'react';
import Prism from 'prismjs';
// Prism language components
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-lua';

// Prevent Prism from mutating the DOM automatically after SSR hydration
if (typeof window !== 'undefined') {
  Prism.manual = true;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

export function CodeBlock({ code, language = 'typescript', title, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const normalizedLang = language.toLowerCase();
  const prismLang =
    normalizedLang === 'js'
      ? 'javascript'
      : normalizedLang === 'ts'
      ? 'typescript'
      : normalizedLang === 'tsx'
      ? 'tsx'
      : normalizedLang === 'jsx'
      ? 'jsx'
      : normalizedLang === 'sql'
      ? 'sql'
      : normalizedLang === 'bash' || normalizedLang === 'sh'
      ? 'bash'
      : normalizedLang === 'json'
      ? 'json'
      : normalizedLang === 'lua'
      ? 'lua'
      : 'javascript';

  // Synchronous, guaranteed Prism HTML tokenization
  const highlightedHtml = useMemo(() => {
    try {
      const grammar = Prism.languages[prismLang] || Prism.languages.javascript;
      return Prism.highlight(code.trim(), grammar, prismLang);
    } catch (err) {
      console.warn('Prism highlighting fallback:', err);
      return code.trim();
    }
  }, [code, prismLang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3.5 rounded-2xl border border-[var(--border-shell)] bg-[var(--code-bg)] overflow-hidden shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--code-header)] border-b border-[var(--border-inner)] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          <span className="font-mono text-neutral-200 text-xs sm:text-sm font-normal tracking-wide">
            {title || `${language.toUpperCase()} Blueprint`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase text-neutral-400 bg-white/[0.05] px-2.5 py-0.5 rounded border border-white/[0.06]">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="font-mono text-xs text-neutral-300 hover:text-amber-400 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer font-normal"
          >
            {copied ? (
              <>
                <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with guaranteed HTML tokens */}
      <div className="p-4 sm:p-5 overflow-x-auto text-sm sm:text-[15px] font-mono leading-relaxed bg-[var(--code-bg)]">
        <pre suppressHydrationWarning className="!m-0 !p-0 !bg-transparent whitespace-pre">
          <code
            suppressHydrationWarning
            className={`language-${prismLang} font-mono`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>

      {/* Optional Note */}
      {explanation && (
        <div className="px-4 py-3 bg-[var(--code-header)] border-t border-[var(--border-inner)] text-sm text-neutral-300 font-sans leading-relaxed">
          <span className="text-amber-400 font-mono font-medium mr-1.5">Note:</span>
          {explanation}
        </div>
      )}
    </div>
  );
}
