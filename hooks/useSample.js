import { useState, useEffect } from "react";
import api from "@services/api";

const useSample = () => {
  const [samples, setSamples] = useState([]);
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/Sample");
      setSamples(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getSample = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/Sample/${id}`);
      setSample(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const postSample = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/Sample", data);
      setSamples((prevSamples) => [...prevSamples, response.data]); // Add new sample to the list
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { samples, loading, error, sample, getSample, postSample };
};

export default useSample;
