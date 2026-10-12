'use client';

import React from 'react';
import { PhaseId } from '../data/types';
import { CURATED_PHASE_RESOURCES, ResourceLink } from '../data/curatedResources';

interface CuratedResourcesSectionProps {
  phaseId: PhaseId | 'all';
}

export function CuratedResourcesSection({ phaseId }: CuratedResourcesSectionProps) {
  // Collect resources based on active phase
  const resources: { phaseTitle: string; links: ResourceLink[] }[] = [];

  if (phaseId === 'all') {
    resources.push(
      { phaseTitle: 'Phase 1: Frontend & Machine Coding', links: CURATED_PHASE_RESOURCES['phase-1-frontend'] },
      { phaseTitle: 'Phase 2: Backend, Systems & Databases', links: CURATED_PHASE_RESOURCES['phase-2-backend'] },
      { phaseTitle: 'Phase 3: Resume Anchors & Production Scale', links: CURATED_PHASE_RESOURCES['phase-3-resume'] },
      { phaseTitle: 'Phase 4: CS Core, Networking & Architecture', links: CURATED_PHASE_RESOURCES['phase-4-core-cs'] },
      { phaseTitle: 'Phase 5: AI Application Engineering & Agents', links: CURATED_PHASE_RESOURCES['phase-5-ai-eng'] }
    );
  } else {
    const titles: Record<PhaseId, string> = {
      'phase-1-frontend': 'Frontend & Machine Coding Resources',
      'phase-2-backend': 'Backend & System Design Deep Dives',
      'phase-3-resume': 'Real-World Production Architecture Guides',
      'phase-3-ai-resume': 'AI Agent Frameworks & Resume Parsing Architectures',
      'phase-4-core-cs': 'Core CS, Databases & Networking Specifications',
      'phase-5-ai-eng': 'AI Engineering, Multi-Agent & RAG Resources',
    };
    resources.push({
      phaseTitle: titles[phaseId],
      links: CURATED_PHASE_RESOURCES[phaseId] || [],
    });
  }

  return (
    <section className="mt-14 pt-8 border-t border-[var(--border-shell)] space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-medium">
            Recommended Reading &amp; Practice
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-normal text-[var(--text-main)] tracking-tight">
          Curated Industry Resources (Beyond Definitions)
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-light max-w-2xl leading-relaxed">
          High-signal modern portals for machine coding, architecture breakdowns, and distributed systems — selected specifically for 3+ years engineering interviews.
        </p>
      </div>

      {/* Resource Sections */}
      <div className="space-y-6">
        {resources.map((group) => (
          <div key={group.phaseTitle} className="space-y-3">
            <h4 className="text-xs font-mono font-medium text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[var(--accent)]">&gt;</span> {group.phaseTitle}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {group.links.map((res) => (
                <a
                  key={res.url}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl border border-[var(--border-shell)] bg-[var(--bg-card)] p-5 transition-all duration-200 hover:border-[var(--accent)]/50 hover:bg-[var(--bg-card-inner)] flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--bg-card-inner)] text-[var(--text-muted)] border border-[var(--border-inner)] group-hover:text-[var(--accent)] transition-colors">
                        {res.source}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent)] font-normal">
                        {res.badge}
                      </span>
                    </div>

                    {/* Title with link arrow */}
                    <h5 className="text-sm sm:text-base font-medium text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                      <span>{res.title}</span>
                      <span className="text-[var(--text-dim)] group-hover:text-[var(--accent)] text-xs font-mono">
                        ↗
                      </span>
                    </h5>

                    {/* Description */}
                    <p className="text-xs text-[var(--text-muted)] mt-1.5 font-light leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5 pt-2.5 border-t border-[var(--border-inner)]">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[var(--text-dim)] bg-[var(--bg-card-inner)] px-1.5 py-0.5 rounded border border-[var(--border-inner)] font-normal"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
