import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useAuth();
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.initialize();
    }, [auth]);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);