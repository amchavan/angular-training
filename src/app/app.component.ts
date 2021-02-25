import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    displayKeys: string[][] =  [ ["login", "Login"], ["name", "Name"], ["description", "Description"] ];

    constructor() {
    }

    ngOnInit(): void {
    }
}
