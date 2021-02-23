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
    //readonly pageSize = 2;
    pageSize = GitHubOrganizationsService.DEFAULT_DATA_PAGE_SIZE;
    pageSizes = [5, 10, 15, 20, 25, 30];
    dataPageSizeSelectorLabel = 'Page size';


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


    newPageSizeEventHandler( newPageSize: number ): void {
        console.log( '>>>', newPageSize );
        if ( this.pageSize !== newPageSize ) {
            this.pageSize = newPageSize;
            //this.setDataPageSize( this.pageSize );
            this.currentPage = 1;
            this.loadOrganizationsPage(this.pageSize, this.currentPage );
        }
    }
}
