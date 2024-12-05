import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { MovieResponse } from '../interfaces/movie-response';
import { Movie } from '../interfaces/movie';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://challenge.outsera.tech/api/movies/';

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
        content: [
          { id: 1, title: 'The Formula', year: 2015, winner: true, studios: [], producers: [] },
          { id: 2, title: 'Cruising', year: 2015, winner: true, studios: [], producers: [] },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: 0,
          pageSize: 2,
          offset: 0,
          paged: true,
          unpaged: false,
        },
        last: false,
        totalPages: 1,
        totalElements: 2,
        size: 2,
        number: 0,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        first: true,
        numberOfElements: 2,
        empty: false,
      };

      service.getMovies(0, 2, 'id', '2015', 'yes').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(request => request.url === apiUrl);

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('sort')).toBe('id');
      expect(req.request.params.get('year')).toBe('2015');
      expect(req.request.params.get('winner')).toBe('yes');

      req.flush(mockResponse);
    });

    it('should retrieve winners for a specific year', () => {
      const mockResponse: Movie[] = [
        { id: 181, title: 'Fantastic Four', year: 2015, winner: true, studios: [], producers: [] },
        { id: 182, title: 'Fifty Shades of Gre', year: 2015, winner: true, studios: [], producers: [] },
      ];

      service.findWinnersByYear(2015).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((request) =>
        request.url === apiUrl && request.params.get('year') === '2015'
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('year')).toBe('2015');

      req.flush(mockResponse);
    });
  });

});
