/**
 * Shared Type Definitions
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud & Network' | 'Tools & DevOps' | 'GenAI';
  level: number; // 0 to 100
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  current?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  avatarUrl: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminUser {
  name: string;
  email: string;
  passwordHash?: string;
}
