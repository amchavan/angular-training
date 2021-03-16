import { Component, OnInit } from '@angular/core';
import { GitHubOrganizationsService } from './git-hub-organizations.service';
import { GitHubUsersService } from './git-hub-users.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    gitHubOrganizations: string;
    gitHubUsers : string;

    constructor( private gitHubOrganizationsService: GitHubOrganizationsService,
                private gitHubUsersService: GitHubUsersService ) {
    }

    ngOnInit(): void {
        this.gitHubOrganizationsService.fetchOrganizations(
            3,
            (organizations) => this.gitHubOrganizations = JSON.stringify(organizations, undefined, 4 ),
            (error: JSON) =>  { const errormsg = ` HTTP Error occured, response code: ${error['status']}`
                                alert(errormsg);
                              }
        
        );
        
        this.gitHubUsersService.fetchUsers(
          3,
          (users) => {
            this.gitHubUsers = '';
            users.forEach(user => {
              console.log("Doing a user")
              const userString = `\n ${user.id.toLocaleString().padEnd(5)} : ${user.login.padEnd(10)} : ${user.site_admin.toString().padEnd(6)} : ${user.type}`;
              this.gitHubUsers = this.gitHubUsers.concat(userString)
              }
            )
          }
        )
            
    }
}
