function truthyOrFalsy(): void {

    console.log( '----------------------------------' );
    console.log( 'True or False' );
    console.log( '----------------------------------' );

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

function equalOrReallyEqual(): void {

    console.log('----------------------------------');
    console.log('Equal or Really Equal');

    let xAny;
    let yAny;

    xAny = 0;
    yAny = false;
    console.log(`${xAny} == ${yAny}  => ${xAny == yAny}`);
    console.log(`${xAny} === ${yAny} => ${xAny === yAny}`);

    xAny = '';
    yAny = false;
    console.log(`"${xAny}" == ${yAny}  => ${xAny == yAny}`);
    console.log(`"${xAny}" === ${yAny} => ${xAny === yAny}`);

    xAny = '1';
    yAny = true;
    console.log(`"${xAny}" == ${yAny}  => ${xAny == yAny}`);
    console.log(`"${xAny}" === ${yAny} => ${xAny === yAny}`);

    xAny = '1';
    yAny = 1;
    console.log(`"${xAny}" == ${yAny}  => ${xAny == yAny}`);
    console.log(`"${xAny}" === ${yAny} => ${xAny === yAny}`);

    xAny = '';
    yAny = false;
    console.log(`"${xAny}" == ${yAny}  => ${xAny == yAny}`);
    console.log(`"${xAny}" === ${yAny} => ${xAny === yAny}`);
}

// truthyOrFalsy();
// equalOrReallyEqual();
