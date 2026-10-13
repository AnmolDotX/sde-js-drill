'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { TopicItem } from '../data/types';
import { CodeBlock } from './CodeBlock';

// Lazy-load Mermaid to prevent 3MB+ parsing on initial page load / LCP
const MermaidViewer = dynamic(
  () => import('./MermaidViewer').then((mod) => mod.MermaidViewer),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 rounded-xl bg-[#0c0e10] border border-white/[0.08] text-xs font-mono text-[var(--text-dim)] animate-pulse">
        Loading architecture diagram...
      </div>
    ),
  }
);

interface TopicCardProps {
  topic: TopicItem;
  isCompleted: boolean;
  onToggleCompleted: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmarked: (id: string) => void;
  savedNote?: string;
  onSaveNote: (id: string, text: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isFocused?: boolean;
}

export function TopicCard({
  topic,
  isCompleted,
  onToggleCompleted,
  isBookmarked,
  onToggleBookmarked,
  savedNote = '',
  onSaveNote,
  isExpanded,
  onToggleExpand,
  isFocused = false,
}: TopicCardProps) {
  const [noteText, setNoteText] = useState(savedNote);
  const [isCopiedPitch, setIsCopiedPitch] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(isExpanded);

  if (isExpanded && !hasBeenExpanded) {
    setHasBeenExpanded(true);
  }

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(topic.interviewAnswer);
    setIsCopiedPitch(true);
    setTimeout(() => setIsCopiedPitch(false), 2000);
  };

