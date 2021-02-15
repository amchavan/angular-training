import { Component, OnInit } from '@angular/core';
import { GitHubOrganizationsService } from './git-hub-organizations.service';
import {GitHubOrganization} from './git-hub-organization';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: GitHubOrganization[] = undefined;

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {
    }

    ngOnInit(): void {
        this.gitHubOrganizationsService
            .fetchOrganizations( 15 )
            .then( organizations => {
                if ( organizations ) { this.gitHubOrganizations = organizations; }
            });
    }
}
