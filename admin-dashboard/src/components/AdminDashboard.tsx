import React, { useState, useEffect } from 'react';
import { Project, Skill, Experience, ContactInquiry, Certification } from '../types';
import {
  FolderKanban,
  Cpu,
  Calendar,
  Inbox,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Mail,
  UserCheck,
  Check,
  ShieldAlert,
  Search,
  ChevronRight,
  TrendingUp,
  LineChart,
  Award
} from 'lucide-react';

interface AdminDashboardProps {
  onRefreshData: () => void;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certifications: Certification[];
}

export default function AdminDashboard({ onRefreshData, projects, skills, experiences, certifications }: AdminDashboardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'skills' | 'experience' | 'certifications' | 'inbox' | 'settings'>('analytics');

  // CRUD States
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal / Form fields
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'skill' | 'experience' | 'certification'>('project');

  // Form Fields
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    techStack: '',
    category: 'React',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend' as any,
    level: 80
  });

  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    duration: '',
    description: '',
    current: false
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialUrl: ''
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      fetchContacts(savedToken);
    }
  }, []);

  const fetchContacts = async (authToken: string) => {
    try {
      const res = await fetch('/api/contact', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (e) {
      console.error('Failed to load inquiries inbox table:', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
        fetchContacts(data.token);
        showToast('Login authorized!');
      } else {
        const err = await res.json();
        setLoginError(err.error || 'Invalid administrator status');
      }
    } catch (err) {
      setLoginError('Could not contact Express auth endpoints.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    showToast('Admin session closed successfully.');
  };

  // Contacts operations
  const handleMarkContactAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
        showToast('Message status: Read');
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (e) {
      showToast('Action failed', 'error');
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
        showToast('Message deleted');
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (e) {
      showToast('Delete operation failed', 'error');
    }
  };

  // Create or Update
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = '';
    let method = 'POST';
    let payload: any = {};

    if (modalType === 'project') {
      url = '/api/projects';
      payload = {
        ...projForm,
        techStack: projForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
      };
      if (editingItem) {
        url = `/api/projects/${editingItem.id}`;
        method = 'PUT';
      }
    } else if (modalType === 'skill') {
      url = '/api/skills';
      payload = skillForm;
      if (editingItem) {
        url = `/api/skills/${editingItem.id}`;
        method = 'PUT';
      }
    } else if (modalType === 'experience') {
      url = '/api/experience';
      payload = {
        ...expForm,
        description: expForm.description.split('\n').map(s => s.trim()).filter(Boolean)
      };
      if (editingItem) {
        url = `/api/experience/${editingItem.id}`;
        method = 'PUT';
      }
    } else if (modalType === 'certification') {
      url = '/api/certifications';
      payload = certForm;
      if (editingItem) {
        url = `/api/certifications/${editingItem.id}`;
        method = 'PUT';
      }
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(editingItem ? 'Updated successfully!' : 'Created successfully!');
        setIsModalOpen(false);
        setEditingItem(null);
        onRefreshData(); // reload values in parent
      } else if (res.status === 401) {
        handleLogout();
      } else {
        showToast('Operation rejected by server schema rules', 'error');
      }
    } catch (e) {
      showToast('Network error, could not sync items', 'error');
    }
  };

  const handleDeleteItem = async (type: 'project' | 'skill' | 'experience' | 'certification', id: string) => {
    if (!window.confirm('Delete this item permanently?')) return;
    const apiPath = type === 'certification' ? 'certifications' : type === 'experience' ? 'experience' : `${type}s`;
    try {
      const res = await fetch(`/api/${apiPath}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Item deleted');
        onRefreshData();
      } else if (res.status === 401) {
        handleLogout();
      } else {
        showToast('Delete rejected', 'error');
      }
    } catch (e) {
      showToast('Network error', 'error');
    }
  };

  const openEditModal = (type: 'project' | 'skill' | 'experience' | 'certification', item: any) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'project') {
      setProjForm({
        title: item.title,
        description: item.description,
        techStack: item.techStack.join(', '),
        category: item.category,
        imageUrl: item.imageUrl,
        githubUrl: item.githubUrl || '',
        liveUrl: item.liveUrl || '',
        featured: !!item.featured
      });
    } else if (type === 'skill') {
      setSkillForm({
        name: item.name,
        category: item.category,
        level: item.level
      });
    } else if (type === 'experience') {
      setExpForm({
        role: item.role,
        company: item.company,
        duration: item.duration,
        description: item.description.join('\n'),
        current: !!item.current
      });
    } else if (type === 'certification') {
      setCertForm({
        title: item.title,
        issuer: item.issuer,
        date: item.date,
        credentialUrl: item.credentialUrl || ''
      });
    }
    setIsModalOpen(true);
  };

  const openCreateModal = (type: 'project' | 'skill' | 'experience' | 'certification') => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'project') {
      setProjForm({
        title: '',
        description: '',
        techStack: 'Core Java, REST API, AWS',
        category: 'Backend',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        githubUrl: '',
        liveUrl: '',
        featured: false
      });
    } else if (type === 'skill') {
      setSkillForm({ name: '', category: 'Backend', level: 85 });
    } else if (type === 'experience') {
      setExpForm({ role: '', company: '', duration: '', description: '', current: false });
    } else if (type === 'certification') {
      setCertForm({ title: '', issuer: '', date: '', credentialUrl: '' });
    }
    setIsModalOpen(true);
  };

  // Rendering conditions
  if (!token) {
    return (
      <section className="min-h-screen flex items-center justify-center p-6 bg-neutral-950">
        <div className="w-full max-w-md p-8 rounded-2xl bg-neutral-900 border border-white/5 shadow-2xl flex flex-col gap-6">
          <div className="text-center">
            <span className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/25 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-5 h-5 animate-pulse" />
            </span>
            <h2 className="font-sans font-bold text-2xl text-white">Administrator Secure Area</h2>
            <p className="font-mono text-[10px] text-neutral-500 tracking-wider mt-1.5 uppercase">
              CREDENTIAL CHECKS REQUIRED
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm"
                required
              />
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/15 text-rose-400 text-xs font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-sans font-bold text-sm bg-gradient-to-r from-teal-500 to-indigo-600 text-[#0B0F19] hover:brightness-110 duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
            </button>
          </form>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 text-center">
            <span className="text-[10px] font-mono text-neutral-600">
              💡 Default demo setup: <strong>admin@example.com</strong> / password: <strong>admin</strong> (or run createAdmin scripts)
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-24 bg-neutral-950 font-sans text-neutral-200">
      {/* Toast Alert Indicator Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl border font-mono text-xs flex items-center gap-2 shadow-2xl animate-slide-up ${
          toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          <Check className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24">
        {/* Left Sidebar navigation controls */}
        <aside className="lg:col-span-3 p-6 rounded-2xl bg-neutral-900 border border-white/5 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5Packed">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute" />
              <h3 className="font-sans font-bold text-base text-white">Console Board</h3>
            </div>
            <p className="text-xs font-mono text-neutral-500">ADMIN_PORTAL v2.6.2</p>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'analytics', label: 'Analytics Insights', icon: LineChart },
              { id: 'projects', label: 'Projects CRUD', icon: FolderKanban },
              { id: 'skills', label: 'Skills Grid Set', icon: Cpu },
              { id: 'experience', label: 'Experience Timeline', icon: Calendar },
              { id: 'certifications', label: 'Certifications', icon: Award },
              { id: 'inbox', label: 'Contacts Inbox', icon: Inbox },
              { id: 'settings', label: 'System Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold font-mono tracking-wider text-left transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-neutral-950 text-teal-400 border border-teal-500/25'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label.toUpperCase()}</span>
                <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${activeTab === tab.id ? 'translate-x-0.5' : 'opacity-0'}`} />
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold font-mono tracking-wider bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 duration-150 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>TERMINATE SESSION</span>
          </button>
        </aside>

        {/* Column body viewer */}
        <main className="lg:col-span-9 p-8 rounded-2xl bg-neutral-900/40 border border-white/5 min-h-[500px]">
          {/* SEARCH INPUT */}
          {activeTab !== 'analytics' && activeTab !== 'settings' && (
            <div className="relative mb-6">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search collection records matches..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3 text-xs md:text-sm bg-neutral-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-teal-400 duration-150"
              />
            </div>
          )}

          {/* TAB 1: ANALYTICS VIEW */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-sans font-bold text-2xl text-white">Analytics Overview</h2>
                <div className="text-xs font-mono text-neutral-500">REALTIME TELEMETRY</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-neutral-950 border border-white/5">
                  <span className="font-mono text-[10px] text-neutral-500">TOTAL INDEX INQUIRIES</span>
                  <div className="font-sans font-extrabold text-3xl text-teal-400 mt-2">{contacts.length} INBOX</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mt-4">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                    <span>Real-time client connections</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950 border border-white/5">
                  <span className="font-mono text-[10px] text-neutral-500">ACTIVE PROJECTS SHOWCASE</span>
                  <div className="font-sans font-extrabold text-3xl text-indigo-400 mt-2">{projects.length} CASE STUDIES</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-4">Loaded instantly on client side</div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950 border border-white/5">
                  <span className="font-mono text-[10px] text-neutral-500">TECHNICAL SKILLS TRACKED</span>
                  <div className="font-sans font-extrabold text-3xl text-amber-500 mt-2">{skills.length} COMPETENCIES</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-4">Categorized matrices layout</div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950 border border-white/5">
                  <span className="font-mono text-[10px] text-neutral-500">VERIFIED CERTIFICATIONS</span>
                  <div className="font-sans font-extrabold text-3xl text-emerald-400 mt-2">{certifications.length} BADGES</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-4">Corporate & cloud credentials</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-950/60 border border-white/5">
                <h3 className="font-sans font-bold text-lg text-white mb-4 flex items-center gap-1.5">
                  <Inbox className="w-5 h-5 text-teal-400" />
                  Recent Inbox Inquiries Activity
                </h3>
                <div className="space-y-3.5">
                  {contacts.slice(0, 3).map(c => (
                    <div key={c.id} className="p-4 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{c.name} ({c.email})</div>
                        <div className="text-neutral-400 mt-1">{c.subject}</div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="text-center py-6 text-neutral-500 text-xs font-mono">No new messages in inbox.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS CRUD */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-lg text-white">Portfolio Projects</h3>
                <button
                  onClick={() => openCreateModal('project')}
                  className="px-4 py-2 bg-teal-500 hover:brightness-115 text-[#0B0F19] text-xs font-extrabold font-mono rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  ADD NEW PROJECT
                </button>
              </div>

              <div className="space-y-3">
                {projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/10 shrink-0 overflow-hidden">
                        <img src={p.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate text-sm md:text-base">{p.title}</div>
                        <div className="font-mono text-[10px] text-teal-400 mt-1 uppercase">{p.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2shrink-0">
                      <button
                        onClick={() => openEditModal('project', p)}
                        className="p-2 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('project', p.id)}
                        className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS CRUD */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-lg text-white">Visual Skills</h3>
                <button
                  onClick={() => openCreateModal('skill')}
                  className="px-4 py-2 bg-teal-500 hover:brightness-115 text-[#0B0F19] text-xs font-extrabold font-mono rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  ADD NEW SKILL
                </button>
              </div>

              <div className="space-y-3">
                {skills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
                  <div key={s.id} className="p-4 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">{s.name}</div>
                      <div className="font-mono text-[10px] text-teal-400 mt-1 uppercase">{s.category} ({s.level}%)</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal('skill', s)}
                        className="p-2 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('skill', s.id)}
                        className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCE CRUD */}
          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-lg text-white">Experience Timeline Entries</h3>
                <button
                  onClick={() => openCreateModal('experience')}
                  className="px-4 py-2 bg-teal-500 hover:brightness-115 text-[#0B0F19] text-xs font-extrabold font-mono rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  ADD NEW TIMELINE
                </button>
              </div>

              <div className="space-y-3">
                {experiences.filter(e => e.role.toLowerCase().includes(searchQuery.toLowerCase()) || e.company.toLowerCase().includes(searchQuery.toLowerCase())).map(e => (
                  <div key={e.id} className="p-4 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">{e.role}</div>
                      <div className="font-mono text-[10px] text-teal-400 mt-1 uppercase">{e.company} ({e.duration})</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal('experience', e)}
                        className="p-2 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('experience', e.id)}
                        className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS CRUD */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-lg text-white">Professional Certifications</h3>
                <button
                  onClick={() => openCreateModal('certification')}
                  className="px-4 py-2 bg-teal-500 hover:brightness-115 text-[#0B0F19] text-xs font-extrabold font-mono rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  ADD NEW CERTIFICATE
                </button>
              </div>

              <div className="space-y-3">
                {certifications.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                  <div key={c.id} className="p-4 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">{c.title}</div>
                      <div className="font-mono text-[10px] text-teal-400 mt-1 uppercase">{c.issuer} ({c.date})</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal('certification', c)}
                        className="p-2 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('certification', c.id)}
                        className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACTS INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-sans font-bold text-lg text-white">Customer Inquiries Inbox</h3>

              <div className="space-y-4">
                {contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.subject.toLowerCase().includes(searchQuery.toLowerCase())).map(c => (
                  <div key={c.id} className={`p-5 rounded-xl border flex flex-col gap-3 ${
                    c.read ? 'bg-neutral-950/60 border-white/5' : 'bg-neutral-950 border-teal-500/20 shadow-md shadow-teal-500/2'
                  }`}>
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-white/5 pb-2">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <Mail className="w-4 h-4 text-teal-400" />
                          <span>{c.name}</span>
                          {!c.read && (
                            <span className="text-[8px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 px-1.5 py-0.5 rounded">NEW</span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-500 font-mono italic">{c.email}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-sm text-neutral-300 mb-1">Subject: {c.subject}</h4>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-sans bg-neutral-900 p-4 rounded-xl border border-white/5">{c.message}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {!c.read && (
                        <button
                          onClick={() => handleMarkContactAsRead(c.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:brightness-110 text-[#0B0F19] text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>MARK READ</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>REMOVE</span>
                      </button>
                    </div>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="text-center py-16 border border-dashed border-neutral-800 rounded-2xl text-neutral-500 text-xs font-mono">
                    Inbox empty. No inquiries stored in database.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-sans font-bold text-lg text-white">System Settings</h3>
              <p className="text-xs md:text-sm text-neutral-400">Database & access management controls</p>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-white/5 space-y-4">
                <span className="text-xs font-mono text-teal-400">DATABASE STATUS ACTIONS</span>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  The system relies on a high performance Server Side JSON disk ledger. It simulates a relational database perfectly and provides absolute resilience. If you modify any items inside this console, they are saved permanently on disk across dev server reboots.
                </p>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block mb-2">Authenticated User Admin:</span>
                  <div className="font-mono text-xs text-white">👤 {email || 'System Admin Override'} (Status: Verified Secure Key)</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL LIGHTBOX FOR CREATE / EDIT FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-white/10 p-6 md:p-8 rounded-2xl relative flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-sans font-bold text-lg text-white">
                {editingItem ? 'Edit' : 'Create'} {modalType.toUpperCase()} Record
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {/* Project elements fields */}
              {modalType === 'project' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Project Title</label>
                    <input type="text" value={projForm.title} onChange={e => setProjForm({ ...projForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Description</label>
                    <textarea value={projForm.description} onChange={e => setProjForm({ ...projForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" rows={3} required />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Tech Stack (comma separated)</label>
                    <input type="text" value={projForm.techStack} onChange={e => setProjForm({ ...projForm, techStack: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Category Filter</label>
                      <select value={projForm.category} onChange={e => setProjForm({ ...projForm, category: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 text-white text-sm focus:outline-none">
                        <option value="React">React</option>
                        <option value="Next.js">Next.js</option>
                        <option value="Node.js">Node.js</option>
                        <option value="CRM">CRM</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Image URL</label>
                      <input type="text" value={projForm.imageUrl} onChange={e => setProjForm({ ...projForm, imageUrl: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Repository link (GitHub)</label>
                      <input type="text" value={projForm.githubUrl} onChange={e => setProjForm({ ...projForm, githubUrl: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Live Demo URL</label>
                      <input type="text" value={projForm.liveUrl} onChange={e => setProjForm({ ...projForm, liveUrl: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={projForm.featured} onChange={e => setProjForm({ ...projForm, featured: e.target.checked })} />
                    <label htmlFor="featured" className="text-xs font-mono text-neutral-400 select-none">Mark as Featured Showcase</label>
                  </div>
                </div>
              )}

              {/* Skills elements fields */}
              {modalType === 'skill' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Skill Name</label>
                    <input type="text" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Category</label>
                      <select value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value as any })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 text-white text-sm focus:outline-none">
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Cloud & Network">Cloud & Network</option>
                        <option value="Tools & DevOps">Tools & DevOps</option>
                        <option value="GenAI">GenAI</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Competency Level ({skillForm.level}%)</label>
                      <input type="range" min="0" max="100" value={skillForm.level} onChange={e => setSkillForm({ ...skillForm, level: Number(e.target.value) })} className="w-full accent-teal-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Experience elements fields */}
              {modalType === 'experience' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Role Title</label>
                      <input type="text" value={expForm.role} onChange={e => setExpForm({ ...expForm, role: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Company Name</label>
                      <input type="text" value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Duration (e.g. 2024 - Present)</label>
                    <input type="text" value={expForm.duration} onChange={e => setExpForm({ ...expForm, duration: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Accomplishment Items (one per line)</label>
                    <textarea value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" rows={4} required placeholder="Designed end-to-end setups..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="current" checked={expForm.current} onChange={e => setExpForm({ ...expForm, current: e.target.checked })} />
                    <label htmlFor="current" className="text-xs font-mono text-neutral-400 select-none">Active Position</label>
                  </div>
                </div>
              )}

              {/* Certification elements fields */}
              {modalType === 'certification' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Certification Title</label>
                    <input type="text" value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Issuer</label>
                      <input type="text" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-2">Date (e.g. Dec 2024)</label>
                      <input type="text" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-2">Credential URL</label>
                    <input type="text" value={certForm.credentialUrl} onChange={e => setCertForm({ ...certForm, credentialUrl: e.target.value })} className="w-full px-4 py-2.5 rounded bg-neutral-950 border border-white/5 focus:border-teal-400 focus:outline-none text-white text-sm" placeholder="https://..." />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 hover:bg-neutral-800 text-neutral-400 text-xs font-mono rounded">CANCEL</button>
                <button type="submit" className="px-5 py-2 bg-teal-500 text-[#0B0F19] text-xs font-mono font-bold rounded">SAVE RECORD</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
