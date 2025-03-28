import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import {getJoke} from '@/api/jokeApi';

import {TJokesList} from '@/types/jokesList';

type Props = {
  categories: string[];
};

export const useJokesData = ({categories}: Props) => {
  const [jokesData, setJokesData] = useState<TJokesList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const populateData = useCallback(async () => {
    setLoading(true);
    setJokesData([]);

    try {
      const responses = await Promise.allSettled(
        categories.map(category =>
          getJoke({
            amount: 2,
            category,
            type: 'single',
          }).then(response => ({
            order: 0,
            data: response,
            canLoadMore: response?.jokes?.length < 6,
            category,
          })),
        ),
      ).then(results =>
        results.filter(result => result.status === 'fulfilled'),
      );

      setJokesData(
        responses.map((response, index) => ({
          ...response.value,
          order: index + 1,
        })),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected Error:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [categories]);

  const goToTop = (order: number) => {
    setJokesData(prev => {
      const index = prev.findIndex(joke => joke.order === order);
      const newJokesData = [...prev];
      newJokesData.unshift(newJokesData.splice(index, 1)[0]);
      return newJokesData.map((joke, idx) => ({...joke, order: idx + 1}));
    });
  };

  const fetchMore = async (category: string) => {
    setFetching(true);

    const selectedCategoryData = jokesData.find(
      joke => joke.category === category,
    );
    if (!selectedCategoryData) {
      setLoading(false);
      return;
    }

    try {
      const response = await getJoke({
        amount: 2,
        category,
        type: 'single',
      });

      setJokesData(prev =>
        prev.map(joke =>
          joke.category === category
            ? {
                ...joke,
                data: {
                  ...joke.data,
                  jokes: [...(joke.data?.jokes ?? []), ...response.jokes],
                },
                canLoadMore: (joke.data?.jokes?.length ?? 0) + 2 < 6,
              }
            : joke,
        ),
      );
    } catch (error) {
      console.error('Error fetching more jokes:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    populateData();
  }, [populateData]);

  return {
    jokesData,
    loading,
    refetch: populateData,
    goToTop,
    fetchMore,
    fetching,
  };
};
