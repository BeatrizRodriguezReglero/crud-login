import { useEffect, useState } from 'react';

export const useFetch = url => {
  const [fetchStatus, setFetchStatus] = useState({
    data: null,
    loading: true,
    error: null
  });
  useEffect(() => {
    fetchDataCustom(url, setFetchStatus);
  }, [url]);
  return { ...fetchStatus };
};
const fetchDataCustom = async (url, setFetchStatus) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('error' + response.status);
    }
    const data = await response.json();
    setFetchStatus({ data, loading: false });
  } catch (error) {
    setFetchStatus({ loading: false, error });
  }
};
