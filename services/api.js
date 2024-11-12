import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
        // if (error.response?.status === 401 && error.response) {
        //   return Promise.reject(error);
        // }
        return Promise.reject(error);
    }
);

export default api;