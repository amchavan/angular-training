import { SensorData } from './sensor-data';
import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandThreeSensorService {

  sensorData: SensorData;
  sensor: Observable<SensorData>;

  @Input()
  knob: boolean = true;

  constructor() {
    this.sensorData = {"time": "five", "temperature": 45.6};
    this.sensor = of(this.sensorData);
  }

  public sensorSubscriber(observer:any){
    while (this.knob){
      console.log("hey!")
      observer.next(this.sensorData)
      this.sleepy();
    }
  };

  async sleepy(){
    await this.delay(1000);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
