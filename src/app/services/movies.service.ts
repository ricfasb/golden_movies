import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';

import { TopStudio } from '../interfaces/top-studio';
import { ProducerInterval } from '../interfaces/producer-interval';
import { YearWinner } from '../interfaces/year-winner';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'http://localhost:9090/movies';

  constructor(private http: HttpClient) { }

  getMovies(page: number, pageSize: number, sort: string, year?: string, winner?: string): Observable<MovieResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort);
      
    if (year) {
      params = params.set('year', year);
    }

    if (winner) {
      params = params.set('winner', winner);
    }
      
    return this.http.get<MovieResponse>(this.apiUrl, { params });
  }

  findWinnersByYear(year: number): Observable<MovieResponse> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<MovieResponse>(this.apiUrl, { params });
  }

  getTopStudios(): Observable<TopStudio[]> {
    let params = new HttpParams().set('projection', 'studios-with-win-count');
    return this.http.get<TopStudio[]>(this.apiUrl, { params });
  }
  
  getYearWinners(): Observable<YearWinner[]> {
    let params = new HttpParams().set('projection', 'years-with-multiple-winners');
    return this.http.get<YearWinner[]>(this.apiUrl, { params });
  }

  getProducerIntervals(): Observable<ProducerInterval> {
    let params = new HttpParams().set('projection', 'max-min-win-interval-for-producers');
    return this.http.get<ProducerInterval>(this.apiUrl, { params });
  }

}
