import { useState, useEffect } from "react";
import api from "@services/api";

const useSampleTypes = () => {
  const [sampleTypes, setSampleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await api.get("/api/SampleType");
      setSampleTypes(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { sampleTypes, loading, error };
};

export default useSampleTypes;
