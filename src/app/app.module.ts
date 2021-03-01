import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MainAreaTopComponent } from './main-area-top/main-area-top.component';
import { MainAreaLeftComponent } from './main-area-left/main-area-left.component';
import { MainAreaRightComponent } from './main-area-right/main-area-right.component';
import { UtilitiesBarComponent } from './utilities-bar/utilities-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderBarComponent,
        NavigationBarComponent,
        MainAreaTopComponent,
        MainAreaLeftComponent,
        MainAreaRightComponent,
        UtilitiesBarComponent,
        FooterBarComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
