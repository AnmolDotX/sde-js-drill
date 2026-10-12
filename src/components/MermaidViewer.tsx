'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidViewerProps {
  code: string;
  type?: string;
  title?: string;
}

export function MermaidViewer({ code, type = 'diagram', title }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#0e1013',
        mainBkg: '#181b20',
        textColor: '#e2e8f0',
        lineColor: '#f59e0b',
        nodeBorder: '#3b4252',
        clusterBkg: '#131519',
        clusterBorder: '#2e3440',
        defaultLinkColor: '#f59e0b',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: '12px',
      },
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });

    const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    async function renderDiagram() {
      try {
        setError(null);
        const { svg } = await mermaid.render(uniqueId, code.trim());
        setSvgHtml(svg);
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram dynamically. Showing raw definition below.');
      }
    }

    renderDiagram();
  }, [code]);

  return (
    <div className="my-4 rounded-xl border border-white/[0.08] bg-[#0c0e10] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
      {/* Diagram Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#14171a] border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-mono text-neutral-300 text-[11px] font-medium tracking-wide">
            {title || `${type.toUpperCase()} Visual Diagram`}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
          Interactive Mermaid SVG
        </span>
      </div>

      {/* Rendered SVG */}
      <div className="p-6 overflow-x-auto flex items-center justify-center min-h-[160px] bg-[#090a0c]">
        {error ? (
          <div className="w-full text-xs font-mono text-neutral-400">
            <p className="text-amber-400/90 mb-2">{error}</p>
            <pre className="p-3 bg-[#131518] rounded border border-white/[0.05] whitespace-pre overflow-x-auto">
              {code}
            </pre>
          </div>
        ) : svgHtml ? (
          <div
            ref={containerRef}
            className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        ) : (
          <div className="text-xs font-mono text-neutral-500 animate-pulse">
            Rendering diagram with Mermaid...
          </div>
        )}
      </div>
    </div>
  );
}
