import React, { useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useReviewContext } from '../context/ReviewContext';

const Reviews = () => {
    const { reviews } = useReviewContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: null,
        message: ''
    })

    const [hoveredRating, setHoveredRating] = useState(null);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(formData.rating === null) {
            return setError('choose a star rating')
        }
        setIsLoading(true)
        try {
            const response = await axios.post('https://diadem-backend.vercel.app/api/review', formData, { withCredentials: true })

            if (response.data.success) {
                toast.success('review submitted successfully')
                setIsModalOpen(false)
                setError('')
                setFormData({
                    name: '',
                    email: '',
                    rating: null,
                    message: ''
                })
            } 
        } catch (error) {
            // console.error('error:', error.response.data)
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section className=' relative'>
            <div className='mx-5 text-center items-center py-20'>
                <h3 className='text-red-600 text-xl font-semibold mb-2'>REVIEWS</h3>
                <h2 className='text-3xl font-bold'>From our <span className='text-red-600 '>Customers</span></h2>

                <div>
                    <Slider {...settings}>
                        {reviews.map((review, index) => {
                            return (
                                <div key={index} className='flex flex-col items-center max-w-lg my-8 space-y-3'>
                                    <div className='flex justify-center'>
                                        <div className='h-16 w-16 bg-gray-500 rounded-full'></div>
                                    </div>

                                    <p className='text-center'>{review.message}</p>

                                    <div className='flex gap-1 justify-center'>
                                        {Array.from({ length: review.rating }).map((_, index) => {
                                            return (
                                                <div key={index}><FaStar className='text-orange-500 text-2xl' /></div>
                                            )
                                        })}
                                    </div>

                                    <h4 className='capitalize font-semibold'>{review.name}</h4>
                                </div>
                            )
                        })}
                    </Slider>
                </div>

                <div className='mt-14 flex justify-center'>
                    <button onClick={() => setIsModalOpen(!isModalOpen)} className='flex items-center gap-2 px-4 py-1 bg-black text-white rounded-lg'>leave a review <MdKeyboardDoubleArrowRight /></button>
                </div>

            </div>

            {isModalOpen &&
                <div className='flex justify-center items-center h-full'>
                    <div className='absolute inset-0 -z-10 bg-black/30 h-full w-full '></div>
                    <div className='absolute inset-0 m-auto bg-gray-800 rounded-3xl p-6 max-w-md w-[95%] md:w-full h-[85%] shadow-lg'>
                        <div className=' absolute right-6'>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className='bg-white text-black w-10 h-10 rounded-full flex justify-center items-center'><FaXmark /></button>
                        </div>

                        <div className='flex justify-center items-center h-full w-full'>
                            <form onSubmit={handleSubmit} className='w-full '>
                                <div className='space-y-2'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="name" className='text-white'>Name:</label>
                                        <input
                                            value={formData.name}
                                            onChange={handleChange}
                                            name='name'
                                            id='name'
                                            type="text"
                                            required
                                            className='border border-white bg-white rounded px-3 py-2'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="email" className='text-white'>Email:</label>
                                        <input
                                            value={formData.email}
                                            onChange={handleChange}
                                            name='email'
                                            id='email'
                                            type="email"
                                            required
                                            className='border border-white bg-white rounded px-3 py-2'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="message" className='text-white'>Message:</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            name='message'
                                            id='message'
                                            type="text"
                                            required
                                            className='border border-white bg-white rounded px-3 py-2'
                                        />
                                    </div>

                                    <div className='flex gap-1 '>
                                        {Array.from({ length: 5 }).map((_, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <div
                                                    key={index}
                                                    onMouseEnter={() => setHoveredRating(ratingValue)}
                                                    onMouseLeave={() => setHoveredRating(null)}
                                                    onClick={() => setFormData({ ...formData, rating: ratingValue })}
                                                >
                                                    <FaStar
                                                        className={`text-2xl ${ratingValue <= (hoveredRating || formData.rating) ? 'text-orange-600' : 'text-white'}`}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>


                                </div>

                                <div className='flex justify-center mt-8'>
                                    <button type="submit" className='bg-white rounded-lg px-4 py-2 font-semibold text-gray-800 capitalize text-sm hover:bg-gray-200 transition'>
                                        {isLoading ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </div>

                                <div className='mt-4'>
                                    {error && <p className='text-red-600 text-xl text-center underline'>{error}</p>}
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            }

        </section>
    )
}

export default Reviews