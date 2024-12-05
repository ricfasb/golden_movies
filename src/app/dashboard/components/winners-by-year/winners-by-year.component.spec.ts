import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersByYearComponent } from './winners-by-year.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../interfaces/movie';

describe('WinnersByYearComponent', () => {
  let component: WinnersByYearComponent;
  let fixture: ComponentFixture<WinnersByYearComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WinnersByYearComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [MoviesService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(WinnersByYearComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findWinnersByYear and assign winners when searchYear is set', () => {
    component.searchYear = 2020;

    const mockResponse: Movie[] = [
      { id: 1, title: 'The Formula', year: 2020, winner: true, studios: [], producers: [] },
      { id: 2, title: 'Cruising', year: 2020, winner: true, studios: [], producers: [] },
    ];

    spyOn(moviesService, 'findWinnersByYear').and.returnValue(of(mockResponse));

    component.findWinnersByYear();

    expect(moviesService.findWinnersByYear).toHaveBeenCalledWith(2020);
    expect(component.winners).toEqual(mockResponse);
  });

  it('should handle error and set winners to empty array when service fails', () => {
    component.searchYear = 2020;

    spyOn(moviesService, 'findWinnersByYear').and.returnValue(throwError(() => new Error('Service error')));
    component.findWinnersByYear();

    expect(moviesService.findWinnersByYear).toHaveBeenCalledWith(2020);
    expect(component.winners).toEqual([]);
  });

  it('should empty searchYear', () => {
    component.findWinnersByYear();

    expect(component.winners).toEqual([]);
  });

});
