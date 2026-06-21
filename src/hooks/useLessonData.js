import { useEffect, useState } from 'react';
import { fetchLessonData } from '../utils/lessonApi';

export function useLessonData(slug) {
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLessonData(null);
      setLoading(false);
      setError('No lesson specified');
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);
    setLessonData(null);

    fetchLessonData(slug)
      .then((data) => {
        if (!cancelled) {
          setLessonData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load lesson');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { lessonData, loading, error };
}