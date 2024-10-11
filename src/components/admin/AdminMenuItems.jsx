import { useAdmin } from '../../context/AdminContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import EditMenuItemModal from './EditMenuItemModal'

const AdminMenuItems = () => {
    const { menuItems, fetchApi } = useAdmin()
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            const confirmed = window.confirm('Are you sure you want to delete item')

            if (!confirmed) {
                return null;
            }

            const response = await axios.delete(`https://diadem-backend.vercel.app/admin/delete-item/${id}`, {withCredentials: true})

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchApi()
            } 
        } catch (error) {
            toast.error('Could not delete item, try again!')
            // console.error('error:', error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleModalContent = (item) => {
        setModalContent(item)
        setIsModalOpen(true)
    }

    return (
        <div className='relative'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {menuItems.map((item, index) => {
                    return (
                        <div key={index} className=' bg-black/70 text-white rounded-2xl shadow-xl overflow-hidden'>
                            <div>
                                <div className='h-48'>
                                    <img className=' object-cover w-full h-full' src={item.image} alt="" />
                                </div>
                                <div className='p-4 space-y-3'>
                                    <h2 className='text-2xl capitalize font-semibold'>{item.name}</h2>

                                    <div>
                                        <h3 className=''>Item category: {item.category} </h3>
                                        <h3 className='font-semibold'>Prices of item </h3>

                                        {item.prices.map((price, index) => {
                                            return (
                                                <p key={index}>{price.name}: ${price.price}</p>
                                            )
                                        })}
                                    </div>

                                    <div className='flex justify-between '>
                                        <button onClick={() => handleModalContent(item)} className='bg-blue-600 rounded-lg px-3 py-1'>Edit</button>
                                        <button onClick={() => handleDelete(item._id)} className='bg-red-600 rounded-lg px-3 py-1'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {isModalOpen && modalContent &&
                <EditMenuItemModal 
                    menuItem={modalContent} 
                    closeModal={() => setIsModalOpen(false)} 
                    fetchApi = {fetchApi}
                />
            }
        </div>
    )
}

export default AdminMenuItems