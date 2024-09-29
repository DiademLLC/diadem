import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

export const useAdmin = () => {
    return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
    const { user } = useAuth()
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApi = async () => {
        try {
            setLoading(true);
            //call backend apis (contactsRes)
            const [menuItemsRes, ordersRes] = await Promise.all([
                axios.get('https://diadem-backend.vercel.app/admin/menu', {
                    withCredentials: true, // To allow session cookies to be sent
                }),
                axios.get('https://diadem-backend.vercel.app/admin/all-orders', {
                    withCredentials: true, // To allow session cookies to be sent
                }),
                // fetch('https://diadem-backend.vercel.app/api/menus'),
            ]);

            //set the res data
            // console.log(menuItemsRes)
            setMenuItems(menuItemsRes.data);
            setOrders(ordersRes.data)
            // console.log('fetched from admincontext')
        } catch (error) {
            setError('Failed to fetch data')
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user) {
            console.log('user on admin context fetch api:', user)
            fetchApi();
        }     
    }, [user]);



    return (
        <AdminContext.Provider value={{ menuItems, orders, loading, error, fetchApi }}>
            {children}
        </AdminContext.Provider>
    )
}