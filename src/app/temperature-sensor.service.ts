import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TemperatureSensorService {

    temperatureSensor: Observable<any>;
    constructor() {
        this.temperatureSensor = new Observable<any>( (subscriber: Observer<any>) => {
            let temperature = 0;
            setInterval( () => {
                console.log( temperature );
                subscriber.next( temperature++ );
            }, 125 );
        });
    }

    public getTemperatureSensor(): Observable<any> {
        return this.temperatureSensor;
    }
}
