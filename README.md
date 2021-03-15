# Angular Training Unit 1B

This branch includes the results of Session 1.

## Callbacks and promises

In Unit 1, we defined a service method requiring a callback to process the data returned from the API:

```typescript
    fetchOrganizations( count: number, callback: (data: GitHubOrganization[]) => void ): void {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        this.httpClient.get<GitHubOrganization[]>( url )
            .toPromise()
            .then(  data  => callback( data ))
            .catch( error => console.error( JSON.stringify( error )));
    }
    
    ...


```

Callbacks are an important concept, but one would rather not deal with the added complexity. Also, Promises were introduced precisely to avoid callbacks, and we can do better than that.

NOTE The code for this follow-up section can also be found in branch unit1-follow-up of the angular-training repository, including the following solutions.
First solution: get rid of closures

We let the service method return the Promise itself:

    fetchOrganizations( count: number ): Promise<GitHubOrganization[]> {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        return this.httpClient.get<GitHubOrganization[]>( url ).toPromise();
    }

Control over the HTTP request outcome ia transferred to the client code in app.component.ts, where we can then deal with success or failure by calling the then() and catch() Promise methods:

    ngOnInit(): void {
        this.gitHubOrganizationsService.fetchOrganizations( 3 )
            .then( organizations => this.gitHubOrganizations = JSON.stringify( organizations, undefined, 4 ))
            .catch( error => console.error( JSON.stringify( error )));
    }

Since then() executes in the context of the Component class it has direct access to the gitHubOrganizations instance field, and no closure is needed.

NOTE This approach can be used to solve ####
Second solution: centralize error handling

The new version is better, but has a downside: every time you invoke the service method you have to deal with possible errors – in the client code.

Imagine a service having tens of methods being used all over the application: while obviously every caller needs to deal with the returned data in its unique way, it's probably better to deal with errors centrally, once for the entire Service (or for the entire application).

We can think of a hybrid solution where we catch the error locally and let the called code deal with the data:

    fetchOrganizations( count: number ): Promise< void | GitHubOrganization[] > {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        return this.httpClient
            .get<GitHubOrganization[]>( url )
            .toPromise()
            .catch( error => console.error( JSON.stringify( error )));
    }

This works because the catch() method returns the original Promise (with the array of GitHubOrganization instances) if no error condition was triggered. However, if something wrong did happen catch() will return a void Promise, as reflected in the service method signature:

    fetchOrganizations( count: number ): Promise< void | GitHubOrganization[] > { ... }

NOTE Yes, TypeScript allows you to define methods that return multiple types, which you definitely cannot do in Java.

Void Promises always resolve to undefined, which we may need to capture in the client code:

        this.gitHubOrganizationsService.fetchOrganizations( 3 )
            .then( organizations => {
                // organizations will be 'undefined' if the HTTP request resulted in an error condition
                if ( organizations ) {
                    this.gitHubOrganizations = JSON.stringify(organizations, undefined, 4);
                }
            });

Having it all

Centralized error handling is fine, but what if you still need to handle errors directly in some cases? That's relatively straightforward if we make error handling optional:

    fetchOrganizations( count: number,
                        catchErrors = true ): Promise< void | GitHubOrganization[]> {
        const url = environment.gitHubApiUrl + '/organizations?per_page=' + count;
        const promise = this.httpClient.get<GitHubOrganization[]>( url ).toPromise();
        return catchErrors
            ? promise.catch( error => console.error( JSON.stringify( error )))
            : promise;
    }

Parmeter catchErrors is optional and defaults to true, in which case the method returns the Promise after checking for errors, as in the previous solution. However, if we set catchErrors to false this method will simply return the original Promise, as in the initial solution.

We will be using this approach for Unit 2.
