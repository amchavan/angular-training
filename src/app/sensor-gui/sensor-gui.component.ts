import { SensorData } from './../sensor-data';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { BandThreeSensorService } from '../band-three-sensor.service';

@Component({
  selector: 'app-sensor-gui',
  templateUrl: './sensor-gui.component.html',
  styleUrls: ['./sensor-gui.component.css']
})
export class SensorGuiComponent implements OnInit, AfterViewInit, Observer<BandThreeSensorService> {

  observable: Observable<SensorData>;
  sensorData: SensorData;
  dataArray: SensorData[] = [];

  constructor(private band3: BandThreeSensorService) { 
    this.sensorData = new SensorData();
    this.sensorData.timestamp = new Date();  
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
    this.dataArray.push(data);  
    this.sensorData.timestamp = data.timestamp;
    this.sensorData.temperature = data.temperature;
    this.sensorData.averageTemp = this.calculateAverage(5000);//millseconds
  }

  calculateAverage(interval: number): number {
    const now = new Date();
    var accum: number = 0.0;
    var ct: number = 0;
    var deleteCt = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const d:SensorData = this.dataArray[i];
      const ts = d.timestamp;
      const df: number =  now.getTime() - ts.getTime();
      //collect stats for all data objects less than interval old
      if (df <= interval){
        accum = accum + d.temperature;
        ct = ct+1;
      } else {
        //logan's run the older ones. 
        deleteCt = deleteCt + 1;
      }
    }
    //housekeeping - deletes the number of elements in deleteCt, begin at 0
    //This prevents infinite growth of stack
    this.dataArray.splice(0, deleteCt);
    var avg: number = accum/ct;
    return avg;
  }

  error(data: any) {
    console.log("error: " + data);
  }

  complete() {
    console.log("complete.");
  }




}
