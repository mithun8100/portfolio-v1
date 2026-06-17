import { useEffect, useState } from 'react';
import { ArrowDownRight, Sparkles, Download, CheckCircle } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [copied, setCopied] = useState(false);
  const phrase = 'Software Developer | Core Java & REST API Specialist | AWS Cloud Architect';
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + phrase.charAt(index));
      index++;
      if (index >= phrase.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    // Generate a beautiful mock, dynamic PDF resume download experience
    const mockResumeContent = `
MITHUN - SOFTWARE DEVELOPER PORTFOLIO
Email: mithunhp1212@gmail.com
Status: Active, Available for Direct Hire / Projects

--- PROFESSIONAL EXPERIENCES ---
Nitmid Electronics (2024 - Present): Software Developer
MSB Data Analytics (2023 - 2024): Software Engineer Trainee

--- TECHNICAL FOCUS AREA ---
Core Java, REST API, Node.js, AWS (EC2, S3, RDS), MySQL, Struts, JavaScript, Bootstrap 5.
    `;
    const blob = new Blob([mockResumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mithun_Resume_Portfolio.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 bg-neutral-950 light:bg-slate-50"
    >
      {/* Dynamic Animated Abstract Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Futuristic Grid */}
        <div className="absolute inset-0 opacity-[0.03] light:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Floating Glowing Spheres */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-teal-500/10 light:bg-teal-500/5 blur-[80px] animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 light:bg-indigo-600/5 blur-[100px] animate-pulse duration-[9000ms]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-violet-600/10 light:bg-violet-600/5 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Floating Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 light:bg-teal-500/5 border border-teal-500/20 text-teal-400 light:text-teal-600 text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 animate-spin duration-[4000ms]" />
          <span>Available for Freelance & Full-time Hirings</span>
        </div>

        {/* High-Fidelity Handcrafted Name Reveal */}
        <p className="text-blue-500 font-mono text-sm tracking-tighter mb-4">// SOFTWARE DEVELOPER</p>
        <h1 className="font-sans font-black text-6xl md:text-[100px] leading-[0.85] tracking-tighter text-white light:text-neutral-900 mb-6 uppercase italic">
          Mithun<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">
            Portfolio
          </span>
        </h1>

        <h2 className="font-sans font-extrabold text-xl md:text-[22px] tracking-widest text-neutral-400 light:text-neutral-500 uppercase mb-8">
          CORE JAVA & CLOUD ARCHITECTURE
        </h2>

        {/* Inline Live Typing Stream */}
        <div className="min-h-[40px] mb-8 font-mono text-xs md:text-sm text-neutral-400 light:text-neutral-500 tracking-wider">
          <span className="text-teal-400">&gt; </span>
          {typedText}
          <span className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-pulse" />
        </div>

        {/* Core Technologies Badges */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-2xl mx-auto mb-12">
          {['Java (Core)', 'REST API', 'AWS (EC2/S3)', 'SQL', 'Node.js', 'React.js', 'Struts', 'Bootstrap 5'].map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-md bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 text-neutral-300 light:text-neutral-700 hover:border-teal-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-emerald-600 text-[#0B0F19] hover:brightness-110 active:scale-[0.98] transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Hire Mithun</span>
            <ArrowDownRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-neutral-900/60 light:bg-white text-white light:text-neutral-800 border border-white/10 light:border-slate-200 hover:bg-neutral-900 light:hover:bg-slate-100/50 active:scale-[0.98] transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400">CV Saved!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Resume CV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Decorative Slide-down Trigger */}
      <button
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-white duration-150 focus:outline-none cursor-pointer"
        aria-label="Scroll downwards"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">DISCOVER MITHUN</span>
        <div className="w-5 h-9 rounded-full border border-neutral-700 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" />
        </div>
      </button>
    </section>
  );
}
