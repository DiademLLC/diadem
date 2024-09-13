// src/context/OrderContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a new context
const OrderContext = createContext();

// Custom hook to use the OrderContext
export const useOrderContext = () => {
  return useContext(OrderContext);
};

// Provider component to wrap around parts of your app that need access to this context
export const OrderProvider = ({ children }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  console.log('order placed on context:', orderPlaced)

  return (
    <OrderContext.Provider value={{ orderPlaced, setOrderPlaced, orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
