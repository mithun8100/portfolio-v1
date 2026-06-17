import { Certification } from '../types';
import { Award, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section
      id="certifications"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
            Professional Accents
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
            Certificates & Badges
          </h2>
          <p className="mt-4 text-sm text-neutral-400 light:text-neutral-600 leading-relaxed">
            Verified corporate achievements proving Mithun&apos;s commitment to advanced software concepts, cloud paradigms, and system optimizations.
          </p>
        </div>

        {/* Certificate Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="relative overflow-hidden group rounded-2xl p-6 bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/20 light:hover:border-teal-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 light:bg-teal-500/5 border border-teal-500/20 text-teal-400 group-hover:rotate-6 transition-transform">
                    <Award className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 font-bold whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base md:text-lg text-white light:text-neutral-900 mb-1 group-hover:text-teal-400 transition-colors">
                  {cert.title}
                </h3>
                <span className="font-mono text-[11px] text-indigo-400 light:text-indigo-600 font-semibold uppercase">
                  Issued by: {cert.issuer}
                </span>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                  <ShieldAlert className="w-3.5 h-3.5 text-teal-500/50" />
                  <span>AUTHENTICATED RECORD</span>
                </div>
                
                {cert.credentialUrl && cert.credentialUrl !== '#' && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-neutral-950 light:bg-slate-100 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
