'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PhaseMetadata } from '../data/types';

interface FilterBarProps {
  phases: PhaseMetadata[];
  selectedPhase: string;
  onSelectPhase: (phaseId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'unrevised' | 'revised' | 'bookmarked';
  onStatusFilterChange: (status: 'all' | 'unrevised' | 'revised' | 'bookmarked') => void;
  priorityFilter: 'all' | 'P0' | 'P1';
  onPriorityFilterChange: (p: 'all' | 'P0' | 'P1') => void;
  categoryFilter: string;
  onCategoryFilterChange: (cat: string) => void;
  categories: string[];
  totalResults: number;
}

export function FilterBar({
  phases,
  selectedPhase,
  onSelectPhase,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  totalResults,
}: FilterBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        onSearchChange('');
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  return (
    <div className="space-y-4">
      {/* Search Input Row with Theme Tokens */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-dim)]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions, code snippets, Flipkart, Probo, system design... (Press '/' to focus)"
            className="w-full pl-11 pr-12 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-shell)] text-sm text-[var(--text-main)] placeholder-[var(--text-dim)] focus:border-[var(--accent)] focus:bg-[var(--bg-card-inner)] focus:outline-none transition-all shadow-xs font-normal"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-[var(--text-dim)] hover:text-[var(--text-main)] cursor-pointer"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[var(--bg-card)] p-1.5 rounded-xl border border-[var(--border-shell)]">
          <span className="text-xs font-mono text-[var(--text-dim)] px-2">Priority:</span>
          {(['all', 'P0', 'P1'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPriorityFilterChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-colors cursor-pointer font-normal ${
                priorityFilter === p
                  ? 'bg-[var(--accent)] text-neutral-950 font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[var(--bg-card)] p-1.5 rounded-xl border border-[var(--border-shell)]">
          <span className="text-xs font-mono text-[var(--text-dim)] px-2">Status:</span>
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'unrevised', label: 'Unrevised' },
              { id: 'revised', label: 'Revised' },
              { id: 'bookmarked', label: 'Saved ★' },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onStatusFilterChange(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-colors cursor-pointer font-normal ${
                statusFilter === s.id
                  ? 'bg-[var(--bg-subtle)] text-[var(--accent)] font-medium border border-[var(--border-shell)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectPhase('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono whitespace-nowrap transition-all cursor-pointer font-normal ${
            selectedPhase === 'all'
              ? 'bg-[var(--accent)] text-neutral-950 font-medium shadow-xs'
              : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-shell)] hover:border-[var(--accent)]/40'
          }`}
        >
          All Tracks ({totalResults})
        </button>

        {phases.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => onSelectPhase(phase.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer font-normal ${
              selectedPhase === phase.id
                ? 'bg-[var(--bg-card)] text-[var(--accent)] font-medium border border-[var(--accent)] shadow-xs'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-shell)] hover:border-[var(--accent)]/40'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                phase.id === 'phase-3-ai-resume' ? 'bg-purple-500' : 'bg-[var(--accent)]'
              }`}
            />
            <span>{phase.shortTitle}</span>
            {phase.id === 'phase-3-ai-resume' && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300 font-mono font-medium">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Category Custom Dropdown Filter */}
      {categories.length > 0 && (
        <div className="relative inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[var(--text-dim)]" ref={dropdownRef}>
          <span>Filter by Category:</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-[var(--bg-card)] hover:bg-[var(--bg-card-inner)] text-[var(--text-main)] border border-[var(--border-shell)] hover:border-[var(--accent)]/50 rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-mono transition-colors cursor-pointer flex items-center gap-2 shadow-2xs font-normal"
            >
              <span>{categoryFilter === 'all' ? `All Categories (${categories.length})` : categoryFilter}</span>
              <svg
                className={`w-3.5 h-3.5 text-[var(--text-dim)] transition-transform duration-200 ${
                  isCategoryOpen ? 'rotate-180 text-[var(--accent)]' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Custom Popover Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-1.5 min-w-[220px] max-w-[300px] max-h-60 overflow-y-auto rounded-2xl bg-[var(--bg-card)] border border-[var(--border-shell)] shadow-[var(--card-shadow)] p-1.5 z-50 space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    onCategoryFilterChange('all');
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'bg-[var(--bg-card-inner)] text-[var(--accent)] font-medium'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-inner)] hover:text-[var(--text-main)] font-normal'
                  }`}
                >
                  <span>All Categories ({categories.length})</span>
                  {categoryFilter === 'all' && <span className="text-[var(--accent)]">✓</span>}
                </button>

                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      onCategoryFilterChange(c);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                      categoryFilter === c
                        ? 'bg-[var(--bg-card-inner)] text-[var(--accent)] font-medium'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-inner)] hover:text-[var(--text-main)] font-normal'
                    }`}
                  >
                    <span className="truncate pr-2">{c}</span>
                    {categoryFilter === c && <span className="text-[var(--accent)] shrink-0">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
