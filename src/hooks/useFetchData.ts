import { useState, useEffect } from 'react';

interface FetchDataOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const useFetchData = <T,>(url: string, options?: FetchDataOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: options?.method || 'GET',
          headers: options?.headers || { 'Content-Type': 'application/json' },
          body: JSON.stringify(options?.body) || null,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
