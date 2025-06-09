import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';

const colors = {
  primary: '#6366f1', // indigo-500
  primaryLight: '#8b5cf6', // violet-500
  accent: '#06b6d4', // cyan-500
  accentLight: '#0ea5e9', // sky-500
  background: '#0f172a', // slate-900
  surface: '#1e293b', // slate-800
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
};


const CallToActionSection = () => {
  const ctaButtonRef = useRef()
  
  const handleCtaButtonMousemove = (e) => {
    const rect = ctaButtonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    ctaButtonRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #f093fb 0%, #f5576c 50%, #c44569 100%)`;
  }
  const handleCtaButtonMouseleave = (e) => {
    ctaButtonRef.current.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  }


  return (
    <section className="relative z-10 px-4 py-10 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="p-12 bg-glass border-glassBorder rounded-3xl border backdrop-blur-md"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to sketch your next big idea?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Jump in and start drawing
          </p>
          <NavLink id='ctaButton' ref={ctaButtonRef} onMouseMove={handleCtaButtonMousemove} onMouseLeave={handleCtaButtonMouseleave} className={`bg-linear-135 from-secondaryLight to-secondary text-white py-[1rem] px-[2rem] text-[1.1rem] rounded-[12px] inline-block font-semibold transition-all duration-2000 ease-[ease] relative overflow-hidden hover:transform -translate-y-[3px] shadow-[0_15px_30px_rgba(240,147,251,0.4)]`}
          >
            Launch Canvas →
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
