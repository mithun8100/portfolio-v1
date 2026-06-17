import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const addHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Scan briefly for hover elements
    const interval = setInterval(addHoverEvents, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Target Tracker ring */}
      <div
        id="cursor-dot-follower"
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-teal-500/60 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out z-50 hidden md:block ${
          hovered ? 'scale-150 md:bg-teal-500/10 md:border-teal-400' : 'scale-100'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Tiny active core pinpoint */}
      <div
        id="cursor-dot-center"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-teal-400 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
