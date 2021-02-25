import { OrganizationSelectionEvent } from './../organization-selection-event';
import { SelectionEventsExchangeService } from './../selection-events-exchange.service';
import { GitHubOrganizationDetails } from './../git-hub-organization-details';
import { Component, OnInit, EventEmitter } from '@angular/core';
import {GitHubOrganization} from '../git-hub-organization';
import {GitHubOrganizationsService} from '../git-hub-organizations.service';

@Component({
    selector: 'app-paginated-git-hub-organizations-table',
    templateUrl: './paginated-git-hub-organizations-table.component.html',
    styleUrls: ['./paginated-git-hub-organizations-table.component.css']
})
export class PaginatedGitHubOrganizationsTableComponent implements OnInit {

    gitHubOrganizations: GitHubOrganization[];
    currentPage = 1;    // Always start from the first page!
    pageSize = GitHubOrganizationsService.DEFAULT_DATA_PAGE_SIZE;
    pageSizes = [2, 5, 10, 15, 20, 25, 30];
    dataPageSizeSelectorLabel = 'Page size';

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService, private exchange:SelectionEventsExchangeService  ) {
    }

    ngOnInit(): void {
        this.setDataPageSize( this.pageSize );
        this.loadOrganizationsPage( this.currentPage );
    }

    newPageNumberEventHandler( newPageNumber: number ): void {
        this.currentPage = newPageNumber;
        this.loadOrganizationsPage( this.currentPage );
    }

    newPageSizeEventHandler( newPageSize: number ): void {
        console.log( '>>>', newPageSize );
        if ( this.pageSize !== newPageSize ) {

            this.pageSize = newPageSize;
            this.setDataPageSize( this.pageSize );

            // Since we changed the size of the data pages the cache is now
            // dead and the service will fetch the first page, regardless.
            // Let's align our display with that
            this.currentPage = 1;
            this.loadOrganizationsPage( this.currentPage );
        }
    }

    private loadOrganizationsPage( currentPage: number ): void {
        this.gitHubOrganizationsService
            .fetchOrganizationsPage( currentPage )
            .then(organizations => {
                if (organizations) {
                    this.gitHubOrganizations = organizations;
                }
            });
    }

    private setDataPageSize( dataPageSize: number ): void {
        this.gitHubOrganizationsService.setDataPageSize( dataPageSize );
    }
}
