import { Experience } from '../types';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <section
      id="experience"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
            Journey Timeline
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
            Professional Experiences
          </h2>
          <p className="mt-4 text-sm text-neutral-400 light:text-neutral-600 leading-relaxed">
            A vertical overview of Mithun&apos;s active positions and growth in full-stack architecture and workflow engineering.
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-gradient-to-b from-teal-500 via-indigo-600 to-neutral-800 pointer-events-none" />

          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Timeline glow indicator node */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-400 ring-4 ring-teal-500/20 z-10 animate-pulse" />

                  {/* Left spacer for desktop alignments */}
                  <div className="w-full md:w-1/2" />

                  {/* Body Content card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 mt-2 md:mt-0">
                    <div className="relative p-6 md:p-8 rounded-2xl bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/25 transition-all duration-300 transform hover:-translate-y-1 group">
                      {/* Interactive slide decoration */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal-500/5 to-indigo-500/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 light:bg-teal-500/5 text-teal-400 light:text-teal-600 text-[10px] font-mono whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.duration}
                        </span>

                        {exp.current && (
                          <span className="inline-block text-[9px] font-mono tracking-wider font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Active Position
                          </span>
                        )}
                      </div>

                      <h3 className="font-sans font-bold text-xl text-white light:text-neutral-900 group-hover:text-teal-400 transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="font-mono text-xs text-neutral-400 light:text-neutral-500 mt-1 mb-4 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                        {exp.company}
                      </h4>

                      <ul className="space-y-3.5 mt-4">
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-400 light:text-neutral-600 leading-relaxed"
                          >
                            <ChevronRight className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
