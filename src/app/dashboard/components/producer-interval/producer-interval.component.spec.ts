import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerIntervalComponent } from './producer-interval.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../../services/movies.service';
import { of } from 'rxjs';
import { ProducerInterval } from '../../../interfaces/producer-interval';

describe('ProducerIntervalComponent', () => {
  let component: ProducerIntervalComponent;
  let fixture: ComponentFixture<ProducerIntervalComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProducerIntervalComponent,
        HttpClientTestingModule
      ],
      providers: [MoviesService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerIntervalComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch producer intervals', () => {
    const mockData: ProducerInterval = {
      min: [
        { producer: 'Producer A', interval: 1, previousYear: 2000, followingYear: 2001 },
      ],
      max: [
        { producer: 'Producer B', interval: 10, previousYear: 1990, followingYear: 2000 },
      ],
    };

    spyOn(moviesService, 'getProducerIntervals').and.returnValue(of(mockData));

    component.getProducerIntervals();

    expect(moviesService.getProducerIntervals).toHaveBeenCalled();
    expect(component.producerIntervals).toEqual(mockData);
  });
});