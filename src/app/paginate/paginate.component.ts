import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.styl']
})
export class PaginateComponent implements OnInit {

  @Input()
  currentPage = 0;

  @Output()
  nextPageEventEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  previous(): void {
    if ( this.currentPage > 1 ) {
        this.currentPage--;
        this.nextPageEventEmitter.next( this.currentPage );
    }
  }

next(): void {
    this.currentPage++;
    this.nextPageEventEmitter.next( this.currentPage );
  }

}
