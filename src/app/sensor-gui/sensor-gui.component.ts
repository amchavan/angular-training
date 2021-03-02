import { SensorData } from './../sensor-data';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Observable, ObservableInput, Observer, of } from 'rxjs';
import { BandThreeSensorService } from '../band-three-sensor.service';

@Component({
  selector: 'app-sensor-gui',
  templateUrl: './sensor-gui.component.html',
  styleUrls: ['./sensor-gui.component.css']
})
export class SensorGuiComponent implements OnInit, AfterViewInit, Observer<BandThreeSensorService> {

  public observable: Observable<SensorData>;
  sensorData: SensorData;

  constructor(private band3: BandThreeSensorService) { 
    this.sensorData = new SensorData();
    this.sensorData.time = "zero";
    this.sensorData.temperature = 0.0;
  }

  ngOnInit(): void {
    console.log("oninit");
  }

  ngAfterViewInit(): void {
    this.observable = this.band3.sensor;
    this.observable.subscribe(this);
  }

  next(data) {
    //console.log("time: " + data.time + " temperature: " + data.temperature);
    this.sensorData.time = data.time;
    this.sensorData.temperature = data.temperature;
    console.log("sensorData: " + JSON.stringify(this.sensorData));
  }

  error(data: any) {
    console.log("error: " + data);
  }

  complete() {
    console.log("complete.");
  }




}
