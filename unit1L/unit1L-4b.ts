function typeMessage(message: string): void {
    console.log( message );
}

// function typeMessageAfterDelay(message: string): void {
//     setTimeout(() => typeMessage(message), 1000);
// }

function typeMessagePromise(message: string): Promise<void> {
    return new Promise( (resolve, reject) => {
        setTimeout(() => { typeMessage(message); resolve(); },  1000);
    });
}

async function example4b(): Promise<void> {
    typeMessage( 'First' );
    await typeMessagePromise( 'Second' );
    typeMessage( 'Third' );
}

example4b();
