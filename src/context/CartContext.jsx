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
    const [isAdded, setIsAdded]= useState(false)

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

    const addItemToCart1 = (product, quantity, priceId) => {
        // return alert(priceId)
        setIsLoading(true)
        const existingItem = cartItems.find(item => item.id === product.id)
        const price = product.prices.find((price)=> price.id === priceId)

        // const doubleCheck = existingItem.type === price.name

        // return console.log('doubleCheck:', doubleCheck)

        if (existingItem) {
            // console.log('existingItem in cart:', existingItem)
            const doubleCheck = existingItem.type === price.name

            
            // return console.log('cartItems:', cartItems)
            if(doubleCheck) {
                console.log('doubleCheck block')
                setCartItems((prevItems) => {
                    return console.log('prevItems:', prevItems)
                    prevItems.map((item) => 
                        item.id === product.id ? {...item, quantity: item.quantity + quantity} : item
                    );
                })
            }
            
            // else{
            //     setCartItems((prevItems) => {
            //         prevItems.map((item) => 
            //             item.id === product.id ? {...item, quantity: item.quantity + quantity} : item
            //         );
            //     })
            // }
            
        } else {
            setCartItems((prevItems) => [
                ...prevItems,
                {...product, quantity, price:price.price, type: price.name}
            ]);
        }
        toast.success('successfully added item to your cart')

        // setTimeout(() => {
        //     setIsLoading(false)
        //     setIsAdded(true)
        // }, 500)
    }

    //add to cart works
    const addItemToCart = (product, quantity, priceId) => {
        setIsLoading(true);

        // Find the existing item in the cart
        const existingItem = cartItems.filter(item => item.id === product.id);

        // Find the price based on priceId
        const price = product.prices.find(price => price.id === priceId);

        //check if type and id matches
        const isSameType = existingItem.find(item => item.type === price.name) ;

        if (isSameType) {
            // Update the quantity if the type matches
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                )
            );
        } else {
            // Add the item as a new entry if the type does not match
            setCartItems(prevItems => [
                ...prevItems,
                { ...product, quantity, price: price.price, type: price.name }
            ]);
        }
        
        toast.success('successfully added item to your cart')
        setIsLoading(false); 
    };


    const clearNotification = () => {
        setIsAdded(false)
    }

    //update on cart works
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
                if (item.id === id && item.type === type) {
                    return { ...item, quantity: newQuantity };
                }
                // Otherwise, return the item unchanged
                return item;
            });
        });
        setIsLoading(false); 
    }

    const removeItemFromCart = (itemId, type) => {
        // return localStorage.removeItem('cartItems');

        const item = cartItems.find((item)=> 
            item.id === itemId && item.type === type
        )

        if (item) {
            // console.log('itemId exists')
            setCartItems((prevItems) => 
                prevItems.filter((item)=> 
                     !(item.type === type && item.id === itemId)
                )
            )
            toast.success('successfully removed item from your cart')
        }
    }

    return (
        <CartContext.Provider value={{ cart, openCart, closeCart, cartItems, subTotal, isLoading, addItemToCart, updateItemQuantity, removeItemFromCart, isAdded, clearNotification}}>
            {children}
        </CartContext.Provider>
    )
}