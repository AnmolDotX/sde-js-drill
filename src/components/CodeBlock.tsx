'use client';

import React, { useState, useEffect } from 'react';
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

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

export function CodeBlock({ code, language = 'typescript', title, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  return (
    <div className="my-3 rounded-xl border border-white/[0.08] bg-[#0f1113] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#16181b] border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block" />
          <span className="font-mono text-neutral-300 text-[11px] font-medium tracking-wide">
            {title || `${language.toUpperCase()} Snippet`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase text-neutral-500 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05]">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="font-mono text-[11px] text-neutral-400 hover:text-amber-400 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0b0c0e]">
        <pre className={`language-${prismLang} !m-0 !p-0 !bg-transparent`}>
          <code className={`language-${prismLang} text-[#e2e8f0]`}>{code.trim()}</code>
        </pre>
      </div>

      {/* Optional Explanation Footer */}
      {explanation && (
        <div className="px-4 py-2.5 bg-[#141619] border-t border-white/[0.04] text-[11px] text-neutral-400 font-sans leading-relaxed">
          <span className="text-amber-400/90 font-mono font-medium mr-1.5">Note:</span>
          {explanation}
        </div>
      )}
    </div>
  );
}
