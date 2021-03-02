import { SensorData } from './sensor-data';
import { Injectable, Input } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BandThreeSensorService {

  sensor: Observable<SensorData>;
  timer: Observable<number> = timer(1000, 1000);

  temp = 100.1;

  constructor() {
    this.sensor = new Observable(subscriber => {
      var dataCapture = this.timer.subscribe((seconds) => {
        const sensorData = new SensorData();
        var num: number = Math.sin(seconds);
        this.temp = this.temp + num;
        sensorData.temperature = this.temp;
        sensorData.timestamp = new Date();
        subscriber.next(sensorData);
       // console.log(JSON.stringify(sensorData));
      });
    });
  }

}
