# Angular Training, Unit 3C

Unit 3 was about child-to-parent component communication. We
coded a pagination widget based on `<button>` elements which
sent events to the paginated table component; other
than the `@Input` and `@Output` variables, child and parent
are decoupled and make no assumptions about each other.

We'll re-iterate that approach in this unit, this time 
using an `<input>` text field to organizationLoginFilter the currently
displayed organizations, showing only those
whose _login_ field matches the text we're typing.

## A new child component

We need to define a new component type the organizationLoginFilter text. As usual, 
we'll
try to make as generic as possible, so we can re-use it if
necessary. We'll need a `<input>` element to type in, and a filterLabel to indicate
what it is about. We also want that the parent component to be contacted with
every keystroke.
```bash
ng generate component KeyByKeyTextInput
```

### HTML

The HTML definition in _key-by-key-text-input.component.html_ 
is super simple:
```angular2html
<div>
    <filterLabel>
        <span>{{ filterLabel }}</span>
        &nbsp;
        <input #textBox (keyup)="onKeyUp(textBox.value)">
    </filterLabel>
</div>
```
`filterLabel` will be an `@Input` variable. Element `<input>`
has ID _textBox_, and it will invoke the `onKeyUp()` 
controller method on every keystroke. (To be precise,
not before the key is released.)

### The controller

In the controller we add an `@Output` event emitter 
to alert our parent component
that a new string is available.

```typescript
    @Input()
    filterLabel: string;

    @Output()
    newStringEventEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onKeyUp( newString: string ): void {
        this.newStringEventEmitter.next( newString );
    }
```

## Integrating with the parent

We add our new component to the parent, the paginated table 
(_paginated-git-hub-organizations-table.component.html_).
```angular2html
    <app-key-by-key-text-input class="line"
                               [label]="filterLabel"
                               (newStringEventEmitter)="newFilterEventHandler($event)">
    </app-key-by-key-text-input>
```
We need to wire the child component's input and output 
variables to
new fields and methods in the paginated table controller
(_paginated-git-hub-organizations-table.component.ts_).
```typescript
    filter: string;
    readonly filterLabel = 'Filter';
    
    ...

    newFilterEventHandler( newFilter: string ): void {
        this.filter = newFilter;
    }
```
Whenever new text is typed in the child component, the parent
controller's `filter` variable is updated.

## Integrating the organization's table

The value of `filter` will be needed inside the actual
organizations table, so we'll declare an `@Input`
variable there called `organizationLoginFilter` and do the wiring in 
_paginated-git-hub-organizations-table.component.html_:

```angular2html

<app-git-hub-organizations-table [organizations]="gitHubOrganizations"
                                 [organizationLoginFilter]="filter">
</app-git-hub-organizations-table>
```

## Filtering out table rows

What we need to do now is use that value to exclude some
rows from appearing in the organizations table 
(_git-hub-organizations-table.component.html_).

We'll make use of two Angular features, `*ngIf` to display
or hide a component based on some condition, and 
`<ng-container>` to group some elements.

```angular2html
    <tr *ngFor="let organization of organizations" >
        <ng-container *ngIf="(!organizationLoginFilter) || organization.login.includes( organizationLoginFilter )">
            <td class="id-col"> {{ organization.id }} </td>
            <td class="login-col"> {{ organization.login }} </td>
            <td class="url-col"> {{ organization.url }} </td>
            <td class="description-col"> {{ organization.description }} </td>
        </ng-container>
    </tr>
```
The `*ngIf` condition is:  
`(!organizationLoginFilter) || organization.login.includes( organizationLoginFilter )`

It evaluates to `true` (meaning, the row is displayed)
if variable `organizationLoginFilter` is null/empty, _or_ its value
is a substring of the organization's `login` field.
