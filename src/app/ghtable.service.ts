import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { GitHubOrganization } from './git-hub-organization';


@Injectable({
  providedIn: 'root'
})
export class GhtableService {

  baseURL: string = "https://api.github.com/users?per_page=";

  basegenericURL : string = "https://api.github.com/users";

  constructor(private http: HttpClient) { }

  getUsers(limit: string): Observable<any> {
    return this.http.get(this.baseURL + limit )
  }

  getAllUsers(): Observable<GitHubOrganization[]> {
    return this.http.get<GitHubOrganization[]>(this.basegenericURL)
  }


}
