# Angular Training, Unit 3B

Unit 3 was about child-to-parent component communication. We
coded a pagination widget based on `<button>` elements which
sent events to the paginated table component; other
than the `@Input` and `@Output` variables, child and parent
are decoupled and make no assumptions about each other.

We'll re-iterate that approach in this unit, this time 
using a `<select>` pulldown menu to choose a new data page size.

## Refactoring the organizations service

One of the exercises of Unit 3 was about caching the data pages,
and a solution was provided in branch _unit3-exercises_.
In order to allow a variable data page size we needed to allow
for resetting the cache, and we took advantage of that
for letting the service take care of the current data page
size (as opposed to the client code).

Those changes are not discussed here.

## A new child component

We need to define a new component to select the page size. We'll
try to make as generic as possible, so we can re-use it if
necessary. We'll need a `<select>` element to allow the user
to choose from a fixed set of options, and a label to indicate
what it is about:
```bash
ng generate component LabeledSelector
```

### HTML

The HTML definition in _labeled-selector.component.html_ is very simple:
```angular2html
<div>
    <label>
        <span> {{ label }} </span>
        &nbsp;
        <select (change)="newSelectedOption($event)">
            <option *ngFor="let option of options"
                    [selected]="option == selectedOption">
                {{ option }}
            </option>
        </select>
    </label>
</div>
```
`label` and `options` and  will be `@Input` 
variables, with  `options` being the list of valid data page sizes. 

`selectedOption` keeps track internally of what option is currently
selected: that value will be displayed when
the pulldown is collapsed.

Finally, whenever the selection changes method `newSelectedOption()` will be called.

### The controller

In the controller we add a third `@Input` variable to
indicate which option should be initially selected. We also add
an `@Output` event emitter to alert our parent component
that the selection has changed.

**NOTE** We take advantage of TypeScript lax typing and use `any`
for the options, so we can re-use this component to select
strings or arbitrary objects.

```typescript

    @Input()
    label: string;

    @Input()
    initialSelectedOption: any;

    @Input()
    options: any[];

    @Output()
    newSelectionEventEmitter = new EventEmitter<any>();

    selectedOption: any;

    constructor() { }

    ngOnInit(): void {
        this.selectedOption = this.initialSelectedOption;
    }

    newSelectedOption(e: any ): void {
        this.selectedOption = e.target.value
        this.newSelectionEventEmitter.next( this.selectedOption );
    }
```

## Integrating with the parent

We add the labeled selector to the paginated table component.
```angular2html
    <app-labeled-selector class="line"
                         [label]="dataPageSizeSelectorLabel"
                         [options]="pageSizes"
                         [initialSelectedOption]="pageSize"
                         (newSelectionEventEmitter)="newPageSizeEventHandler($event)">
    </app-labeled-selector>
```
We need to wire the selector's input and output variables to
new fields and methods in the paginated table controller:
```typescript
    pageSize = GitHubOrganizationsService.DEFAULT_DATA_PAGE_SIZE;
    pageSizes = [5, 10, 15, 20, 25, 30];
    dataPageSizeSelectorLabel = 'Page size';
    
    ...

    newPageSizeEventHandler( newPageSize: number ): void {
        console.log( '>>>', newPageSize );
        if ( this.pageSize !== newPageSize ) {
            this.pageSize = newPageSize;
            this.setDataPageSize( this.pageSize );
            this.currentPage = 1;
            this.loadOrganizationsPage( this.currentPage );
        }
    }
```
**NOTE** When we change the size of the data pages the 
cache is cleared; next time, the service will be fetching
the first page, regardless of what we ask for. In the
event handler we align our display with that.
