'use client';

import React, { useState, useMemo } from 'react';
import { ALL_PHASES, ALL_TOPICS, TopicItem } from '../data';
import { useRevisionProgress } from '../hooks/useRevisionProgress';
import { Navbar } from '../components/Navbar';
import { FilterBar } from '../components/FilterBar';
import { TopicCard } from '../components/TopicCard';
import { ResumeCompanion } from '../components/ResumeCompanion';
import { CuratedResourcesSection } from '../components/CuratedResourcesSection';

export default function Home() {
  const {
    completedCount,
    isCompleted,
    toggleCompleted,
    isBookmarked,
    toggleBookmarked,
    notes,
    saveNote,
    resetAllProgress,
    exportBackup,
  } = useRevisionProgress();

  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unrevised' | 'revised' | 'bookmarked'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'P0' | 'P1'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Compute available categories for the active phase selection
  const availableCategories = useMemo(() => {
    const list = selectedPhase === 'all' 
      ? ALL_TOPICS 
      : ALL_TOPICS.filter((t) => t.phase === selectedPhase);
    return Array.from(new Set(list.map((t) => t.category)));
  }, [selectedPhase]);

  // Filtered topics list
  const filteredTopics = useMemo(() => {
    return ALL_TOPICS.filter((topic) => {
      // Phase Filter
      if (selectedPhase !== 'all' && topic.phase !== selectedPhase) {
        return false;
      }

      // Priority Filter
      if (priorityFilter !== 'all' && topic.priority !== priorityFilter) {
        return false;
      }

      // Status Filter
      if (statusFilter === 'revised' && !isCompleted(topic.id)) {
        return false;
      }
      if (statusFilter === 'unrevised' && isCompleted(topic.id)) {
        return false;
      }
      if (statusFilter === 'bookmarked' && !isBookmarked(topic.id)) {
        return false;
      }

      // Category Filter
      if (categoryFilter !== 'all' && topic.category !== categoryFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = topic.title.toLowerCase().includes(q);
        const matchesSubtitle = topic.subtitle?.toLowerCase().includes(q) || false;
        const matchesGist = topic.theGist.toLowerCase().includes(q);
        const matchesAnswer = topic.interviewAnswer.toLowerCase().includes(q);
        const matchesCategory = topic.category.toLowerCase().includes(q);
        const matchesResume = topic.resumeConnection?.toLowerCase().includes(q) || false;

        return (
          matchesTitle ||
          matchesSubtitle ||
          matchesGist ||
          matchesAnswer ||
          matchesCategory ||
          matchesResume
        );
      }

      return true;
    });
  }, [selectedPhase, priorityFilter, statusFilter, categoryFilter, searchQuery, isCompleted, isBookmarked]);

  // Group filtered topics by category for organized study
  const groupedByCategory = useMemo(() => {
    const map = new Map<string, TopicItem[]>();
    for (const topic of filteredTopics) {
      if (!map.has(topic.category)) {
        map.set(topic.category, []);
      }
      map.get(topic.category)!.push(topic);
    }
    return Array.from(map.entries());
  }, [filteredTopics]);

  const currentPhaseMeta = ALL_PHASES.find((p) => p.id === selectedPhase);
  const p0Count = ALL_TOPICS.filter((t) => t.priority === 'P0').length;
  const p0CompletedCount = ALL_TOPICS.filter((t) => t.priority === 'P0' && isCompleted(t.id)).length;

  return (
    <div className="min-h-screen bg-[#090a0c] text-neutral-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        completedCount={completedCount}
        totalCount={ALL_TOPICS.length}
        onResumeClick={() => setIsResumeOpen(true)}
        onExportClick={exportBackup}
        onResetClick={resetAllProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12">
        {/* Double-Bezel Hero Banner */}
        <section className="p-1 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="bg-[#101215] rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                    {currentPhaseMeta ? currentPhaseMeta.badge : 'Comprehensive SDE Syllabus'}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {selectedPhase === 'all'
                      ? `${ALL_PHASES.length} Active Tracks`
                      : currentPhaseMeta?.shortTitle}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-100 tracking-tight leading-tight">
                  {currentPhaseMeta ? currentPhaseMeta.title : 'Full-Stack SDE & AI Application Engineer Revision Drill'}
                </h2>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {currentPhaseMeta
                    ? currentPhaseMeta.description
                    : 'Systematic revision blueprint grounded in real full-stack ownership: JavaScript runtime, React Fiber internals, low-end device performance, Node.js libuv concurrency, PostgreSQL/MongoDB trade-offs, Flipkart & Probo resume defense stories, and autonomous AI agents.'}
                </p>
              </div>

              {/* Stat Tiles (Double-Bezel) */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="bg-[#14161a] px-5 py-4 rounded-xl text-center min-w-[110px]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                      P0 MUST KNOW
                    </span>
                    <span className="text-xl font-mono font-bold text-amber-400 mt-0.5 block">
                      {p0CompletedCount}/{p0Count}
                    </span>
                  </div>
                </div>

                <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="bg-[#14161a] px-5 py-4 rounded-xl text-center min-w-[110px]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                      TOTAL DONE
                    </span>
                    <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5 block">
                      {completedCount}/{ALL_TOPICS.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 Personalized Resume Anchor Callout */}
            {selectedPhase === 'phase-3-resume' && (
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#14171a] p-5 rounded-2xl border border-amber-400/20">
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                      Personalized Interview Defense Anchor
                    </h4>
                    <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                      Questions directly probe your Flipkart (PAN verification BFF, live map tracking, proxy inspector) and Probo (L1-L3 approval engine, PostgreSQL indexing) ownership. Keep the PDF open side-by-side to cross-reference while revising.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="px-4 py-2 text-xs font-mono font-semibold rounded-xl bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 cursor-pointer shadow-sm"
                >
                  Open Resume PDF Companion ↗
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Filter & Search Bar */}
        <FilterBar
          phases={ALL_PHASES}
          selectedPhase={selectedPhase}
          onSelectPhase={(id) => {
            setSelectedPhase(id);
            setCategoryFilter('all');
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={availableCategories}
          totalResults={filteredTopics.length}
        />

        {/* Topics Drill Sections */}
        <div className="space-y-12">
          {filteredTopics.length === 0 ? (
            <div className="p-1 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="bg-[#101215] rounded-[calc(1.5rem-0.25rem)] py-16 px-6 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] mx-auto flex items-center justify-center text-neutral-400 font-mono text-sm">
                  0
                </div>
                <h3 className="text-lg font-semibold text-neutral-200">
                  No matching drill topics found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Try clearing your search query or switching your priority and completion status filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setPriorityFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="px-4 py-2 text-xs font-mono rounded-xl bg-white/[0.04] text-amber-400 border border-white/[0.08] hover:bg-white/[0.08] cursor-pointer transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            groupedByCategory.map(([category, topics]) => (
              <section key={category} className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-neutral-500">#</span> {category}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">
                    {topics.filter((t) => isCompleted(t.id)).length} / {topics.length} completed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {topics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      isCompleted={isCompleted(topic.id)}
                      onToggleCompleted={toggleCompleted}
                      isBookmarked={isBookmarked(topic.id)}
                      onToggleBookmarked={toggleBookmarked}
                      savedNote={notes[topic.id]}
                      onSaveNote={saveNote}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {/* Curated Modern Resources Section */}
        <CuratedResourcesSection phaseId={selectedPhase as any} />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/[0.06] bg-[#0c0d10] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Progress automatically synchronized in browser local storage.</span>
          </div>
          <div className="font-mono text-[11px] text-neutral-400">
            Keyboard shortcut: Press <kbd className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-amber-400">/</kbd> to focus search anywhere.
          </div>
        </div>
      </footer>

      {/* Resume Companion Side-Drawer */}
      <ResumeCompanion
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
