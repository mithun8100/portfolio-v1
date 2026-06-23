import { useState, useEffect } from 'react';
import { Project, Skill, Experience, Certification } from './types';
import { STATIC_PROJECTS, STATIC_SKILLS, STATIC_EXPERIENCES, STATIC_CERTIFICATIONS } from './data/staticData';

// Core parts
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Services from './components/Services';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';

export default function App() {
  // Dynamic API State
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(STATIC_SKILLS);
  const [experiences, setExperiences] = useState<Experience[]>(STATIC_EXPERIENCES);
  const [certifications, setCertifications] = useState<Certification[]>(STATIC_CERTIFICATIONS);

  const fetchDynamicData = async () => {
    try {
      // 1. Projects
      const projRes = await fetch('/api/projects');
      if (projRes.ok) {
        const data = await projRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      }

      // 2. Skills
      const skillRes = await fetch('/api/skills');
      if (skillRes.ok) {
        const data = await skillRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      }

      // 3. Experiences
      const expRes = await fetch('/api/experience');
      if (expRes.ok) {
        const data = await expRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data);
        }
      }

      // 4. Certifications
      const certRes = await fetch('/api/certifications');
      if (certRes.ok) {
        const data = await certRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setCertifications(data);
        }
      }
    } catch (err) {
      console.warn('REST API endpoints are currently utilizing high-quality static-fallback arrays:', err);
    }
  };

  useEffect(() => {
    fetchDynamicData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 light:bg-slate-50 transition-colors duration-300 relative text-neutral-100 selection:bg-teal-500 selection:text-neutral-950">
      {/* Custom dynamic glowing cursor follower */}
      <CustomCursor />

      {/* Shared Apple blurred header */}
      <NavBar
        isAdminMode={false}
        onAdminClick={() => {
           window.open('http://localhost:5174', '_blank');
        }}
      />

      <div className="animate-fade-in relative">
        <Hero />
        
        <About />
        
        <Skills skills={skills} />
        
        <Timeline experiences={experiences} />
        
        <Projects projects={projects} />
        
        <Services />
        
        <Certifications certifications={certifications} />
        
        <Testimonials />
        
        <Contact />

        {/* Core AI assistant chatbot float widgets */}
        <AIChat />
      </div>

      {/* Handcrafted clean footer signature */}
      <footer className="py-12 bg-neutral-950 light:bg-slate-100 text-center border-t border-white/5 light:border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-500 font-mono">
            &copy; {new Date().getFullYear()} MITHUN.DEV - ALL RIGHTS SECURED.
          </div>
          <div className="text-xs font-mono text-neutral-400 light:text-neutral-600 flex items-center gap-1.5 justify-center">
            <span>Crafted with Pride & Precision</span>
            <span className="text-teal-400">●</span>
            <span>REST API & Cloud Architect Concepts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
