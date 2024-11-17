import { useState, useEffect } from "react";
import api from "@services/api";

const useMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = async () => {
        try {
            const response = await api.get('/api/Material');
            setMaterials(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { materials, loading, error };
}