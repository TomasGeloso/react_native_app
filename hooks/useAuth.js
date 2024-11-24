import { useCallback } from "react";
import authStore from "@context/authStore";
import api from "@services/api";
import * as Device from "expo-device";


const useAuth = () => {
    const storeLogin = authStore((state) => state.login);

    const login = useCallback(async (email, password) => {
        try {
            const response = await api.post("/api/Auth/login", {
                email,
                password,
            });
            
            const { accessToken } = response.data;

            storeLogin(accessToken);
        } catch (error) {
            console.error("Login error: ", error);
            throw error;
        }
    }, [storeLogin]);

    const register = useCallback(async (email, password, username) => {
        try {
            const response = await api.post("/api/Auth/register", {
                email,
                password,
                username,
              });

            if (response.status === 201) {
                login(email, password);
            }
        } catch (error) {
            console.error("Registration error: ", error);
            throw error;
        }
    }, [login]);

    return { login, register };
}

export default useAuth;