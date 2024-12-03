import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersByYearComponent } from './winners-by-year.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieResponse } from '../../../interfaces/movie-response';
import { of, throwError } from 'rxjs';
import { MoviesService } from '../../../services/movies.service';

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

    const mockResponse: MovieResponse = {
      content: [
        { id: 1, title: 'Movie A', year: 2020, winner: true, studios: [], producers: [] },
        { id: 2, title: 'Movie B', year: 2020, winner: true, studios: [], producers: [] },
      ],
      pageable: null,
      totalElements: 2,
      last: true,
      totalPages: 1,
      first: true,
      number: 0,
      numberOfElements: 2,
      size: 2,
    };

    spyOn(moviesService, 'findWinnersByYear').and.returnValue(of(mockResponse));

    component.findWinnersByYear();

    expect(moviesService.findWinnersByYear).toHaveBeenCalledWith(2020);
    expect(component.winners).toEqual(mockResponse.content);
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
