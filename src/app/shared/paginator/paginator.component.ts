import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() currentPage: number | undefined;
  @Input() totalPages: number | undefined;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  getTotalPages(): number[] {
    let arr = [];
    if(this.totalPages) {
      for(var i = 0; i < this.totalPages; i++) {
        arr.push(i+1);
      }
    }
    return arr;
  }

  goToPage(page: number) {
    console.log('Actual Page', page);
    this.onPageChange.emit(page);
  }

  goToFirst() {
    if(this.currentPage) {
      this.onPageChange.emit(1);
    }
  }

  goToPrevious() {
    if(this.currentPage) {
      this.onPageChange.emit(this.currentPage - 1);
    }
  }

  goToNext() {
    if(this.currentPage) {
      this.onPageChange.emit(this.currentPage + 1);
    }
  }

  goToLast() {
    if(this.totalPages) {
      this.onPageChange.emit(this.totalPages);
    }
  }

}
