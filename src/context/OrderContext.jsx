import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  return (
    <OrderContext.Provider value={{ orderPlaced, setOrderPlaced, orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
