import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an array from 1 to totalPages', () => {
    component.totalPages = 5;
    const pages = component.getTotalPages();
    expect(pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should emit the correct page number', () => {
    spyOn(component.onPageChange, 'emit');
    const page = 3;
    component.goToPage(page);
    expect(component.onPageChange.emit).toHaveBeenCalledWith(page);
  });

  it('should go to first', () => {
    component.currentPage = 1;
    spyOn(component.onPageChange, 'emit');
    component.goToFirst();
    expect(component.onPageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should go to previous', () => {
    component.currentPage = 3;
    spyOn(component.onPageChange, 'emit');
    component.goToPrevious();
    expect(component.onPageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should go to next', () => {
    component.currentPage = 4;
    spyOn(component.onPageChange, 'emit');
    component.goToNext();
    expect(component.onPageChange.emit).toHaveBeenCalledWith(5);
  });

  it('should go to last', () => {
    component.totalPages = 5;
    spyOn(component.onPageChange, 'emit');
    component.goToLast();
    expect(component.onPageChange.emit).toHaveBeenCalledWith(5);
  });

});
