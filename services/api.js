import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

const api = axios.create({
    baseURL: 'http://192.168.1.11:7254',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor for requests - add token if exists
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor for responses - handle expired/invalid token
api.interceptors.response.use(
    (response) => response, async (error) => {
        if (error.response?.status === 401) {
            // Revisa si el encabezado 'Token-Expired' está presente
            const isTokenExpired = error.response.headers['token-expired'] === 'true';

            if (isTokenExpired) {
                try {
                    // Llama a la función para renovar el token
                    const newAccessToken = await renewAccessToken();

                    // Si se obtiene un nuevo accessToken, reintenta la solicitud original
                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api.request(error.config); // Reenvía la solicitud original
                } catch (refreshError) {
                    // Si no se puede renovar el token, rechaza el error
                    logoutUser();
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

async function renewAccessToken() {
    try {
        const response = await api.post('/api/auth/refresh-token');
        const { accessToken } = response.data;

        // Guarda el nuevo accessToken
        localStorage.setItem('accessToken', accessToken);

        // Devuelve el nuevo token
        return accessToken;
    } catch (error) {
        console.error('Error renewing access token:', error);
        throw error;
    }
}

async function logoutUser() {
    try {
        // Solicita la acción de deslogueo en el servidor
        await api.post('/api/auth/logout');

        // Elimina el token y cualquier otra información relacionada con el usuario en el cliente
        localStorage.removeItem('accessToken');
    } catch (error) {
        console.error('Error logging out user:', error);
    }
}

export default api;