import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-pagination-widget',
    templateUrl: './pagination-widget.component.html',
    styleUrls: ['./pagination-widget.component.css']
})
export class PaginationWidgetComponent implements OnInit {

    @Input()
    currentPage = 0;

    constructor() { }

    ngOnInit(): void {
    }

    previous(): void {
        if ( this.currentPage > 1 ) {
            this.currentPage--;
        }
    }

    next(): void {
        this.currentPage++;
    }
}
