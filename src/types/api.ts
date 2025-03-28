export type TBackendResponse = {
  error: boolean;
  timestamp: number;
};

export type TCategoryResponse = TBackendResponse & {
  categories: string[];
  categoryAliases: {
    alias: string;
    resolved: string;
  }[];
};

export type TJokeRequest = {
  type: 'single' | 'twopart';
  category: string;
  amount: number;
};

export type TJokeRecord = {
  category: string;
  type: 'single' | 'twopart';
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  safe: boolean;
  id: number;
  lang: string;
};

export type TJokeResponse = TBackendResponse & {
  amount: number;
  jokes: TJokeRecord[];
};
