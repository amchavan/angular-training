# Unit 1L: Async TypeScript

Exploring how to deal with TypeScript asynchronous features.

## TypeScript from the command line

In this unit we'll write TypeScript scripts and run them
from the command line. Before you start, please make sure you install the
TypeScript compiler:
```
npm install -g typescript
```

## Basic use case

We define a method that outputs a
message to the console (_unit1L-1.ts_):
```typescript
function typeMessage(message: string): void {
    console.log( message );
}
```
We also create a second version of the
`addMessage()` method, one that waits for one second
before writing the message:
```typescript
function typeMessageAfterDelay(message: string): void {
    setTimeout(() => typeMessage(message), 1000);
}
```

Finally, we call the two methods in a sequence:
```typescript
function example1(): void {
    typeMessage('First');
    typeMessageAfterDelay('Second');
    typeMessage('Third');
}

example1();
```

We now compile the TypeScript source and run the resulting JavaScript code:
```text
cd unit1L 
tsc unit1L-1.ts && node unit1L-1.js 
```
One would expect to see
```text
First
Second
Third
```
on the console, after about one second. In fact, what one sees is
```text
First
Third
Second
```

What happens is, `setTimeout()` _is asynchronous_:
the callback — in our case the console output — will be executed
after the expected delay, but `setTimeout()` _itself returns immediately_,
so logging of _Third_ is actually performed before _Second_.

##  Reactive programming and _Observables_

_Reactive programming_ is a programming paradigm,
mainly concerned with asynchronous _data streams_.
One can work reactively with synchronous data streams as well:
Java's `streams` API does precisely that.

