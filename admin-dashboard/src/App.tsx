import { useState, useEffect } from 'react';
import { Project, Skill, Experience, Certification } from './types';
import { STATIC_PROJECTS, STATIC_SKILLS, STATIC_EXPERIENCES, STATIC_CERTIFICATIONS } from './data/staticData';
import AdminDashboard from './components/AdminDashboard';
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-teal-500 selection:text-neutral-950">
      <CustomCursor />
      <AdminDashboard
        onRefreshData={fetchDynamicData}
        projects={projects}
        skills={skills}
        experiences={experiences}
        certifications={certifications}
      />
    </div>
  );
}
