import {Component, OnInit} from '@angular/core';
import {TemperatureSensorService} from './temperature-sensor.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    temperatureStream: Observable<any>;
    rawTemperatureStream: Observable<any>;
    stoppableTemperatureStream: Observable<any>;
    isMonitorActive = true;

    constructor( private temperatureSensorService: TemperatureSensorService ) {}

    ngOnInit(): void {
        this.rawTemperatureStream = this.temperatureSensorService.getTemperatureSensor();
        this.stoppableTemperatureStream = this.rawTemperatureStream.pipe(
            filter( () => this.isMonitorActive )
        );

        this.temperatureStream = this.stoppableTemperatureStream;
    }
}
