import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GitHubOrganizationsTableComponent } from './git-hub-organizations-table/git-hub-organizations-table.component';

@NgModule({
    declarations: [
        AppComponent,
        GitHubOrganizationsTableComponent
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
