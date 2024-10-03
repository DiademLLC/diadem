import { useContext, useState, useEffect, createContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        // console.log('savedCartItems:', savedCartItems)
        try{
            return savedCartItems ? JSON.parse(savedCartItems) : []
        } catch (error) {
            console.error('error parsing:', error)
            return [];
        }
    })

    const [subTotal, setSubTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const openCart = () => setCart(true);
    const closeCart = () => setCart(false);

    const calculateSubTotal = (items) => {       
        if(!Array.isArray(items)) return 0;
        return items.reduce((acc, item)=> acc + item.price * item.quantity, 0)
    }

    useEffect(() => {
        // console.log('cartItems:', cartItems)
        setSubTotal(calculateSubTotal(cartItems));

        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    //add to cart 
    const addItemToCart = (product, quantity, priceId) => {
        // return console.log('product:', product)
        setIsLoading(true);

        // Find the existing item in the cart
        const existingItem = cartItems.filter(item => item._id === product._id);
    

        if (product.name === 'zobo') {
            const zoboType = existingItem.find(item => item._id === product._id);
            if(zoboType){
                setCartItems(prevItems => 
                    prevItems.map(item => 
                        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                    )
                );
            } else {
                setCartItems(prevItems => [
                    ...prevItems,
                    { ...product, quantity, price: product.price, type: product.type }
                ]);               
            }        
            toast.success('Item added to your cart')
            setIsLoading(false);    
            return;
        } 

        // Find the price based on priceId
        const price = product.prices.find(price => price._id === priceId);

        //check if type and id matches
        const isSameType = existingItem.find(item => item.type === price.name);

        if (isSameType) {
            // Update the quantity if the type matches
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                )
            );
        } else {
            // Add the item as a new entry if the type does not match
            setCartItems(prevItems => [
                ...prevItems,
                { ...product, quantity, price: price.price, type: price.name }
            ]);
        }
        
        toast.success('Item added to your cart')
        setIsLoading(false); 
    };

    //update on cart 
    const updateItemQuantity = (id, type, newQuantity) => {
        setIsLoading(true); 

        if (newQuantity === 0) {
            removeItemFromCart(id, type)
            setIsLoading(false); 
            return;
        }
        
        setCartItems((prevItems) => {
            if (!Array.isArray(prevItems)) return [];
    
            return prevItems.map((item) => {
                // If the item matches both id and type, update the quantity
                if (item._id === id && item.type === type) {
                    return { ...item, quantity: newQuantity };
                }
                // Otherwise, return the item unchanged
                return item;
            });
        });
        setIsLoading(false); 
    }

    const removeItemFromCart = (itemId, type) => {
        const item = cartItems.find((item)=> 
            item._id === itemId && item.type === type
        )

        if (item) {
            setCartItems((prevItems) => 
                prevItems.filter((item)=> 
                     !(item.type === type && item._id === itemId)
                )
            )
            toast.success('Item removed from your cart')
        }
    }

    const clearCart = () => {
        localStorage.removeItem('cartItems');
    }

    return (
        <CartContext.Provider value={{ cart, openCart, closeCart, cartItems, subTotal, isLoading, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}