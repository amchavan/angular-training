import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitHubOrganizationsService {

  
  
  constructor(private httpClient: HttpClient) { }
  
  fetchOrganizations(count: number, callback: (data: any) => void): void {
	const url = 'https://api.github.com/organizations?per_page=' + count;
	this.httpClient.get( url )
		.toPromise()
		.then(data  => callback( data ))
		.catch(error => console.error(JSON.stringify(error)));
    }
}
