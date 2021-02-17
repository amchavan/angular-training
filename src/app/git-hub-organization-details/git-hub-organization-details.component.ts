import {Component, OnInit} from '@angular/core';
import {GitHubOrganizationsService} from '../git-hub-organizations.service';
import {GitHubOrganizationDetails} from '../git-hub-organization-details';
import {SelectionEventsExchangeService} from '../selection-events-exchange.service';
import {OrganizationSelectionEvent} from '../organization-selection-event';

@Component({
    selector: 'app-git-hub-organization-details',
    templateUrl: './git-hub-organization-details.component.html',
    styleUrls: ['./git-hub-organization-details.component.css']
})
export class GitHubOrganizationDetailsComponent implements OnInit {

    organizationDetails: GitHubOrganizationDetails;
    organizationDetailKeys: string[];

    constructor( private service: GitHubOrganizationsService,
                 private exchange: SelectionEventsExchangeService ) {
    }

    ngOnInit(): void {
        this.exchange.getExchange().subscribe( event => this.selectionEventHandler( event ));
    }

    private selectionEventHandler( event: OrganizationSelectionEvent ): void {
        this.service.fetchOrganization( event.organization.login )
            .then( orgDetails => {
                if (orgDetails) {
                    this.organizationDetails = orgDetails;
                    this.organizationDetailKeys = Object.keys( this.organizationDetails );
                }
            });
    }
}
