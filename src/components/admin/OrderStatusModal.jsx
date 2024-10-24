import { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import axios from 'axios'
import { toast } from 'react-toastify'

const OrderStatusModal = ({order, closeModal, fetchApi}) => {
    const [status, setStatus] = useState(order.status)
    const [isLoading, setIsLoading] = useState(false)

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.put(`https://diadem-backend.vercel.app/admin/order/${order._id}/status`, {status}, {headers: { Authorization: `Bearer ${token}` }});

            if (response.data.success) {
                await fetchApi()
                toast.success(response.data.message)
                closeModal();
            }
        } catch (error) {
            // console.error('error:', error)
            toast.error('Error changing order status, please try again!')
        } finally {
            setIsLoading(false)
        }
    }
    
    
  return (
    <div className='fixed top-0 inset-0 z-10'>
            <div className='bg-black/70 h-full w-full flex justify-center items-center'>
                <div className='space-y-3'>
                    <div className='flex justify-end'>
                        <button onClick={closeModal} className='bg-white w-12 h-12 rounded-full flex justify-center items-center'>
                            <FaXmark className='text-2xl' />
                        </button>
                    </div>

                    <div className='bg-white h-full p-10 rounded-2xl max-w-max relative z-20'>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col'>
                                    <label htmlFor="status">Status:</label>
                                    <select
                                        value={status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        className='border p-1 rounded-lg'
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="shipped">Shipped</option>                                     
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                

                                <div className='mt-4'>
                                    <button className='bg-green-700 text-white w-full py-1 px-2 rounded-xl'>
                                        {isLoading ? <p>changing...</p> : <p>change order status</p>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default OrderStatusModal