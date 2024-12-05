import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWinnersComponent } from './year-winners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { YearWinnerResponse } from '../../../interfaces/year-winner';
import { of } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';

describe('YearWinnersComponent', () => {
  let component: YearWinnersComponent;
  let fixture: ComponentFixture<YearWinnersComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        YearWinnersComponent,
        HttpClientTestingModule
      ],
      providers: [MoviesService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(YearWinnersComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch year winnerss', () => {
    const mockData: YearWinnerResponse = {
      years: [
        { year: 2000, winnerCount: 2 },
        { year: 2001, winnerCount: 3 },
      ]
    };

    spyOn(moviesService, 'getYearWinners').and.returnValue(of(mockData));

    component.getYearWinners();

    expect(moviesService.getYearWinners).toHaveBeenCalled();
    expect(component.years).toEqual(mockData.years);
  });
});
