import { Movie } from "./movie";

export interface MovieResponse {
    content: Movie[];
    pageable: any;
    totalElements: number;
    last: boolean;
    totalPages: number;
    first: boolean;
    number: number;
    numberOfElements: number;
    size: number;
}