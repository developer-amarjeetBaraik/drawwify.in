import React from 'react'
import { Star, ArrowRight, Users, Zap, Shield } from 'lucide-react';


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

// Features Component
const features = [
    {
        icon: <Zap className="w-8 h-8" style={{ color: colors.primary }} />,
        title: 'Lightning Fast',
        description: 'Optimized performance with cutting-edge technology for seamless user experience.'
    },
    {
        icon: <Shield className="w-8 h-8" style={{ color: colors.accent }} />,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security with 99.9% uptime guarantee for peace of mind.'
    },
    {
        icon: <Users className="w-8 h-8" style={{ color: colors.primaryLight }} />,
        title: 'Team Collaboration',
        description: 'Built for teams with real-time collaboration and seamless workflow integration.'
    }
];

const FeaturesSection = () => {
    return (
        <section className="relative z-10 px-4 py-20 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover the features that make our platform the choice of industry leaders
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            style={{
                                backgroundColor: colors.glass,
                                borderColor: colors.glassBorder
                            }}
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection
