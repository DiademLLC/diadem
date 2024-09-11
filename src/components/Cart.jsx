import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaXmark, FaLessThan } from "react-icons/fa6";

const Cart = () => {
    const { cartItems, closeCart, subTotal, removeItemFromCart, updateItemQuantity } = useContext(CartContext)

    const handleQuantityChange = (id, type,newQuantity) => {
        if(newQuantity <= 0) return removeItemFromCart(id, type);
        updateItemQuantity(id, type,newQuantity)
    }

    return (
        <div className='w-[350px] h-full bg-gray-100 shadow-2xl relative z-50'>
            <div className='flex flex-col h-full'>
                <div className='bg-black/90 text-white p-4'>
                    <button className='uppercase flex items-center gap-1' onClick={closeCart}>
                        <FaLessThan />
                        Continue shopping
                    </button>
                </div>

                <div className='h-full bg-white overflow-y-auto'>
                    <div className='p-5'>
                        {Array.isArray(cartItems) && cartItems.length > 0 ?
                            cartItems.map((item, index) => {
                                return (
                                    <div key={index} className="cartItems ">
                                        <div className='flex py-3'>
                                            <div className='w-[40%]'>
                                                <img className='w-24 h-24 object-cover' src="/images/fries1.png" alt="" />
                                            </div>

                                            <div className='relative w-[60%] space-y-1'>
                                                <h3 className='uppercase'>{item.name}</h3>
                                                <h3 className='capitalize'>Type: {item.type}</h3>
                                                <h3>${item.price * item.quantity}</h3>

                                                <div className="flex gap-3 items-center">
                                                    <button onClick={()=>handleQuantityChange(item.id, item.type, (item.quantity - 1))} className="w-6 h-6 bg-orange-300 rounded flex items-center justify-center text-white">
                                                        <FaMinus />
                                                    </button>
                                                    <p>{item.quantity}</p>
                                                    <button onClick={()=>handleQuantityChange(item.id, item.type, (item.quantity + 1))} className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white">
                                                        <FaPlus />
                                                    </button>
                                                </div>

                                                <button onClick={()=> removeItemFromCart(item.id, item.type)} className='absolute top-0 right-0'>
                                                    <FaXmark className="text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className='h-[1px] w-full bg-black/90'></div>
                                    </div>
                                )
                            })
                            :
                            <div className='text-center p-4 space-y-5'>
                                <h3>NOTHING IN YOUR CART!</h3>
                                <p><Link to='/#menu' className='text-orange-500'>start shopping</Link> for your delicious meals</p>
                            </div>
                        }

                    </div>
                </div>

                <div className='bg-black/90 text-white p-4 lg:p-8  lg:h-48 space-y-6'>
                    <div className='flex justify-between text-lg'>
                        <h3 className='uppercase'>Subtotal</h3>
                        <p>${subTotal}</p>
                    </div>


                    <div>
                        <Link  to='/checkout'>
                            <button    
                                
                                disabled={cartItems.length <= 0}
                                onClick={closeCart}                            
                                className={`${cartItems.length > 0 ? 'bg-[#f8b1aa]' : 'bg-[#f8b1aa]/40'}  text-black w-full py-2 rounded-full font-bold text-xl`}>
                                    CHECKOUT
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart