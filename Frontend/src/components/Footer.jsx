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

const Footer = () => {
    return (
        <footer className="relative z-10 px-4 py-12 mt-20 text-white">
            <div
                className="max-w-7xl mx-auto border-t pt-12"
                style={{ borderColor: colors.glassBorder }}
            >
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: colors.primary }}
                            >
                                <Star className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">ModernUI</span>
                        </div>
                        <p className="text-gray-400">
                            Building the future of web development, one component at a time.
                        </p>
                    </div>

                    {['Product', 'Company', 'Support'].map((section) => (
                        <div key={section}>
                            <h3 className="font-semibold mb-4">{section}</h3>
                            <div className="space-y-2">
                                {['Features', 'Pricing', 'Documentation', 'API'].map((item) => (
                                    <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="flex flex-col md:flex-row justify-between items-center pt-8 border-t"
                    style={{ borderColor: colors.glassBorder }}
                >
                    <p className="text-gray-400">© 2025 ModernUI. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
