# Unit 1L: Async TypeScript

Exploring how to deal with TypeScript asynchronous features.

## TypeScript from the command line

In this unit we'll write simple TypeScript scripts and run them 
from the command line. Before you start, please make sure you install the 
TypeScript compiler:
```
npm install -g typescript
```

## Basic example

In a script called _unit1L.ts_ we define a string variable and a method that concatenates
another string to it:
```typescript
let compositeMessage = '';

function addMessage(message: string): void {
    compositeMessage += message + ' ';
}
```
We also create an asynchronous version of the 
`addMessage()` method, one that waits for one second
before performing the concatenation:
```typescript
function addMessageAfterDelay(message: string): void {
    setTimeout(() => addMessage(message), 1000);
}
```

Finally, we call the two methods in a sequence:
```typescript

function example1(): void {
    compositeMessage = '';
    addMessage('First');
    addMessageAfterDelay('Second');
    addMessage('Third');
    console.log('>>>', compositeMessage);
}

example1();
```

We now compile the TypeScript source and run the resulting JavaScript code:
```text
cd unit1L 
tsc unit1L.ts && node unit1L.js 
```
One would expect to see
```text
>>> First Second Third
```
on the console, after about one second. In fact, what one sees is
```text
>>> First Third
```

What happens is, `setTimeout()` pushes its argument on the event queue: 
the callback (in our case the string concatenation) will be executed
after the expected delay, but `setTimeout()` _itself returns immediately_ 
and logging is performed before string _Second_ is added.  
`setTimeout()` is asynchronous: we can't wait for it to terminate, and it 
cannot return any values to the caller.

## Dealing with asynchronous functions

Async functions are very common in Web applications: all HTTP requests
are asynchronous, for instance. In the follow-up to Unit 1 we saw how 
to use _Promises_ to deal with HTTP requests, and we can do the same here.

We review `addMessageAfterDelay()`: we wrap a Promise around the 
Timeout object and return te Promise instead.
```typescript
function addMessagePromise( message: string ): Promise<void> {
    return new Promise( (resolve, reject) => {
        setTimeout(() => { compositeMessage += message + ' '; resolve(); },  1000);
    });
}
```

Now we can rewrite the example to use what we already know about Promises, 
making sure that the third concatenation operation _and_ the log statement 
are executed in then() clause:
```typescript
function example2(): void {
    compositeMessage = '';
    addMessage( 'First' );
    addMessagePromise( 'Second' )
        .then( () => {
            addMessage( 'Third' );
            console.log( '>>>', compositeMessage);
        });
}

example2();
```

When compile and run our script we see on the console:
```text
>>> 2 First Second Third
``` 
### Creating promises

The syntax for creating our promise is not very obvious at first sight, 
and in fact this is a rather contrived example.  
Let's try with a more meaningful one.

Let's say want the promise to "resolve" with the square root of _x_ 
if that number is non-negative and "reject" with an error message
otherwise; and let's pretend for a minute that taking a square 
root is an asynchronous operation, so we need to wrap that in 
a Promise.  

The constructor is given a pair of functions, one to return the results 
of the happy path, the other for the error case. In the body 
of the constructor you'll need to call either one depending on the 
sign of _x_:
```typescript
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
```
**NOTE** A Promise that never calls `reject()` will always _resolve_ with some 
value; one that never calls `resolve()` will always _reject_.

**NOTE** The notation `Promise<string|number>` indicates that the Promise
ultimately return a string error message _or_ a number.

We can now trigger both a resolve and a reject:
````typescript
function example3(): void {
    let x = 9;
    squareRootPromise( x ).then( sqrt => console.log( '>>> sqrt(' + x + ') = ' + sqrt ));

    x = -1;
    squareRootPromise( x ).catch( error => console.error( '>>> ' + error ));
}

example3();
````
When compile and run our script we see on the console:
```text
>>> sqrt(-1) = 3
>>> Negative arg: -1
``` 

## Alternative implementation

`example2()` could have been written using a concatenation of Promises instead,
as then() returns a new Promise:
```typescript
function example4(): void {
    compositeMessage = '';
    addMessage( 'First' );
    addMessagePromise( 'Second' )
        .then( () => addMessage( 'Third' ))
        .then( () => console.log( '>>', compositeMessage ));
}
```
## Another alternative: async/await

JavaScript/TypeScript also has a useful feature to help deal with asynchronous code. 
We can use the `await` keyword before calling a Promise, forcing execution 
to stop until the Promise is resolved before moving on.
```typescript
async function example5(): Promise<void> {
    compositeMessage = '';
    addMessage( 'First' );
    await addMessagePromise( 'Second' );
    addMessage( 'Third' );
    console.log( '>>>', compositeMessage);
}

example5();
```

**NOTE** The calling function – `example5()` in this case – becomes by necessity
asynchronous itself, and should be declared `async`. It returns a Promise.
