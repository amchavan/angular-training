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

function example5(): void {
    const good = 9;
    squareRootPromise( good ).then( sqrt => console.log( 'sqrt(' + good + ') = ' + sqrt ));

    const bad = -1;
    squareRootPromise( bad ).catch( error => console.error( error ));
}

example5();
