import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../hooks/useAuth';

const api = axios.create({
    baseURL: 'http://localhost:7254',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor for requests - add token if exists
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('UserToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor for responses - handle expired/invalid token
api.interceptors.request.use(
    (response) => response, async (error) => {
        if (error.response?.status === 401 && !error.config.url.includes('auth')) {
            // await AsyncStorage.removeItem('UserToken');
            // router.replace('/sign-in');
            useAuth.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default api;