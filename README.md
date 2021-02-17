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
Upon startup, we should see that organization's detailed 
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

## Peer-to-peer communication

At this point we have two unrelated components, one displaying 
a paginated table of organizations, and a new component displaying
a single organization's details. When the user selects an organization
on the list, we want the details component to show
the details of that organization, but the components are not in a 
parent-child relationship and we cannot use the techniques we learned
in the previous Units.

Angular ### DA QUI ###
