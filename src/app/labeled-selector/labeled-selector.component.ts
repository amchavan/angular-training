import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-labeled-selector',
    templateUrl: './labeled-selector.component.html',
    styleUrls: ['./labeled-selector.component.css']
})
export class LabeledSelectorComponent implements OnInit {

    @Input()
    label: string;

    @Input()
    initialSelectedOption: any;

    @Input()
    options: any[];

    @Input()
    multiple: boolean;

    @Output()
    newSelectionEventEmitter = new EventEmitter<any>();

    selectedOption: any;

    constructor() { }

    ngOnInit(): void {
        this.selectedOption = this.initialSelectedOption;
    }

    newSelectedOption(e: any ): void {
        this.selectedOption = e.target.value;
        this.newSelectionEventEmitter.next( this.selectedOption );
    }
}

