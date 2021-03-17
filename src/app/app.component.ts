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

  /**
   * converts the array of git hub users into a strong for presenting
   * @private
   */
  private convertToString(): void {
      // go over the users and convert to the string
      const tabSpace = '\t\t\t';
      this.gitHubUsers += (
          'user id' + tabSpace + 'user login' + tabSpace +
          'is site admin' + tabSpace + 'user type' + '\n');

      this.gitHubUsersHolder.forEach(user => {
          this.gitHubUsers +=
              user.id.toString().padStart(4).padEnd(24) +
              user.login.toString().padEnd(26) +
              user.type.toString().padStart(10).padEnd(30) +
              user.site_admin.toString().padStart(13).padEnd(30) + '\n';
      });
  }

  // when the class is displayed on the html.
  ngOnInit(): void {
    // call the fetch users method and populate local store.
    this.gitHubUserService.fetchUsers(
        this.N_USERS,
        (theGitHubUsers) => {
          this.gitHubUsersHolder = theGitHubUsers;
          this.convertToString();
        },
        (errorMessage) => {alert(errorMessage); }
    );

    // call error function
    this.gitHubUserService.fetchUsersError(
        this.N_USERS,
        (theGitHubUsers) => {
            this.gitHubUsersHolder = theGitHubUsers;
            this.convertToString();
        },
        (errorMessage) => {alert(errorMessage); }
    );
  }
}
