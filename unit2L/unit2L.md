# Truthy and Falsy

JavaScript has a flexible relationship with truth, and TypeScript inherited
that. A flexible approach with true and false can be quite helpful, if
used wih care; it can also lead to spectacular bugs.

## Casting to boolean

JavaScript will go out of its way to cast a value to `bool`. It will cast 
`1` to `true` and `0` to `false`, which can be relatively straightforward,
but some of its choices are rather surprising.

See [unit2L.ts](unit2L.ts) for a review of some of those. In that script we make
use of the double negative `!!` idiom: the first `!` converts a value to
a `boolean` using JavaScript's conventions, and negates it; the second `!` 
negates that, yielding the original truthy/falsy value.

Bottom line: `undefined` and `null` are `false`, like empty strings,
zero and `NaN`. Just about anything else is `true`, including any non-empty 
string (`"false"` is `true`, for instance), any object and any array.

## Equal and really equal

JavaScript/TypeScript have two _equal_ operators, `==` and `===`, 
and their negative counterparts, `!=` and `!==`. The main difference between 
the "classic" operators and the newer three-char operators is that the former 
apply the kind of conversion we just saw, while the latter do not.
So 
