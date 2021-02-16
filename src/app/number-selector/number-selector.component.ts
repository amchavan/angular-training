import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-number-selector',
    templateUrl: './number-selector.component.html',
    styleUrls: ['./number-selector.component.css']
})
export class NumberSelectorComponent implements OnInit {

    @Input()
    selectedNumber: number;

    @Input()
    possibleNumbers: number[];

    @Output()
    newNumberEventEmitter = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
    }

    newNumber( e: any ): void {
        this.newNumberEventEmitter.next( e.target.value );
    }
}
