'use client';

import React, { useState, useEffect } from 'react';
import { TopicItem } from '../data/types';
import { CodeBlock } from './CodeBlock';
import { MermaidViewer } from './MermaidViewer';

interface TopicCardProps {
  topic: TopicItem;
  isCompleted: boolean;
  onToggleCompleted: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmarked: (id: string) => void;
  savedNote?: string;
  onSaveNote: (id: string, text: string) => void;
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
  isFocused = false,
}: TopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState(savedNote);
  const [isCopiedPitch, setIsCopiedPitch] = useState(false);

  // Auto-expand if targeted via stepper
  useEffect(() => {
    if (isFocused) {
      setIsExpanded(true);
    }
  }, [isFocused]);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(topic.interviewAnswer);
    setIsCopiedPitch(true);
    setTimeout(() => setIsCopiedPitch(false), 2000);
  };

  return (
    <article
      id={`topic-${topic.id}`}
      className={`scroll-mt-28 p-1 rounded-2xl transition-all duration-200 ${
        isFocused
          ? 'ring-1 ring-[var(--accent)] shadow-md'
          : ''
      } ${
        isCompleted
          ? 'bg-emerald-500/[0.04] border border-emerald-500/20'
          : 'bg-[var(--bg-card)] border border-[var(--border-shell)] hover:border-[var(--border-inner)]'
      }`}
    >
      {/* Inner Core Enclosure */}
      <div className="bg-[var(--bg-card)] rounded-[calc(1rem-0.25rem)] overflow-hidden shadow-xs">
        {/* Card Header */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          {/* Left: Checkbox & Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Interactive Checkbox */}
            <button
              type="button"
              onClick={() => onToggleCompleted(topic.id)}
              className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isCompleted
                  ? 'bg-emerald-500 text-neutral-950 font-medium shadow-xs'
                  : 'border border-[var(--text-dim)] hover:border-[var(--accent)] bg-[var(--bg-card-inner)]'
              }`}
              title={isCompleted ? 'Mark unrevised' : 'Mark completed'}
            >
              {isCompleted && (
                <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>

            {/* Title & Metadata */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                    topic.priority === 'P0'
                      ? 'bg-amber-400/15 text-amber-500 dark:text-amber-300 border border-amber-400/30'
                      : 'bg-neutral-500/10 text-[var(--text-muted)] border border-[var(--border-inner)]'
                  }`}
                >
                  {topic.priority === 'P0' ? 'P0 MUST KNOW' : 'P1 HIGH'}
                </span>

                <span className="text-[10px] font-mono text-[var(--text-dim)] px-2 py-0.5 rounded-md bg-[var(--bg-card-inner)] border border-[var(--border-inner)]">
                  {topic.category}
                </span>

                {topic.estimatedMins && (
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">
                    ~{topic.estimatedMins} min read
                  </span>
                )}
              </div>

              <h4
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-base sm:text-lg font-medium cursor-pointer transition-colors leading-snug ${
                  isCompleted
                    ? 'line-through text-[var(--text-dim)]'
                    : 'text-[var(--text-main)] hover:text-[var(--accent)]'
                }`}
              >
                {topic.title}
              </h4>

              {topic.subtitle && (
                <p className="text-xs text-[var(--text-muted)] mt-1 font-light leading-relaxed">
                  {topic.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Actions: Bookmark & Expand CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmarked(topic.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-inner)] border border-transparent'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark topic'}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[var(--bg-card-inner)] hover:bg-[var(--bg-subtle)] border border-[var(--border-shell)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer flex items-center gap-1.5 font-normal"
            >
              <span>{isExpanded ? 'Collapse' : 'Drill'}</span>
              <span className="text-[10px] text-[var(--text-dim)]">{isExpanded ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="px-5 pb-6 sm:px-6 border-t border-[var(--border-inner)] pt-5 space-y-6 text-sm">
            {/* 1. The Gist */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
                  1. The Gist (Plain English)
                </h5>
              </div>
              <p className="text-[var(--text-main)] leading-relaxed bg-[var(--bg-card-inner)] p-4 rounded-xl border border-[var(--border-inner)] text-xs sm:text-sm font-normal">
                {topic.theGist}
              </p>
            </div>

            {/* 2. How It Works */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
                  2. How It Works (Mental Model &amp; Internals)
                </h5>
              </div>
              <div className="text-[var(--text-main)] leading-relaxed text-xs sm:text-sm space-y-2 pl-3 border-l border-[var(--border-inner)] font-normal">
                <p>{topic.howItWorks}</p>
              </div>
            </div>

            {/* 3. Practical Code Blueprint */}
            {topic.practicalExample && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
                    5. Interview-Ready Answer (30–90 Second Pitch)
                  </h5>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className="text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--accent)] px-2.5 py-1 rounded bg-[var(--bg-card-inner)] border border-[var(--border-inner)] cursor-pointer transition-colors font-normal"
                >
                  {isCopiedPitch ? 'Copied Pitch ✓' : 'Copy Pitch'}
                </button>
              </div>
              <div className="border-l-2 border-[var(--accent)] bg-[var(--bg-card-inner)] p-4 rounded-r-xl text-[var(--text-main)] leading-relaxed text-xs sm:text-sm italic font-normal">
                "{topic.interviewAnswer}"
              </div>
            </div>

            {/* 6. Resume Connection */}
            {topic.resumeConnection && (
              <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-500 dark:text-emerald-400 font-medium">
                    Resume Connection &amp; Anchor
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed font-normal">
                  {topic.resumeConnection}
                </p>
              </div>
            )}

            {/* 7. Trade-offs & Gotchas */}
            {topic.tradeoffsAndGotchas && topic.tradeoffsAndGotchas.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-rose-500 dark:text-rose-400 font-medium">
                    6. Critical Trade-offs &amp; Pitfalls
                  </h5>
                </div>
                <ul className="space-y-2 bg-[var(--bg-card-inner)] p-4 rounded-xl border border-[var(--border-inner)] text-xs text-[var(--text-main)]">
                  {topic.tradeoffsAndGotchas.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed font-normal">
                      <span className="text-rose-400 font-mono text-sm leading-none">•</span>
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
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">
                    7. Deep Follow-Up Questions to Rehearse
                  </h5>
                </div>
                <ul className="space-y-2 text-xs text-[var(--text-muted)] pl-3">
                  {topic.followUpQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-normal">
                      <span className="text-[var(--accent)] font-mono font-medium">Q{idx + 1}.</span>
                      <span className="leading-relaxed">{q}</span>
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
                  className="text-xs font-mono text-[var(--text-muted)] font-normal"
                >
                  Personal Revision Notes (Saved in Browser)
                </label>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">Auto-saved</span>
              </div>
              <textarea
                id={`note-${topic.id}`}
                rows={2}
                value={noteText}
                onChange={(e) => {
                  setNoteText(e.target.value);
                  onSaveNote(topic.id, e.target.value);
                }}
                placeholder="Jot down memory tricks, personal experiences, or reminders..."
                className="w-full bg-[var(--bg-card-inner)] border border-[var(--border-inner)] focus:border-[var(--accent)] rounded-xl p-3 text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none font-mono font-normal"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
