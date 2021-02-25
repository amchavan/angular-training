import {of} from 'rxjs';

const observable = of( 1, 2, 3 );

const observer1 = {
    next: value => console.log( '1:', value ),
};

const observer2 = {
    next: value => console.log( '2:', value ),
};

observable.subscribe( observer1 );
observable.subscribe( observer2 );
