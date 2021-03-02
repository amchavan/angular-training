import { SensorData } from './sensor-data';
import { Injectable, Input } from '@angular/core';
import { Observable, of, timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BandThreeSensorService {

  sensorData: SensorData;
  sensor: Observable<SensorData>;
  timer: Observable<number> = timer(1000, 1000);

  @Input()
  knob: boolean = true;

  constructor() {
    this.sensorData = { "time": "five", "temperature": 45.6 };
    this.sensor = new Observable(subscriber => {
      var dataCapture = this.timer.subscribe((seconds) => {
        var currentTemp: number = seconds;
        this.sensorData.temperature = currentTemp;
        subscriber.next(this.sensorData);
        //console.log(seconds);
      });
    });
  }

}
