import { useContext, useState, useEffect, createContext } from "react";

const MenuContext = createContext();

export const useMenu = () => {
    return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://diadem-backend.vercel.app/api/menus');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }
                const data = await response.json();
                setMenuItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    

    return (
        <MenuContext.Provider value={{ menuItems, loading, error }}>
            {children}
        </MenuContext.Provider>
    )
}