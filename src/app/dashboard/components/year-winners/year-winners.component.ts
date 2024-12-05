import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../services/movies.service';
import { YearWinner } from '../../../interfaces/year-winner';

@Component({
  selector: 'app-year-winners',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './year-winners.component.html',
  styleUrl: './year-winners.component.scss'
})
export class YearWinnersComponent {
  
  years: YearWinner[] = [];

  constructor(private moviesService: MoviesService) { }
  
  ngOnInit() {
    this.getYearWinners();
  }

  getYearWinners() {
    this.moviesService.getYearWinners().subscribe(response => {
      this.years = response.years;
    });
  }

}
