import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {GhtableService} from '../ghtable.service'
import {GitHubOrganization} from '../git-hub-organization'

@Component({
  selector: 'app-ghtable',
  templateUrl: './ghtable.component.html',
  styleUrls: ['./ghtable.component.styl']
})
export class GhtableComponent implements OnInit {

  limit: string = "5"
  users: GitHubOrganization[] = [];
  allUsers: GitHubOrganization[] = [];
  errorMessage: any;

  @Input()
  currentPage = 1;

  @Output()
  nextPageEventEmitter = new EventEmitter<number>();

  constructor(private ghtableService: GhtableService) { }

  public getUsers() {
    this.ghtableService.getUsers(this.limit)
        .subscribe(
          (response) => {this.users = response},
          (error) => {this.errorMessage = error}
        )
  }

  ngOnInit(): void {
    this.loadPage();
  }

  previous(): void {
    if ( this.currentPage > 1 ) {
        this.currentPage--;
        this.nextPageEventEmitter.next( this.currentPage );
    }
    this.loadPage();
  }

  next(): void {
    this.currentPage++;
    this.nextPageEventEmitter.next( this.currentPage );
    this.loadPage();
  }

  loadPage(): void {
    this.ghtableService.getAllUsers()
    .subscribe(
      (response) => {this.allUsers = response.slice((this.currentPage*4)-4,this.currentPage*4)},
      (error) => {this.errorMessage = error}
    )
  }

}
