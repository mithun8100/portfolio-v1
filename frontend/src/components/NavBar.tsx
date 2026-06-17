import { useState, useEffect } from 'react';
import { Sun, Moon, Database, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavBarProps {
  onAdminClick: () => void;
  isAdminMode: boolean;
}

export default function NavBar({ onAdminClick }: NavBarProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check local storage preference
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('light', saved === 'light');
    } else {
      document.documentElement.classList.remove('light');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-900/80 light:bg-slate-50/80 border-b border-white/5 light:border-slate-200/50 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-sans font-bold text-xl tracking-tight text-white light:text-neutral-900 duration-200 focus:outline-none flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center font-extrabold text-[#0B0F19] text-sm group-hover:rotate-6 transition-transform">
            M
          </span>
          Mithun<span className="text-teal-400">.dev</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {['about', 'skills', 'experience', 'projects', 'services', 'contact'].map((sect) => (
            <button
              key={sect}
              onClick={() => scrollToSection(sect)}
              className="font-sans font-medium text-sm text-neutral-400 light:text-neutral-600 hover:text-white light:hover:text-neutral-900 transition-colors capitalize focus:outline-none cursor-pointer"
            >
              {sect}
            </button>
          ))}
        </nav>

        {/* Action controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-neutral-800/60 light:bg-slate-100 border border-white/5 light:border-slate-200 text-neutral-300 light:text-neutral-600 hover:text-teal-400 light:hover:text-teal-500 transition-colors cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onAdminClick}
            className="flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 cursor-pointer bg-neutral-800/40 light:bg-slate-100 text-neutral-300 light:text-neutral-700 border-white/10 light:border-slate-200 hover:bg-neutral-800 light:hover:bg-slate-200/50"
          >
            <Database className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-neutral-800/60 light:bg-slate-100 text-neutral-300 light:text-neutral-600 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-800/60 light:bg-slate-100 text-neutral-300 light:text-neutral-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[57px] left-0 w-full h-[calc(100vh-57px)] bg-neutral-950 light:bg-white z-35 flex flex-col p-6 border-t border-white/5 light:border-slate-200 animate-slide-down">
          <div className="flex flex-col gap-6 py-4 flex-grow">
            {['about', 'skills', 'experience', 'projects', 'services', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToSection(sect)}
                className="font-sans font-semibold text-lg text-left text-neutral-400 light:text-neutral-600 hover:text-white light:hover:text-neutral-900 border-b border-white/5 pb-2"
              >
                {sect}
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 py-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-indigo-600 text-white"
            >
              <Database className="w-4 h-4" />
              Workspace Admin Area
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
