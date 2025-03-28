import {TJokeRequest, TJokeResponse} from '@/types/api';

import {jokeApi} from './mainApi';

export const getJoke = async (params: TJokeRequest) => {
  try {
    const response = await jokeApi.get<TJokeResponse>('/joke', {
      params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
