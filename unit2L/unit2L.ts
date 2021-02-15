function truthyOrFalsy(): void {

    let xAny;
    console.log( `${xAny} is ${!!xAny}` );
    
    xAny = null;
    console.log( `${xAny} is ${!!xAny}` );
    
    let xNumber = 0;
    console.log( `${xNumber} is ${!!xNumber}` );

    xNumber = 1;
    console.log( `${xNumber} is ${!!xNumber}` );

    xNumber = -1;
    console.log( `${xNumber} is ${!!xNumber}` );

    xNumber = Infinity;
    console.log( `${xNumber} is ${!!xNumber}` );

    xNumber = NaN;
    console.log( `${xNumber} is ${!!xNumber}` );

    let xString = '';
    console.log( `"${xString}" is ${!!xString}` );

    xString = 'abcd';
    console.log( `"${xString}" is ${!!xString}` );

    xString = 'true';
    console.log( `"${xString}" is ${!!xString}` );

    xString = 'false';
    console.log( `"${xString}" is ${!!xString}` );

    let xArray = [];
    console.log( `${JSON.stringify(xArray)} is ${!!xArray}` );

    xArray = [0];
    console.log( `${JSON.stringify(xArray)} is ${!!xArray}` );

    xArray = [1];
    console.log( `${JSON.stringify(xArray)} is ${!!xArray}` );

    xArray = [true];
    console.log( `${JSON.stringify(xArray)} is ${!!xArray}` );

    xArray = [false];
    console.log( `${JSON.stringify(xArray)} is ${!!xArray}` );

    let xObject = {};
    console.log( `${JSON.stringify(xObject)} is ${!!xObject}` );

    xObject = { name: 'spring.boot.version', value: '2.4.2' };
    console.log( `${JSON.stringify(xObject)} is ${!!xObject}` );
}

truthyOrFalsy();
