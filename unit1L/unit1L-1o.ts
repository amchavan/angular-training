import { Observable } from 'rxjs';

function typeMessage(message: string): void {
    console.log( message );
}

const observable = new Observable( subscriber => {
    subscriber.next( 'First' );
    setTimeout(() => { subscriber.next( 'Second' ); }, 1000);
    subscriber.next( 'Third' );
});

const observer = {
    next: msg => typeMessage( msg as string ),
    error: error => console.error( error )
};

observable.subscribe( observer );
