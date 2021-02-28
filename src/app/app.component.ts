import {Component, OnInit} from '@angular/core';
import {TemperatureSample, TemperatureSensorService} from './temperature-sensor.service';
import {Observable, Subject} from 'rxjs';
import {filter, map, sampleTime, scan} from 'rxjs/operators';

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

    readonly DISPLAY_INTERVAL_MSEC = 1000;
    readonly AVERAGE_INTERVAL_SEC = 5;

    isMonitorActive = true;

    stoppableTemperatureSubject: Subject<TemperatureSample>;
    printableTemperatureStream: Observable<PrintableTemperatureSample>;
    printableAverageStream: Observable<number>;

    temperatureStream: Observable<PrintableTemperatureSample>;
    averageStream: Observable<number>;

    static toISO( timestamp: number ): string {
        return (new Date( timestamp )).toISOString().substring( 0, 19 ).replace( 'T', ' ' );
    }

    constructor( private temperatureSensorService: TemperatureSensorService ) {

        const rawTemperatureStream = this.temperatureSensorService.getTemperatureSensor();

        // Make sure we stop monitoring when the checkbox is unchecked
        const stoppableTemperatureStream = rawTemperatureStream.pipe(
            filter( () => this.isMonitorActive )
        );

        // We want to multicast the temperature stream to multiple
        // Observers, so we push it through a Subject
        this.stoppableTemperatureSubject = new Subject<TemperatureSample>();
        stoppableTemperatureStream.subscribe( this.stoppableTemperatureSubject );

        // Downsample to the display interval
        // Convert temperature to fixed format
        // Timestamp to ISO datetime format
        this.printableTemperatureStream = this.stoppableTemperatureSubject.pipe(
            sampleTime( this.DISPLAY_INTERVAL_MSEC ),
            map( rawDatapoint => ({
                value: rawDatapoint.value.toFixed(2),
                timestamp: AppComponent.toISO( rawDatapoint.timestamp )
            }))
        );

        // Compute 5-sec moving average:
        // - downsample raw stream to 1 sec
        // - extract temp value from data point
        // - scan() operator to accumulate 5 values in a rotating array
        // - map() each array to the average of its elements
        // - downsample that stream to 5 sec
        this.printableAverageStream = this.stoppableTemperatureSubject.pipe(
            sampleTime( this.DISPLAY_INTERVAL_MSEC ),
            map( rawDatapoint => rawDatapoint.value ),
            scan((acc, curr) => {
                acc.push(curr);
                if ( acc.length > this.AVERAGE_INTERVAL_SEC ) {
                    acc.shift();
                }
                return acc;
                }, []),
            map( arr => arr.reduce( (acc, current) => acc + current, 0) / arr.length),
            sampleTime( this.AVERAGE_INTERVAL_SEC * this.DISPLAY_INTERVAL_MSEC )
        );
    }

    ngOnInit(): void {

        // This is what we display on the UI
        this.temperatureStream = this.printableTemperatureStream;
        this.averageStream = this.printableAverageStream;
    }
}
