import {useEffect, useState} from 'react';
import {getCategory} from '@/api/categoryApi';

export const useCategoriesData = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategory();
      setCategories(data?.categories ?? []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {categories, loading, refetch: fetchCategories};
};
