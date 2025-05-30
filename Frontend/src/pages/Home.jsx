import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Star, ArrowRight, Users, Zap, Shield } from 'lucide-react';
import Navbar from '../components/Navbar'
import BackgroundSpheres from '../components/BackgroundSpheres';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';

const Home = () => {
  
  // const { isLoading, isAuthenticated, user } = useAuth0()
  
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

  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // if (isLoading) {
  //   return <h3>Loading...</h3>
  // }

  return (
    // <div>
    //   <Navbar />
    //   {isAuthenticated ? <>
    //     {console.log(user)}
    //     <h3>Hello {user.given_name}</h3>
    //     <img src={user.picture} alt="Profile image" />
    //   </> : <>
    //     <h3>User unauthenticated</h3>
    //   </>}

    // </div>
    <div className="min-h-screen text-white overflow-hidden relative" style={{ backgroundColor: colors.background }}>
      {/* Animated Background Spheres */}
      <BackgroundSpheres mousePosition={mousePosition} />

      {/* Navigation */}
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Home
