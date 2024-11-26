import { useState, useEffect } from "react";
import api from "@services/api";

const useTestSpecimenTypes = () => {
  const [testSpecimenTypes, setTestSpecimenTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await api.get("/api/TestSpecimenType");
      setTestSpecimenTypes(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { testSpecimenTypes, loading, error };
};

export default useTestSpecimenTypes;
