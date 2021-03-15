# Angular Training Unit 1B

A detour around callbacks, promises and error handling.

In Unit 1, we defined a service method requiring a callback to process the data returned from the API:

```typescript
    fetchOrganizations( count: number, callback: (data: GitHubOrganization[]) => void ): void {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        this.httpClient.get<GitHubOrganization[]>( url )
            .toPromise()
            .then(  data  => callback( data ))
            .catch( error => console.error( JSON.stringify( error )));
    }
```

The callback converts the response to a string for displaying:

```typescript
    this.gitHubOrganizationsService.fetchOrganizations(
        3,
        (organizations) => this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 )
    );
```

Callbacks (and closures) are an important concept, but one would rather not deal with the added complexity. 
Also, _Promises_ were introduced precisely to avoid callbacks, and we can do better than that.

## First step: let the service method returns a Promise 

```typescript
    fetchOrganizations( count: number ): Promise<GitHubOrganization[]> {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        return this.httpClient.get<GitHubOrganization[]>( url ).toPromise();
    }
```

Control over the HTTP request outcome ia transferred to the client code in _app.component.ts_, 
where we can then deal with success or failure by calling the `then()` and `catch()` Promise methods:

```typescript
    ngOnInit(): void {
        this.gitHubOrganizationsService.fetchOrganizations( 3 )
            .then( organizations => this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 ))
            .catch( error => console.error( JSON.stringify( error )));
    }
```

## Second step: centralize error handling

The new version is better, but has a downside: every time you invoke the service method
you have to deal with possible errors in the client code.

Imagine a service having tens of methods being used all over the application: 
while obviously every caller needs to deal with the returned data in its unique way, 
it's probably more convenient to deal with errors centrally, 
once for the entire Service (or for the entire application).

We can think of a hybrid solution where we catch the error in the service and let the called
code deal with the HTTP response:

```typescript
    fetchOrganizations( count: number ): Promise< void | GitHubOrganization[] > {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        return this.httpClient
            .get<GitHubOrganization[]>( url )
            .toPromise()
            .catch( error => console.error( JSON.stringify( error )));
    }
```

This works because the catch() method returns the original Promise 
(with the array of GitHubOrganization instances) if no error condition was triggered. 
However, if something wrong did happen `catch()` will return a void Promise, 
as reflected in the service method signature.

**NOTE** TypeScript allows you to define methods that return multiple types, which you definitely cannot do in Java.

Void Promises always resolve to undefined, which we need to capture in the client code:

```typescript
    this.gitHubOrganizationsService.fetchOrganizations( 3 )
        .then( organizations => {
            // organizations will be 'undefined' if the HTTP request resulted in an error condition
            if ( organizations ) {
                this.gitHubOrganizations = JSON.stringify(organizations, undefined, 4);
            }
        });
```

## Final step: make centralized error handling optional

Centralized error handling is fine, but what if you still the client code to handle errors 
directly in some cases? That's relatively straightforward if we make error handling optional:

```typescript
    fetchOrganizations( count: number,
                        catchErrors = true ): Promise< void | GitHubOrganization[]> {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        const promise = this.httpClient.get<GitHubOrganization[]>( url ).toPromise();
        return catchErrors
            ? promise.catch( error => console.error( JSON.stringify( error )))
            : promise;
    }
```
Parameter `catchErrors` is optional and defaults to `true`, in which case the method returns 
the Promise after checking for errors, as in the previous solution.  
If we call the service method setting `catchErrors` to `false`, however, this method will simply return the 
original Promise as in the first step.

We will be using this approach for Unit 2.
