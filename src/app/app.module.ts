import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitHubOrganizationsTableComponent } from './git-hub-organizations-table/git-hub-organizations-table.component';
import { PaginationWidgetComponent } from './pagination-widget/pagination-widget.component';
import { PaginatedGitHubOrganizationsTableComponent } from './paginated-git-hub-organizations-table/paginated-git-hub-organizations-table.component';
import { GitHubOrganizationDetailsComponent } from './git-hub-organization-details/git-hub-organization-details.component';
import { LabeledSelectorComponent } from './labeled-selector/labeled-selector.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        GitHubOrganizationsTableComponent,
        PaginationWidgetComponent,
        PaginatedGitHubOrganizationsTableComponent,
        GitHubOrganizationDetailsComponent,
        LabeledSelectorComponent,
        HeaderBarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [
        HttpClientModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
