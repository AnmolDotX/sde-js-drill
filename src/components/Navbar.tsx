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
    <header className="sticky top-0 z-40 bg-[#2c2e31]/95 backdrop-blur-md border-b border-[#3e4145]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-[#242628] border border-[#3e4145] flex items-center justify-center font-mono font-bold text-[#e2b714] text-sm">
            &gt;_
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-[#d1d0c5] flex items-center gap-2">
              <span>SDE DRILL</span>
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-[#242628] text-[#e2b714] border border-[#3e4145]">
                Full-Stack &amp; AI Engineer
              </span>
            </h1>
            <p className="text-xs text-[#646669]">
              Strategic Interview Revision · LocalStorage Tracked
            </p>
          </div>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-mono text-[#d1d0c5] font-medium">
              {completedCount} of {totalCount} topics completed
            </span>
            <div className="w-40 h-2 bg-[#242628] rounded-full overflow-hidden border border-[#3e4145] mt-1">
              <div
                className="h-full bg-[#e2b714] transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="sm:hidden font-mono text-xs text-[#e2b714] font-semibold bg-[#242628] px-2.5 py-1 rounded border border-[#3e4145]">
            {percent}% ({completedCount}/{totalCount})
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResumeClick}
              className="px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#242628] hover:bg-[#383a3e] text-[#e2b714] border border-[#3e4145] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Open side-by-side Resume Companion PDF"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>Resume PDF</span>
            </button>

            <button
              type="button"
              onClick={onExportClick}
              className="px-2.5 py-1.5 rounded text-xs font-mono bg-[#242628] hover:bg-[#383a3e] text-[#908e82] hover:text-[#d1d0c5] border border-[#3e4145] transition-colors cursor-pointer"
              title="Export progress backup JSON"
            >
              Export
            </button>

            <button
              type="button"
              onClick={onResetClick}
              className="px-2.5 py-1.5 rounded text-xs font-mono bg-[#242628] hover:bg-[#383a3e] text-[#ca4754] border border-[#3e4145] transition-colors cursor-pointer"
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
