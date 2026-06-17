import { useState } from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Filter, FolderKanban, Check, Sparkles } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | 'Cloud' | 'Networking' | 'Backend' | 'React'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterTabs: ('All' | 'Cloud' | 'Networking' | 'Backend' | 'React')[] = [
    'All',
    'Cloud',
    'Networking',
    'Backend',
    'React'
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <section
      id="projects"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
              Creative Portfolio
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
              Featured Case Studies
            </h2>
          </div>
          
          {/* Quick Filter Info Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950/40 border border-white/5 font-mono text-[10px] text-neutral-400">
            <Filter className="w-3.5 h-3.5 text-teal-400" />
            <span>CATEGORIZED FILTERS ACTIVE: {filteredProjects.length} LISTED</span>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                filter === tab
                  ? 'bg-neutral-800 text-teal-400 border border-teal-500/30'
                  : 'bg-neutral-900/40 light:bg-white text-neutral-400 light:text-neutral-600 border border-white/5 light:border-slate-200 hover:text-white light:hover:text-neutral-900'
              }`}
            >
              #{tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-neutral-900/60 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/25 duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/2 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Abs hover glow radial gradient */}
              <div className="absolute inset-0 bg-radial-gradient from-teal-500/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card visual banner wrapper */}
              <div className="relative h-56 md:h-64 overflow-hidden bg-neutral-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 duration-500"
                />
                
                {/* Visual Category absolute tags overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[10px] font-mono font-bold bg-[#0B0F19]/90 text-teal-400 border border-teal-500/20 px-2.5 py-1 rounded">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[9px] font-mono font-extrabold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      FEATURED
                    </span>
                  )}
                </div>
              </div>

              {/* Card descriptor text contents */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-bold text-xl md:text-2xl text-white light:text-neutral-900 group-hover:text-teal-400 transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400 light:text-neutral-600 leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags lists */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#0B0F19] border border-white/5 text-neutral-400 light:text-neutral-700 hover:border-teal-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct link triggers */}
                <div
                  className="flex items-center gap-4 border-t border-white/5 pt-5 mt-auto"
                  onClick={(e) => e.stopPropagation()} // block parent toggle selected project
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer ml-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-neutral-900 rounded-2xl">
              <FolderKanban className="w-10 h-10 text-neutral-700 mx-auto mb-4" />
              <span className="font-mono text-sm text-neutral-500">No projects listed inside &quot;{filter}&quot; filter type.</span>
              <p className="text-xs text-neutral-600">Please enter a new project matching this filter category in the Admin Dashboard!</p>
            </div>
          )}
        </div>

        {/* Premium Detail Modal Lightbox */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-950/70 backdrop-blur-sm animate-fade-in">
            <div
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 p-6 md:p-8 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-neutral-950/80 hover:bg-neutral-900 text-white rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">{selectedProject.category} Case Study</span>
                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white mt-1 mb-4">{selectedProject.title}</h3>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-6">{selectedProject.description}</p>
                
                <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">Target Tech Stack</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack.map(stack => (
                    <span key={stack} className="text-xs font-mono px-3 py-1 bg-neutral-950 border border-teal-500/20 text-teal-400 rounded-lg">{stack}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4 border-t border-neutral-800 pt-5 mt-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 font-mono text-xs font-bold rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-white flex items-center gap-2 cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                  )}

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 font-mono text-xs font-bold rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 text-[#0B0F19] hover:brightness-110 flex items-center gap-2 cursor-pointer ml-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Prototype</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
