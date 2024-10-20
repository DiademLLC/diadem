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
            const { data } = await axios.get('https://diadem-backend.vercel.app/auth/status', { withCredentials: true });
            console.log('data from auth status:', data)

            if (data.isAuthenticated) {
                console.log('is authenticated')
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
