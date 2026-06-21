import { useEffect, useState } from 'react';
import { fetchLessonIndex } from '../utils/lessonApi';

export function useLessonIndex() {
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchLessonIndex()
      .then((data) => {
        if (!cancelled) {
          setIndex(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load lesson archive');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { index, loading, error };
}