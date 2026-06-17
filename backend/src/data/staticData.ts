import { Project, Skill, Experience, Service, Testimonial, Certification } from '../types.js';

export const STATIC_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Cloud Architecture & Solutions Design Prototype',
    description: 'Designed a secure, highly available Multi-AZ 3-tier network topology utilizing a custom VPC spanning multiple Availability Zones. Deployed an Application Load Balancer to distribute traffic to auto-scaling EC2 application tiers inside isolated private subnets. Provisioned a secure Amazon RDS (MySQL) data tier, implementing strict security groups and Network ACLs.',
    techStack: ['AWS', 'VPC', 'Multi-AZ', 'ALB', 'EC2', 'RDS', 'Security Groups'],
    category: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    id: 'p2',
    title: '3-Tier Enterprise Campus Network',
    description: 'Designed a 3-tier enterprise campus network with Core, Distribution, and Access layers using Cisco Packet Tracer. Implemented 7 VLANs with Inter-VLAN Routing through a Layer 3 switch and configured trunk links between network devices. Established connectivity across multiple routers and switches while integrating centralized server infrastructure.',
    techStack: ['Cisco Packet Tracer', 'VLAN', 'L3 Switching', 'Routing', 'Subnetting'],
    category: 'Networking',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    id: 'p3',
    title: 'Vtiger CRM RESTful Sync',
    description: 'Designed and integrated custom RESTful APIs and webhooks to synchronize centralized CRM (Vtiger) data with company communication tools. Developed business logic to automate data flow and ensure consistency across platforms.',
    techStack: ['Java (Core)', 'Node.js', 'REST API', 'Webhooks', 'Vtiger'],
    category: 'Backend',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    githubUrl: '#',
    liveUrl: '#',
    featured: false
  }
];

export const STATIC_SKILLS: Skill[] = [
  // Languages
  { id: 's1', name: 'Java (Core)', category: 'Backend', level: 92 },
  { id: 's2', name: 'JavaScript (ES6+)', category: 'Frontend', level: 88 },
  { id: 's3', name: 'SQL', category: 'Backend', level: 90 },
  // Frontend
  { id: 's4', name: 'React.js (Core)', category: 'Frontend', level: 85 },
  { id: 's5', name: 'HTML5/CSS3', category: 'Frontend', level: 95 },
  { id: 's6', name: 'Bootstrap 5', category: 'Frontend', level: 90 },
  { id: 's7', name: 'Ionic Angular', category: 'Frontend', level: 80 },
  // Backend & APIs
  { id: 's8', name: 'REST API', category: 'Backend', level: 94 },
  { id: 's9', name: 'Node.js', category: 'Backend', level: 85 },
  { id: 's10', name: 'Struts', category: 'Backend', level: 82 },
  { id: 's11', name: 'WordPress', category: 'Backend', level: 80 },
  { id: 's24', name: 'PHP', category: 'Backend', level: 78 },
  // Cloud & Networking
  { id: 's12', name: 'AWS (EC2, S3, RDS)', category: 'Cloud & Network', level: 88 },
  { id: 's13', name: 'Cisco Packet Tracer', category: 'Cloud & Network', level: 85 },
  { id: 's14', name: 'VLAN & Inter-VLAN Routing', category: 'Cloud & Network', level: 82 },
  { id: 's15', name: 'Subnetting & Segmentation', category: 'Cloud & Network', level: 84 },
  // Tools & DevOps
  { id: 's16', name: 'Linux', category: 'Tools & DevOps', level: 85 },
  { id: 's17', name: 'Git & GitHub', category: 'Tools & DevOps', level: 90 },
  { id: 's18', name: 'Postman', category: 'Tools & DevOps', level: 92 },
  { id: 's19', name: 'Jenkins', category: 'Tools & DevOps', level: 70 },
  { id: 's20', name: 'Docker basics', category: 'Tools & DevOps', level: 70 },
  { id: 's21', name: 'CI/CD concepts', category: 'Tools & DevOps', level: 75 },
  // Gen AI
  { id: 's22', name: 'GitHub Copilot', category: 'GenAI', level: 95 },
  { id: 's23', name: 'Claude Code', category: 'GenAI', level: 92 }
];

