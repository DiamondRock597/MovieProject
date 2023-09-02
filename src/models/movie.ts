import { Actor } from './actor';

export interface Movie {
    id: number;
    title: string;
    year: number;
    format: string;
    actors: Array<Actor>;
    createdAt: string;
    updatedAt: string;
}