  return (
    <article
      id={`topic-${topic.id}`}
      className={`scroll-mt-24 rounded-2xl transition-all duration-200 border border-[var(--border-inner)] shadow-[var(--card-shadow)] [content-visibility:auto] [contain-intrinsic-size:0_105px] ${
        isFocused ? 'bg-[var(--bg-card-inner)] shadow-sm' : ''
      } ${
        isCompleted
          ? 'bg-emerald-500/[0.04] dark:bg-emerald-950/20'
          : 'bg-[var(--bg-card)]'
      }`}
    >
      {/* Inner Container */}
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Card Header Bar */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: Checkbox & Info */}
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            {/* Interactive Checkbox */}
            <button
              type="button"
              onClick={() => onToggleCompleted(topic.id)}
              className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isCompleted
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--accent)]/20 text-transparent'
              }`}
              title={isCompleted ? 'Mark unrevised' : 'Mark completed'}
            >
              {isCompleted ? (
                <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span className="w-2 h-2 rounded-xs bg-[var(--text-dim)]" />
              )}
            </button>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {/* Priority Pill */}
                <span
                  className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full ${
                    topic.priority === 'P0'
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                  }`}
                >
                  {topic.priority === 'P0' ? 'P0 MUST KNOW' : 'P1 HIGH'}
                </span>

                {/* Category Pill */}
                <span className="text-[11px] font-mono text-[var(--text-dim)] px-2.5 py-0.5 rounded-md bg-[var(--bg-card-inner)]">
                  {topic.category}
                </span>

                {topic.estimatedMins && (
                  <span className="text-[11px] font-mono text-[var(--text-dim)]">
                    ~{topic.estimatedMins} min read
                  </span>
                )}
              </div>

              {/* Title */}
              <h4
                onClick={onToggleExpand}
                className={`text-[17px] sm:text-lg font-medium cursor-pointer transition-colors leading-snug tracking-tight ${
                  isCompleted
                    ? 'line-through text-[var(--text-dim)]'
                    : 'text-[var(--text-main)] hover:text-[var(--accent)]'
                }`}
              >
                {topic.title}
              </h4>

              {topic.subtitle && (
                <p className="text-sm sm:text-[14px] text-[var(--text-dim)] mt-1 font-normal leading-relaxed">
                  {topic.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Actions: Bookmark & Accordion CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmarked(topic.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-500/10'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark topic'}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onToggleExpand}
              className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-medium ${
                isExpanded
                  ? 'bg-[var(--accent)] text-neutral-950 shadow-xs'
                  : 'bg-[var(--bg-card-inner)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <span>{isExpanded ? 'Collapse' : 'Drill'}</span>
              <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>

        {/* Accordion Detail View with Smooth Transition */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            {hasBeenExpanded && (
              <div className="pt-5 border-t border-[var(--border-inner)] space-y-7 text-sm">
            {/* 1. The Gist */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400 font-medium">
                  1. The Gist (Plain English)
                </h5>
              </div>
              <p className="text-[var(--text-main)] leading-relaxed bg-[var(--bg-card-inner)] p-4 sm:p-5 rounded-2xl text-[15px] sm:text-base font-normal">
                {topic.theGist}
              </p>
            </div>

            {/* 2. How It Works */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-teal-600 dark:text-teal-400 font-medium">
                  2. How It Works (Mental Model &amp; Internals)
                </h5>
              </div>
              <div className="text-[var(--text-main)] leading-relaxed text-[15px] sm:text-base space-y-2 pl-4 border-l-2 border-teal-500/40 font-normal">
                <p>{topic.howItWorks}</p>
              </div>
            </div>

            {/* 3. Practical Code Blueprint */}
            {topic.practicalExample && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400 font-medium">
                    3. Practical Code / Blueprint
                  </h5>
                </div>
                <CodeBlock
                  code={topic.practicalExample.code}
                  language={topic.practicalExample.language}
                  title={topic.practicalExample.title}
                  explanation={topic.practicalExample.explanation}
                />
              </div>
            )}

            {/* 4. Mermaid Visual Specification (if present) */}
            {topic.diagramCode && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400 font-medium">
                    4. Visual Diagram &amp; Flow
                  </h5>
                </div>
                <MermaidViewer
                  code={topic.diagramCode}
                  type={topic.diagramType}
                  title={`${topic.title} Architecture`}
                />
              </div>
            )}

            {/* 5. 30-90s Interview-Ready Answer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400 font-medium">
                    5. Interview-Ready Answer (30–90 Second Pitch)
                  </h5>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className="text-xs font-mono text-[var(--text-dim)] hover:text-[var(--accent)] px-3 py-1 rounded-lg bg-[var(--bg-card-inner)] hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors font-medium"
                >
                  {isCopiedPitch ? 'Copied Pitch ✓' : 'Copy Pitch'}
                </button>
              </div>
              <div className="border-l-3 border-amber-500 bg-[var(--bg-card-inner)] p-4 sm:p-5 rounded-r-2xl text-[var(--text-main)] leading-relaxed text-[15px] sm:text-base italic font-normal">
                &ldquo;{topic.interviewAnswer}&rdquo;
              </div>
            </div>

            {/* 6. Resume Connection */}
            {topic.resumeConnection && (
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-500/[0.05] dark:bg-teal-950/20 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300 font-medium">
                    Resume Connection &amp; Anchor
                  </h5>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-normal">
                  {topic.resumeConnection}
                </p>
              </div>
            )}

            {/* 7. Trade-offs & Gotchas */}
            {topic.tradeoffsAndGotchas && topic.tradeoffsAndGotchas.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-rose-600 dark:text-rose-400 font-medium">
                    6. Critical Trade-offs &amp; Pitfalls
                  </h5>
                </div>
                <ul className="space-y-2.5 bg-[var(--bg-card-inner)] p-4 sm:p-5 rounded-2xl text-sm sm:text-[15px] text-[var(--text-main)]">
                  {topic.tradeoffsAndGotchas.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed font-normal">
                      <span className="text-rose-500 font-mono text-base leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 8. Follow-Up Questions */}
            {topic.followUpQuestions && topic.followUpQuestions.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-dim)]" />
                  <h5 className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-dim)] font-medium">
                    7. Deep Follow-Up Questions to Rehearse
                  </h5>
                </div>
                <ul className="space-y-2.5 text-sm sm:text-[15px] text-[var(--text-dim)] pl-3">
                  {topic.followUpQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-normal">
                      <span className="text-[var(--accent)] font-mono font-medium shrink-0">Q{idx + 1}.</span>
                      <span className="leading-relaxed text-[var(--text-muted)]">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 9. Personal Notes */}
            <div className="pt-3 border-t border-[var(--border-inner)] space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`note-${topic.id}`}
                  className="text-xs sm:text-sm font-mono text-[var(--text-dim)] font-normal"
                >
                  Personal Revision Notes (Saved in Browser)
                </label>
                <span className="text-xs font-mono text-[var(--text-dim)]">Auto-saved</span>
              </div>
              <textarea
                id={`note-${topic.id}`}
                rows={3}
                value={noteText}
                onChange={(e) => {
                  setNoteText(e.target.value);
                  onSaveNote(topic.id, e.target.value);
                }}
                placeholder="Jot down memory tricks, personal experiences, or reminders..."
                className="w-full bg-[var(--bg-card-inner)] rounded-2xl p-4 text-sm sm:text-base text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-mono font-normal leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  </article>
  );
}
