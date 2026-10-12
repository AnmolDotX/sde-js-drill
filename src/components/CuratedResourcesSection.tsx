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
      'phase-4-core-cs': 'Core CS, Databases & Networking Specifications',
      'phase-5-ai-eng': 'AI Engineering, Multi-Agent & RAG Resources',
    };
    resources.push({
      phaseTitle: titles[phaseId],
      links: CURATED_PHASE_RESOURCES[phaseId] || [],
    });
  }

  return (
    <section className="mt-16 pt-10 border-t border-white/[0.08] space-y-8">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
            Recommended Reading &amp; Practice
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight">
          Curated Industry Resources (Beyond Definitions)
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          High-signal modern portals for machine coding, architecture breakdowns, and distributed systems — selected specifically for 3+ years engineering interviews.
        </p>
      </div>

      {/* Resource Sections */}
      <div className="space-y-8">
        {resources.map((group) => (
          <div key={group.phaseTitle} className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
              <span className="text-amber-400">&gt;</span> {group.phaseTitle}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.links.map((res) => (
                <a
                  key={res.url}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl border border-white/[0.06] bg-[#121417] p-5 sm:p-6 transition-all duration-300 hover:border-amber-400/40 hover:bg-[#16181c] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06] group-hover:text-amber-400 transition-colors">
                        {res.source}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400/90 font-medium">
                        {res.badge}
                      </span>
                    </div>

                    {/* Title with link arrow */}
                    <h5 className="text-base font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors flex items-center justify-between">
                      <span>{res.title}</span>
                      <span className="text-neutral-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs font-mono">
                        ↗
                      </span>
                    </h5>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.04]">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-neutral-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.03]"
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
