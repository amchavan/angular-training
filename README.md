# Unit 5: Bootstrap, composition and CSS

In our previous units we focused on TypeScript/Angular and 
functionality and, apart for some pretty CSS, we paid 
little attention to how our UIs look. Those UIs were also 
structurally very simple, but even so (see Unit 4), it was 
sometimes hard to compose them as we wished. 

In this unit we'll see how you can leverage a CSS framework 
like Bootstrap to abstract the composition problem and apply
a uniform set of styles to your UIs.

## Dependencies

You will need to install the 
[guidelines for styling ALMA UIs](https://www.npmjs.com/package/@almaobservatory/ui-guidelines-styles),
a thin CSS layer on top of 
[Bootstrap](https://getbootstrap.com/docs/5.0/layout/containers/):

```text
npm install @almaobservatory/ui-guidelines-styles
```

You will need to import those definitions in _styles.css_:
```css
@import "~@almaobservatory/ui-guidelines-styles/dist/alma-ui-guidelines.css";
```

...and you'll need to import the _Lato_ font into _index.html_:

```html
  <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
```

**NOTE** Web applications running at the OSF must be able to function
even without an Internet connection to the outside world, and it would
not be possible to load a font from an external CDN (Content Delivery 
Network). You would instead
copy the font to your application's _assets_ directory instead, and
link to it from there.  
That applies to any other resource type as well, including
libraries, icons, images and CSS definitions.

## Building blocks 

We initially create a bunch of empty components that make up our UI.

```text
ng generate component header-bar
ng generate component navigation-bar
ng generate component main-area-top
ng generate component main-area-left
ng generate component main-area-right
ng generate component utilities-bar
ng generate component footer-bar
```

We add them to `<app-root>` in 
_app.component.html_:

```html
<app-header-bar></app-header-bar>
<app-navigation-bar></app-navigation-bar>
<app-main-area-top></app-main-area-top>
<app-main-area-left></app-main-area-left>
<app-main-area-right></app-main-area-right>
<app-utilities-bar></app-utilities-bar>
<app-footer-bar></app-footer-bar>
```

This is how our initial UI looks:

![v0](images/v0.png)

## Containers, rows and columns

We begin our composition effort by introducing a Bootstrap _container_ 
element, the outermost element. `container-fluid` takes up
the full width of the viewport (_app.component.html_):

```html
<div class="container-fluid">
  ...
</div>
```

**NOTE** There are several variants of `container`, 
aimed at _responsive_ layouts – that is, layouts accommodating
rotating screens of different sizes.  
Container names like `container-sm` or `container-lg`are related
to responsive layouts and "breakpoints", and
**do not** describe the size of the container.  
The same applies to other Bootstrap elements, like `col-sm`.

Inside our container we'll define a _grid_ of elements. Bootstrap's 
grid is based on the concepts of rows and columns of components;
it a higher-level abstraction built on the 
[CSS flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

We rearrange our building blocks in three rows:
```html
<div class="container-fluid">
    <!-- Header row -->
    <div class="row">
        <app-header-bar></app-header-bar>
    </div>

    <!-- Main row -->
    <div class="row">
        <app-navigation-bar></app-navigation-bar>
        <app-main-area-top></app-main-area-top>
        <app-main-area-left></app-main-area-left>
        <app-main-area-right></app-main-area-right>
        <app-utilities-bar></app-utilities-bar>
    </div>
    
    <!-- Footer row -->
    <div class="row">
        <app-footer-bar></app-footer-bar>
    </div>
</div>
```

...then arrange the main row in three columns, the left-side navigation
bar, the right-side utilities bar, and a central area with the main
application elements:

```html
    <!-- Main row -->
    <div class="row">
        <div class="col">
            <app-navigation-bar></app-navigation-bar>
        </div>
        
        <!-- Main area -->
        <div class="col">
            <app-main-area-top></app-main-area-top>
            <app-main-area-left></app-main-area-left>
            <app-main-area-right></app-main-area-right>
        </div>

        <div class="col">
            <app-utilities-bar></app-utilities-bar>
        </div>
    </div>
```

Finally, we reorganize the main area in two rows, the second being
shared by the _left_ and _right_ components:
```html
        <!-- Main area -->
        <div class="col">
            <div class="row">
                <app-main-area-top></app-main-area-top>
            </div>

            <div class="row">
                <div class="col">
                    <app-main-area-left></app-main-area-left>
                </div>
                <div class="col">
                    <app-main-area-right></app-main-area-right>
                </div>
            </div>
        </div>
```

Let's add borders to our `div`s for clarity (_styles.css_):
```css
div {
    border: lightgray dashed 1px;
}
```
Our container now looks like this:

![v1](images/v1.png)

## The 12-column system

In a Bootstrap grid, rows are containers for columns. 
Every row allows up to 12 columns and one can specify 
how many of those 12 should be taken up by an actual column.
By default, as we saw, columns share their container in equal parts.

We can now assign 2 columns to the navigation bar, one to the 
utility bar, and let the main component take up the rest. Inside the main
area (which allows the full complement of 12 "virtual" columns), 
we reserve 8 columns for the _right_ area and let the _left_ area take up the rest:

```html

    <!-- Main row -->
    <div class="row">
        <div class="col-2">
            ...
        </div>
        
        <!-- Main area -->
        <div class="col">
            <div class="row">
                ...
            </div>

            <div class="row">
                <div class="col">
                    ...left...
                </div>
                <div class="col-8">
                    ...right...
                </div>
            </div>
        </div>

        <div class="col-1">
            ...
        </div>
    </div>
```

Our finely composed container now looks like this:

![v2](images/v2.png)

Proportions will be kept if we resize the window:

![v3](images/v3.png)

**NOTE** In a reactive layout, components would instead _break_ 
away from each other and rearrange themselves vertically.

## Adding some contents

We now add some "real" contents to our application, starting with the
navigation and utilities vertical bars.

Since we'll be using icons we need to incorporate the FontAwesome library
first (_index.html_):
```html
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" crossorigin="anonymous">
```

Navigation bar (_navigation-bar.component.html_):

```html
<div>
    <a href="https://almaobservatory.org">ALMA</a> <br>
    <a href="https://www.eso.org">ESO</a> <br>
    <a href="https://www.nao.ac.jp/en/">NAOJ</a> <br>
    <a href="https://nrao.edu">NRAO</a> <br>
    <a href="https://github.com/amchavan/angular-training/tree/unit5">Unit 5</a>
</div>
```

Utilities bar (_utilities-bar.component.html_):

```html
<div class="btn-group-vertical">
    <button type="button" class="btn btn-primary btn-sm">
        <i class="fas fa-upload"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-sm">
        <i class="fas fa-download has-text"></i>
    </button>

    <button type="button" class="btn btn-warning btn-sm">
        <i class="fas fa-search"></i>
    </button>

    <button type="button" class="btn btn-danger btn-secondary btn-sm">
        <i class="fas fa-trash-alt"></i>
    </button>

    <button type="button" class="btn btn-danger btn-sm">
        <i class="fas fa-fire has-text"></i>
    </button>
</div>
```

To improve the appearance of the button bar (_utilities-bar.component.css_):
```css
.btn-group-vertical .btn {
    margin-top: 6px;
}

.btn-group-vertical .btn:first-of-type {
    margin-top: 0;
}
```

## Populating the header

We want the header component to take up all the available space,
so we define and apply the corresponding style _in the container element_ `<app-root>`
(_app.component.html_ and _app.component.css_):
```css
.header {
    width: 100%;
}
```
```html
   <app-header-bar class="header"></app-header-bar>
```

Now we're ready to populate the header bar according to the UI Guidelines 
(_header-bar.component.html_):
```html
<div class="alma-blue">
    <div class="row">

        <!-- ALMA logo and application name/version -->
        <span class="tab-head">
            <img class="alma-logo"
                 alt="This is the ALMA logo"
                 src="https://www.almaobservatory.org/wp-content/uploads/2017/06/alma-logo.png">
                &nbsp;
                <strong>Unit 5 &middot; Angular Training</strong>&nbsp;&nbsp;<span class="alma-sw-version">2021APR</span>
        </span>

        <!-- Filler, pushes the next items to the right -->
        <span class="flex-md-fill"></span>

        <!-- Two right-side "pulldown menus" -->
        <span>
            <button type="button" class="btn alma-blue btn-sm tab-head">
                <i class="fas fa-question has-text"></i> Help
            </button>
        </span>

        <span>
            <button type="button" class="btn alma-blue btn-sm tab-head">
                <i class="fas fa-user has-text"></i> Mary Smith
            </button>
        </span>
    </div>
</div>
```

That won't look too good unless we define all the styles we just used
(_header-bar.component.css_):
```css
.alma-logo {
    height: 40px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 5px
}

.tab-head {
    padding: 0 10px 2px 10px;
    height: 40px;
    border: 0;
    color: white;
    cursor: pointer;
}

.alma-sw-version {
    font-size: 75%;
}
```

