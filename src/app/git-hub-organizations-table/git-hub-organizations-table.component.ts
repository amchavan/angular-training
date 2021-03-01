import {Component, Input, OnInit} from '@angular/core';
import {GitHubOrganization} from '../git-hub-organization';
import {SelectionEventsExchangeService} from '../selection-events-exchange.service';
import {OrganizationSelectionEvent} from '../organization-selection-event';

@Component({
    selector: 'app-git-hub-organizations-table',
    templateUrl: './git-hub-organizations-table.component.html',
    styleUrls: ['./git-hub-organizations-table.component.css']
})
export class GitHubOrganizationsTableComponent implements OnInit {

    @Input()
    organizations: GitHubOrganization[];

    lastSelected: GitHubOrganization;

    constructor( private exchange: SelectionEventsExchangeService ) {
    }

    ngOnInit(): void {
    }

    selectedRow( organization: GitHubOrganization ): void {
        const message: OrganizationSelectionEvent = { organization }; // using shorthand instead of { organization: organization }
        this.exchange.send( message );

        if (this.lastSelected){
            this.lastSelected.selected = false;
        }
        organization.selected = true;
        this.lastSelected = organization;

    }
}
