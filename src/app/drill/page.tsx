'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getActivePhases, getActiveTopics, TopicItem } from '../../data';
import { useRevisionProgress } from '../../hooks/useRevisionProgress';
import { Navbar } from '../../components/Navbar';
import { FilterBar } from '../../components/FilterBar';
import { TopicCard } from '../../components/TopicCard';
import { PhaseStepper } from '../../components/PhaseStepper';
import { ResumeCompanion } from '../../components/ResumeCompanion';
import { CuratedResourcesSection } from '../../components/CuratedResourcesSection';
import { AiResumeComingSoon } from '../../components/AiResumeComingSoon';

function DrillDashboardContent() {
  const searchParams = useSearchParams();
  const flagParam = searchParams.get('forResumeOfAnmol');

  // Resume flag: enabled via ?forResumeOfAnmol=true or persisted admin session
  const [forResumeOfAnmol, setForResumeOfAnmol] = useState<boolean>(false);

  useEffect(() => {
    if (flagParam === 'true') {
      setForResumeOfAnmol(true);
      try {
        localStorage.setItem('drill_admin_anmol', 'true');
      } catch {}
    } else if (flagParam === 'false') {
      setForResumeOfAnmol(false);
      try {
        localStorage.removeItem('drill_admin_anmol');
      } catch {}
    } else {
      try {
        const saved = localStorage.getItem('drill_admin_anmol');
        if (saved === 'true') {
          setForResumeOfAnmol(true);
        }
      } catch {}
    }
  }, [flagParam]);

  const activePhases = useMemo(() => getActivePhases(forResumeOfAnmol), [forResumeOfAnmol]);
  const activeTopics = useMemo(() => getActiveTopics(forResumeOfAnmol), [forResumeOfAnmol]);

  const {
    completedCount,
    isCompleted,
    toggleCompleted,
    isBookmarked,
    toggleBookmarked,
    notes,
    saveNote,
    resetAllProgress,
  } = useRevisionProgress();

  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1-frontend');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unrevised' | 'revised' | 'bookmarked'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'P0' | 'P1'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeTopicId, setActiveTopicId] = useState<string | undefined>(undefined);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  // If user disabled admin mode while on phase-3-resume, switch back to phase-1-frontend
  useEffect(() => {
    if (!forResumeOfAnmol && selectedPhase === 'phase-3-resume') {
      setSelectedPhase('phase-1-frontend');
    }
  }, [forResumeOfAnmol, selectedPhase]);

  // Available categories for current view
  const availableCategories = useMemo(() => {
    const list = selectedPhase === 'all'
      ? activeTopics
      : activeTopics.filter((t) => t.phase === selectedPhase);
    return Array.from(new Set(list.map((t) => t.category)));
  }, [selectedPhase, activeTopics]);

  // Stepper topics list
  const stepperTopics = useMemo(() => {
    return selectedPhase === 'all'
      ? activeTopics
      : activeTopics.filter((t) => t.phase === selectedPhase);
  }, [selectedPhase, activeTopics]);

  // Filtered topics list for main view
  const filteredTopics = useMemo(() => {
    return activeTopics.filter((topic) => {
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
  }, [activeTopics, selectedPhase, priorityFilter, statusFilter, categoryFilter, searchQuery, isCompleted, isBookmarked]);

  // Handle jump from stepper
  const handleJumpToTopic = (id: string) => {
    setActiveTopicId(id);
    setExpandedTopicId(id);
    const element = document.getElementById(`topic-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  };

  const currentPhaseMeta = activePhases.find((p) => p.id === selectedPhase);
  const isComingSoonPhase = selectedPhase === 'phase-3-ai-resume';
  const p0Count = stepperTopics.filter((t) => t.priority === 'P0').length;
  const p0CompletedCount = stepperTopics.filter((t) => t.priority === 'P0' && isCompleted(t.id)).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        completedCount={completedCount}
        totalCount={activeTopics.length}
        showResumePdf={forResumeOfAnmol}
        onResumeClick={() => setIsResumeOpen(true)}
        onResetClick={resetAllProgress}
      />

      {/* Main Workspace with Stepper on Left */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Admin Session Notice if forResumeOfAnmol is active */}
        {forResumeOfAnmol && (
          <div className="bg-amber-500/10 px-4 py-2.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <p className="text-xs font-mono text-amber-700 dark:text-amber-300">
                <span className="font-semibold">Admin Mode Active:</span> Anmol&apos;s personalized Flipkart, Probo, and Zarasana resume questions are enabled.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setForResumeOfAnmol(false);
                try {
                  localStorage.removeItem('drill_admin_anmol');
                } catch {}
                setSelectedPhase('phase-1-frontend');
              }}
              className="text-xs font-mono text-amber-700 dark:text-amber-400 hover:underline cursor-pointer shrink-0"
            >
              Switch to Public Mode ✕
            </button>
          </div>
        )}

        {/* Track Header Card */}
        <div className="rounded-2xl bg-[var(--bg-card)] p-6 shadow-[var(--card-shadow)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--bg-card-inner)] text-[var(--accent)]">
                {currentPhaseMeta ? currentPhaseMeta.badge : 'All Tracks'}
              </span>
              <span className="text-xs text-[var(--text-dim)] font-mono">
                {selectedPhase === 'all'
                  ? `${activePhases.length} Active Tracks`
                  : currentPhaseMeta?.shortTitle}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-main)] tracking-tight">
              {currentPhaseMeta ? currentPhaseMeta.title : 'All Practice Tracks'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-dim)] font-normal leading-relaxed">
              {currentPhaseMeta?.description}
            </p>
          </div>

          {/* Metrics Pill (hidden on Coming Soon phase) */}
          {!isComingSoonPhase && (
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-[var(--bg-card-inner)] px-4 py-3 rounded-xl text-center min-w-[110px] shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] block font-medium">
                  P0 MUST KNOW
                </span>
                <span className="text-lg font-mono font-semibold text-amber-600 dark:text-amber-400 mt-0.5 block">
                  {p0CompletedCount}/{p0Count}
                </span>
              </div>

              <div className="bg-[var(--bg-card-inner)] px-4 py-3 rounded-xl text-center min-w-[110px] shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] block font-medium">
                  TRACK DONE
                </span>
                <span className="text-lg font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {stepperTopics.filter((t) => isCompleted(t.id)).length}/{stepperTopics.length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Phase 3 Resume Alert Banner (only for Anmol's resume mode) */}
        {forResumeOfAnmol && selectedPhase === 'phase-3-resume' && (
          <div className="bg-teal-500/[0.06] dark:bg-teal-950/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
              <p className="text-xs text-[var(--text-main)] font-normal">
                <span className="text-teal-700 dark:text-teal-300 font-semibold">Personalized Resume Anchor:</span> Flipkart PAN verification BFF, live map polylines, proxy inspector, and Probo L1-L3 approval engine.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Open Resume PDF Companion ↗
            </button>
          </div>
        )}

        {/* Filter & Search Bar */}
        <FilterBar
          phases={activePhases}
          selectedPhase={selectedPhase}
          onSelectPhase={(id) => {
            setSelectedPhase(id);
            setCategoryFilter('all');
            setActiveTopicId(undefined);
            setExpandedTopicId(null);
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
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sticky Stepper Navigator */}
          <PhaseStepper
            topics={stepperTopics}
            activeTopicId={activeTopicId}
            onSelectTopic={handleJumpToTopic}
            isCompleted={isCompleted}
            isBookmarked={isBookmarked}
          />

          {/* Right Topic Reader Container (Scrollable Subpart) */}
          <div
            id="questions-scroll-container"
            className="flex-1 min-w-0 w-full lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2.5 space-y-3.5 scrollbar-thin scroll-smooth"
          >
            {isComingSoonPhase ? (
              /* Public Phase 3: AI Resume Grilling Engine Roadmap */
              <AiResumeComingSoon />
            ) : filteredTopics.length === 0 ? (
              <div className="rounded-2xl bg-[var(--bg-card)] py-16 px-6 text-center space-y-3 shadow-xs">
                <p className="text-sm font-semibold text-[var(--text-main)]">
                  No matching drill topics found
                </p>
                <p className="text-xs text-[var(--text-dim)] font-normal max-w-sm mx-auto">
                  Try adjusting your search query or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setPriorityFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="px-4 py-1.5 text-xs font-mono rounded-xl bg-[var(--bg-card-inner)] text-[var(--accent)] hover:bg-[var(--bg-subtle)] cursor-pointer font-medium"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
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
                    isExpanded={expandedTopicId === topic.id}
                    onToggleExpand={() => handleToggleExpand(topic.id)}
                    isFocused={activeTopicId === topic.id}
                  />
                ))}

                {/* Bottom completion note inside the scrollable questions subpart */}
                <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-card)] shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-xs font-mono text-[var(--text-dim)]">
                      End of {filteredTopics.length} questions in this view
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('curated-resources');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-xs font-mono font-medium text-[var(--accent)] hover:underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Jump to Curated Resources below</span>
                    <span>↓</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Curated Modern Resources Section */}
        <section id="curated-resources" className="pt-10 border-t border-[var(--border-inner)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                Phase Deep Dive &amp; Ecosystem Resources
              </span>
              <h3 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">
                Recommended Modern Technical Resources &amp; Architecture Guides
              </h3>
            </div>
            <span className="text-xs text-[var(--text-dim)] font-mono">
              Curated for senior JS/TS revision
            </span>
          </div>
          <CuratedResourcesSection phaseId={selectedPhase as any} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-inner)] bg-[var(--bg-card)] py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-dim)] font-normal">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Progress automatically saved in browser local storage.</span>
          </div>
          <div className="font-mono text-[11px] text-[var(--text-dim)]">
            Press <kbd className="px-1.5 py-0.5 bg-[var(--bg-card-inner)] rounded text-[var(--accent)] font-medium">/</kbd> to focus search.
          </div>
        </div>
      </footer>

      {/* Resume Companion Drawer (Admin only) */}
      {forResumeOfAnmol && (
        <ResumeCompanion
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      )}
    </div>
  );
}

export default function DrillDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center text-xs font-mono text-[var(--text-dim)]">
          Loading practice dashboard...
        </div>
      }
    >
      <DrillDashboardContent />
    </Suspense>
  );
}
