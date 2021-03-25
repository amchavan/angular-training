import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubOrganization} from './git-hub-organization';

@Injectable({
  providedIn: 'root'
})
export class GithubtableService {

  constructor(private httpClient: HttpClient) { }

  fetchOrganizations(count: number, callback: (data: GitHubOrganization[]) => void ): void {
	const url = 'https://api.github.com/organizations?per_page=' + count;
	this.httpClient.get<GitHubOrganization[]>( url )
		.toPromise()
		.then(data  => callback( data ))
		.catch(error => console.error(JSON.stringify(error)));
    }
}
