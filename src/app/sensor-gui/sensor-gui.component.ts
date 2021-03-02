import { SensorData } from './../sensor-data';
import { Component, OnInit } from '@angular/core';
import {Observable, ObservableInput, Observer, of} from 'rxjs';
import { BandThreeSensorService } from '../band-three-sensor.service';

@Component({
  selector: 'app-sensor-gui',
  templateUrl: './sensor-gui.component.html',
  styleUrls: ['./sensor-gui.component.css']
})
export class SensorGuiComponent implements OnInit, Observer<BandThreeSensorService> {

  currTime: string;
  currTemp: number;

  public observable: Observable<SensorData>;

  constructor(private sensors:BandThreeSensorService) { }

  ngOnInit(): void {
   this.observable = this.sensors.sensor;
   this.observable.subscribe(this);
  }

  next(data){
    console.log("next: " + data);
    let sensorData:SensorData = data;
    this.currTemp = sensorData.temperature;
    this.currTime = sensorData.time;
  }

  error(data:any) {
    console.log("error: " + data);
  }

  complete(){
    console.log("complete: ");
  }

}
