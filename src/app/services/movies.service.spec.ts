import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { MovieResponse } from '../interfaces/movie-response';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:9090/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMovies', () => {
    it('should retrieve movies with correct parameters', () => {
      const mockResponse: MovieResponse = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 1,
        pageable: undefined,
        last: false,
        first: false,
        numberOfElements: 0
      };

      service.getMovies(1, 10, 'title', '2020', 'yes').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(request => request.url === apiUrl);

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('pageSize')).toBe('10');
      expect(req.request.params.get('sort')).toBe('title');
      expect(req.request.params.get('year')).toBe('2020');
      expect(req.request.params.get('winner')).toBe('yes');

      req.flush(mockResponse);
    });

    it('should retrieve winners for a specific year', () => {
      const mockResponse: MovieResponse = {
        content: [
          {
            id: 1,
            year: 2020,
            title: 'Movie A',
            studios: ['Studio A'],
            producers: ['Producer A'],
            winner: true,
          },
          {
            id: 2,
            year: 2020,
            title: 'Movie B',
            studios: ['Studio B'],
            producers: ['Producer B'],
            winner: true,
          },
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

      service.findWinnersByYear(2020).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((request) =>
        request.url === apiUrl && request.params.get('year') === '2020'
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('year')).toBe('2020');

      req.flush(mockResponse);
    });
  });

});
