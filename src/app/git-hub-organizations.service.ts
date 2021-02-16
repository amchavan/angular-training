import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    // This URL will always cause a '404 Not Found' error
    private organizationsUrl = environment.gitHubApiUrl + '/organizations?per_page=';

    static errorHandler( error: any ): void {
        console.error( '>>> Central error handling:', JSON.stringify( error ));
    }

    constructor( private httpClient: HttpClient ) {
    }

    fetchOrganizations(count: number): Promise< GitHubOrganization[] > {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        return this.httpClient.get<GitHubOrganization[]>(url)
            .toPromise();
    }

    // fetchOrganizations( count: number,
    //                     catchErrors: boolean = true ): Promise< void | GitHubOrganization[] > {
    //     const promise = this.httpClient.get<GitHubOrganization[]>( this.organizationsUrl + count ).toPromise();
    //     return catchErrors
    //         ? promise.catch( GitHubOrganizationsService.errorHandler )
    //         : promise;
    // }
}