The [RxJs library](https://rxjs-dev.firebaseapp.com/guide/overview)
implements reactive programming for JavaScript and is used
extensively by and with Angular. One of the main RxJS concepts
that of an _Observable_, defined as _an invokable
collection of future values or events_
.  
Observables implement the
[_Observer pattern_](https://en.wikipedia.org/wiki/Observer_pattern),
in which you have a _Subject_ and one or more
_Observers_, who are notified of any state changes:
that is, "I am observing you, and if and when those values/events appear,
this I want that to do with them".  
Observers are passive and, indeed, reactive.

With Observables, you
_subscribe_ to those changes providing a callback function
that will be called with every new value. You can also provide
optional callbacks for _error_ and _completion_ conditions — that is,
no more data/events are coming.

### Very basic example

This is a very simple, synchronous reactive example
message to the console (_unit1L-2.ts_):
```typescript
import {Observer, of} from 'rxjs';

const observable = of( 1, 2, 3 );

const observer: Observer<number> = {
    next: value => console.log( value ),
    error: error => console.error( error ),
    complete: () => console.log( 'Done' )
};

observable.subscribe( observer );
```

* Function `of()` creates an Observable that outputs its arguments
* The Observer defines the callbacks for a new value (`next()`),
  an error condition (`error()`) and stream completion (`complete()`)
* Method `subscribe()` couples Observable and Observer

**NOTE** Creating an Observer _does not_ generate any data or events.
Observables are lazy collections, values are generated only when an
Observer is subscribed.

### Push and pull

One can see Observables as the "push" equivalent to a Java _Iterator_.
While you "pull" values out of an Iterator until they are exhausted,
an Observable "pushes" its values out to the Observer.

### Creating an Observable

Observables are often created for you, for instance by the `get()`
method of the HTTP client, and there are many useful functions in the RxJS
API to help with creating Observables, like `of()`.  
One can also of course
create an Observable directly, providing the function to
invoke when the Observer subscribes
to the Observable, and the values/states/events should actually be
generated. That's called a _subscriber_ function.

We now convert our first example to use an Observable/Observer pair:
```typescript
import { Observable } from 'rxjs';

const observable = new Observable( subscriber => {
    subscriber.next( 'First' );
    setTimeout(() => { subscriber.next( 'Second' ); }, 1000);
    subscriber.next( 'Third' );
});

function typeMessage(message: string): void {
    console.log( message );
}
const observer = {
    next: msg => typeMessage( msg as string ),
    error: error => console.error( error )
};

observable.subscribe( observer );
```

**NOTE** I initially found the _subscribe_/_subscriber_ naming somewhat
confusing, but it actually makes sense, but I still get confused.

## Observables in Angular

Observables are used extensively inside Angular, but they are part of Angular's
APIs as well. 

* _EventEmitter_ is a sub-subclass of Observable, the Observer is the event
  receiver
  * _Router_ emits routing events
* Angular's HTTP client returns Observables, e.g. in `get()`
  * HTTP requests are cancellable (`unsubscribe()`)
  * Requests can be configured to get progress event updates
  * Failed requests can be retried
* Forms can react when data is entered/altered

Special case: Angular's own `async` pipe can be used with Observables to update 
a component automatically whenever a new value is generated. For instance,
let's say that Observable _sbState_ in your component class 
outputs a value whenever a certain SchedBlock changes state. 
You can set up a component to update with the new state  as it is pushed:
```angular2html
    <span>
        SB state: {{ sbState | async }}
    </span>
```

## Observables and Promises

In the follow-up to Unit 1 we saw how
to use _Promises_ to deal with HTTP requests. Promises and Observables
are analogous, in that they follow a reactive paradigm to deal
with "pushed" values. The main difference between the
two is, Promises return a single
value while Observables multiple values.

|         | Single value | Multiple values |
|---------|--------------|-----------------|
| _Pull_  |	Function 	 | Iterator        |
| _Push_  | Promise      | Observable      |

There are many other differences though:

* Observables are "lazy" and computation does not start until
  subscription, while Promises execute "eagerly".

* Observables can chain _operators_ before returning values,
  allowing on-the-fly transformation of the values
  and early termination.
  (We'll see what that means
  in the next section.)

* Promises have arguably a simpler API.

## Operators and pipes

_Operators_ are RxJS functions that act on the streamed values before they
are pushed. They can be "piped" (chained) in the same way lambda functions
can, although with a different syntax. Typical operators include
`filter()` and `map()`.

**NOTE** The list of RxJS operators is _huge_.

Operators of a different category allow simple creation of Observables.
We came across `of()` above and `from()` will convert almost anything
to an Observable:

```typescript
from( 'abc' ); // outputs 'a', 'b', 'c'
```

A sequence of operators collected in a _pipe_ is called a _recipe_,
like an ALMA Pipeline recipe is a sequence of tasks.

**NOTE** Angular also defines [_pipes_](https://angular.io/guide/pipes),
but they are unrelated. We'll see below how they can be coupled.

A simple example: (_unit1L-3a.ts_):

```typescript
import {of} from 'rxjs';
import {filter, map, take, timestamp} from 'rxjs/operators';

const observable = of( 'nrao', 'alma', 'eso', 'naoj' )
    .pipe(
        filter( org => org < 'n' ),  // Sorry NRAO and NAOJ!
        map( org => org.toUpperCase() ),
        timestamp()
    );

const observer = {
    next: value => console.log( JSON.stringify( value )),
    complete: () => console.log( 'Done' )
};

observable.subscribe( observer );
```
Running this example will output something like
```text
{"value":"ALMA","timestamp":1614246979588}
{"value":"ESO","timestamp":1614246979595}
Done
```

### Stand-alone recipes

You can isolate the recipe and potentially use it with
different Observables (_unit1L-3b.ts_):

```typescript
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
```

## Specialized Observables

Several Observable subclasses offer specialized behavior; you will often
find yourself using a subclass instead of Observable itself.

Probably the most important subclas is _Subject_, an Observable that
allows multicasting values to multiple observers (_unit1L-6.ts_):
```typescript
import {of} from 'rxjs';

const observable = of( 1, 2, 3 );

const observer1 = {
  next: value => console.log( '1:', value ),
};

const observer2 = {
  next: value => console.log( '2:', value ),
};

observable.subscribe( observer1 );
observable.subscribe( observer2 );
```

Subclasses of Subject, like _BehaviorSubject_ and _ReplaySubject_
offer different approaches to the issue of Observers subscribing 
at different times.

## Promises

Let's revisit our initial use case and try to deal with the asynchronous
message. We have seen that Promises can help with that, so we wrap
a Promise around the Timeout object and return the Promise instead
(_unit1L-4.ts_):
```typescript
function typeMessage(message: string): void {
    console.log( message );
}

// Async operation
// function typeMessageAfterDelay(message: string): void {
//     setTimeout(() => typeMessage(message), 1000);
// }

function typeMessagePromise(message: string): Promise<void> {
    return new Promise( (resolve, reject) => {
        setTimeout(() => { typeMessage(message); resolve(); },  1000);
    });
}

function example4(): void {
    typeMessage('First');
    typeMessagePromise('Second').then( () => typeMessage('Third') );
}

example4();
```

When compile and run our script we finally see on the console what
we wanted to see:

```text
First
Second
Third
```

### Alternative implementation: async/await

JavaScript/TypeScript also has a useful feature to help deal with
asynchronous code> If we use the `await` keyword before
calling a Promise we can force execution 
to stop until the Promise is resolved (_unit1L-4b.ts_):

```typescript
async function example4b(): Promise<void> {
  typeMessage( 'First' );
  await typeMessagePromise( 'Second' );
  typeMessage( 'Third' );
}

example4b();
```

**NOTE** Function `example4b()` becomes by necessity
asynchronous itself, and should be declared `async`. 
It returns a Promise.


### Creating promises

The syntax for creating our promise is not very obvious,
and in fact this is a rather contrived example.  
Let's try with a more meaningful one.

Let's say want a promise that "resolves" with the square root of _x_
if that number is non-negative and "reject" with an error text message
otherwise.

**NOTE** This promise resolves synchronously.

The Promise constructor is given a pair of functions,
one to return the results
of the "happy path", the other for the error case. In the body
of the constructor you'll need to call either one depending on the
sign of _x_ (_unit1L-5.ts_):
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

**NOTE** The notation `Promise<string|number>` indicates that the Promise
ultimately return a string error message _or_ a number.

We can now trigger both a resolve and a reject:

````typescript
function example5(): void {
    const good = 9;
    squareRootPromise( good ).then( sqrt => console.log( 'sqrt(' + good + ') = ' + sqrt ));

    const bad = -1;
    squareRootPromise( bad ).catch( error => console.error( error ));
}

example5();
````
When compile and run our script we see on the console:
```text
sqrt(9) = 3
Negative arg: -1
```

**NOTE** A Promise that never calls `reject()` will always _resolve_ with some
value; one that never calls `resolve()` will always _reject_.
