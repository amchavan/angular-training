import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SensorGuiComponent } from './sensor-gui/sensor-gui.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorGuiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
