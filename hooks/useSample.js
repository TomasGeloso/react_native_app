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
      throw err;
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
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const postSample = async (data) => {
    setLoading(true);
    try {
      const response = await api.post(`/api/Sample`, data);
      setSamples((prevSamples) => [...prevSamples, response.data]);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const putSample = async (id, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/api/Sample/${id}`, data);
      setSamples((prevSamples) =>
        prevSamples.map((s) => (s.id === id ? response.data : s))
      );
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const deleteSample = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/api/Sample/${id}`);
      setSamples((prevSamples) => prevSamples.filter((s) => s.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { samples, loading, error, sample, getSample, postSample, putSample, deleteSample };
};

export default useSample;
