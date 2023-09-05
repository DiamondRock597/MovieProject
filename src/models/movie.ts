import { Actor } from './actor';

export enum MovieFormats {
  VHS = 'VHS',
  DVD = 'DVD',
  Bluray = 'Blu-ray'
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  format: MovieFormats;
  actors?: Array<Actor>;
  createdAt: string;
  updatedAt: string;
}
