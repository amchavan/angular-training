# Angular Training Unit 2

Parent and children components, and some styling.

Our first component, _AppComponent_, was created by Angular when we generated our first
application. We'll add more and more components to that, 
extending the capabilities of our application.

## A new Component

We want a new component to display our list of GitHub organizations. New Components can be generated on the command line:

```text
ng generate component GitHubOrganizationsTable
```

That command will create the component's HTML and CCS files, the component class
and a test suite for that class in directory _src/app/git-hub-organizations-table_:

* git-hub-organizations-table.component.css
* git-hub-organizations-table.component.html
* git-hub-organizations-table.component.ts
* git-hub-organizations-table.component.spec.ts

The command also included the new component in the `declarations` element of the
_AppModule_ in _app-module.ts_

## Passing data from parent to child

The organizations table will be a child component of `<app-root>`, 
and in its first incarnation it will simply display the raw JSON string. 
We want the new component to receive organizations data from AppComponent, 
so we have to organize that.

**app.component.html**:

Add the `<app-git-hub-organizations-table>` element to `<app-root>`, 
coupling the value of `AppComponent.gitHubOrganizations` to the new 
component's `organizations` field:
```angular2html
<app-git-hub-organizations-table [organizations]="gitHubOrganizations"></app-git-hub-organizations-table>
```

**git-hub-organizations-table.component.ts**:

Declare the `organizations` field in _GitHubOrganizationsTableComponent_, 
annotating it as an "input" parameter:
```typescript
export class GitHubOrganizationsTableComponent implements OnInit {

    @Input()  organizations: string;

    constructor() { }
    
    ...
```

**git-hub-organizations-table.component.html**: 

Use the value the `organizations` field in a `<pre>` element in the component's HTML file:
```angular2html
<pre> {{ organizations }} </pre>
```

If we reload the application we will see the same display as at the end of Unit 1.

## Creating a dynamic table

So far we've only moved functionality from `<app-root>` to a child component.   
We now want to display our data in better form than a raw JSON string, 
so our first move is to make _AppComponent_ pass its child the actual 
array of GitHub organization records instead of a string: 
we change the type of gitHubOrganizations from `string` to `GitHubOrganization[]` 
and we initialize it from our the Promise returned from our service method, 
making sure we cope with possible errors (in which case we get an undefined value):
```typescript
    gitHubOrganizations: GitHubOrganization[];
 
    ...

    ngOnInit(): void {
        this.gitHubOrganizationsService
            .fetchOrganizations( 15 )
            .then( organizations => {
                if ( organizations ) { this.gitHubOrganizations = organizations; }
            });
    }
```

We then redefine the new component's class `input` variable to expect an array of 
`GitHubOrganization` instances (_git-hub-organizations-table.component.ts_):
```typescript
    @Input()  organizations: GitHubOrganization[];
```

...and its HTML to include a `<table>` element.   
The table is then populated dynamically via some Angular magic (`*ngFor`) (_git-hub-organizations-table.component.html_):

```angular2html
<div>
    <table>
        <thead>
            <tr>
                <th>ID</th> <th>Login</th> <th>URL</th> <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let organization of organizations">
                <td> {{ organization.id }} </td>
                <td> {{ organization.login }} </td>
                <td> {{ organization.url }} </td>
                <td> {{ organization.description }} </td>
            </tr>
        </tbody>
    </table>
</div>
```

## A facelift

We have our table, but it doesn't look very nice. Time for some styling.

* We add a new font to the application, _Lato_. 
  In _index.html_, we add a `<style>` element to the `<head>`:
  ```html
  <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
  ```

* We set that as the font for the whole application in _style.css_ 
  (it will apply to our table as well):
        body { font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif; font-size: 14px; }

* We set the class of the <table> element to organizations-table 
  (_git-hub-organizations-table.component.html_):
  ```html
        <table class="organizations-table">
  ```

*  We complete the styling exercise writing new CSS definitions in 
   _git-hub-organizations-table.component.css_:
```css
.organizations-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
}

.organizations-table thead tr {
    background-color: #004f87;
    color: #ffffff;
    text-align: left;
}

.organizations-table th,
.organizations-table td {
    padding: 12px 15px;
}

.organizations-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.organizations-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.organizations-table tbody tr:last-of-type {
    border-bottom: 2px solid #004f87;
}

.organizations-table tbody tr.description-row {
    font-weight: bold;
    color: #004f87;
}
```
