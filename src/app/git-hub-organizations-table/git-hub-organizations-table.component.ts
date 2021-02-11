import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-git-hub-organizations-table',
  templateUrl: './git-hub-organizations-table.component.html',
  styleUrls: ['./git-hub-organizations-table.component.css']
})
export class GitHubOrganizationsTableComponent implements OnInit {

  @Input()
  organizations: string;

  constructor() { }

  ngOnInit(): void {
  }

}
