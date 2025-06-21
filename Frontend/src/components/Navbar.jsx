import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logoImage from '../assets/your-board-logo.png'
import { useContext } from 'react';
import { userAuthContext } from '../../store/UserAuthStore';
import LoadingSkeleton from '../utils/LoadingSkeleton';

const Navbar = () => {
  const { user, authenticated, isLoading, logout } = useContext(userAuthContext)
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false)


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
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
      ? 'backdrop-blur-md border-b'
      : ''
      } ${isScrolled ? 'bg-glass' : 'bg-transparent'} ${isScrolled ? 'border-classBorder' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <NavLink to={'/'} className="flex items-center space-x-2 cursor-pointer border-none">
            <img src={logoImage} alt="" className='w-16 cursor-pointer' />
          </NavLink>

          {/* Navigation tab */}
          <div className="flex items-center justify-end space-x-8 md:gap-20">
            {/* Navigation links */}
            <div className="navLinks flex items-center gap-3 md:gap-20">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`text-gray-300 hover:text-white transition-colors duration-200 relative group`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full `}
                  />
                </NavLink>
              ))}

              {authenticated ? <NavLink to={'/dashboard'} className={`text-gray-300 hover:text-white transition-colors duration-200 relative group`}>Dashboard
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full `}
                />
              </NavLink> : null}
            </div>

            {/* Action Buttons */}
            {
              isLoading ? <LoadingSkeleton height={40} width={150} marginLeft={8} /> : <>
                {
                  authenticated ? <>
                    {/* profile button */}
                    <div className='relative ml-2 w-10 h-10 rounded-[50%] cursor-pointer md:ml-0'>
                      <span className='w-full h-full block bg-glass rounded-[50%] border-[1px] border-white text-center content-center text-2xl' onClick={() => setProfileOpen(!profileOpen)}>
                        {(user.picture) ? <img src={`${user.picture}`} alt=""  className='w-full h-full rounded-[50%]' />:<p>{user.first_name?.charAt(0).toUpperCase()}</p>}
                      </span>
                      {
                        profileOpen ? <>
                          <div className='absolute -right-1 mt-1 p-2 rounded-sm w-[250px] min-h-30 flex flex-col gap-1 text-[14px] overflow-hidden bg-glass backdrop-blur-md border cursor-default'>
                            <p>{`User id: ${user.id}`}</p>
                            <p>{`Name: ${user.first_name}`}</p>
                            <p>{`Email: ${user.email}`}</p>
                            <button className='bg-red-400 cursor-pointer' onClick={() => logout()}>Logout</button>
                          </div>
                        </> : null
                      }

                    </div>
                  </> : <>
                    {/* login and signup */}
                    <div className="flex items-center space-x-4 ">
                      <NavLink to={'/auth/login'} className="px-3 py-2 rounded-xl font-medium bg-linear-135 from-primary to-primaryLight transition-all duration-300 hover:scale-105 text-white">
                        Login
                      </NavLink>
                      {/* <NavLink
                        className="px-3 py-2 rounded-xl font-medium bg-linear-135 from-primary to-primaryLight transition-all duration-300 hover:scale-105 text-white"
                      >
                        Get Started
                      </NavLink> */}
                    </div>
                  </>
                }
              </>
            }



          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

