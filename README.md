# Angular Training Unit 2

Child and Parent Components, and some styling.

Our first component, _AppComponent_, was created by Angular when we generated our first
application. We'll add more components to that, extending the capabilities of our application.

## A new Component

We want a new component to display our list of GitHub organizations. New Components can be generated on the command line:

```text
    ng generate component GitHubOrganizationsTable
```

That command will create the component's HTML and CCS files, the component class
and a test suite for that, under src/app/git-hub-organizations-table:

* src/app/git-hub-organizations-table/git-hub-organizations-table.component.css
* src/app/git-hub-organizations-table/git-hub-organizations-table.component.html
* src/app/git-hub-organizations-table/git-hub-organizations-table.component.spec.ts
* src/app/git-hub-organizations-table/git-hub-organizations-table.component.ts

The command also included the new component in the `declarations` element of our _AppModule_,
in _app-module.ts_

## Passing data from parent to child

The organizations table will be a child component of <app-root>, and in its first incarnation it will simply display the raw JSON string. We want the new component to receive organizations data from AppComponent, so we have to organize that:

    Add the <app-git-hub-organizations-table> element to <app-root>, coupling the value of AppComponent.gitHubOrganizations to the new component's organizations field:
        <app-git-hub-organizations-table [organizations]="gitHubOrganizations"></app-git-hub-organizations-table>
    Declare that field in GitHubOrganizationsTableComponent, annotating it as an "input" parameter:
        @Input()  organizations: string;
    Use that value in a <pre> element in the component's HTML file:
        <pre> {{ organizations }} </pre>

If we reload the application we will see the same display as at the end of Unit 1.
Creating a dynamic table

So far we've only moved functionality from <app-root> to a child component. We now want to display our data in better form than a raw JSON string, so our first move is to make AppComponent pass the actual data instead of a string: we change the type of gitHubOrganizations from string to GitHubOrganization[] and we initialize it from our the Promise returned from our service method, making sure we cope with possible errors (in which case we get an undefined value):

    ngOnInit(): void {
        this.gitHubOrganizationsService
            .fetchOrganizations( 15 )
            .then( organizations => {
                if ( organizations ) { this.gitHubOrganizations = organizations; }
            });
    }

We then change the new component's class input to expect an array of GitHubOrganization instances and its HTML to include a <table> element that's populated dynamically via some Angular Magic (*ngFor):

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

A facelift

We have our table but it doesn't look very nice, time for some styling.

    We add a new font to the application, Lato. In index.html, we add a <style> element to the <head>:
          <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>

    We set the as the font for the whole application in style.css (it will apply to our table as well):
        body { font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif; font-size: 14px; }

    We set the class of the <table> element to organizations-table:
        <table class="organizations-table">

    And write new CSS definitions in git-hub-organizations-table.component.css

Suggested exercises
Activate the URLs

The organizations' HTML URL is not active: change git-hub-organizations-table.component.html so that one can click on it and navigate to the site.

Tip: use an HTML <a> element.

Bonus points if you eliminate the URL column altogether and make the organization's login field clickable.
Show the Avatar

One of the fields of an GitHubOrganization instance is avatar_url, the URL of an icon: add a column to the table displaying that icon.

Tip: use an <img> element with a width and height of 16.

Take a look at what happens in the Network tab of your browser when you reload the application: that is the N+1 problem.
Description rows

One of the table CSS definitions defines a description-row class for <tr> elements, which you can use to display such rows in a highlighted form. Classes, styles, etc. can be defined dynamically in Angular, based on some condition.

In this case, one can assign the description-row to all table rows changing the <tr> definition to

    <tr [ngClass]="{'description-row': true }" ... >

Replace true with a condition that evaluates to true if, for that row, the organization's description field is not null or empty.

Tip: it's a very simple expression!
