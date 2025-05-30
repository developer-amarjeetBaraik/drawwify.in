import React from 'react'

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
  return (
     <section className="relative z-10 px-4 py-20 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div 
          className="p-12 rounded-3xl border backdrop-blur-md"
          style={{ 
            backgroundColor: colors.glass,
            borderColor: colors.glassBorder
          }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already building amazing applications with our platform
          </p>
          <button 
            className="px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            }}
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
