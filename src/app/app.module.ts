import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitHubOrganizationsTableComponent } from './git-hub-organizations-table/git-hub-organizations-table.component';
import { PaginationWidgetComponent } from './pagination-widget/pagination-widget.component';
import { PaginatedGitHubOrganizationsTableComponent } from './paginated-git-hub-organizations-table/paginated-git-hub-organizations-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        AppComponent,
        GitHubOrganizationsTableComponent,
        PaginationWidgetComponent,
        PaginatedGitHubOrganizationsTableComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule
    ],
    providers: [
        HttpClientModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
