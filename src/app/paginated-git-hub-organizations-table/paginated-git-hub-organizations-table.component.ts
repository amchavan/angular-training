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
    pageSize: number;
    pageSizes: number[];

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {
        this.pageSize = 10;
        this.pageSizes = [5, 10, 15, 20, 25, 30];
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

    private clearOrganizationsCache(): void {
        this.gitHubOrganizationsService.clearOrganizationsCache();
    }

    newPageSizeEventHandler( newPageSize: number ): void {
        console.log( '>>>', newPageSize );
        if ( this.pageSize !== newPageSize ) {
            this.pageSize = newPageSize;
            this.currentPage = 1;
            this.clearOrganizationsCache();
            this.loadOrganizationsPage( this.pageSize, this.currentPage );
        }
    }
}
