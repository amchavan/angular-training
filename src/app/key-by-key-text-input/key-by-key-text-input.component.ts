import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-key-by-key-text-input',
    templateUrl: './key-by-key-text-input.component.html',
    styleUrls: ['./key-by-key-text-input.component.css']
})
export class KeyByKeyTextInputComponent implements OnInit {

    @Input()
    label: string;

    @Output()
    newStringEventEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onKey( newString: string ): void {
        this.newStringEventEmitter.next( newString );
    }
}
