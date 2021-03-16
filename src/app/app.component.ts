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
  public gitHubUsers = '';
  private gitHubUsersHolder: Array<GitHubUsers>;

  // the number of users to present
  N_USERS = 5;

  // constructor populating private variables
  constructor(private gitHubUserService: GitHubUsersService) {}

  private convertToString(): void {
    // go over the users and convert to the string
    for (const user of this.gitHubUsersHolder) {
      this.gitHubUsers += (
          'user_id' + user.id + '\n' + user.login + '\n' +
          user.site_admin + '\n' + user.type + '\n\n');
    }
  }

// when the class is displayed on the html.
  // when the class is displayed on the html.
  ngOnInit(): void {
    // call the fetch users method and populate local store.
    this.gitHubUserService.fetchUsers(
        this.N_USERS,
        (theGitHubUsers) => {
          this.gitHubUsersHolder = theGitHubUsers;
          this.convertToString();
        }
    );
  }
}
