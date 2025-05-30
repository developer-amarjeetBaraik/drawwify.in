import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading, logout } = useAuth0()
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // Navbar Component
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/' },
    { name: 'Contact', path: '/' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
      ? 'backdrop-blur-md border-b'
      : ''
      } ${isScrolled ? 'bg-glass' : 'bg-transparent'} ${isScrolled ? 'border-classBorder' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="./your-board-logo.png" alt="" className='w-16 cursor-pointer' />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-end space-x-8">
            <div className="navLinks flex items-center gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors duration-200 relative group "
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full `}
                  />
                </NavLink>
              ))}

              {isAuthenticated ? <NavLink to={'/dashboard'} className="text-gray-300 hover:text-white transition-colors duration-200 relative group">Dashboard
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full `}
                />
              </NavLink> : null}
            </div>

            {/* Action Buttons */}
            {
              isAuthenticated ? <>
                <div className='relative ml-2 w-10 h-10 rounded-[50%] cursor-pointer'>
                  <img src={user.picture} alt="" className='w-full rounded-[50%]' onClick={() => setProfileOpen(!profileOpen)} />
                  {
                    profileOpen ? <>
                      <div className='absolute -right-1 mt-1 p-2 rounded-sm w-30 min-h-20 flex flex-col text-[12px] overflow-hidden bg-glass backdrop-blur-md border'>
                        <NavLink>{user.given_name}</NavLink>
                        <NavLink>{user.email}</NavLink>
                        <NavLink>is verified: {user.email_verified ? 'True' : 'False'}</NavLink>
                        <button className='bg-red-400' onClick={() => logout()}>Logout</button>
                      </div>
                    </> : null
                  }

                </div>
              </> : <>
                <div className="flex items-center space-x-4">
                  <NavLink onClick={() => loginWithRedirect()} className=" text-center text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2">
                    Login
                  </NavLink>
                  <NavLink
                    className="px-3 py-2 rounded-xl font-medium bg-linear-135 from-primary to-primaryLight transition-all duration-300 hover:scale-105 text-white"
                  >
                    Get Started
                  </NavLink>
                </div>
              </>
            }

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

