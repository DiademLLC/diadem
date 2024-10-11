import React, { useEffect, useRef } from 'react';
import { useOrderContext } from "../context/OrderContext";
import { useNavigate } from 'react-router-dom';

const OrderCompletionPage = () => {
    const { orderPlaced, setOrderPlaced, orderDetails } = useOrderContext();
    const navigate = useNavigate();
    const isMountedRef = useRef(true);

    useEffect(() => {
        if (!orderPlaced) {
            navigate('/'); // Redirect if the order has not been placed
        }
    }, [orderPlaced, navigate]);

    // Cleanup to reset the orderPlaced state when leaving the page
    useEffect(() => {
        return () => {
            if (isMountedRef.current) {
                // Check if the component is currently mounted before setting to false
                setOrderPlaced(false); // Reset the order status only when leaving the page
            }
        };
    }, [setOrderPlaced]);

    // Set the ref to false once the component has mounted
    useEffect(() => {
        isMountedRef.current = false; // Component is mounted now, no longer in initial mount
    }, []);

    if (!orderPlaced) return null;
    const handleContinue = () => {
        navigate('/#menu')
    }

    return (
        <div className='pt-20 pb-10 lg:py-32'>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg my-10">
                <h1 className="text-2xl font-bold mb-4">Order Completed Successfully!</h1>
                <p className="mb-6">Thank you for your order. Here are your order details:</p>
                <p className="mb-4">Order Ref: {orderDetails.orderRef}</p>

                <div className="space-y-4">
                    {orderDetails.cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
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
                    <p className="text-lg font-bold">${orderDetails.totalAmount.toFixed(2)}</p>
                </div>

                <button onClick={handleContinue} className="mt-6 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderCompletionPage;
