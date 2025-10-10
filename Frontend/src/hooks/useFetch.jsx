import { useState } from 'react';
const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      return response;
    } catch (err) {
      console.error('useFetch error:', err);

      // Supabase errors often have message or error_description
      const message = err.message || err.error_description || 'Unknown error';
      setError({ message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
