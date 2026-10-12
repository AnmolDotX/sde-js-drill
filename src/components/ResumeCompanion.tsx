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
    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[560px] lg:w-[640px] bg-[var(--bg-card)] border-l border-[var(--border-shell)] shadow-2xl flex flex-col backdrop-blur-2xl transition-colors">
      {/* Companion Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[var(--bg-card-inner)] border-b border-[var(--border-inner)]">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h3 className="text-sm font-medium text-[var(--text-main)] tracking-wide font-sans">
            Resume Companion (Anmol SDE)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-inner)]">
            PDF Live View
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] px-2.5 py-1 rounded-lg hover:bg-[var(--bg-subtle)] border border-[var(--border-inner)] transition-colors"
            title="Open PDF in new tab"
          >
            Open Tab ↗
          </a>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] px-2.5 py-1 rounded-lg hover:bg-[var(--bg-subtle)] border border-[var(--border-inner)] transition-colors cursor-pointer"
            title="Close companion"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Quick Resume Anchors Navigation */}
      <div className="px-5 py-2.5 bg-[var(--bg-card-inner)] border-b border-[var(--border-inner)] flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Quick Anchors:</span>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-inner)] text-[var(--text-main)] font-mono text-[11px]">
            Flipkart (PAN / Maps)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-inner)] text-[var(--text-main)] font-mono text-[11px]">
            Probo (L1-L3 Engine)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-inner)] text-[var(--text-main)] font-mono text-[11px]">
            Zarasana (CLI Tokens)
          </span>
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="flex-1 bg-[var(--bg-main)] overflow-hidden relative">
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0`}
          className="w-full h-full border-0"
          title="Resume PDF Viewer"
        />
      </div>

      {/* Footer Info */}
      <div className="px-5 py-3 bg-[var(--bg-card-inner)] border-t border-[var(--border-inner)] text-[11px] text-[var(--text-dim)] font-mono flex justify-between items-center">
        <span>Cross-reference your bullet points while revising Phase 3.</span>
        <span className="text-[var(--text-muted)]">AnmolSDE1_3October.pdf</span>
      </div>
    </div>
  );
}
