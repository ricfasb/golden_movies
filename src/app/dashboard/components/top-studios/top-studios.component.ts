import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MoviesService } from '../../../services/movies.service';
import { TopStudio } from '../../../interfaces/top-studio';

@Component({
  selector: 'app-top-studios',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './top-studios.component.html',
  styleUrl: './top-studios.component.scss'
})
export class TopStudiosComponent implements OnInit {
  
  topStudios: TopStudio[] = [];

  constructor(private moviesService: MoviesService) { }
  
  ngOnInit() {
    this.getTopStudios();
  }

  getTopStudios() {
    this.moviesService.getTopStudios().subscribe(data => {
      this.topStudios = data;
    });
  }

}
