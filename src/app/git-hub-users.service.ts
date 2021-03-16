import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { GitHubUsers } from './git-hub-users';

@Injectable({
  providedIn: 'root'
})
export class GitHubUsersService {

  constructor(private httpClient : HttpClient) { }

  fetchUsers( count: number, callback: (data : GitHubUsers[]) => void): void {
    const url = environment.gitHubApiUrl + '/users?per_page=' + count;
    this.httpClient.get<GitHubUsers[]>( url )
        .toPromise()
        .then( data => callback( data))
        .catch( error => console.error( JSON.stringify( error )));
  }
}
