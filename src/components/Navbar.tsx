'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  completedCount?: number;
  totalCount?: number;
  onResumeClick?: () => void;
  onExportClick?: () => void;
  onResetClick?: () => void;
}

export function Navbar({
  completedCount = 0,
  totalCount = 0,
  onResumeClick,
  onExportClick,
  onResetClick,
}: NavbarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-main)]/90 backdrop-blur-xl border-b border-[var(--border-shell)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Nav Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-shell)] flex items-center justify-center font-mono text-[var(--accent)] text-xs font-medium group-hover:border-[var(--accent)] transition-colors shadow-xs">
              &gt;_
            </div>
            <div>
              <div className="text-sm tracking-tight text-[var(--text-main)] font-medium flex items-center gap-2">
                <span>SDE DRILL</span>
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-shell)]">
                  Full-Stack &amp; AI
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-mono">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-colors font-normal ${
                pathname === '/'
                  ? 'bg-[var(--bg-card)] text-[var(--text-main)] font-medium border border-[var(--border-shell)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/drill"
              className={`px-3 py-1.5 rounded-lg transition-colors font-normal flex items-center gap-1.5 ${
                pathname === '/drill'
                  ? 'bg-[var(--bg-card)] text-[var(--accent)] font-medium border border-[var(--border-shell)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <span>Practice Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </Link>
          </nav>
        </div>

        {/* Right Actions: Progress, Theme Toggle & Controls */}
        <div className="flex items-center gap-3">
          {/* Progress Indicator (if total count provided) */}
          {totalCount > 0 && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] font-mono text-[var(--text-muted)] font-normal">
                {completedCount}/{totalCount} revised ({percent}%)
              </span>
              <div className="w-36 h-1 bg-[var(--bg-subtle)] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[var(--accent)] transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}

          {/* Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-xs font-mono bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] border border-[var(--border-shell)] transition-colors cursor-pointer flex items-center gap-1.5"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span className="text-[11px] hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span className="text-[11px] hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Resume PDF Button */}
          {onResumeClick && (
            <button
              type="button"
              onClick={onResumeClick}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-normal bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--accent)] border border-[var(--border-shell)] hover:border-[var(--accent)] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Open Resume PDF Companion"
            >
              <span>Resume PDF</span>
              <span className="text-[10px]">↗</span>
            </button>
          )}

          {/* Export / Reset Actions */}
          {onExportClick && (
            <button
              type="button"
              onClick={onExportClick}
              className="px-2.5 py-1.5 rounded-xl text-xs font-mono bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-shell)] transition-colors cursor-pointer font-normal"
              title="Export progress backup"
            >
              Export
            </button>
          )}

          {onResetClick && (
            <button
              type="button"
              onClick={onResetClick}
              className="px-2.5 py-1.5 rounded-xl text-xs font-mono bg-[var(--bg-card)] text-[var(--text-dim)] hover:text-rose-400 border border-[var(--border-shell)] transition-colors cursor-pointer font-normal"
              title="Reset progress"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
