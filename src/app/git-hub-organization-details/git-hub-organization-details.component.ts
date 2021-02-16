import { Component, OnInit } from '@angular/core';
import {GitHubOrganizationsService} from '../git-hub-organizations.service';

@Component({
    selector: 'app-git-hub-organization-details',
    templateUrl: './git-hub-organization-details.component.html',
    styleUrls: ['./git-hub-organization-details.component.css']
})
export class GitHubOrganizationDetailsComponent implements OnInit {

    constructor( private service: GitHubOrganizationsService ) { }

    ngOnInit(): void {
        this.service.fetchOrganization( 'errfree' ).then( orgDetails => console.log( JSON.stringify( orgDetails )));
    }

}
