'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ALL_PHASES, ALL_TOPICS, TopicItem } from '../../data';
import { useRevisionProgress } from '../../hooks/useRevisionProgress';
import { Navbar } from '../../components/Navbar';
import { FilterBar } from '../../components/FilterBar';
import { TopicCard } from '../../components/TopicCard';
import { PhaseStepper } from '../../components/PhaseStepper';
import { ResumeCompanion } from '../../components/ResumeCompanion';
import { CuratedResourcesSection } from '../../components/CuratedResourcesSection';

export default function DrillDashboardPage() {
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

  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1-frontend');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unrevised' | 'revised' | 'bookmarked'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'P0' | 'P1'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeTopicId, setActiveTopicId] = useState<string | undefined>(undefined);

  // Compute available categories for the active phase selection
  const availableCategories = useMemo(() => {
    const list = selectedPhase === 'all' 
      ? ALL_TOPICS 
      : ALL_TOPICS.filter((t) => t.phase === selectedPhase);
    return Array.from(new Set(list.map((t) => t.category)));
  }, [selectedPhase]);

  // Stepper topics list (all topics in active phase, or all tracks if 'all' selected)
  const stepperTopics = useMemo(() => {
    return selectedPhase === 'all'
      ? ALL_TOPICS
      : ALL_TOPICS.filter((t) => t.phase === selectedPhase);
  }, [selectedPhase]);

  // Filtered topics list for main view
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

  // Handle jump from stepper
  const handleJumpToTopic = (id: string) => {
    setActiveTopicId(id);
    const element = document.getElementById(`topic-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentPhaseMeta = ALL_PHASES.find((p) => p.id === selectedPhase);
  const p0Count = stepperTopics.filter((t) => t.priority === 'P0').length;
  const p0CompletedCount = stepperTopics.filter((t) => t.priority === 'P0' && isCompleted(t.id)).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        completedCount={completedCount}
        totalCount={ALL_TOPICS.length}
        onResumeClick={() => setIsResumeOpen(true)}
        onExportClick={exportBackup}
        onResetClick={resetAllProgress}
      />

      {/* Main Workspace with Stepper on Left */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Track Header Pill */}
        <div className="rounded-2xl border border-[var(--border-shell)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--accent)] border border-[var(--border-inner)]">
                {currentPhaseMeta ? currentPhaseMeta.badge : 'All Tracks'}
              </span>
              <span className="text-xs text-[var(--text-dim)] font-mono">
                {selectedPhase === 'all'
                  ? `${ALL_PHASES.length} Active Tracks`
                  : currentPhaseMeta?.shortTitle}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-medium text-[var(--text-main)] tracking-tight">
              {currentPhaseMeta ? currentPhaseMeta.title : 'All Practice Tracks'}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-light max-w-2xl leading-relaxed">
              {currentPhaseMeta?.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-inner)] px-4 py-2.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] font-mono text-[var(--text-dim)] block">P0 MUST KNOW</span>
              <span className="text-base font-mono font-medium text-amber-500 dark:text-amber-300 block">
                {p0CompletedCount}/{p0Count}
              </span>
            </div>
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-inner)] px-4 py-2.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] font-mono text-[var(--text-dim)] block">TRACK DONE</span>
              <span className="text-base font-mono font-medium text-emerald-500 dark:text-emerald-400 block">
                {stepperTopics.filter((t) => isCompleted(t.id)).length}/{stepperTopics.length}
              </span>
            </div>
          </div>
        </div>

        {/* Phase 3 Resume Alert Banner */}
        {selectedPhase === 'phase-3-resume' && (
          <div className="bg-[var(--bg-card)] border border-amber-400/20 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <p className="text-xs text-[var(--text-main)] font-normal">
                <span className="text-amber-500 font-medium">Personalized Resume Story Anchor:</span> Flipkart PAN verification BFF, live map polylines, network inspector, and Probo L1-L3 approval engine.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="px-3 py-1.5 text-xs font-mono font-normal rounded-lg bg-[var(--accent)] text-neutral-950 hover:opacity-90 transition-opacity shrink-0 cursor-pointer shadow-xs"
            >
              Open Resume PDF Companion ↗
            </button>
          </div>
        )}

        {/* Filter & Search Bar */}
        <FilterBar
          phases={ALL_PHASES}
          selectedPhase={selectedPhase}
          onSelectPhase={(id) => {
            setSelectedPhase(id);
            setCategoryFilter('all');
            setActiveTopicId(undefined);
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

        {/* Two-Column Workspace: Stepper on Left, Content on Right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sticky Stepper Navigator */}
          <PhaseStepper
            topics={stepperTopics}
            activeTopicId={activeTopicId}
            onSelectTopic={handleJumpToTopic}
            isCompleted={isCompleted}
            isBookmarked={isBookmarked}
          />

          {/* Right Topic Reader Container */}
          <div className="flex-1 min-w-0 space-y-6 w-full">
            {filteredTopics.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border-shell)] bg-[var(--bg-card)] py-16 px-6 text-center space-y-3">
                <p className="text-sm font-medium text-[var(--text-main)]">
                  No matching drill topics found
                </p>
                <p className="text-xs text-[var(--text-dim)] font-light max-w-sm mx-auto">
                  Try adjusting your search keywords or switching filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setPriorityFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="px-3.5 py-1.5 text-xs font-mono rounded-lg bg-[var(--bg-card-inner)] text-[var(--accent)] border border-[var(--border-shell)] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isCompleted={isCompleted(topic.id)}
                    onToggleCompleted={toggleCompleted}
                    isBookmarked={isBookmarked(topic.id)}
                    onToggleBookmarked={toggleBookmarked}
                    savedNote={notes[topic.id]}
                    onSaveNote={saveNote}
                    isFocused={activeTopicId === topic.id}
                  />
                ))}
              </div>
            )}

            {/* Curated Modern Resources at End of Phase */}
            <CuratedResourcesSection phaseId={selectedPhase as any} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-shell)] bg-[var(--bg-card)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-dim)] font-light">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Progress automatically saved in browser local storage.</span>
          </div>
          <div className="font-mono text-[11px] text-[var(--text-muted)]">
            Press <kbd className="px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-shell)] rounded text-[var(--accent)]">/</kbd> to focus search.
          </div>
        </div>
      </footer>

      {/* Resume Companion Drawer */}
      <ResumeCompanion
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
