'use client';

import React, { useState } from 'react';

interface ResumeCompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeCompanion({ isOpen, onClose }: ResumeCompanionProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const resumeUrl = '/assets/AnmolSDE1_3October.pdf';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[540px] lg:w-[620px] bg-[#2c2e31] border-l border-[#3e4145] shadow-2xl flex flex-col">
      {/* Companion Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#242628] border-b border-[#3e4145]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e2b714]" />
          <h2 className="text-sm font-semibold text-[#d1d0c5] tracking-wide">
            Resume Companion (Anmol SDE)
          </h2>
          <span className="text-xs px-2 py-0.5 rounded bg-[#323437] text-[#908e82] border border-[#3e4145]">
            PDF
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#908e82] hover:text-[#e2b714] px-2 py-1 rounded hover:bg-[#323437] transition-colors"
            title="Open in new browser tab"
          >
            Open Tab ↗
          </a>
          <button
            onClick={onClose}
            className="text-xs text-[#908e82] hover:text-[#d1d0c5] px-2 py-1 rounded hover:bg-[#323437] transition-colors"
            title="Close companion"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Quick Resume Anchors Navigation */}
      <div className="px-4 py-2 bg-[#282a2d] border-b border-[#3e4145] flex items-center justify-between text-xs text-[#908e82]">
        <span className="font-mono text-[11px] text-[#e2b714]">Key Resume Anchors:</span>
        <div className="flex space-x-2 overflow-x-auto">
          <span className="px-1.5 py-0.5 rounded bg-[#323437] border border-[#3e4145] text-[#d1d0c5]">
            Flipkart (BFF & Maps)
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#323437] border border-[#3e4145] text-[#d1d0c5]">
            Probo (L1-L3 Engine)
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#323437] border border-[#3e4145] text-[#d1d0c5]">
            Zarasana (CLI & Tokens)
          </span>
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="flex-1 bg-[#1e2022] overflow-hidden relative">
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0`}
          className="w-full h-full border-0"
          title="Resume PDF Viewer"
        />
      </div>

      {/* Companion Footer Tip */}
      <div className="px-4 py-2.5 bg-[#242628] border-t border-[#3e4145] text-xs text-[#646669] flex justify-between items-center">
        <span>Use side-by-side to cross-reference Phase 3 questions.</span>
        <span className="font-mono text-[11px] text-[#908e82]">public/assets/AnmolSDE1_3October.pdf</span>
      </div>
    </div>
  );
}
