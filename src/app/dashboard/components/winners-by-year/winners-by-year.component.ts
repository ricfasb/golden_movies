import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, of } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../interfaces/movie';
import { MovieResponse } from '../../../interfaces/movie-response';

@Component({
  selector: 'app-winners-by-year',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './winners-by-year.component.html',
  styleUrl: './winners-by-year.component.scss'
})
export class WinnersByYearComponent {
  
  winners: Movie[] = [];
  public searchYear: number | null = null;

  constructor(private moviesService: MoviesService) { } 

  findWinnersByYear() {
    if (this.searchYear) {
      this.moviesService.findWinnersByYear(this.searchYear).pipe(
        map((data: MovieResponse) => {
          this.winners = data.content;
        }),
        catchError(() => {
          this.winners = [];
          return of([]);
        })
      ).subscribe();
    } else {
      this.winners = [];
    }
  }

}
