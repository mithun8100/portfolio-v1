import { useState } from 'react';
import { Skill } from '../types';
import { Cpu, Layout, Server, Database, Globe, Sparkles } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Frontend' | 'Backend' | 'Cloud & Network' | 'Tools & DevOps' | 'GenAI'>('All');

  const tabs: ('All' | 'Frontend' | 'Backend' | 'Cloud & Network' | 'Tools & DevOps' | 'GenAI')[] = [
    'All',
    'Frontend',
    'Backend',
    'Cloud & Network',
    'Tools & DevOps',
    'GenAI'
  ];

  const filteredSkills = skills.filter((skill) => {
    if (activeTab === 'All') return true;
    return skill.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Layout className="w-4 h-4 text-emerald-400" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'Cloud & Network':
        return <Globe className="w-4 h-4 text-indigo-400" />;
      case 'Tools & DevOps':
        return <Cpu className="w-4 h-4 text-amber-500" />;
      case 'GenAI':
        return <Sparkles className="w-4 h-4 text-teal-400" />;
      default:
        return <Database className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <section
      id="skills"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
            Expertise Matrix
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
            Skillsets & Tools
          </h2>
          <p className="mt-4 text-sm text-neutral-400 light:text-neutral-600 leading-relaxed">
            Mithun&apos;s competencies categorized by focus areas. Use the buttons below to filter languages, libraries, databases and deployment pipelines.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-sans font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-[#0B0F19] font-bold shadow-lg shadow-teal-500/10'
                  : 'bg-neutral-900/60 light:bg-white text-neutral-400 light:text-neutral-600 border border-white/5 light:border-slate-200 hover:text-white light:hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="relative overflow-hidden group rounded-2xl p-6 bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/20 light:hover:border-teal-400/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-neutral-800 light:bg-slate-100 flex items-center justify-center">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-white light:text-neutral-900">
                      {skill.name}
                    </h4>
                    <span className="font-mono text-[9px] text-neutral-500 font-semibold uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-teal-400 light:text-teal-600">
                  {skill.level}%
                </span>
              </div>

              {/* Slider Progress Indicator Container */}
              <div className="w-full h-2 rounded-full bg-neutral-800 light:bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Decorative hover light indicators */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}

          {/* Empty fallback state for custom skills filters */}
          {filteredSkills.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-neutral-850 light:border-slate-200 rounded-2xl">
              <span className="text-sm font-mono text-neutral-500">No tools configured inside &quot;{activeTab}&quot; category.</span>
              <p className="text-xs text-neutral-600">Please use Admin Dashboard manager to populate custom entries.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
