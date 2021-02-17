import {Component, OnInit} from '@angular/core';
import {GitHubOrganizationsService} from '../git-hub-organizations.service';
import {GitHubOrganizationDetails} from '../git-hub-organization-details';

@Component({
    selector: 'app-git-hub-organization-details',
    templateUrl: './git-hub-organization-details.component.html',
    styleUrls: ['./git-hub-organization-details.component.css']
})
export class GitHubOrganizationDetailsComponent implements OnInit {

    organizationDetails: GitHubOrganizationDetails;
    organizationDetailKeys: string[];

    constructor(private service: GitHubOrganizationsService) {
    }

    ngOnInit(): void {
        this.service.fetchOrganization( 'errfree' ).then( orgDetails => {
                if ( orgDetails ) {
                    this.organizationDetails = orgDetails;
                    this.organizationDetailKeys = Object.keys( this.organizationDetails );
                }
            });
    }
}