export const STATIC_EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    role: 'Software Developer',
    company: 'Nitmid Electronics Pvt Ltd',
    duration: 'Nov 2024 - Present',
    description: [
      'Designed and integrated custom RESTful APIs and webhooks to synchronize centralized CRM (Vtiger) data with company communication tools.',
      'Successfully implemented third-party financial integrations, including the Razorpay payment gateway ecosystem.',
      'Maintained web platforms and assisted in managing cross-platform application updates using Ionic Angular.',
      'Handled cloud administration tasks, including deploying web application updates on AWS EC2 and monitoring infrastructure.',
      'Utilized GenAI workflows to optimize backend code efficiency and accelerate script delivery.'
    ],
    current: true
  },
  {
    id: 'e2',
    role: 'Software Engineer Trainee',
    company: 'MSB Data Analytics',
    duration: 'Aug 2023 - July 2024',
    description: [
      'Developed and customized modular business logic for enterprise ERP systems, focusing on Sales, Inventory, and Production control workflows.',
      'Maintained and modified legacy Hospital Management Systems (HMS), implementing custom client requirements for patient management and pharma modules using Core Java and the Struts framework.',
      'Generated custom backend reporting modules to assist corporate clients in operational tracking and decision-making.',
      'Optimized existing MySQL database queries to improve overall system reporting load times.',
      'Assisted with on-premise and cloud server setups for deployment and go-live operations.'
    ]
  }
];

export const STATIC_CERTIFICATIONS: Certification[] = [
  {
    id: 'c0',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    date: 'In Progress',
    credentialUrl: '#'
  },
  {
    id: 'c1',
    title: 'Linux Essentials',
    issuer: 'Besant Technology',
    date: '2024',
    credentialUrl: '#'
  },
  {
    id: 'c2',
    title: 'CCNA Fundamentals',
    issuer: 'Besant Technology',
    date: '2024',
    credentialUrl: '#'
  },
  {
    id: 'c3',
    title: 'AWS and Devops',
    issuer: 'Besant Technologys',
    date: '2024',
    credentialUrl: '#'
  },
  {
    id: 'c4',
    title: 'Essentials on Python',
    issuer: 'Livewire Institution',
    date: '2024',
    credentialUrl: '#'
  },
  {
    id: 'c5',
    title: 'Essentials on Django',
    issuer: 'Livewire Institution',
    date: '2024',
    credentialUrl: '#'
  },
  {
    id: 'c6',
    title: 'UI Developer React JS',
    issuer: 'Softech System Solution',
    date: '2024',
    credentialUrl: '#'
  }
];

export const STATIC_SERVICES: Service[] = [
  {
    id: 'ser1',
    title: 'Backend & REST API Development',
    description: 'Specialized in building secure RESTful APIs and custom backend logic using Core Java, Struts, and Node.js.',
    details: ['RESTful API Integration', 'Java Backend Logic', 'Third-party Webhooks'],
    slug: 'backend-dev'
  },
  {
    id: 'ser2',
    title: 'Cloud Solutions & AWS',
    description: 'Provisioning secure, highly available Multi-AZ 3-tier cloud infrastructure on AWS using EC2, ALB, and RDS.',
    details: ['AWS Administration', 'VPC Architecture', '3-Tier Infrastructure'],
    slug: 'aws-cloud'
  },
  {
    id: 'ser3',
    title: 'Network Design & Segmentation',
    description: 'Designing robust enterprise campus networks with multi-layer architectures, VLANs, and secure routing protocols.',
    details: ['Cisco Network Design', 'VLAN & Subnetting', 'Inter-VLAN Routing'],
    slug: 'network-design'
  },
  {
    id: 'ser4',
    title: 'Database & Query Tuning',
    description: 'Expertise in MySQL schema design and query optimization to improve overall system reporting and load times.',
    details: ['Schema Design', 'Query Optimization', 'Relational Databases'],
    slug: 'database-optimization'
  }
];

export const STATIC_TESTIMONIALS: Testimonial[] = [];
