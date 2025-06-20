import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

  const brandName = getComputedStyle(root).getPropertyValue('--brand-name')

const Footer = () => {
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    return (

        <footer className="relative mt-24 px-6 md:px-20 py-12 bg-black/80 backdrop-blur-lg border-t border-white/10 text-gray-300">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

                {/* Left */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-semibold text-white">{brandName}</h2>
                    <p className="mt-3 text-base text-gray-400">
                        Your creative playground to sketch, shape, and share thoughts that stick.
                    </p>
                </div>

                {/* Center - Nav & Social */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-6 text-xl">
                        <a href="https://github.com/developer-amarjeetBaraik" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com/in/amarjeet-chik-baraik" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            <FaLinkedin />
                        </a>
                        <a href="https://instagram.com/amarjeet_baraik_" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            <FaInstagram />
                        </a>
                    </div>
                    <div className="flex flex-col text-sm gap-1 mt-3">
                        <NavLink to={'/privacy-policy'} className="hover:text-white">Privacy Policy</NavLink>
                        <NavLink to={'/terms-and-conditions'} className="hover:text-white">Terms of Service</NavLink>
                        <NavLink to={'mailto:amarjeetofficial81@gmail.com'} className="hover:text-white">Contact</NavLink>
                        {/* <a href="/privacy" className="hover:text-white">Privacy Policy</a> */}
                        {/* <a href="/terms" className="hover:text-white">Terms of Service</a> */}
                        {/* <a href="mailto:amarjeetofficial81@gmail.com" className="hover:text-white">Contact</a> */}
                    </div>
                </div>

                {/* Right - Quote */}
                <div className="text-center md:text-right">
                    <p className="italic text-base text-gray-300">
                        “Every masterpiece starts with a messy sketch.”
                    </p>
                    <p className="text-sm mt-3 text-gray-500">Drawn with ☕ + 😴 + 💡 at 3:00 AM!</p>
                </div>

            </div>

            {/* Bottom Line */}
            <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} {brandName}. All rights reserved.
            </div>

            {/* Back to Top Button */}
            <button
                onClick={handleScrollTop}
                className="absolute right-6 bottom-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-lg transition shadow-md"
                aria-label="Back to top"
            >
                <FaArrowUp />
            </button>
            {/* for smooth scrolling */}
            <ScrollToTop/>
        </footer>

    )
}

export default Footer
