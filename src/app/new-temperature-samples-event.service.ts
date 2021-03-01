import {NewTemperatureSamplesEvent} from './new-temperature-samples-event';
import {Observable} from 'rxjs';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewTemperatureSamplesEventService {

  private emitter = new EventEmitter<NewTemperatureSamplesEvent>();

  constructor() {
  }

  public send( event: NewTemperatureSamplesEvent  ): void {
    this.emitter.next( event );
  }

  public getExchange(): Observable<NewTemperatureSamplesEvent> {
    return this.emitter.asObservable();
  }
}
