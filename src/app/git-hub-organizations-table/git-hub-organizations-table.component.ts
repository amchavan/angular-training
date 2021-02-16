import {Component, Input, OnInit} from '@angular/core';
import {GitHubOrganization} from '../git-hub-organization';

@Component({
    selector: 'app-git-hub-organizations-table',
    templateUrl: './git-hub-organizations-table.component.html',
    styleUrls: ['./git-hub-organizations-table.component.css']
})
export class GitHubOrganizationsTableComponent implements OnInit {

    @Input()
    organizations: GitHubOrganization[];

    @Input()
    filter: string;

    constructor() {
        const i = 0;
    }

    ngOnInit(): void {
        const i = 0;
    }

}
