import {TCategoryResponse} from '@/types/jokeApi';

import {jokeApi} from './mainApi';

export const getCategory = async () => {
  try {
    const response = await jokeApi.get<TCategoryResponse>('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};
