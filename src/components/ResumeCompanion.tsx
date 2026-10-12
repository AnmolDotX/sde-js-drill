'use client';

import React from 'react';

interface ResumeCompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeCompanion({ isOpen, onClose }: ResumeCompanionProps) {
  const resumeUrl = '/assets/AnmolSDE1_3October.pdf';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[560px] lg:w-[640px] bg-[#0c0e11] border-l border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col backdrop-blur-2xl">
      {/* Companion Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#121417] border-b border-white/[0.06]">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <h3 className="text-sm font-semibold text-neutral-100 tracking-wide font-sans">
            Resume Companion (Anmol SDE)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
            PDF Live View
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neutral-400 hover:text-amber-400 px-2.5 py-1 rounded-lg hover:bg-white/[0.04] border border-white/[0.06] transition-colors"
            title="Open PDF in new tab"
          >
            Open Tab ↗
          </a>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-neutral-400 hover:text-neutral-100 px-2.5 py-1 rounded-lg hover:bg-white/[0.04] border border-white/[0.06] transition-colors cursor-pointer"
            title="Close companion"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Quick Resume Anchors Navigation */}
      <div className="px-5 py-2.5 bg-[#14161a] border-b border-white/[0.04] flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-amber-400 font-medium">Quick Anchors:</span>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          <span className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-300 font-mono text-[11px]">
            Flipkart (PAN / Maps)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-300 font-mono text-[11px]">
            Probo (L1-L3 Engine)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-300 font-mono text-[11px]">
            Zarasana (CLI Tokens)
          </span>
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="flex-1 bg-[#090a0c] overflow-hidden relative">
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0`}
          className="w-full h-full border-0"
          title="Resume PDF Viewer"
        />
      </div>

      {/* Footer Info */}
      <div className="px-5 py-3 bg-[#121417] border-t border-white/[0.06] text-[11px] text-neutral-500 font-mono flex justify-between items-center">
        <span>Cross-reference your bullet points while revising Phase 3.</span>
        <span className="text-neutral-400">AnmolSDE1_3October.pdf</span>
      </div>
    </div>
  );
}
