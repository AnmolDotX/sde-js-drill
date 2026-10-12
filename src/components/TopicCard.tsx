'use client';

import React, { useState } from 'react';
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
}

export function TopicCard({
  topic,
  isCompleted,
  onToggleCompleted,
  isBookmarked,
  onToggleBookmarked,
  savedNote = '',
  onSaveNote,
}: TopicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState(savedNote);
  const [isCopiedPitch, setIsCopiedPitch] = useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(topic.interviewAnswer);
    setIsCopiedPitch(true);
    setTimeout(() => setIsCopiedPitch(false), 2000);
  };

  return (
    // Outer Shell (Double-Bezel Architecture)
    <div
      className={`p-1 rounded-2xl transition-all duration-300 ${
        isCompleted
          ? 'bg-emerald-500/[0.04] border border-emerald-500/20'
          : 'bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.03]'
      }`}
    >
      {/* Inner Core */}
      <div className="bg-[#101215] rounded-[calc(1rem-0.25rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
        {/* Card Header */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          {/* Left: Checkbox & Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Custom Interactive Checkbox */}
            <button
              type="button"
              onClick={() => onToggleCompleted(topic.id)}
              className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isCompleted
                  ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                  : 'border border-neutral-600 hover:border-amber-400 bg-neutral-900/60'
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
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                    topic.priority === 'P0'
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                      : 'bg-white/[0.04] text-neutral-400 border border-white/[0.06]'
                  }`}
                >
                  {topic.priority === 'P0' ? 'P0 MUST KNOW' : 'P1 HIGH'}
                </span>

                <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05]">
                  {topic.category}
                </span>

                {topic.estimatedMins && (
                  <span className="text-[10px] font-mono text-neutral-500">
                    ~{topic.estimatedMins} min read
                  </span>
                )}
              </div>

              <h4
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-base sm:text-lg font-medium cursor-pointer transition-colors leading-snug ${
                  isCompleted
                    ? 'line-through text-neutral-500'
                    : 'text-neutral-200 hover:text-amber-400'
                }`}
              >
                {topic.title}
              </h4>

              {topic.subtitle && (
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{topic.subtitle}</p>
              )}
            </div>
          </div>

          {/* Right: Bookmark & Expand CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmarked(topic.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] border border-transparent'
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
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{isExpanded ? 'Collapse' : 'Drill'}</span>
              <span className="text-[10px] text-neutral-500">{isExpanded ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="px-5 pb-6 sm:px-6 border-t border-white/[0.06] pt-5 space-y-6 text-sm">
            {/* Section 1: The Gist */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-400 font-semibold">
                  1. The Gist (Plain English)
                </h5>
              </div>
              <p className="text-neutral-300 leading-relaxed bg-[#14171a] p-4 rounded-xl border border-white/[0.04] text-xs sm:text-sm">
                {topic.theGist}
              </p>
            </div>

            {/* Section 2: How It Works */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-400 font-semibold">
                  2. How It Works (Mental Model &amp; Internals)
                </h5>
              </div>
              <div className="text-neutral-300 leading-relaxed text-xs sm:text-sm space-y-2 pl-3 border-l border-white/[0.08]">
                <p>{topic.howItWorks}</p>
              </div>
            </div>

            {/* Section 3: Code Example with Syntax Highlighting */}
            {topic.practicalExample && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-400 font-semibold">
                    3. Practical Code / Implementation Blueprint
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

            {/* Section 4: Interactive Mermaid Diagram (if available) */}
            {topic.diagramCode && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-400 font-semibold">
                    4. Visual Diagram &amp; Data Flow
                  </h5>
                </div>
                <MermaidViewer
                  code={topic.diagramCode}
                  type={topic.diagramType}
                  title={`${topic.title} Architectural Specification`}
                />
              </div>
            )}

            {/* Section 5: 30-90s Interview-Ready Answer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-amber-400 font-semibold">
                    5. Interview-Ready Answer (30–90 Second Pitch)
                  </h5>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className="text-[11px] font-mono text-neutral-400 hover:text-amber-400 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] cursor-pointer transition-colors"
                >
                  {isCopiedPitch ? 'Copied Pitch ✓' : 'Copy Pitch'}
                </button>
              </div>
              <div className="border-l-2 border-amber-400 bg-[#14171a] p-4 rounded-r-xl text-neutral-200 leading-relaxed text-xs sm:text-sm italic">
                "{topic.interviewAnswer}"
              </div>
            </div>

            {/* Section 6: Resume Connection */}
            {topic.resumeConnection && (
              <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-400 font-semibold">
                    Resume Connection &amp; Anchor
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {topic.resumeConnection}
                </p>
              </div>
            )}

            {/* Section 7: Tradeoffs & Gotchas */}
            {topic.tradeoffsAndGotchas && topic.tradeoffsAndGotchas.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-rose-400 font-semibold">
                    6. Critical Trade-offs &amp; Pitfalls
                  </h5>
                </div>
                <ul className="space-y-2 bg-[#14171a] p-4 rounded-xl border border-white/[0.04] text-xs text-neutral-300">
                  {topic.tradeoffsAndGotchas.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-400/80 font-mono text-sm leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 8: Tricky Follow-Up Questions */}
            {topic.followUpQuestions && topic.followUpQuestions.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <h5 className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400 font-semibold">
                    7. Deep Follow-Up Questions to Rehearse
                  </h5>
                </div>
                <ul className="space-y-2 text-xs text-neutral-400 pl-3">
                  {topic.followUpQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono font-medium">Q{idx + 1}.</span>
                      <span className="leading-relaxed">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 9: Personal Notes Box */}
            <div className="pt-3 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`note-${topic.id}`}
                  className="text-xs font-mono text-neutral-400 font-medium"
                >
                  Personal Revision Notes (Saved in Browser)
                </label>
                <span className="text-[10px] font-mono text-neutral-500">Auto-saved</span>
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
                className="w-full bg-[#0a0c0e] border border-white/[0.08] focus:border-amber-400/50 rounded-xl p-3 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
