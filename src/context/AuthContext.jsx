import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                setIsLoggedIn(false);
                setUser(null);
                setLoading(false);
                return;
            }

            // Call the backend to verify the token
            const { data } = await axios.get('https://diadem-backend.vercel.app/auth/status', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.isAuthenticated) {
                setIsLoggedIn(true);
                setUser(data.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            // console.error('Session check error:', error);
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession(); 
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setUser, user, setIsLoggedIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
