import {Component, OnInit} from '@angular/core';
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
    filter: string;
    readonly pageSize = 10;
    readonly filterLabel = 'Filter';

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {
    }

    ngOnInit(): void {
        this.loadOrganizationsPage( this.pageSize, this.currentPage );
    }

    private loadOrganizationsPage( pageSize: number, currentPage: number ): void {
        this.gitHubOrganizationsService
            .fetchOrganizationsPage( pageSize, currentPage )
            .then(organizations => {
                if (organizations) {
                    this.gitHubOrganizations = organizations;
                }
            });
    }

    newPageNumberEventHandler( newPageNumber: number ): void {
        this.currentPage = newPageNumber;
        this.loadOrganizationsPage( this.pageSize, this.currentPage );
    }

    newFilterEventHandler( newFilter: string ): void {
        this.filter = newFilter;
    }
}
