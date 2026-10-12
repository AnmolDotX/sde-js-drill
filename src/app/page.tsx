'use client';

import React, { useState, useMemo } from 'react';
import { ALL_PHASES, ALL_TOPICS, TopicItem } from '../data';
import { useRevisionProgress } from '../hooks/useRevisionProgress';
import { Navbar } from '../components/Navbar';
import { FilterBar } from '../components/FilterBar';
import { TopicCard } from '../components/TopicCard';
import { ResumeCompanion } from '../components/ResumeCompanion';

export default function Home() {
  const {
    isLoaded,
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
    <div className="min-h-screen bg-[#323437] text-[#d1d0c5] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        completedCount={completedCount}
        totalCount={ALL_TOPICS.length}
        onResumeClick={() => setIsResumeOpen(true)}
        onExportClick={exportBackup}
        onResetClick={resetAllProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Phase Header / Hero Banner */}
        <section className="bg-[#2c2e31] border border-[#3e4145] rounded-xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#242628] text-[#e2b714] border border-[#3e4145]">
                  {currentPhaseMeta ? currentPhaseMeta.badge : 'Comprehensive Roadmap'}
                </span>
                <span className="text-xs text-[#908e82]">
                  {selectedPhase === 'all'
                    ? `${ALL_PHASES.length} Core Study Tracks`
                    : currentPhaseMeta?.shortTitle}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#d1d0c5] tracking-tight">
                {currentPhaseMeta ? currentPhaseMeta.title : 'Full-Stack SDE & AI Engineer Revision Drill'}
              </h2>
              <p className="text-xs sm:text-sm text-[#646669] mt-1 max-w-3xl leading-relaxed">
                {currentPhaseMeta
                  ? currentPhaseMeta.description
                  : 'Rigorous revision syllabus built around your interview preparation roadmap: core JavaScript runtime, React internals, low-end device performance, Node.js libuv architecture, database transactions, resume story defenses, and AI agent engineering.'}
              </p>
            </div>

            {/* Quick Stat Tiles */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-[#242628] border border-[#3e4145] px-3.5 py-2.5 rounded-lg text-center">
                <span className="text-[11px] font-mono text-[#646669] block">P0 MUST KNOW</span>
                <span className="text-base font-mono font-bold text-[#e2b714]">
                  {p0CompletedCount}/{p0Count}
                </span>
              </div>
              <div className="bg-[#242628] border border-[#3e4145] px-3.5 py-2.5 rounded-lg text-center">
                <span className="text-[11px] font-mono text-[#646669] block">OVERALL DONE</span>
                <span className="text-base font-mono font-bold text-[#98c379]">
                  {completedCount}/{ALL_TOPICS.length}
                </span>
              </div>
            </div>
          </div>

          {/* Phase 3 Personalized Resume Banner */}
          {selectedPhase === 'phase-3-resume' && (
            <div className="mt-5 pt-4 border-t border-[#3e4145] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#242628] p-3.5 rounded-lg">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#e2b714] animate-pulse" />
                <p className="text-xs text-[#d1d0c5]">
                  <strong className="text-[#e2b714]">Personalized Anchor:</strong> These questions probe directly into your Flipkart (PAN verification BFF, live map tracking, proxy inspector) and Probo (L1-L3 approval engine, PostgreSQL indexing) experience.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="px-3 py-1 text-xs font-mono font-medium rounded bg-[#e2b714] text-[#1e2022] hover:bg-[#eec429] transition-colors shrink-0 cursor-pointer"
              >
                Open Resume PDF Preview ↗
              </button>
            </div>
          )}
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

        {/* Topics Drill List */}
        <div className="space-y-8">
          {filteredTopics.length === 0 ? (
            <div className="bg-[#2c2e31] border border-[#3e4145] rounded-xl p-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#242628] border border-[#3e4145] mx-auto flex items-center justify-center text-[#908e82] font-mono text-sm">
                0
              </div>
              <h3 className="text-base font-semibold text-[#d1d0c5]">
                No matching drill topics found
              </h3>
              <p className="text-xs text-[#646669] max-w-md mx-auto">
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
                className="px-3.5 py-1.5 text-xs font-mono rounded bg-[#242628] text-[#e2b714] border border-[#3e4145] hover:bg-[#383a3e] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            groupedByCategory.map(([category, topics]) => (
              <section key={category} className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#383a3e] pb-2">
                  <h3 className="text-sm font-mono font-bold text-[#e2b714] uppercase tracking-wider flex items-center gap-2">
                    <span>#</span> {category}
                  </h3>
                  <span className="text-xs font-mono text-[#646669]">
                    {topics.filter((t) => isCompleted(t.id)).length} / {topics.length} completed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
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
      </main>

      {/* Footer Info */}
      <footer className="mt-auto border-t border-[#3e4145] bg-[#2c2e31] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#646669]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98c379]" />
            <span>Progress automatically synchronized in local storage.</span>
          </div>
          <div className="font-mono text-[11px] text-[#908e82]">
            Keyboard shortcut: Press <kbd className="px-1.5 py-0.5 bg-[#242628] border border-[#3e4145] rounded text-[#e2b714]">/</kbd> to search anywhere.
          </div>
        </div>
      </footer>

      {/* Resume PDF Companion Side-Drawer */}
      <ResumeCompanion
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
