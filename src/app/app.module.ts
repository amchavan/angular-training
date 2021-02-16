import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitHubOrganizationsTableComponent } from './git-hub-organizations-table/git-hub-organizations-table.component';
import { PaginationWidgetComponent } from './pagination-widget/pagination-widget.component';
import { PaginatedGitHubOrganizationsTableComponent } from './paginated-git-hub-organizations-table/paginated-git-hub-organizations-table.component';
import { KeyByKeyTextInputComponent } from './key-by-key-text-input/key-by-key-text-input.component';

@NgModule({
    declarations: [
        AppComponent,
        GitHubOrganizationsTableComponent,
        PaginationWidgetComponent,
        PaginatedGitHubOrganizationsTableComponent,
        KeyByKeyTextInputComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        HttpClientModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
