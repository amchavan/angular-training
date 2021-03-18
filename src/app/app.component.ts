import { Component,OnInit } from '@angular/core';
import { GitHubOrganizationsService } from './git-hub-organizations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'angular-training';
	
	gitHubOrganizations: string;
  
	constructor( private gitHubOrganizationsService: GitHubOrganizationsService ) {  }

	ngOnInit(): void {
		this.gitHubOrganizationsService.fetchOrganizations( 
			5, (organizations) => this.gitHubOrganizations = JSON.stringify(organizations, undefined, 4 ) );
	}
}
