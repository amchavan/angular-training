import {of, pipe} from 'rxjs';
import {filter, map, timestamp} from 'rxjs/operators';

const recipe = pipe(
    filter( org => org < 'n' ),
    map( org => (org as string).toUpperCase() ),
    timestamp()
);

const organizationsObservable = of( 'nrao', 'alma', 'eso', 'naoj' );
const pipedObservable = recipe( organizationsObservable );

const observer = {
    next: value => console.log( JSON.stringify( value )),
    complete: () => console.log( 'Done' )
};

pipedObservable.subscribe( observer );
