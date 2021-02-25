import {Observer, of} from 'rxjs';

const observable = of( 1, 2, 3 );

const observer: Observer<number> = {
    next: value => console.log( value ),
    error: error => console.error( error ),
    complete: () => console.log( 'Done' )
};

observable.subscribe( observer );
