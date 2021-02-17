import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';

interface DataPage {
    marker: number;
    organizations: GitHubOrganization[];
}

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    static readonly DEFAULT_DATA_PAGE_SIZE = 10;

    private dataPages: DataPage[];
    private dataPageSize = GitHubOrganizationsService.DEFAULT_DATA_PAGE_SIZE;
    private organizationsUrl = environment.gitHubApiUrl + '/organizations?per_page=';

    static errorHandler( error: any ): void {
        const errorString = error as Error ? error.message : JSON.stringify( error );
        console.error( '>>> Central error handling:', errorString );
    }

    constructor( private httpClient: HttpClient ) {
        this.clearOrganizationsCache();
    }

    setDataPageSize( dataPageSize: number ): void {
        this.dataPageSize = dataPageSize;
        this.clearOrganizationsCache();
    }

    fetchOrganizationsPage( page = 1,
                            catchErrors: boolean = true ): Promise< void | GitHubOrganization[] > {

        const promise = this.fetchOrganizationsPageInternal( page );
        return catchErrors
            ? promise.catch( error => GitHubOrganizationsService.errorHandler( error ))
            : promise;
    }

    /** Rudimentary paging queries of the organizations API -- don't use in production :-) */
    private fetchOrganizationsPageInternal( page: number ): Promise< void | GitHubOrganization[] > {

        // Check page number
        if ( page < 1 || page > this.dataPages.length ) {
            const errorMessage = `Invalid page number: ${page}, should be between 1 and ${this.dataPages.length}`;
            return new Promise( (resolve, reject) => reject( new RangeError( errorMessage )));
        }

        // If we have cached that page already, let's just return it
        if (page < this.dataPages.length ) {
            return new Promise<GitHubOrganization[]>((resolve, ignored) => {
                resolve(this.dataPages[page].organizations);
            });
        }

        // If this is the first call, override the page number and get the first page
        if ( this.dataPages.length === 1 ) {
            page = 1;
        }

        // Build the organization page URL, see https://docs.github.com/en/rest/reference/orgs#list-organizations
        // Need to retrieve entries whose ID is larger than the largest ID of the previous page
        const previousPage = page - 1;
        const previousPageMarker = this.dataPages[ previousPage ].marker;
        const url = this.organizationsUrl + this.dataPageSize + '&since=' + previousPageMarker;

        // Read the requested page and, before we return the promise, save
        // the ID of the last organization in the pageMarkers array
        const promise = this.httpClient.get<GitHubOrganization[]>( url ).toPromise();
        promise.then( (organizationPage) => {
            const actualPageSize = organizationPage.length;
            const lastOrganizationIndex = actualPageSize - 1;
            const lastOrganization = organizationPage[ lastOrganizationIndex ];
            this.dataPages[ page ] = {
                marker: lastOrganization.id,
                organizations: organizationPage
            };
        });

        return promise;
    }

    public clearOrganizationsCache(): void {
        this.dataPages = [
            { marker: 0, organizations: [] }
        ];
    }

    // Test method for fetchOrganizationsPage();
    async fetchOrganizationsPageTest(): Promise<void> {
        await this.fetchOrganizationsPage( 0 );    // ERROR

        await this.fetchOrganizationsPage( 2 );    // ERROR

        await this.fetchOrganizationsPage( 1 )
            .then( organizations => console.log( '1', organizations ));

        await this.fetchOrganizationsPage( 2 )
            .then( organizations => console.log(  '2', organizations ));

        await this.fetchOrganizationsPage( 3 )
            .then( organizations => console.log(  '3', organizations ));

        await this.fetchOrganizationsPage( 2 )
            .then( organizations => console.log(  '2', organizations ));

        await this.fetchOrganizationsPage( 5 );    // ERROR
    }
}
