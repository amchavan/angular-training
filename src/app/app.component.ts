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
    errorMsg: string;

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {
    }

    ngOnInit(): void {
        this.gitHubOrganizationsService
            .fetchOrganizations( 20 )
            .then( organizations => this.gitHubOrganizations =  organizations)
            .catch( e => this.errorHandler(e));
    }

    private errorHandler(error: any): void {
        this.errorMsg = error.error.message;
        console.error(JSON.stringify(error));
    }

}
