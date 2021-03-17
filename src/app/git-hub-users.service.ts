import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GitHubUsers} from './git-hub-users';

@Injectable({
  providedIn: 'root'
})
export class GitHubUsersService {

  private gitHubUserBaseErrorUrl = 'https://api.github.com/organizations/not-found';
  private gitHubUserBaseUrl = 'https://api.github.com/users';
  private perPage = '?per_page=';

  constructor(private httpClient: HttpClient) {}

  /**
   * brings users from github
   * @param count: the number of users
   * @param callback: the callback for the component
   * @param errorCallback: the optional callback for errors
   */
  fetchUsers(
      count: number,
      callback: (data: Array<GitHubUsers>) => void,
      errorCallback?: (message: string) => void): void {
    this.httpClient.get<Array<GitHubUsers>>(
        this.gitHubUserBaseUrl + this.perPage + count).toPromise()
        .then(data => callback(data))
        .catch(error => errorCallback(JSON.stringify(error)));
  }

  /**
   * brings a error from github
   * @param count: the number of users
   * @param callback: the callback for the component
   * @param errorCallback: the optional callback for errors
   */
  fetchUsersError(
      count: number,
      callback: (data: Array<GitHubUsers>) => void,
      errorCallback?: (message: string) => void): void {
    this.httpClient.get<Array<GitHubUsers>>(
        this.gitHubUserBaseErrorUrl + this.perPage + count).toPromise()
        .then(data => callback(data))
        .catch(error => errorCallback(JSON.stringify(error)));
  }
}
