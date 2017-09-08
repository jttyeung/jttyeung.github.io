---
layout: post
title:  "Making Sandwiches with Decorators"
date:   2017-09-06 14:26:00
tags: [software engineering, python]
comments: true
---


### What Are Python Decorators?

Decorators are used to slightly modify/extend/"decorate" the behavior of a class, function, or method without having to change the original code. If you're familiar with front-end business, it kind of reminds me of the CSS pre-processor SASS and how it uses @extend to (quite literally) extend the style definitions of previously defined styling.

<br>
### How They Work

Decorators work by wrapping around the function you want to add to (using nested functions). They are also sometimes referred to as a factory function.

Okay, so let's pretend we're using cellphone lines and each phone carrier has a different carrier function because they work in slightly different ways. For now, we'll use a single function: connect_to_carrier() that will represent all the carriers. I'll show you how we'll use multiple carrier functions later below.

```python
def connect_to_carrier():
  return 'Carrier connected.'
```


Let's also say we have a function "execute_call()" that will be called every time an event (in this case: making a call) occurs. Before the we execute a call, we want to make sure that connect_to_carrier() happens before execute_call() returns a call confirmation.

So since execute_call() never going to change, let's create a nested function called "decorator" so we can link it to our connect_to_carrier(). How do we link the two? We create a nested function (decorator) that will accept the function we want to decorate (connect_to_carrier) and return a new function with execute_call saved within it. Here's what that looks like in code so far:

<script src="https://gist.github.com/jttyeung/a41680af0e0994145243c15b69f8cea0.js"></script>

When I assign a variable this_func to the decorator function and ask python what this_func is, it shows that the variable points to the execute_call function. Calling this_func() will call the execute_call() function, which returns the result of connect_to_carrier ('Carrier connected.') and then prints 'Call confirmed.'

Lines 1-2, 10, and 15 can be simply rewritten with the conventional decorator format using the symbol '@' atop the function you want to decorate (no extra line breaks in between):
<script src="https://gist.github.com/jttyeung/d42f524d16ee385e551698ef8e19110f.js"></script>

Note this gives us the same result as when we assigned the decorator function to a variable this_func and then called this_func(). Using the '@' shorthand is [prettier and easier to read/understand][syntactic sugar]. If you see that symbol, you know immediately that you're adding functionality to an existing function.


<br>
### Let's Make Some Sandwiches

Here's an example of using decorators (and probably my favorite since it involves food). Instead of calling the decorator "@decorator", I'm going to be more Pythonic and give it the name "@sandwich_maker" to be more explicit about what the @decorator does. We're going to make sandwiches using different types of protein!
<script src="https://gist.github.com/jttyeung/fb7cdc632582d1ef9574e19b23bbd9b3.js"></script>


<br>
### Hardy, Har, Har... Wait, But Why?

I used overly simplified samples of code above to demonstrate how a decorator can (but probably won't) be used. Why one may use it: to keep code [DRY][dry]; if you want to extend or add code to an existing function without modifying the existing function. The two other common use cases I've seen are for Flask routes and for creating a rate limiter. Let's say you have a 10 requests coming in at the same time and you want to slow the traffic down when it hits your database or server. You can rate limit the requests using the time.sleep() function decorated on top of whatever function that executes the requests coming in. An excellent example of how this is done (and other real world examples) can be found on [Real Python][real python].

Hopefully I've given a beginner-friendly overview of decorators. They're not so scary and they're pretty fun to use! Some helpful references and resources for further study:
<br>
[Real Python: https://realpython.com/blog/python/primer-on-python-decorators/][real python]
<br>
[Simeon Franklin: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/][simeon franklin]
<br>
[The Code Ship: https://www.thecodeship.com/patterns/guide-to-python-function-decorators/][code ship]

[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[real python]:https://realpython.com/blog/python/primer-on-python-decorators/
[simeon franklin]: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/
[syntactic sugar]: https://en.wikipedia.org/wiki/Syntactic_sugar
[code ship]: https://www.thecodeship.com/patterns/guide-to-python-function-decorators/
