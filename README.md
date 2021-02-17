# Angular Training, Unit 4

In Unit 2 and 3 we have seen how to communicate from a parent 
to child component and from the child back to the parent. 
We'll see now how you can let two unrelated components 
communicate with each other. 

We will extend our usage of the GitHub API to extract
more information about a specific organization and display 
a list of its features in a "details" component, 
while our existing table maintains the role of displaying 
"summary" information about a bunch of organizations. 

The summary and detail view are not hierarchically 
related, and we'll learn how to let them
communicate with each other: when the user selects 
an organization in the list, the details about that 
organization will be displayed in the new component.

**NOTE**   The summary/detail pattern is very common in data-oriented UIs.

## Retrieving an organization's details

Our first step will be to retrieve an organization's details 
from the API (see the API docs). 
As it turns out, the API for details (`.../orgs/{login}`) 
returns a superset of the data returned by the `organizations` 
endpoint, so we can define the new interface as extending 
_GitHubOrganization_.
New file _git-hub-organization-details.ts_:
```typescript
import { GitHubOrganization } from './git-hub-organization';

export interface GitHubOrganizationDetails extends GitHubOrganization {
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    ...
}
```
With that in place we can add a service method to load an 
organization's detail information in
_git-hub-organizations.service.ts_:
```typescript
    fetchOrganization( organizationLogin: string,
                       catchErrors: boolean = true  ): 
        Promise<void|GitHubOrganizationDetails> {

        ...

        const url = this.organizationDetailsUrl + '/' + organizationLogin;
        const promise = this.httpClient.get<GitHubOrganizationDetails>( url ).toPromise();
        return catchErrors
            ? promise.catch( error => GitHubOrganizationsService.errorHandler( error ))
            : promise;
    }
```

## A new component

We need a component for the details:
```
    ng generate component git-hub-organization-details
```
We first integrate the service in the controller class
and invoke it with a static organization login ("_errfree_"), 
for a quick test:
```typescript
    constructor(private service: GitHubOrganizationsService) {
    }

    ngOnInit(): void {
        this.service.fetchOrganization( 'errfree' ).then(orgDetails => {
                if ( orgDetails ) {
                    console.log( JSON.stringify( orgDetails ));
                }
            });
    }
```
Then we integrate the new component in `<app-root`>, that is, in _app.component.html_.
```angular2html
    <app-git-hub-organization-details></app-git-hub-organization-details>
```
At startup time we should see that organization's detailed 
data on the console.

### Displaying details in the browser

In _git-hub-organization-details.component.html_ we'll 
display an organization's details in an `<ul>` element, which
we'll populate dynamically from the organization details object:
```angular2html
<div>
    <ul class=object>
        <li *ngFor="let detailKey of organizationDetailKeys">
            <span class="detail-name">  {{ detailKey }}                      </span>
            <span class="detail-value"> {{ organizationDetails[detailKey] }} </span>
        </li>
    </ul>
</div>
```
We'll need to define variables `organizationDetails` and 
`organizationDetailKeys` in the component class, deriving the latter from 
the first:
```typescript
    organizationDetails: GitHubOrganizationDetails;
    organizationDetailKeys: string[];
    
    ...

    ngOnInit(): void {
        this.service.fetchOrganization( 'errfree' ).then( orgDetails => {
            if ( orgDetails ) {
                this.organizationDetails = orgDetails;
                this.organizationDetailKeys = Object.keys( this.organizationDetails );
            }
        });
}
```

Finally, we'll add minimal styling to make the `<ul>` element to let
it look a bit like a table (_git-hub-organization-details.component.ts_):
```css
.object {
    list-style: none;
}

.detail-name {
    display: inline-block; min-width: 200px
}

.detail-value {
}
```
## Row selection

At this point we have two unrelated components, one displaying
a paginated table of organizations, and a new component displaying
a single organization's details. When the user selects an organization
on the list, we want the details component to show
the details of that organization. 

Our _GitHubOrganizationsTable_ does not support row selection yet. We
can add that by modifying the definition of `<tr>` in 
_git-hub-organizations-table.component.html_ to allow a mouse click:
```angular2html
            <tr *ngFor="let organization of organizations"
                (click)="selectedRow(organization)" >
```
Method `selectedRow()` in the component class will be called with the
selected organization.
```typescript
    selectedRow( organization: GitHubOrganization ): void {
        // do something with that organization
    }
```

## Peer-to-peer communication

We're now ready to aks the details component to
display the selected organization, but that component and the table
are not in a parent-child relationship, and we cannot directly 
use the techniques we learned in the previous Units.

We can however build on the same mechanism Angular employs 
for `@Output` parameters: an `EventEmitter` acting as
a message exchange between any two components.

We define an interface describing the table row selection
event, and a service for exchanging events to inject into 
the components.
```bash
ng generate interface OrganizationSelectionEvent
ng generate service SelectionEvents
```
The interface includes the selected organization:
```typescript
import {GitHubOrganization} from './git-hub-organization';

export interface OrganizationSelectionEvent {
    organization: GitHubOrganization;
}
```
The service wraps an _EventEmitter_ instance and offers a simple
API to send events and access an _Observable_ we can subscribe to.

**NOTE** From the 
[Angular docs](https://angular.io/guide/observables):
_Observables provide support 
for passing messages between parts of your application. 
They are used frequently in Angular and are a technique 
for event handling, asynchronous programming, and 
handling multiple values._ 
```typescript
export class SelectionEventsExchangeService {

    private emitter = new EventEmitter<OrganizationSelectionEvent>();

    constructor() {
    }

    public send( event: OrganizationSelectionEvent ): void {
        this.emitter.next( event );
    }

    public getExchange(): Observable<OrganizationSelectionEvent> {
        return this.emitter.asObservable();
    }
}
```

With that in place we can inject the event exchange service into
our component classes. The organizations table will send a selection 
event when the user clicks on a row 
(_git-hub-organizations-table.component.ts_):
```typescript
    selectedRow( organization: GitHubOrganization ): void {
        const message: OrganizationSelectionEvent = { organization: organization };
        this.exchange.send( message );
    }
```
The details component subscribes to the exchange upon initialization,
and when the event arrives it uses the organization's _login_ field
to load and then display the details:
```typescript
ngOnInit(): void {
    this.exchange.getExchange().subscribe( event => this.selectionEventHandler( event ));
}

private selectionEventHandler( event: OrganizationSelectionEvent ): void {
    this.service.fetchOrganization( event.organization.login )
        .then( orgDetails => {
            if (orgDetails) {
                this.organizationDetails = orgDetails;
                this.organizationDetailKeys = Object.keys( this.organizationDetails );
            }
    });
}
```
