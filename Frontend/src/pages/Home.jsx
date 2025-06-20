import React, { useEffect, useState } from 'react'
import {Toaster} from 'sonner'
import Navbar from '../components/Navbar'
import BackgroundSpheres from '../components/BackgroundSpheres';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import DeveloperSays from '../components/DeveloperSays';
import LoadingSkeleton from '../utils/LoadingSkeleton';


const Home = () => {
  document.title = 'Drawwify'

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };


    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen text-white bg-background">
      {/* Animated Background Spheres */}
      <BackgroundSpheres mousePosition={mousePosition} />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CallToActionSection />

      {/* Developer says */}
      <DeveloperSays />

      {/* Footer */}
      <Footer />

      <Toaster/>

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
