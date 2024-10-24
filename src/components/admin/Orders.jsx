import { useAdmin } from '../../context/AdminContext'
import { useState } from 'react'
import OrderStatusModal from './OrderStatusModal'
import axios from 'axios'
import { toast } from 'react-toastify'

const GetOrders = () => {
    const { orders, fetchApi } = useAdmin()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const [orderRef, setOrderRef] = useState('')
    const [searchedResult, setSearchedResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleModalContent = (item) => {
        setModalContent(item)
        setIsModalOpen(true)
    }

    const handleViewAll = () => {
        setSearchedResult(null)
    }

        
    const handleSearch = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const token = localStorage.getItem('authToken');
        try {
            const { data } = await axios.post('https://diadem-backend.vercel.app/admin/search-order', { orderRef }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                // console.log(data)
                setSearchedResult(data.order)
            } else {
                // console.log(data)
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Error finding order')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='p-4'>
            <div className='my-8'>
                <form className='flex items-center gap-3' onSubmit={handleSearch}>
                    <div className='flex gap-3 items-center'>
                        <label htmlFor="search">Search for order using orderRef:</label>
                        <input
                            type="text"
                            placeholder='input orderRef '
                            className='p-2 border max-w-[50%] rounded-md bg-white text-black'
                            id='orderRef'
                            name='orderRef'
                            value={orderRef}
                            onChange={(e) => setOrderRef(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className='h-8 w-14 rounded-xl bg-green-700 text-white'>
                            {isLoading
                                ?
                                <div className="flex justify-center items-center ">
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                                </div>
                                :
                                'search'
                            }
                        </button>
                    </div>
                </form>
            </div>

            {searchedResult
                ?
                <div>
                    <div className='max-w-[450px] w-full bg-green-900 text-white rounded-xl shadow-xl p-4 '>
                        <div className='space-y-2'>
                            <div className='flex justify-between'>
                                <h2 className='text-lg'>Order Ref: {searchedResult.orderRef}</h2>
                                <p>Status: {searchedResult.status}</p>
                            </div>

                            <h3 className='text-lg'>Order details:</h3>

                            <table className='' border="1" cellPadding="5" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchedResult.cartItems.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <h4>Total price: ${searchedResult.totalAmount}</h4>

                            <h4>Date of order:{searchedResult.createdAt}</h4>

                            <div>
                                <h3 className='text-lg'>Customer details</h3>
                                <div>
                                    <p>name: {searchedResult.customer.name}</p>
                                    <p>email: {searchedResult.customer.email}</p>
                                    <p>phone number: {searchedResult.customer.phoneNumber}</p>
                                    <p>address: {searchedResult.customer.address}</p>
                                    {searchedResult.customer.note !== '' && <p>note: {searchedResult.customer.note}</p>}
                                </div>
                            </div>

                            <div>
                                <button onClick={() => handleModalContent(searchedResult)} className='bg-black/70 border rounded-full px-2'>Change order status</button>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <button onClick={handleViewAll} className='bg-black text-white px-4 py-1 rounded-full'>view all orders</button>
                    </div>
                </div>
                :
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                    {orders.map((order, index) => {
                        return (
                            <div key={index} className='bg-green-900 text-white rounded-xl shadow-xl p-4 '>
                                <div className='space-y-2'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-lg'>Order Ref: {order.orderRef}</h2>
                                        <p>Status: {order.status}</p>
                                    </div>

                                    <h3 className='text-lg'>Order details:</h3>

                                    <table className='' border="1" cellPadding="5" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Type</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.cartItems.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.type}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>${item.price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                    <h4>Total price: ${order.totalAmount}</h4>

                                    <h4>Date of order: {order.createdAt}</h4>

                                    <div>
                                        <h3 className='text-lg'>Customer details</h3>
                                        <div>
                                            <p>name: {order.customer.name}</p>
                                            <p>email: {order.customer.email}</p>
                                            <p>phone number: {order.customer.phoneNumber}</p>
                                            <p>address: {order.customer.address}</p>
                                            {order.customer.note !== '' && <p>note: {order.customer.note}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <button onClick={() => handleModalContent(order)} className='bg-black/70 border rounded-full px-2'>Change order status</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            }

            {isModalOpen && modalContent &&
                <OrderStatusModal
                    order={modalContent}
                    closeModal={() => setIsModalOpen(false)}
                    fetchApi={fetchApi}
                />
            }
        </div>
    )
}

export default GetOrders