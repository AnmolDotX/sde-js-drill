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
    <div className="space-y-5">
      {/* Search Input Row with Doppelrand Bezel */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
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
            className="w-full pl-11 pr-12 py-3 rounded-xl bg-[#121417] border border-white/[0.08] text-sm text-neutral-200 placeholder-neutral-500 focus:border-amber-400/60 focus:bg-[#16181d] focus:outline-none transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-neutral-500 hover:text-neutral-300 cursor-pointer"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#121417] p-1 rounded-xl border border-white/[0.06]">
          <span className="text-[11px] font-mono text-neutral-400 px-2">Priority:</span>
          {(['all', 'P0', 'P1'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPriorityFilterChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                priorityFilter === p
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#121417] p-1 rounded-xl border border-white/[0.06]">
          <span className="text-[11px] font-mono text-neutral-400 px-2">Status:</span>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                statusFilter === s.id
                  ? 'bg-white/[0.08] text-amber-400 font-medium border border-white/[0.08]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
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
          className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
            selectedPhase === 'all'
              ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
              : 'bg-[#121417] text-neutral-400 hover:text-neutral-200 border border-white/[0.06] hover:border-white/[0.12]'
          }`}
        >
          All Tracks ({totalResults})
        </button>

        {phases.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => onSelectPhase(phase.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedPhase === phase.id
                ? 'bg-white/[0.08] text-amber-400 font-semibold border border-amber-400/40 shadow-xs'
                : 'bg-[#121417] text-neutral-400 hover:text-neutral-200 border border-white/[0.06] hover:border-white/[0.12]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
            <span>{phase.shortTitle}</span>
          </button>
        ))}
      </div>

      {/* Category Dropdown Filter */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span>Filter by Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="bg-[#121417] text-neutral-200 border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs font-mono focus:border-amber-400 focus:outline-none cursor-pointer"
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
