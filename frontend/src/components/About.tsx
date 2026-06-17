import { Briefcase, FolderGit2, CheckCircle, Award, Terminal } from 'lucide-react';

export default function About() {
  const stats = [
    {
      id: 1,
      name: 'Active Experience',
      value: '2+ Years',
      desc: 'Hands-on enterprise engineering, focused on Core Java backend & RESTful APIs.',
      icon: Briefcase,
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 2,
      name: 'Dynamic Projects Completed',
      value: '10+ Builds',
      desc: 'Robust backend systems, high throughput API services, and cloud infrastructure prototypes.',
      icon: FolderGit2,
      color: 'from-teal-400 to-emerald-500'
    },
    {
      id: 3,
      name: 'Cloud Solutions Deployed',
      value: '5+ Clusters',
      desc: 'Multi-AZ 3-tier scalable architectures matching secure AWS pipelines.',
      icon: CheckCircle,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 4,
      name: 'Verified Credentials',
      value: '2 Badges',
      desc: 'Professional certificates across AWS cloud platforms and Core Java development.',
      icon: Award,
      color: 'from-violet-400 to-fuchsia-500'
    }
  ];

  return (
    <section
      id="about"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Sections Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
              Who Is Mithun
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
              Engineering with <br />Passion and Accuracy
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 light:text-neutral-600 text-sm md:text-base leading-relaxed">
            I build secure backend systems designed to drive efficiency, streamline operations, and scale on the cloud. Specializing in Core Java architectures and AWS infrastructure.
          </p>
        </div>

        {/* Bio Terminal Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 light:from-white light:to-slate-100/30 border border-white/5 light:border-slate-200">
            <div>
              <Terminal className="w-8 h-8 text-teal-400 mb-6" />
              <h3 className="font-sans font-bold text-xl md:text-2xl text-white light:text-neutral-900 mb-4">
                Backend Architecture & Cloud Solutions
              </h3>
              <p className="text-neutral-400 light:text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
                With over 2 years of experience as a Software Developer, I have specialized in uniting Core Java backend logic with secure AWS cloud environments.
              </p>
              <p className="text-neutral-400 light:text-neutral-600 text-sm md:text-base leading-relaxed">
                I do not just write code; I design systems. Whether launching Multi-AZ 3-tier architectures on AWS, or creating robust RESTful APIs using Node.js and Struts, I ensure robust uptime and high-performance data processing.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 light:border-slate-200 flex flex-wrap gap-4 items-center">
              <span className="text-xs font-mono text-neutral-500">MITHUN_CORE_ENGINE:</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">Backend Protocol</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">AWS Solutions</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-teal-500/10 via-indigo-500/10 to-transparent p-1 rounded-2xl">
            <div className="h-full relative overflow-hidden rounded-2xl bg-neutral-900/90 light:bg-white p-8 border border-white/5 light:border-slate-100 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-teal-400">STATUS_SYSTEM: LIVE</span>
                <h4 className="font-sans font-bold text-lg text-white light:text-neutral-900 mt-2 mb-4">Core Strengths</h4>
                <ul className="space-y-3">
                  {[
                    'Core Java & Struts Framework',
                    'Asynchronous Node.js REST endpoints',
                    'AWS VPC, ALB & RDS configurations',
                    'MySQL Database Optimization',
                    'CI/CD concepts & Docker basics',
                    'React.js Frontend Components'
                  ].map((strength, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-neutral-400 light:text-neutral-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 p-4 rounded-xl bg-teal-500/5 border border-teal-500/15 text-center">
                <p className="text-xs text-neutral-400 light:text-neutral-600 leading-normal">
                  💎 <strong>Portfolio philosophy:</strong> Keep visual designs pristine, and ensure full fallback reliability even if cloud paths fails.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic metrics / Glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl p-6 bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/20 light:hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/2 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Abs hover glow background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-[0.02] group-hover:opacity-[0.06] rounded-full blur-2xl transition-opacity duration-300" />
              
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-neutral-500">
                  {stat.name}
                </span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-[#0B0F19] md:group-hover:rotate-[360deg] duration-500`}>
                  <stat.icon className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="font-sans font-extrabold text-3xl text-white light:text-neutral-900 tracking-tight mb-2">
                {stat.value}
              </div>

              <p className="text-xs md:text-sm text-neutral-400 light:text-neutral-600 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
