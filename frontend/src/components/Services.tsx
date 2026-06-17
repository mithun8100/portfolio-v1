import { useState } from 'react';
import { STATIC_SERVICES } from '../data/staticData';
import { ShieldCheck, ArrowRight, Layers, HelpCircle } from 'lucide-react';

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  if (!STATIC_SERVICES || STATIC_SERVICES.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
              Services Offered
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
              Solutions Configured <br />for Modern Businesses
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 light:text-neutral-600 text-sm md:text-base leading-relaxed">
            I offer reliable development loops and seamless business automation lines configured securely on scalable cloud architectures.
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATIC_SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="group relative overflow-hidden rounded-2xl p-6 bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/20 light:hover:border-teal-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              onClick={() => setActiveService(activeService === serv.id ? null : serv.id)}
            >
              <div>
                {/* Visual Category icons */}
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 light:bg-teal-500/5 flex items-center justify-center border border-teal-500/20 text-teal-400 mb-6 group-hover:scale-110 duration-300">
                  <Layers className="w-5 h-5" />
                </div>

                <h3 className="font-sans font-bold text-lg text-white light:text-neutral-900 mb-3 group-hover:text-teal-400 transition-colors">
                  {serv.title}
                </h3>

                <p className="text-xs md:text-sm text-neutral-400 light:text-neutral-600 leading-relaxed mb-6">
                  {serv.description}
                </p>
              </div>

              {/* Toggle specs */}
              <div className="border-t border-white/5 pt-4 mt-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-teal-400 font-bold group-hover:underline">
                  <span>{activeService === serv.id ? 'HIDE DETAIL LIST' : 'VIEW SERVICES SPECS'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transform transition-transform ${activeService === serv.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </div>

                {/* Expanding technical details scope */}
                {activeService === serv.id && (
                  <ul className="mt-4 space-y-2.5 animate-slide-down">
                    {serv.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-neutral-400 light:text-neutral-700">
                        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
