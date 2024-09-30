import { useAdmin } from '../../context/AdminContext'
import { useState } from 'react'
import OrderStatusModal from './OrderStatusModal'

const GetOrders = () => {
    const { orders, fetchApi } = useAdmin()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    // console.log()
    const handleModalContent = (item) => {
        setModalContent(item)
        setIsModalOpen(true)
    }

    return (
        <div>
            <div>
                <form >
                    <div className='flex flex-col'>
                        <label htmlFor="search">Search for order using orderRef:</label>
                        <input
                            type="text"
                            placeholder='input orderRef '
                            className='p-2 border max-w-[50%]'
                        />
                    </div>
                </form>
            </div>

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

                                <h4>Date of order:${order.createdAt}</h4>

                                <div>
                                    <h3 className='text-lg'>Customer details</h3>
                                    <div>
                                        <p>name: {order.customer.name}</p>
                                        <p>email: {order.customer.email}</p>
                                        <p>phone number: {order.customer.phoneNumber}</p>
                                        <p>address: {order.customer.address}</p>
                                        {order.customer.note !== '' && <p>note: {order.customer.note}</p> }
                                    </div>
                                </div>

                                <div>
                                    <button onClick={() => handleModalContent(order)} className='bg-blue-600 border'>Change order status</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>

            {isModalOpen && modalContent &&
                <OrderStatusModal
                    order={modalContent}
                    closeModal={() => setIsModalOpen(false)} 
                    fetchApi = {fetchApi}
                />
            }
        </div>
    )
}

export default GetOrders