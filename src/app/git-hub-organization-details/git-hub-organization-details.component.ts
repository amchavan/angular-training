import {Component, Input, OnInit} from '@angular/core';
import {GitHubOrganizationsService} from '../git-hub-organizations.service';
import {GitHubOrganizationDetails} from '../git-hub-organization-details';
import {SelectionEventsExchangeService} from '../selection-events-exchange.service';
import {OrganizationSelectionEvent} from '../organization-selection-event';

interface DetailDescriptor {
    detailName: string;
    detailLabel?: string;
}
@Component({
    selector: 'app-git-hub-organization-details',
    templateUrl: './git-hub-organization-details.component.html',
    styleUrls: ['./git-hub-organization-details.component.css']
})
export class GitHubOrganizationDetailsComponent implements OnInit {

    /** List of detailDescriptors to be displayed: if empty or null we display everything */
    @Input()
    detailDescriptors: DetailDescriptor[];

    organizationDetails: GitHubOrganizationDetails;
    organizationDetailDescriptors: DetailDescriptor[];

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

                    // Did we get a list of details to display?
                    if ( ! (this.detailDescriptors && this.detailDescriptors.length) ) {

                        // NO, create a default list with all fields
                        this.detailDescriptors = [];
                        Object.keys( this.organizationDetails ).forEach( detail => {
                            this.detailDescriptors.push( {
                                detailName: detail
                            });
                        });
                    }

                    this.organizationDetailDescriptors =  this.detailDescriptors;
                }
            });
    }
}
