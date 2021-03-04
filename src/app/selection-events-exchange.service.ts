import { EventEmitter, Injectable } from '@angular/core';
import { OrganizationSelectionEvent } from './organization-selection-event';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectionEventsExchangeService {

    private emitter = new EventEmitter<OrganizationSelectionEvent>();

    constructor() {
    }

    public send( event: OrganizationSelectionEvent ): void {
        this.emitter.next( event );
    }

    public getExchange(): Observable<OrganizationSelectionEvent> {
        return this.emitter.asObservable();
    }
}
