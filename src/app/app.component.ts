import { Component, OnInit } from '@angular/core';
import {GitHubOrganization} from './git-hub-organization';
import {GitHubOrganizationsService} from './git-hub-organizations.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: GitHubOrganization[] = undefined;
    private gitHubOrganizationsService: GitHubOrganizationsService;

    constructor() {
    }

    ngOnInit(): void {
        this.gitHubOrganizationsService
            .fetchOrganizationsPage( 15 )
            .then( organizations => {
                if ( organizations ) { this.gitHubOrganizations = organizations; }
            });
    }
}
