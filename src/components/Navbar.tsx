'use client';

import React from 'react';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  onResumeClick: () => void;
  onExportClick: () => void;
  onResetClick: () => void;
}

export function Navbar({
  completedCount,
  totalCount,
  onResumeClick,
  onExportClick,
  onResetClick,
}: NavbarProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-[#090a0c]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-amber-400 text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            &gt;_
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-neutral-100 flex items-center gap-2">
              <span>SDE DRILL</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                Full-Stack &amp; AI Engineer
              </span>
            </h1>
            <p className="text-xs text-neutral-400">
              Strategic Interview Revision Engine · Browser Local Storage
            </p>
          </div>
        </div>

        {/* Global Progress & Actions */}
        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-mono text-neutral-300 font-medium">
              {completedCount} of {totalCount} completed ({percent}%)
            </span>
            <div className="w-48 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/[0.06] mt-1.5">
              <div
                className="h-full bg-amber-400 transition-all duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="sm:hidden font-mono text-xs text-amber-400 font-medium bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.08]">
            {percent}% ({completedCount}/{totalCount})
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Resume PDF Button (Button-in-Button Pattern) */}
            <button
              type="button"
              onClick={onResumeClick}
              className="group pl-3 pr-2 py-1.5 rounded-full text-xs font-mono font-medium bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 border border-white/[0.08] hover:border-amber-400/40 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              title="Open Resume PDF companion"
            >
              <span>Resume PDF</span>
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                ↗
              </span>
            </button>

            <button
              type="button"
              onClick={onExportClick}
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-200 border border-white/[0.06] transition-colors cursor-pointer"
              title="Export progress backup"
            >
              Export
            </button>

            <button
              type="button"
              onClick={onResetClick}
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 border border-white/[0.06] hover:border-rose-500/20 transition-colors cursor-pointer"
              title="Reset progress"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
