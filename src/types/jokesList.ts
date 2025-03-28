import {TJokeResponse} from './jokeApi';

export type TJokesList = {
  order: number;
  data: TJokeResponse;
  category: string;
  canLoadMore: boolean;
}[];
