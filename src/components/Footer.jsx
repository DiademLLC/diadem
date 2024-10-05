import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-black/95 text-white p-10 xl:py-16 xl:px-40'>
            <div className='max-w-[1440px] mx-auto'>


                <div className='flex flex-col lg:flex-row justify-between gap-5 lg:gap-0 '>
                    {/* Logo and Opening Hours */}
                    <div className='flex flex-col items-start gap-5 max-w-44 w-full'>
                        <Link to='/' className='h-14 w-14 lg:h-[70px] lg:w-[70px]'>
                            <img className='h-full w-full object-cover' src="/images/new_logo.png" alt="diadem logo" />
                        </Link>

                        <ul className='space-y-2'>
                            <li className='font-semibold text-xl'>Opening Hours</li>
                            <li>Monday-Sunday</li>
                            <li>8:00 AM - 9:00 PM</li>
                        </ul>
                    </div>

                    {/* Address Section */}
                    <div className='flex flex-col items-start max-w-44 w-full'>
                        <h3 className='font-semibold mb-2 text-xl'>Address</h3>
                        <p>60645 Chicago IL</p>
                    </div>

                    {/* Navigation Links */}
                    <div className='flex flex-col items-start max-w-44 w-full'>
                        <h3 className='font-semibold mb-2 text-xl'>Navigation</h3>
                        <ul className='space-y-2'>
                            <li><a href="/#menu">Menu</a></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className='flex flex-col items-start max-w-44 w-full'>
                        <h3 className='font-semibold mb-2 text-xl'>Follow Us</h3>
                        <div className='flex space-x-4'>
                            <a href='#' className='hover:text-gray-300'>
                                <FaFacebook className='text-2xl' />
                            </a>
                            <a href='#' className='hover:text-gray-300'>
                                <FaXTwitter className='text-2xl' />
                            </a>
                            <a href='#' className='hover:text-gray-300'>
                                <FaInstagram className='text-2xl' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer