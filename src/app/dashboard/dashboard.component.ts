import { Component } from '@angular/core';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';
import { YearWinnersComponent } from "./components/year-winners/year-winners.component";
import { ProducerIntervalComponent } from "./components/producer-interval/producer-interval.component";
import { WinnersByYearComponent } from "./components/winners-by-year/winners-by-year.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TopStudiosComponent,
    YearWinnersComponent,
    ProducerIntervalComponent,
    WinnersByYearComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
