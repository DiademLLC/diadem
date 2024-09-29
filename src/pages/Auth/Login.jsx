import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const { setIsLoggedIn, setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isEyeOpen, setIsEyeOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isButtonActive, setIsButtonActive] = useState(false)
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        try { 
            // return;
            const {data} = await axios.post('https://diadem-backend.vercel.app/auth/login', formData, {
                withCredentials: true, // To allow session cookies to be sent
            });
            console.log('data from backend:', data)
            console.log('Cookies:', document.cookie);

            if (data.success) {
                setError('')
                toast.success('login successful')
                setIsLoggedIn(true)
                setUser(data.user)
                navigate('/admin')
            } else {
                setError('Invalid email or password')
                // toast.error('data.message');
            }
        } catch (error) {
            console.error('error:', error)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        setIsButtonActive(formData.email.length > 0 && formData.password.length > 0);
    }, [formData])
    return (
        <section>
            <div className='flex justify-center items-center h-screen'>
                <div className='  bg-gray-300 border-2 border-purple-600 rounded-xl p-10'>
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='space-y-4'>
                            <div className='flex flex-col'>
                                <label htmlFor="email">Email:</label>
                                <input
                                    value={formData.email}
                                    onChange={(e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))}
                                    className='border p-2 rounded-lg border-purple-300 outline-none'
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="password">Password:</label>
                                <div className='flex items-center border border-purple-300 rounded-lg bg-white overflow-hidden p-2 '>
                                    <input
                                        value={formData.password}
                                        onChange={(e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))}
                                        className='outline-none'
                                        type={!isEyeOpen ? 'password' : 'text'}
                                        name="password"
                                        id="password"
                                    />
                                    <div onClick={() => setIsEyeOpen(!isEyeOpen)} className='px-2 cursor-pointer'>
                                        {isEyeOpen ? <FaEye /> : <FaEyeSlash />}
                                    </div>
                                </div>
                            </div>

                            <button disabled={!isButtonActive || isLoading} className={`${!isButtonActive ? 'bg-purple-400' : 'bg-purple-600'} text-white text-sm font-semibold font-serif w-full h-10 rounded-full `}>
                                {isLoading ?
                                    <div className="flex justify-center items-center ">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                    </div>
                                    :
                                    'LOGIN'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login