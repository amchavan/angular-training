import {of} from 'rxjs';
import {filter, map, timestamp} from 'rxjs/operators';

const observable = of( 'nrao', 'alma', 'eso', 'naoj' )
    .pipe(
        filter( org => org < 'n' ),  // Sorry NRAO and NAOJ!
        map( org => org.toUpperCase() ),
        timestamp()
    );

const observer = {
    next: value => console.log( JSON.stringify( value )),
    complete: () => console.log( 'Done' )
};

observable.subscribe( observer );
