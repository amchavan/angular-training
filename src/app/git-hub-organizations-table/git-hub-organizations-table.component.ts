import {Component, Input, OnInit} from '@angular/core';
import {GitHubOrganization} from '../git-hub-organization';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-git-hub-organizations-table',
    templateUrl: './git-hub-organizations-table.component.html',
    styleUrls: ['./git-hub-organizations-table.component.css']
})
export class GitHubOrganizationsTableComponent implements OnInit {

    displayedColumns: string[] = ['id', 'login', 'url', 'description'];

    @Input()
    organizations: GitHubOrganization[];
   
    constructor() {
        const i = 0;
    }

    ngOnInit(): void {
        const i = 0;
    }

}
