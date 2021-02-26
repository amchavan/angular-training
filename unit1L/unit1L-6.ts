import {of, Subject} from 'rxjs';

const observer1 = {
    next: value => console.log( 'First observer saw', value ),
};

const observer2 = {
    next: value => console.log( 'Second observer saw', value ),
};

const subject = new Subject();
subject.subscribe( observer1 );
subject.subscribe( observer2 );

const observable = of( 1, 2, 3 );
observable.subscribe( subject );
