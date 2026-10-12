'use client';

import React, { useRef, useEffect } from 'react';
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
        <div className="flex items-center gap-1.5 shrink-0 bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border-shell)]">
          <span className="text-[11px] font-mono text-[var(--text-dim)] px-2">Priority:</span>
          {(['all', 'P0', 'P1'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPriorityFilterChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer font-normal ${
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
        <div className="flex items-center gap-1.5 shrink-0 bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border-shell)]">
          <span className="text-[11px] font-mono text-[var(--text-dim)] px-2">Status:</span>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer font-normal ${
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
          className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer font-normal ${
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
            className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer font-normal ${
              selectedPhase === phase.id
                ? 'bg-[var(--bg-card)] text-[var(--accent)] font-medium border border-[var(--accent)] shadow-xs'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-shell)] hover:border-[var(--accent)]/40'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{phase.shortTitle}</span>
          </button>
        ))}
      </div>

      {/* Category Dropdown Filter */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-dim)]">
          <span>Filter by Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-shell)] rounded-lg px-3 py-1.5 text-xs font-mono focus:border-[var(--accent)] focus:outline-none cursor-pointer font-normal"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
