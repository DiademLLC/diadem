import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const OrderCompletionPage = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg my-10">
            <h1 className="text-2xl font-bold mb-4">Order Completed Successfully!</h1>
            <p className="mb-6">Thank you for your order. Here are your order details:</p>

            <div className="space-y-4">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={`/images/${item.image}`}
                                alt={item.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-500">( {item.type} )</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 mt-4">
                <h3 className="text-lg font-bold">Total Amount</h3>
                <p className="text-lg font-bold">${totalAmount.toFixed(2)}</p>
            </div>

            <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200">
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderCompletionPage;
