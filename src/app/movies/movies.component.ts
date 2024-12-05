import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, catchError, of } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { MovieResponse } from '../interfaces/movie-response';
import { Movie } from '../interfaces/movie';
import { PaginatorComponent } from '../shared/paginator/paginator.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    PaginatorComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'year', 'title', 'winner'];
  dataSource = new MatTableDataSource<Movie>();
  
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  sort = 'id';

  @ViewChild('yearFilter') yearFilter!: ElementRef;
  @ViewChild('winnerFilter') winnerFilter!: ElementRef;
  
  constructor(
    private moviesService: MoviesService) {}

  ngOnInit() {
    this.loadMovies(0, this.pageSize, this.sort);
  }

  loadMovies(page: number, pageSize: number, sort: string) {
    const yearValue = this.yearFilter?.nativeElement.value.toLowerCase();
    const winnerValue = this.winnerFilter?.nativeElement.value.toLowerCase();

    this.moviesService.getMovies(page, pageSize, sort, yearValue, winnerValue).pipe(
      map((response: MovieResponse) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages; 
        this.currentPage = response.number + 1;
      }),
      catchError(() => {
        this.dataSource.data = [];
        this.totalElements = 0;
        return of(null);
      })
    ).subscribe();
  }

  filter() {
    this.loadMovies(0, this.pageSize, this.sort);
  }

  onPageChange(page: number): void {        
    if (page !== this.currentPage) {
      this.currentPage = page - 1;
      this.loadMovies(this.currentPage, this.pageSize, this.sort);
    }
  }

}
