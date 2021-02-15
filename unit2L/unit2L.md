# Truthy and Falsy

JavaScript has a flexible relationship to truth, and TypeScript inherited
that. A flexible approach to what is true or false can be quite helpful, if
used wih care; it can also lead to spectacular bugs.

## Casting to boolean

JavaScript will go out of its way to cast a value to `bool`. It will cast 
`1` to `true` and `0` to `false`, which can be relatively straightforward,
but some of its choices are rather surprising.
Those "good enough to be true" values are called _truthy_, and their opposite 
_falsy_. (I've seen "falsey" being used as well, but it's probably a no-no.)

See method `truthyOrFalsy()` in [unit2L.ts](unit2L.ts) for a review of some of those. In that script we make
use of the double negative `!!` idiom: the first `!` converts a value to
a `boolean` using JavaScript's conventions, and negates it; the second `!` 
negates that, yielding the original truthy/falsy value.

**Bottom line**: `undefined` and `null` are falsy, like empty strings,
zero and `NaN`. Just about anything else is truthy, including any non-empty 
string (`"false"` is truthy, for instance), as well as any object and any array.

### But it's convenient!

In practice, it's often convenient that e.g. an empty string evaluates
to `false` and vice-versa. 

For instance, the
_Description rows_ exercise in
[Unit 2B](https://confluence.alma.cl/display/ICTOBSIF/Unit+2B%3A+Child+and+Parent+Components%2C+and+some+styling)
asked to display rows with a non-empty
description in some highlighted form. A solution could be that of defining 
a special CSS class _description-row_
for the highlighted form, and apply it conditionally:
```angular2html
<tr [ngClass]="{'description-row': organization.description }" ... >
```
Expression `[ngClass]="{ className: condition }"` means
"apply class _className_ if _condition_ is truthy, see
[the docs](https://angular.io/api/common/NgClass). Now, field
`description` of the `organization` interface is a string: if that string is empty,
the condition will evaluate to false and the special class _description-row_
will not be applied. On the other hand, if there _is_ a description, that condition will evaluate
to `true` and the row _will_ be highlighted.

## Equal or "really" equal?

JavaScript/TypeScript have two _equal_ operators, `==` and `===`, 
and their negative counterparts, `!=` and `!==`. The main difference between 
the "classic" operators and the newer three-char operators is that the former 
apply the kind of conversion we just saw, while the latter do not.

The difference between the two can be really bewildering. For instance, 
`0 == false` evaluates to `true`, as we've seen before, but
`0 === false` evaluates to `false`, because 
0 is not "really" equal to `false`.

Method `equalOrReallyEqual()` in [unit2L.ts](unit2L.ts) explores some of
those strange differences between "equal" and "really equal". 

**Bottom line**: Always use `===` and `!==` for comparing, unless you
really know what you are doing.


