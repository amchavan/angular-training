import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';
import { CacheData } from './cache-data';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    public static DEFAULT_DATA_PAGE_SIZE = 5;

    private readonly pageMarkers: number[];

    private cache: CacheData[] = [];

    private organizationsUrl = environment.gitHubApiUrl + '/organizations?per_page=';

    static errorHandler( error: any ): void {
        const errorString = error as Error ? error.message : JSON.stringify( error );
        console.error( '>>> Central error handling:', errorString );
    }

    constructor( private httpClient: HttpClient ) {
        this.pageMarkers = [0];
    }

    fetchOrganizationsPage( pageSize: number,
                            page = 1,
                            catchErrors: boolean = true ): Promise< void | GitHubOrganization[] > {

        const promise = this.fetchOrganizationsPageInternal( pageSize, page );
        return catchErrors
            ? promise.catch( error => GitHubOrganizationsService.errorHandler( error ))
            : promise;
    }

    /** Rudimentary paging queries of the organizations API -- don't use in production :-) */
    private fetchOrganizationsPageInternal(pageSize: number, page: number): Promise<void | GitHubOrganization[]> {

        const cachedData: Promise<void | GitHubOrganization[]> = this.getCachedData(pageSize, page);
        if (cachedData) {
            console.log("=====> WE HIT CACHE!");
            return cachedData;

        } else {
            console.log("=====> not cached :(");

            // Check page number: it should
            if (page < 1 || page > this.pageMarkers.length) {
                const errorMessage = `Invalid page number: ${page}, should be between 1 and ${this.pageMarkers.length}`;
                return new Promise((resolve, reject) => reject(new RangeError(errorMessage)));
            }

            // If this is the first call, ignore the page number and get the first page
            if (this.pageMarkers.length === 1) {
                page = 1;
            }

            // Build the organization page URL, see https://docs.github.com/en/rest/reference/orgs#list-organizations
            // Need to retrieve entries whose ID is larger than the largest ID of the previous page
            const previousPage = page - 1;
            const previousPageMarker = this.pageMarkers[previousPage];
            const url = this.organizationsUrl + pageSize + '&since=' + previousPageMarker;

            // Read the requested page and, before we return the promise, save
            // the ID of the last organization in the pageMarkers array
            const promise = this.httpClient.get<GitHubOrganization[]>(url).toPromise();
            promise.then((organizationPage) => {
                const actualPageSize = organizationPage.length;
                const lastOrganizationIndex = actualPageSize - 1;
                const lastOrganization = organizationPage[lastOrganizationIndex];
                this.pageMarkers[page] = lastOrganization.id;
            });
            let cacheData = new CacheData();
            cacheData.pageSize = pageSize;
            cacheData.page = page;
            cacheData.data = promise;
            this.cache.push(cacheData);
            return promise;
        }
    }

    getCachedData(pageSize: number, page: number): Promise <void | GitHubOrganization[]> {
        for (let c of this.cache){
            if ((c.page === page) && (c.pageSize === pageSize)){
                console.log("=====> WE HIT CACHE for page: [" + page + "] and pageSize: [" + pageSize + "] <=====");
                return c.data;
            }
        } 
        console.log("=====> NO cache for page: [" + page + "] and pageSize: [" + pageSize + "] <===== :(");
        return;
    }

    // Test method for fetchOrganizationsPage();
    async fetchOrganizationsPageTest(): Promise<void> {
        await this.fetchOrganizationsPage( 10, 0 );    // ERROR

        await this.fetchOrganizationsPage( 10, 2 );    // ERROR

        await this.fetchOrganizationsPage( 10, 1 )
            .then( organizations => console.log( '10, 1', organizations ));

        await this.fetchOrganizationsPage( 10, 2 )
            .then( organizations => console.log(  '10, 2', organizations ));

        await this.fetchOrganizationsPage( 10, 3 )
            .then( organizations => console.log(  '10, 3', organizations ));

        await this.fetchOrganizationsPage( 10, 2 )
            .then( organizations => console.log(  '10, 2', organizations ));

        await this.fetchOrganizationsPage( 10, 5 );    // ERROR
    }
}
