let compositeMessage = '';

function addMessage(message: string): void {
    compositeMessage += message + ' ';
}

function addMessageAfterDelay(message: string): void {
    setTimeout(() => addMessage(message), 1000);
}

function example1(): void {
    compositeMessage = '';
    addMessage('First');
    addMessageAfterDelay('Second');
    addMessage('Third');
    console.log('>>>', compositeMessage);
}

example1();

function addMessagePromise( message: string ): Promise<void> {
    return new Promise( (resolve, reject) => {
        setTimeout(() => { compositeMessage += message + ' '; resolve(); },  1000);
    });
}

function example2(): void {
    compositeMessage = '';
    addMessage( 'First' );
    addMessagePromise( 'Second' )
        .then( () => {
            addMessage( 'Third' );
            console.log( '>>>', compositeMessage);
        });
}

// example2();

function squareRootPromise( x: number ): Promise<string|number> {
    return new Promise<string|number>( (resolve, reject) => {
        if ( x < 0 ) {
            reject( `Negative arg: ${x}` );
        }
        else {
            resolve( Math.sqrt( x ));
        }
    });
}

function example3(): void {
    let x = 9;
    squareRootPromise( x ).then( sqrt => console.log( '>>> sqrt(' + x + ') = ' + sqrt ));

    x = -1;
    squareRootPromise( x ).catch( error => console.error( '>>> ' + error ));
}

// example3();

function example4(): void {
    compositeMessage = '';
    addMessage( 'First' );
    addMessagePromise( 'Second' )
        .then( () => addMessage( 'Third' ))
        .then( () => console.log( '>>>', compositeMessage ));
}

// example4();

async function example5(): Promise<void> {
    compositeMessage = '';
    addMessage( 'First' );
    await addMessagePromise( 'Second' );
    addMessage( 'Third' );
    console.log( '>>>', compositeMessage);
}

// example5();
