import React, { useState } from 'react'
import { GiExitDoor } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const navs = [
    {
        name: 'add item', route: 'add-item'
    },
    {
        name: 'menu items', route: 'menu-items'
    },
    {
        name: 'orders', route: 'all-orders'
    },
]

const AdminSidenav = () => {
    const { setIsLoggedIn, setUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    // const [isLoading, setIsLoading] = useState()

    const handleLogout = async () => {
        // setIsLoading(false)
        console.log('click')

        try {
            const response = await axios.post('https://diadem-backend.vercel.app/auth/logout', {}, {
                withCredentials: true, // To allow session cookies to be sent
            });
            if(response.data.success) {
                toast.success('Logout successful')
                setIsLoggedIn(false)
                setUser(null)
                navigate('/diadem/login')
            }
        } catch (error) {
            console.error('error:', error)
        }
    }

    const toggleNav = () => {
        setIsOpen(!isOpen);
      };

    return (
        <>
          {/* Hamburger icon to toggle side nav in mobile view */}
          <div className="lg:hidden p-4 fixed top-0 left-0 z-50">
            <button onClick={toggleNav} className={`${isOpen ? 'text-white' : 'text-black'}`}>
              {/* Hamburger Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
    
          {/* Side navigation */}
          <div className={`fixed top-0 left-0 w-[50%] lg:w-[20%] bg-black text-white h-screen z-40 lg:block transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <nav className='space-y-10 pl-10'>
              {/* Logo */}
              <img src="/images/new_logo.png" alt="Logo" />
    
              <div className='py-10'>
                <ul>
                  {navs.map((nav, i) => (
                    <div key={i} className='py-3'>
                      <Link 
                        to={`/admin/${nav.route}`} 
                        className='text-xl uppercase' 
                        onClick={() => setIsOpen(false)}
                      >
                        {nav.name}
                      </Link>
                    </div>
                  ))}
                </ul>
    
                {/* Logout Button */}
                <div className='mt-[30%]'>
                  <button onClick={handleLogout} className='flex gap-2 items-center text-xl uppercase'>
                    <GiExitDoor /> logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
    
          {/* Background overlay for mobile view when nav is open */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={toggleNav} // Close the nav when clicking outside
            ></div>
          )}
        </>
      );
}

export default AdminSidenav