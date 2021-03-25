import { Component, OnInit } from '@angular/core';
import { GithubtableService } from './githubtable.service';


@Component({
  selector: 'app-githubtable',
  templateUrl: './githubtable.component.html',
  styleUrls: ['./githubtable.component.css']
})
export class GithubtableComponent implements OnInit {

	gitHubTableOrganizations: string[];
  constructor(private githubtableService: GithubtableService) { }

  ngOnInit(): void {
		this.githubtableService.fetchOrganizations( 
			5, (organizations) => this.gitHubTableOrganizations = JSON.stringify(organizations, undefined, 4 ) );
	}

}
