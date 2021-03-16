import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';
import {environment} from '../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GitHubOrganizationsService {

    constructor( private httpClient: HttpClient ) {
    }

    fetchOrganizations( count: number,
                        callback: (data: GitHubOrganization[]) => void,
                        errorcallback?: (error: JSON) => void
                        ): void {
        const url = environment.gitHubApiUrl + '/organizations/notfound'//?per_page=' + count;
        this.httpClient.get<GitHubOrganization[]>( url )
            .toPromise()
            .then(  data  => callback( data ))
            .catch( error =>{
                console.error( JSON.stringify( error ));
                errorcallback(error);

            }
            )
    }
}
