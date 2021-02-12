import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-pagination-widget',
    templateUrl: './pagination-widget.component.html',
    styleUrls: ['./pagination-widget.component.css']
})
export class PaginationWidgetComponent implements OnInit {

    @Input()
    currentPage = 0;

    @Output()
    newPageNumberEventEmitter = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
    }

    previous(): void {
        if ( this.currentPage > 1 ) {
            this.currentPage--;
            this.newPageNumberEventEmitter.next( this.currentPage );
        }
    }

    next(): void {
        this.currentPage++;
        this.newPageNumberEventEmitter.next( this.currentPage );
    }
}
