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

  // Keyboard shortcut: '/' focuses search input, 'Escape' clears
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
      {/* Search & Main Input Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#646669]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions, internals, pitch answers, Flipkart, Probo... (Press '/' to focus)"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#2c2e31] border border-[#3e4145] text-sm text-[#d1d0c5] placeholder-[#646669] focus:border-[#e2b714] focus:outline-none transition-colors font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#908e82] hover:text-[#d1d0c5] cursor-pointer"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-mono text-[#646669]">Priority:</span>
          {(['all', 'P0', 'P1'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPriorityFilterChange(p)}
              className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                priorityFilter === p
                  ? 'bg-[#e2b714] text-[#1e2022] font-semibold'
                  : 'bg-[#2c2e31] text-[#908e82] hover:text-[#d1d0c5] border border-[#3e4145]'
              }`}
            >
              {p === 'all' ? 'All' : p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-mono text-[#646669]">Status:</span>
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
              className={`px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                statusFilter === s.id
                  ? 'bg-[#383a3e] text-[#e2b714] border border-[#e2b714] font-medium'
                  : 'bg-[#2c2e31] text-[#908e82] hover:text-[#d1d0c5] border border-[#3e4145]'
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
          className={`px-3.5 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
            selectedPhase === 'all'
              ? 'bg-[#e2b714] text-[#1e2022] font-semibold shadow-xs'
              : 'bg-[#2c2e31] text-[#908e82] hover:text-[#d1d0c5] border border-[#3e4145]'
          }`}
        >
          All Phases ({totalResults})
        </button>

        {phases.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => onSelectPhase(phase.id)}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedPhase === phase.id
                ? 'bg-[#383a3e] text-[#e2b714] border border-[#e2b714] font-semibold'
                : 'bg-[#2c2e31] text-[#908e82] hover:text-[#d1d0c5] border border-[#3e4145]'
            }`}
          >
            <span>{phase.shortTitle}</span>
          </button>
        ))}
      </div>

      {/* Category Dropdown if Any */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono text-[#646669]">
          <span>Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="bg-[#2c2e31] text-[#d1d0c5] border border-[#3e4145] rounded px-2.5 py-1 text-xs font-mono focus:border-[#e2b714] focus:outline-none cursor-pointer"
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
