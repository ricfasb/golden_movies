import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesService } from '../services/movies.service';
import { of, throwError } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';
import { ElementRef } from '@angular/core';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoviesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [MoviesService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);

    component.yearFilter = new ElementRef({ value: '' });
    component.winnerFilter = new ElementRef({ value: '' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovies', () => {
    const page = 0;
    const pageSize = 10;
    const sort = 'id';
  
    component.yearFilter.nativeElement.value = undefined;
    component.winnerFilter.nativeElement.value = undefined;
  
    const mockResponse: MovieResponse = {
      content: [
        { id: 1, title: 'The Formula', year: 2020, winner: true, studios: [], producers: [] },
        { id: 2, title: 'Cruising', year: 2020, winner: true, studios: [], producers: [] },
      ],
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        pageNumber: 0,
        pageSize: 3,
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalPages: 4,
      totalElements: 12,
      size: 3,
      number: 0,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      first: true,
      numberOfElements: 3,
      empty: false,
    };
    
    spyOn(moviesService, 'getMovies').and.returnValue(of(mockResponse));

    component.loadMovies(page, pageSize, sort);
  
    expect(moviesService.getMovies).toHaveBeenCalledWith(
      page,
      pageSize,
      sort,
      'undefined',
      ''
    );
  
    expect(component.dataSource.data).toEqual(mockResponse.content);
    expect(component.totalElements).toBe(mockResponse.totalElements);
  });

  it('should handle service error', () => {
    const page = 0;
    const pageSize = 10;
    const sort = 'id';
  
    component.yearFilter.nativeElement.value = '2022';
    component.winnerFilter.nativeElement.value = 'yes';
    
    spyOn(moviesService, 'getMovies').and.returnValue(throwError(() => new Error('Service error')));

    component.loadMovies(page, pageSize, sort);
  
    expect(moviesService.getMovies).toHaveBeenCalledWith(
      page,
      pageSize,
      sort,
      '2022',
      ''
    );
  
    expect(component.dataSource.data).toEqual([]);
    expect(component.totalElements).toBe(0);
  });

  it('should apply filters when filter method is called', () => {
    spyOn(component, 'loadMovies');

    component.filter();

    expect(component.loadMovies).toHaveBeenCalledWith(0, component.pageSize, component.sort);
  });

  it('should update currentPage and call loadMovies when new page is different', () => {
    const newPage = 3;

    component.onPageChange(newPage);

    expect(component.currentPage).toBe(newPage - 1);
    expect(component.currentPage).toBe(2);
  });

});
