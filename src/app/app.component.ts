import { Component, OnInit } from '@angular/core';
import {GitHubOrganization} from './git-hub-organization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: GitHubOrganization[] = undefined;

    constructor() {
    }

    ngOnInit(): void {
    }
}
