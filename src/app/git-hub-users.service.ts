import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubUsers} from './git-hub-users';

@Injectable({
  providedIn: 'root'
})
export class GitHubUsersService {

  private gitBubUserBaseUrl = 'https://api.github.com/users';
  private perPage = '?per_page=';

  constructor(private httpClient: HttpClient) {}

  /**
   * brings users from github
   * @param count: the number of users
   * @param callback: the callback for the component
   */
  fetchUsers(count: number, callback: (data: Array<GitHubUsers>) => void): void {
    this.httpClient.get<Array<GitHubUsers>>(
        this.gitBubUserBaseUrl + this.perPage + count).toPromise()
        .then(data => callback(data))
        .catch(error => console.error(JSON.stringify(error)));
  }
}
