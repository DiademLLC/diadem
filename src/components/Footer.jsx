import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-black text-white p-10 xl:py-16 xl:px-40'>
            <div className='max-w-[1440px] mx-auto'>
                <img src="/images/logo.png" alt="Logo" className='mb-4' />
                <div className='w-full h-[0.5px] mb-4 bg-white'></div>

                <div className='flex flex-col lg:flex-row justify-between gap-5 lg:gap-0 '>
                    {/* Logo and Opening Hours */}
                    <div className='flex flex-col items-start'>
                        {/* <img src="/images/logo.png" alt="Logo" className='mb-4' /> */}
                        <ul className='space-y-2'>
                            <li className='font-semibold'>Opening Hours</li>
                            <li>Monday-Sunday</li>
                            <li>8:00 AM - 9:00 PM</li>
                        </ul>
                    </div>

                    {/* Address Section */}
                    <div className='flex flex-col items-start'>
                        <h3 className='font-semibold mb-2'>Address</h3>
                        <p>1234 Street Name, City, State, 12345</p>
                    </div>

                    {/* Navigation Links */}
                    <div className='flex flex-col items-start'>
                        <h3 className='font-semibold mb-2'>Navigation</h3>
                        <ul className='space-y-2'>
                            <li>Menu</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Food Categories</li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className='flex flex-col items-start'>
                        <h3 className='font-semibold mb-2'>Follow Us</h3>
                        <div className='flex space-x-4'>
                            <a href='#' className='hover:text-gray-400'>Facebook</a>
                            <a href='#' className='hover:text-gray-400'>Twitter</a>
                            <a href='#' className='hover:text-gray-400'>Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer