import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading ]= useState(false)

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            // Send form data to backend
            const response = await axios.post('https://diadem-backend.vercel.app/api/contact', formData);

            if (response.status === 200) {
                toast.success('Your message has been sent successfully!');
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again later.');
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <section>
            <div className='flex flex-col items-center justify-center py-6 md:py-10 lg:py-12 xl:py-20'>
                <div className='mb-4 lg:mb-16 text-center'>
                    <h2 className='text-3xl lg:text-4xl font-semibold '>How Can We Assist?</h2>
                    <p className='text-sm md:text-lg'>Contact us today for any inquiries, support, or feedback.</p>
                </div>

                <div className='md:flex block md:flex-row lg:gap-5 w-full max-w-[90%] shadow-2xl border md:border-orange-300 rounded-lg overflow-hidden'>
                    <div className='hidden md:block w-[50%] relative'>
                        <div className='h-full bg-black/55 absolute inset-0 z-10'></div>
                        <img className='h-full relative' src="/images/about_img.webp" alt="" />
                    </div>

                    <div className=' md:w-[50%] p-4 md:p-6 lg:p-10'>
                        <form onSubmit={handleSubmit}>

                            <div className='space-y-4 mb-6'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        className='p-2 border focus:border-2 lg:border-gray-500 lg:bg-orange-50 outline-none focus:border-orange-200 rounded-lg bg-transparent'
                                        placeholder='Enter your name'
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className='p-2 border focus:border-2 lg:border-gray-500 lg:bg-orange-50 outline-none focus:border-orange-200 rounded-lg bg-transparent'
                                        placeholder='Enter your mail'
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="message">Message:</label>
                                    <textarea
                                        style={{ resize: 'none' }}
                                        rows={4}
                                        className='p-2 border focus:border-2 lg:border-gray-500 lg:bg-orange-50 outline-none focus:border-orange-200 rounded-lg bg-transparent'
                                        placeholder='Enter your message...'
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>

                                </div>
                            </div>

                            <div className='text-center'>
                                <button type='submit' className='bg-orange-600 text-white text-sm font-semibold w-32 py-2 rounded-full'>
                                    {isLoading ? 'Submitting...' : 'SUBMIT'}
                                </button>
                            </div>

                        </form>

                        <div className='h-3'>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact