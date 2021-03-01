import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {tap, timestamp} from 'rxjs/operators';

export interface TemperatureSample {
    value: number;
    timestamp: number;
}

@Injectable({
    providedIn: 'root'
})
export class TemperatureSensorService {

    readonly CYCLE_DURATION = 60 * 1000;
    readonly SAMPLING_INTERVAL = 100;
    readonly SAMPLES = this.CYCLE_DURATION / this.SAMPLING_INTERVAL;
    readonly AMPLITUDE = 10;
    readonly BASE_TEMPERATURE = 20;

    sample = 0;
    temperatureSensor: Observable<TemperatureSample>;

    constructor() {
        this.temperatureSensor = new Observable<number>( subscriber => {
            setInterval( () => {
                // Generate a sinusoidal centered on BASE_TEMPERATURE with a period of CYCLE_DURATION
                // A random noise ± 2.5 degrees is added as well
                const temperature = this.BASE_TEMPERATURE +
                                    Math.sin( (this.sample / this.SAMPLES) * ( 2 * Math.PI )) * this.AMPLITUDE +
                                    (Math.random() * 5) - 2.5 ;
                subscriber.next( temperature );
                this.sample = (++ this.sample) % this.SAMPLES;
            }, this.SAMPLING_INTERVAL );
        }).pipe(
            timestamp(),
            tap( x => console.log( '>>>', JSON.stringify( x )))
        );
    }

    public getTemperatureSensor(): Observable<any> {
        return this.temperatureSensor;
    }
}
