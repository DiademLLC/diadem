import { FaOpencart, FaPlus, FaMinus } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6";
import { CartContext } from "../context/CartContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useOrderContext } from "../context/OrderContext";


const CheckoutCard = () => {
    const { orderPlaced, setOrderPlaced, orderDetails, setOrderDetails } = useOrderContext();
    const { cartItems, subTotal, updateItemQuantity, removeItemFromCart } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false)
    // const [orderPlaced, setOrderPlaced] = useState(false);
    // const [orderDetails, setOrderDetails] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        note: ''
    });
    const navigate = useNavigate();

    const validateForm = (email, phoneNumber) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
      
        if (!emailRegex.test(email)) {
          alert('Invalid email format');
          return false;
        }
      
        if (!phoneRegex.test(phoneNumber)) {
          alert('Invalid phone number format');
          return false;
        }
      
        return true;
    };

    const handleChange = (e) => {
        const {name, value}  = e.target
        setFormData((prevForm)=> ({
            ...prevForm,
            [name]: value
        }))
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        console.log('submit block')
        e.preventDefault()
        setIsLoading(true)
        try {
            if (!validateForm(formData.email, formData.number)) {
                return;
            }
            
            // const response = await axios.post('http://localhost:3000/order', formData)
            const response = {
                data: {
                    success: true,
                    order: {
                        id: 12345,
                        name: formData.name
                    }
                }
            }

            if (response.data.success) { //response.data.success
                // return alert(response.data.success)
                setOrderPlaced(true)
                setOrderDetails(response.data.order);
                navigate('/order-complete')
                toast.success('order successfully made')
                return console.log('response console:',orderPlaced)
            } else {
                toast.error('Error making order. Try again')
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }
    // useEffect(()=> {
    //     console.log('useEffect console:',orderPlaced)
    // }, [handleSubmit])
    return (
        <div className='bg-gray-100 max-w-[500px] rounded-lg overflow-hidden shadow-2xl'>
            <div className="flex flex-col items-center mb-8 mt-3 text-orange-600">
                <FaOpencart className="text-3xl" />
                <h2 className="uppercase font-semibold">summary</h2>
            </div>

            {cartItems && cartItems.length > 0
                ?
                <div className="flex flex-col">
                    <div className="flex flex-col gap-4 px-6">
                        {cartItems.map((item, index) => {
                            return (
                                <div key={index} className="bg-white shadow rounded p-3 flex flex-wrap items-center gap-4 md:gap-8">
                                    {/* Image Container */}
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        <img className="w-full h-full object-cover" src={`/images/${item.image}`} alt={item.name} />
                                    </div>

                                    {/* Name and Type */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-base font-semibold leading-tight">{item.name}</h2>
                                        <p className="text-sm text-gray-500">( {item.type} )</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.type, item.quantity - 1)}
                                            className="w-6 h-6 bg-orange-300 rounded flex items-center justify-center text-white"
                                        >
                                            <FaMinus />
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.type, item.quantity + 1)}
                                            className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <span className="ml-auto">${item.quantity * item.price}</span>

                                    {/* Remove Button */}
                                    <button onClick={() => removeItemFromCart(item.id, item.type)}>
                                        <FaXmark className="text-gray-400" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>


                    <div className="bg-white shadow rounded flex justify-end my-4 mx-6">
                        <div className=" p-4 px-10">
                            <span className="text-sm font-medium">TOTAL: </span>
                            <span className="text-xl font-semibold">$ {subTotal}</span>
                        </div>
                    </div>

                    <div className="bg-white shadow ">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="space-y-2 p-6 mx-6 ">
                                <div>
                                    <h2 className="text-center">Fill in your delivery details</h2>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name">Name <span className="text-blue-600">*</span></label>
                                    <input
                                        id="name"
                                        name='name'
                                        onChange={handleChange}
                                        className="border bg-transparent rounded p-2 focus:border-blue-700 outline-none"
                                        type="text"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email">Email <span className="text-blue-600">*</span></label>
                                    <input
                                        id="email"
                                        name='email'
                                        onChange={handleChange}
                                        className="border bg-transparent rounded p-2 focus:border-blue-700 outline-none"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="number">Phone number <span className="text-blue-600">*</span></label>
                                    <input
                                        id="number"
                                        name='number'
                                        onChange={handleChange}
                                        className="border bg-transparent rounded p-2 focus:border-blue-700 outline-none"
                                        type="number"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="address">Address <span className="text-blue-600">*</span></label>
                                    <input
                                        id="address"
                                        name='address'
                                        onChange={handleChange}
                                        className="border bg-transparent rounded p-2 focus:border-blue-700 outline-none"
                                        type="text"
                                        placeholder="Enter your delivery address"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="note">Note </label>
                                    <textarea
                                        id="note"
                                        name='note'
                                        onChange={handleChange}
                                        className="border bg-transparent rounded p-2 focus:border-blue-700 outline-none resize-none"
                                        rows='5'
                                        type="text"
                                        placeholder="If you have additional message for us.. input here"
                                    />
                                </div>
                            </div>
                            <div className="bg-blue-900 text-white text-center rounded-b-lg">
                                {isLoading ? 
                                        <p className='py-4'>
                                            Order processing... Please wait
                                        </p>
                                    : 
                                        <button className="uppercase font-semibold w-full py-4">order now</button>
                                }                                
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div className='text-center p-4 space-y-5'>
                    <h3>NOTHING IN YOUR CART!</h3>
                    <p><Link to='/#menu' className='text-orange-600'>start shopping</Link> for your delicious meals</p>
                </div>
            }
        </div>
    )
}

export default CheckoutCard