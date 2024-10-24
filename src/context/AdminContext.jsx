import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

export const useAdmin = () => {
    return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
    const { user, loading } = useAuth()
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    // const [contacts, setContacts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApi = async () => {
        // setLoading(true);
        const token = localStorage.getItem('authToken');

        try {            
            //call backend apis (contactsRes)
            const [menuItemsRes, ordersRes] = await Promise.all([
                axios.get('https://diadem-backend.vercel.app/admin/menu', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('https://diadem-backend.vercel.app/admin/all-orders', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
            ]);

            setMenuItems(menuItemsRes.data);
            setOrders(ordersRes.data)
            // console.log('fetched from admincontext')
        } catch (error) {
            setError('Failed to fetch data')
            // console.error('Error fetching data:', error);
        } 
    };

    useEffect(() => {
        if(!loading && user) {
            // console.log('user on admin context fetch api:', user)
            fetchApi();
        }     
    }, [user, loading]);



    return (
        <AdminContext.Provider value={{ menuItems, orders, loading, error, fetchApi }}>
            {children}
        </AdminContext.Provider>
    )
}