import { useState, useEffect } from 'react';
import { STATIC_TESTIMONIALS } from '../data/staticData';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (STATIC_TESTIMONIALS.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATIC_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!STATIC_TESTIMONIALS || STATIC_TESTIMONIALS.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + STATIC_TESTIMONIALS.length) % STATIC_TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % STATIC_TESTIMONIALS.length);
  };

  const current = STATIC_TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
            Client Endorsements
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
            Trusted by Innovators
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200 hover:border-teal-500/10 transition-colors duration-300 max-w-4xl mx-auto">
          {/* Glowing particle dots */}
          <div className="absolute top-8 right-8 text-neutral-800 pointer-events-none opacity-20">
            <Quote className="w-16 h-16" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Visual avatar frame */}
            <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-teal-500/20 shadow-xl shadow-teal-500/5 bg-neutral-950">
              <img
                src={current.avatarUrl}
                alt={current.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* Star Rating icons */}
              <div className="flex items-center justify-center md:justify-start gap-1 pb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Feed quote */}
              <p className="font-sans italic text-base md:text-[18px] text-neutral-200 light:text-neutral-800 leading-relaxed mb-6">
                &quot;{current.text}&quot;
              </p>

              <div>
                <h4 className="font-sans font-bold text-lg text-white light:text-neutral-900">
                  {current.name}
                </h4>
                <span className="font-mono text-xs text-teal-400 light:text-teal-600">
                  {current.position}, {current.company}
                </span>
              </div>
            </div>
          </div>

          {/* Nav Controls buttons */}
          <div className="flex items-center justify-center md:justify-end gap-3 border-t border-white/5 pt-6 mt-8">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white transition-all cursor-pointer"
              aria-label="Previous quote feedback"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white transition-all cursor-pointer"
              aria-label="Next quote feedback"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
