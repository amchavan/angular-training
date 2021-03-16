import {Component, OnInit} from '@angular/core';
import {GitHubUsersService} from './git-hub-users.service';
import {GitHubUsers} from './git-hub-users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title of the component
  public title = 'angular-training';

  // store of github users
  public gitHubUsers: string;

  // the number of users to present
  N_USERS = 5;

  // constructor populating private variables
  constructor(private gitHubUserService: GitHubUsersService) {}

  // when the class is displayed on the html.
  ngOnInit(): void {
    // call the fetch users method and populate local store.
    this.gitHubUserService.fetchUsers(
      this.N_USERS,
      (theGitHubUsers) => {
        theGitHubUsers.forEach(
          user => {
            this.gitHubUsers += (
                user.id + '\n' + user.login + '\n' +
                user.site_admin + '\n' + user.type + '\n\n');
          }
        );
      }
    );
  }
}
