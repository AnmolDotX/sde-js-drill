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
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-[var(--border-shell)] bg-[var(--bg-card)] p-4 shadow-sm space-y-4 max-h-[calc(100vh-7rem)] flex flex-col">
        {/* Stepper Header */}
        <div className="border-b border-[var(--border-inner)] pb-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[var(--text-dim)] uppercase tracking-wider">
              Topic Stepper Navigator
            </span>
            <span className="text-xs font-mono text-[var(--accent)] font-medium">
              {completedCount}/{topics.length} ({progressPct}%)
            </span>
          </div>

          <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Scrollable Stepper Topic List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
          {topics.map((topic, index) => {
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
                    ? 'bg-[var(--bg-card-inner)] border border-[var(--accent)] text-[var(--text-main)] shadow-xs'
                    : 'hover:bg-[var(--bg-card-inner)] text-[var(--text-muted)] border border-transparent'
                }`}
              >
                {/* Step Marker */}
                <div
                  className={`w-6 h-6 rounded-lg text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    completed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isActive
                      ? 'bg-[var(--accent)] text-neutral-950 font-medium'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-dim)] group-hover:text-[var(--text-main)]'
                  }`}
                >
                  {completed ? '✓' : String(index + 1).padStart(2, '0')}
                </div>

                {/* Topic Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        topic.priority === 'P0'
                          ? 'bg-amber-400/15 text-amber-500 dark:text-amber-300'
                          : 'bg-white/5 text-[var(--text-dim)]'
                      }`}
                    >
                      {topic.priority}
                    </span>
                    {bookmarked && <span className="text-[10px] text-amber-400">★</span>}
                  </div>
                  <p
                    className={`text-xs line-clamp-1 font-normal ${
                      completed
                        ? 'line-through text-[var(--text-dim)]'
                        : isActive
                        ? 'text-[var(--text-main)] font-medium'
                        : 'group-hover:text-[var(--text-main)]'
                    }`}
                  >
                    {topic.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stepper Footer */}
        <div className="pt-2 border-t border-[var(--border-inner)] text-[11px] font-mono text-[var(--text-dim)] flex items-center justify-between">
          <span>Click any topic to jump</span>
          <span className="text-[var(--accent)] font-medium">{topics.length} steps</span>
        </div>
      </div>
    </aside>
  );
}
