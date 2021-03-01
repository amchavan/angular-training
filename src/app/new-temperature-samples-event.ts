import {TemperatureSample} from './temperature-sensor.service';

export interface NewTemperatureSamplesEvent {
    samples: TemperatureSample[];
}
