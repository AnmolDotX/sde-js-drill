'use client';

import React from 'react';
import { TopicItem } from '../data/types';

interface PhaseStepperProps {
  topics: TopicItem[];
  activeTopicId?: string;
  onSelectTopic: (topicId: string) => void;
  isCompleted: (topicId: string) => boolean;
  isBookmarked: (topicId: string) => boolean;
}

export function PhaseStepper({
  topics,
  activeTopicId,
  onSelectTopic,
  isCompleted,
  isBookmarked,
}: PhaseStepperProps) {
  const completedCount = topics.filter((t) => isCompleted(t.id)).length;
  const progressPct = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;

  return (
    <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-20">
      <div className="rounded-2xl bg-[var(--bg-card)] p-4 shadow-[var(--card-shadow)] space-y-3.5 lg:h-[calc(100vh-6rem)] flex flex-col transition-colors">
        {/* Stepper Header */}
        <div className="border-b border-[var(--border-inner)] pb-3 space-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold text-[var(--text-dim)] uppercase tracking-wider">
              Track Stepper Index
            </span>
            <span className="text-xs font-mono text-[var(--accent)] font-semibold">
              {completedCount}/{topics.length} ({progressPct}%)
            </span>
          </div>

          <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Scrollable Topics List */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1.5 scrollbar-thin">
          {topics.length === 0 ? (
            <div className="py-8 px-3 text-center space-y-2">
              <span className="text-2xl block">⚡</span>
              <p className="text-xs font-semibold text-[var(--text-main)]">
                AI Roadmap Stage
              </p>
              <p className="text-[11px] text-[var(--text-dim)] font-normal leading-relaxed">
                Resume parsing &amp; LangGraph agentic questioning pipeline in development.
              </p>
            </div>
          ) : (
            topics.map((topic, index) => {
              const completed = isCompleted(topic.id);
              const bookmarked = isBookmarked(topic.id);
              const isActive = activeTopicId === topic.id;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 group ${
                    isActive
                      ? 'bg-[var(--bg-card-inner)] text-[var(--text-main)] shadow-xs'
                      : 'hover:bg-[var(--bg-card-inner)] text-[var(--text-muted)]'
                  }`}
                >
                {/* Step Marker */}
                <div
                  className={`w-6 h-6 rounded-lg text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 transition-colors font-medium ${
                    completed
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isActive
                      ? 'bg-[var(--accent)] text-neutral-950 font-semibold'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-dim)] group-hover:text-[var(--text-main)]'
                  }`}
                >
                  {completed ? '✓' : String(index + 1).padStart(2, '0')}
                </div>

                {/* Topic Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded ${
                        topic.priority === 'P0'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          : 'bg-[var(--bg-subtle)] text-[var(--text-dim)]'
                      }`}
                    >
                      {topic.priority}
                    </span>
                    {bookmarked && <span className="text-[10px] text-amber-500">★</span>}
                  </div>
                  <p
                    className={`text-xs line-clamp-1 ${
                      completed
                        ? 'line-through text-[var(--text-dim)] font-normal'
                        : isActive
                        ? 'text-[var(--text-main)] font-semibold'
                        : 'font-normal group-hover:text-[var(--text-main)]'
                    }`}
                  >
                    {topic.title}
                  </p>
                </div>
              </button>
            );
          }))}
        </div>

        {/* Stepper Footer */}
        <div className="pt-2 border-t border-[var(--border-inner)] text-[11px] font-mono text-[var(--text-dim)] flex items-center justify-between shrink-0">
          <span>Click to jump</span>
          <span className="text-[var(--accent)] font-medium">{topics.length} topics</span>
        </div>
      </div>
    </aside>
  );
}
