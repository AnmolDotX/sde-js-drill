'use client';

import React from 'react';
import Link from 'next/link';
import { getActivePhases, getActiveTopics } from '../data';
import { useRevisionProgress } from '../hooks/useRevisionProgress';
import { Navbar } from '../components/Navbar';

export default function LandingPage() {
  const activePhases = getActivePhases(false);
  const activeTopics = getActiveTopics(false);
  const { completedCount, isCompleted } = useRevisionProgress();

  const percent = activeTopics.length > 0 ? Math.round((completedCount / activeTopics.length) * 100) : 0;
  const p0Count = activeTopics.filter((t) => t.priority === 'P0').length;
  const p0Done = activeTopics.filter((t) => t.priority === 'P0' && isCompleted(t.id)).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        completedCount={completedCount}
        totalCount={activeTopics.length}
        showResumePdf={false}
      />

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-24">
        {/* Hero Header */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-card)] shadow-xs text-xs font-mono text-[var(--accent)] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>FULLSTACK SDE &amp; AI APPLICATION PLAYBOOK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text-main)] leading-[1.12]">
            System Revision Playbook for Fullstack JS/TS Developers
          </h1>

          <p className="text-base sm:text-lg font-normal text-[var(--text-muted)] max-w-2xl leading-relaxed">
            A distraction-free, stage-wise revision curriculum designed to rapidly refresh runtime internals, system design trade-offs, CS fundamentals, and AI engineering before high-stakes senior interviews.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="/drill"
              className="px-6 py-3.5 rounded-xl bg-[var(--accent)] hover:opacity-95 text-neutral-950 text-sm font-semibold transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>Launch Practice Dashboard</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <Link
              href="/drill"
              className="px-5 py-3.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-inner)] shadow-[var(--card-shadow)] text-sm font-medium text-[var(--text-main)] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Curriculum ({activeTopics.length} Questions)</span>
              <span className="text-xs text-[var(--accent)] font-mono">↓</span>
            </Link>
          </div>

          {/* Current Local Progress Card */}
          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-[var(--text-dim)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[var(--text-muted)] font-medium">
                {completedCount} of {activeTopics.length} Topics Completed ({percent}%)
              </span>
            </div>
            <div>•</div>
            <div className="text-[var(--text-muted)] font-medium">
              {p0Done} of {p0Count} P0 Must-Know Mastered
            </div>
          </div>
        </div>

        {/* 5 Core Curriculum Tracks */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-inner)] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
                Curated Roadmaps
              </span>
              <h2 className="text-2xl font-semibold text-[var(--text-main)] tracking-tight mt-1">
                Five Specialized Preparation Domains
              </h2>
            </div>
            <Link
              href="/drill"
              className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Explore all {activeTopics.length} topics in Dashboard</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePhases.map((phase) => {
              const phaseTopics = activeTopics.filter((t) => t.phase === phase.id);
              const phaseCompleted = phaseTopics.filter((t) => isCompleted(t.id)).length;
              const phasePercent = phaseTopics.length > 0 ? Math.round((phaseCompleted / phaseTopics.length) * 100) : 0;
              const isComingSoon = phase.id === 'phase-3-ai-resume';

              return (
                <div
                  key={phase.id}
                  className="rounded-2xl bg-[var(--bg-card)] p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between shadow-[var(--card-shadow)] group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-card-inner)] text-[var(--accent)]">
                        {phase.badge}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-dim)] font-medium">
                        {isComingSoon ? 'Roadmap' : `${phaseTopics.length} topics`}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {phase.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-normal text-[var(--text-muted)] leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {/* Footer & Jump Link */}
                  <div className="pt-4 border-t border-[var(--border-inner)] flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--text-dim)] font-medium">
                      {isComingSoon ? 'LangGraph Pipeline' : `${phaseCompleted}/${phaseTopics.length} done (${phasePercent}%)`}
                    </span>
                    <Link
                      href="/drill"
                      className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>{isComingSoon ? 'View Roadmap' : 'Drill Track'}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8-Part Revision Methodology */}
        <section className="rounded-3xl bg-[var(--bg-card)] p-8 sm:p-12 space-y-8 shadow-[var(--card-shadow)]">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              Revision Architecture
            </span>
            <h2 className="text-2xl font-semibold text-[var(--text-main)] tracking-tight">
              Built for Engineering Depth &amp; Fast Recall
            </h2>
            <p className="text-xs sm:text-sm font-normal text-[var(--text-muted)] leading-relaxed">
              Every topic is prepared using a structured mental model so you can defend your technical decisions naturally in technical rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'The Gist', desc: 'Understand the concept in plain English before memorizing terminology.' },
              { num: '02', title: 'How It Works', desc: 'Internal mental models, call stacks, Fiber nodes, and event loop phases.' },
              { num: '03', title: 'Practical Code', desc: 'Clean TypeScript, Node.js, and SQL blueprints with colorful syntax highlighting.' },
              { num: '04', title: '30–90s Pitch', desc: 'A crisp, natural interview-ready answer you can deliver concisely.' },
              { num: '05', title: 'Resume Anchor', desc: 'Ground concepts directly in your Flipkart and Probo production experience.' },
              { num: '06', title: 'Trade-offs & Gotchas', desc: 'Avoid critical production bugs, race conditions, and common anti-patterns.' },
              { num: '07', title: 'Visual Blueprints', desc: 'Interactive Mermaid diagrams for ER schemas, sequence flows, and architectures.' },
              { num: '08', title: 'Curated Readings', desc: 'Direct pointers to GreatFrontend, ByteByteGo, DDIA, and LangGraph.' },
            ].map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-[var(--bg-card-inner)] space-y-2 shadow-2xs"
              >
                <div className="text-xs font-mono text-[var(--accent)] font-semibold">{step.num}</div>
                <h4 className="text-sm font-semibold text-[var(--text-main)]">{step.title}</h4>
                <p className="text-xs font-normal text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-inner)] bg-[var(--bg-card)] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-dim)] font-normal">
          <div>
            <span>System Revision Playbook for Fullstack JS/TS Developers</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/drill" className="text-[var(--accent)] hover:underline font-medium">
              Enter Practice Dashboard →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
