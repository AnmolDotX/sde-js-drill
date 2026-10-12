'use client';

import React, { useState } from 'react';
import { TopicItem } from '../data/types';
import { DiagramViewer } from './DiagramViewer';

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
  const [isCopiedCode, setIsCopiedCode] = useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(topic.interviewAnswer);
    setIsCopiedPitch(true);
    setTimeout(() => setIsCopiedPitch(false), 2000);
  };

  const handleCopyCode = () => {
    if (topic.practicalExample?.code) {
      navigator.clipboard.writeText(topic.practicalExample.code);
      setIsCopiedCode(true);
      setTimeout(() => setIsCopiedCode(false), 2000);
    }
  };

  return (
    <div
      className={`rounded-lg border transition-colors ${
        isCompleted
          ? 'bg-[#282a2c] border-[#3e4145] opacity-90'
          : 'bg-[#2c2e31] border-[#3e4145] hover:border-[#4f5358]'
      }`}
    >
      {/* Card Header Bar */}
      <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
        {/* Left: Checkbox & Title */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Custom Checkbox Button */}
          <button
            type="button"
            onClick={() => onToggleCompleted(topic.id)}
            className={`mt-1 w-5 h-5 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-[#98c379] text-[#1e2022]'
                : 'border border-[#646669] hover:border-[#e2b714] bg-[#242628]'
            }`}
            title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
          >
            {isCompleted && (
              <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          {/* Title & Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                  topic.priority === 'P0'
                    ? 'bg-[#e2b714] text-[#1e2022] font-semibold'
                    : 'bg-[#383a3e] text-[#d1d0c5]'
                }`}
              >
                {topic.priority === 'P0' ? 'P0 MUST KNOW' : 'P1 HIGH'}
              </span>

              <span className="text-[11px] font-mono text-[#908e82] px-2 py-0.5 rounded bg-[#242628] border border-[#383a3e]">
                {topic.category}
              </span>

              {topic.estimatedMins && (
                <span className="text-[11px] font-mono text-[#646669]">
                  ~{topic.estimatedMins} min read
                </span>
              )}
            </div>

            <h3
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-base font-medium cursor-pointer transition-colors ${
                isCompleted ? 'line-through text-[#908e82]' : 'text-[#d1d0c5] hover:text-[#e2b714]'
              }`}
            >
              {topic.title}
            </h3>

            {topic.subtitle && (
              <p className="text-xs text-[#646669] mt-0.5 line-clamp-1">{topic.subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Actions (Bookmark & Expand) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onToggleBookmarked(topic.id)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isBookmarked
                ? 'text-[#e2b714] bg-[#383a3e]'
                : 'text-[#646669] hover:text-[#d1d0c5] hover:bg-[#383a3e]'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for revision'}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#242628] hover:bg-[#383a3e] border border-[#3e4145] text-[#d1d0c5] transition-colors cursor-pointer"
          >
            {isExpanded ? 'Collapse ▲' : 'Drill ▼'}
          </button>
        </div>
      </div>

      {/* Expanded Drill Details */}
      {isExpanded && (
        <div className="px-4 pb-5 sm:px-5 border-t border-[#383a3e] pt-4 space-y-5 text-sm">
          {/* Section 1: The Gist */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#e2b714] font-semibold mb-1.5">
              1. The Gist (Plain English)
            </h4>
            <p className="text-[#d1d0c5] leading-relaxed bg-[#242628] p-3 rounded border border-[#34363a]">
              {topic.theGist}
            </p>
          </div>

          {/* Section 2: How It Works */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#e2b714] font-semibold mb-1.5">
              2. How It Works (Mental Model & Internals)
            </h4>
            <div className="text-[#d1d0c5] leading-relaxed space-y-2">
              <p>{topic.howItWorks}</p>
            </div>
          </div>

          {/* Section 3: Practical Code Example */}
          {topic.practicalExample && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#e2b714] font-semibold">
                  3. Practical Code / Blueprint
                  {topic.practicalExample.title && (
                    <span className="text-[#908e82] font-normal normal-case ml-2">
                      ({topic.practicalExample.title})
                    </span>
                  )}
                </h4>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs font-mono text-[#908e82] hover:text-[#e2b714] px-2 py-0.5 rounded bg-[#242628] border border-[#383a3e] cursor-pointer"
                >
                  {isCopiedCode ? 'Copied ✓' : 'Copy Code'}
                </button>
              </div>

              <div className="rounded border border-[#383a3e] bg-[#1e2022] p-3.5 overflow-x-auto">
                <pre className="font-mono text-xs text-[#d1d0c5] leading-relaxed whitespace-pre">
                  <code>{topic.practicalExample.code}</code>
                </pre>
              </div>
              {topic.practicalExample.explanation && (
                <p className="text-xs text-[#646669] mt-1 font-mono">
                  {topic.practicalExample.explanation}
                </p>
              )}
            </div>
          )}

          {/* Section 4: Diagram (if applicable) */}
          {topic.diagramCode && (
            <DiagramViewer
              type={topic.diagramType}
              code={topic.diagramCode}
              title={`${topic.title} Architecture`}
            />
          )}

          {/* Section 5: 30-90s Interview-Ready Answer */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#e2b714] font-semibold">
                4. Interview-Ready Answer (30–90 Second Pitch)
              </h4>
              <button
                type="button"
                onClick={handleCopyPitch}
                className="text-xs font-mono text-[#908e82] hover:text-[#e2b714] px-2 py-0.5 rounded bg-[#242628] border border-[#383a3e] cursor-pointer"
              >
                {isCopiedPitch ? 'Copied ✓' : 'Copy Pitch'}
              </button>
            </div>
            <div className="border-l-2 border-[#e2b714] bg-[#242628] p-3.5 rounded-r text-[#d1d0c5] leading-relaxed italic">
              "{topic.interviewAnswer}"
            </div>
          </div>

          {/* Section 6: Resume Connection */}
          {topic.resumeConnection && (
            <div className="p-3 rounded bg-[#292c2a] border border-[#3e483b]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#98c379] font-semibold mb-1 flex items-center gap-1.5">
                <span>✦</span> Resume Connection & Story Anchor
              </h4>
              <p className="text-xs text-[#d1d0c5] leading-relaxed">{topic.resumeConnection}</p>
            </div>
          )}

          {/* Section 7: Tradeoffs & Gotchas */}
          {topic.tradeoffsAndGotchas && topic.tradeoffsAndGotchas.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#ca4754] font-semibold mb-1.5">
                5. Trade-offs & Common Gotchas / Pitfalls
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#d1d0c5] bg-[#242628] p-3 rounded border border-[#383a3e]">
                {topic.tradeoffsAndGotchas.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 8: Follow-Up Questions */}
          {topic.followUpQuestions && topic.followUpQuestions.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#908e82] font-semibold mb-1.5">
                6. Tricky Follow-up Questions to Expect
              </h4>
              <ul className="space-y-1 text-xs text-[#908e82]">
                {topic.followUpQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#e2b714] font-mono">Q{idx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 9: Personal Notes (Auto-saved) */}
          <div className="pt-2 border-t border-[#383a3e]">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor={`note-${topic.id}`}
                className="text-xs font-mono text-[#908e82] font-medium"
              >
                Personal Revision Notes (Saved Locally)
              </label>
              <span className="text-[11px] font-mono text-[#646669]">Auto-saved to browser</span>
            </div>
            <textarea
              id={`note-${topic.id}`}
              rows={2}
              value={noteText}
              onChange={(e) => {
                setNoteText(e.target.value);
                onSaveNote(topic.id, e.target.value);
              }}
              placeholder="Write your personal mnemonics, Flipkart/Probo reminders, or follow-up notes here..."
              className="w-full bg-[#242628] border border-[#3e4145] rounded p-2.5 text-xs text-[#d1d0c5] focus:border-[#e2b714] focus:outline-none font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
}
