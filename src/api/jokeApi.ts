import {TJokeRequest, TJokeResponse} from '@/types/jokeApi';

import {jokeApi} from './mainApi';

export const getJoke = async ({amount, category, type}: TJokeRequest) => {
  try {
    const response = await jokeApi.get<TJokeResponse>(`/joke/${category}`, {
      params: {
        amount,
        type,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
