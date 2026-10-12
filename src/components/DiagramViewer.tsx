'use client';

import React from 'react';

interface DiagramViewerProps {
  type?: 'er' | 'sequence' | 'class' | 'flow' | 'architecture';
  code?: string;
  title?: string;
}

export function DiagramViewer({ type = 'architecture', code, title }: DiagramViewerProps) {
  if (!code) return null;

  return (
    <div className="my-4 rounded border border-[#3e4145] bg-[#242628] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-[#1f2123] border-b border-[#3e4145] text-xs">
        <span className="font-mono text-[#e2b714] font-medium flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          {title || `${type.toUpperCase()} Visual Specification`}
        </span>
        <span className="text-[11px] font-mono uppercase text-[#646669] px-1.5 py-0.5 rounded bg-[#2c2e31]">
          {type}
        </span>
      </div>

      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-[#d1d0c5]">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}
