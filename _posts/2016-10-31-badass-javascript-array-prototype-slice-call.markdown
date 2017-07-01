---
layout: post
title:  "Badass JavaScript: Array.prototype.slice.call()"
date:   2016-10-31 14:32:00 -0700
tags: [javascript]
comments: true
---

Everyone has favorites. My most recently discovered favorite JavaScript method is Array.prototype.slice.call, and I'm adding it to my "Badass JavaScript" collection.

### When it's useful
This method is commonly used when there are an unknown number of arguments that are passed upon a function call.

### How it works
It takes any array-like object with a ``.length`` property (such as ``arguments.length``) and creates an array out of it. By using ``.slice()``, it assumes ``this`` in ``this.slice()`` will be an array. It then uses ``.call()`` to specify that ``this`` should be the arguments passed into the function. Here's the [best explanation][best explanation] I've found of this so far.

Summary: The method calls for each the argument in the function and places it into an array. While not at all how a ``for-in`` or ``for`` loop works, it functionally yields similar results to something like this:

```
function argumentsToArray() {
  var argumentsArray = [];

  for(var i = 0; i < arguments.length; i++) {
    argumentsArray.push(arguments[i]);
  }

  return argumentsArray;
}
```

### Example of how it works
Let's say a function ``makeFood`` that takes multiple user-entered arguments. The first argument will always be the type of cuisine ("Indian", "American", "Italian", etc.) and the next arguments will be any number of ingredients to be included in that dish.

If the first variable will always be the cuisine, it can be extracted as a variable ``cuisine`` and then an ``ingredients`` array can be created to store the rest of the arguments.

```
function makeFood() {
  var ingredients = Array.prototype.slice.call(arguments);
  var cuisine = ingredients.shift();

    // return ingredients = ["nori", "hamachi", "uni", "short-grain rice", "wasabi"]
    // return cuisine = ["Japanese"]


   // food making algorithm here

}

makeFood("Japanese", "nori", "hamachi", "uni", "short-grain rice", "wasabi")
```

Cool, eh?

[best explanation]: http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
