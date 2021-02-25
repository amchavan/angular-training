import { Observable } from 'rxjs';

function typeMessage(message: string): void {
    console.log( message );
}

const observable = new Observable( subscriber => {
    subscriber.next( 'First' );
    setTimeout(() => { subscriber.next( 'Second' ); }, 1000);
    subscriber.next( 'Third' );
});

observable.subscribe({
    next: msg => typeMessage( msg as string ),
    error: error => console.error( error )
});

const observable2 = new Observable( subscriber => {
    setInterval(() => { subscriber.next( 'Stop me!' ); }, 1000);
});

observable2.subscribe({
    next: msg => typeMessage( msg as string ),
    error: error => console.error( error )
});
