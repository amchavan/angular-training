import {Component, OnInit} from '@angular/core';
import {TemperatureSample, TemperatureSensorService} from './temperature-sensor.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

export interface PrintableTemperatureSample {
    value: string;
    timestamp: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    rawTemperatureStream: Observable<TemperatureSample>;
    stoppableTemperatureStream: Observable<TemperatureSample>;
    printableTemperatureStream: Observable<PrintableTemperatureSample>;
    temperatureStream: Observable<PrintableTemperatureSample>;

    isMonitorActive = true;

    constructor( private temperatureSensorService: TemperatureSensorService ) {
        // no-op
    }

    ngOnInit(): void {
        this.rawTemperatureStream = this.temperatureSensorService.getTemperatureSensor();

        // Make sure we stop monitoring when the checkbox is unchecked
        this.stoppableTemperatureStream = this.rawTemperatureStream.pipe(
            filter( () => this.isMonitorActive )
        );

        // Convert temperature to fixed format, timestamp to ISO datetime format
        this.printableTemperatureStream = this.stoppableTemperatureStream.pipe(
            map( rawDatapoint => ({
                value: rawDatapoint.value.toFixed( 2 ),
                timestamp: (new Date( rawDatapoint.timestamp )).toISOString() }))
        );

        // This is what we display on the UI
        this.temperatureStream = this.printableTemperatureStream;
    }
}
