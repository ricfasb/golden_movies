import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../services/movies.service';
import { ProducerInterval } from '../../../interfaces/producer-interval';

@Component({
  selector: 'app-producer-interval',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './producer-interval.component.html',
  styleUrl: './producer-interval.component.scss'
})
export class ProducerIntervalComponent implements OnInit {
  
  producerIntervals: ProducerInterval = {
    min: [],
    max: []
  }

  displayedColumns: string[] = ['producer', 'interval', 'previousYear', 'followingYear'];

  constructor(private moviesService: MoviesService) { }
  
  ngOnInit() {
    this.getProducerIntervals();
  }

  getProducerIntervals() {
    this.moviesService.getProducerIntervals().subscribe(data => {
      this.producerIntervals = data;
    });
  }

}
