import React from 'react'

  // Color variables - easily customizable
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

const BackgroundSpheres = ({mousePosition}) => {
    return (
        <div className="fixed inset-0 pointer-events-none">
            <div
                className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
                style={{
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
                    top: '10%',
                    left: '10%',
                    animation: 'float 6s ease-in-out infinite'
                }}
            />
            <div
                className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
                style={{
                    background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accentLight})`,
                    top: '60%',
                    right: '10%',
                    animation: 'float 8s ease-in-out infinite reverse'
                }}
            />
            <div
                className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
                style={{
                    background: `linear-gradient(225deg, ${colors.accent}, ${colors.primary})`,
                    bottom: '10%',
                    left: '30%',
                    animation: 'float 7s ease-in-out infinite'
                }}
            />
            {/* Mouse follower sphere */}
            <div
                className="absolute w-32 h-32 rounded-full opacity-5 blur-2xl transition-all duration-1000 ease-out pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${colors.primaryLight}, transparent)`,
                    left: mousePosition.x - 64,
                    top: mousePosition.y - 64,
                }}
            />
        </div>
    )
}

export default BackgroundSpheres
