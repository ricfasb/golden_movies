import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudiosComponent } from './top-studios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../../services/movies.service';
import { of, throwError } from 'rxjs';

describe('TopStudiosComponent', () => {
  let component: TopStudiosComponent;
  let fixture: ComponentFixture<TopStudiosComponent>;
  let moviesService: MoviesService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopStudiosComponent,
        HttpClientTestingModule
      ],
      providers: [MoviesService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopStudiosComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch top studios', () => {
    const mockData = [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 8 },
    ];

    spyOn(moviesService, 'getTopStudios').and.returnValue(of(mockData));

    component.getTopStudios();

    expect(moviesService.getTopStudios).toHaveBeenCalled();
    expect(component.topStudios).toEqual(mockData);
  });
});