import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';

import { TopStudioResponse } from '../interfaces/top-studio';
import { ProducerInterval } from '../interfaces/producer-interval';
import { YearWinnerResponse } from '../interfaces/year-winner';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'https://challenge.outsera.tech/api/movies/';

  constructor(private http: HttpClient) { }

  getMovies(page: number, pageSize: number, sort: string, year?: string, winner?: string): Observable<MovieResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', pageSize)
      .set('sort', sort);
      
    if (year) {
      params = params.set('year', year);
    }

    if (winner) {
      params = params.set('winner', winner);
    }
      
    return this.http.get<MovieResponse>(this.apiUrl, { params });
  }

  findWinnersByYear(year: number): Observable<Movie[]> {
    let params = new HttpParams().set('winner', true).set('year', year.toString());
    return this.http.get<Movie[]>(this.apiUrl, { params });
  }

  getTopStudios(): Observable<TopStudioResponse> {
    let params = new HttpParams().set('projection', 'studios-with-win-count');
    return this.http.get<TopStudioResponse>(this.apiUrl, { params });
  }
  
  getYearWinners(): Observable<YearWinnerResponse> {
    let params = new HttpParams().set('projection', 'years-with-multiple-winners');
    return this.http.get<YearWinnerResponse>(this.apiUrl, { params });
  }

  getProducerIntervals(): Observable<ProducerInterval> {
    let params = new HttpParams().set('projection', 'max-min-win-interval-for-producers');
    return this.http.get<ProducerInterval>(this.apiUrl, { params });
  }

}
