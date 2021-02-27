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

    temperatureSensor: Observable<TemperatureSample>;

    constructor() {
        this.temperatureSensor = new Observable<number>( subscriber => {
            let temperature = 0;
            setInterval( () => {
                subscriber.next( temperature++ );
            }, 125 );
        }).pipe(
            timestamp(),
            tap( x => console.log( '>>>', JSON.stringify( x )))
        );
    }

    public getTemperatureSensor(): Observable<any> {
        return this.temperatureSensor;
    }
}
