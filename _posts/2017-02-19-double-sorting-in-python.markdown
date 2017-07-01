---
layout: post
title:  "Double Sorting in Python"
date:   2017-02-19 20:29:00
tags: [python]
comments: true
---

There is no doubt that Python has become a favorite programming language of mine. Although my roots are in JavaScript, Python has found a very special place in my heart. Part of the reason is the simplicity and cleanliness in writing and partly because of it's amazing ability to handle data and the number of libraries and frameworks available (that are also built so beautifully). It's poetic, really. I basically eat philopsophies like minimalism, inbox-zero, Marie Kondo's KonMarie method for breakfast, and I feel that Python (or at least the way I've been taught it) has a very strong affinity with those practices.

Okay, enough gushing. Here's a cool feature with Python I've been meaning to try to understand better in a recent coding challenge I was trying to solve.

Let's say I have a list of data and I want to count the frequency of that data and sort it by frequency first, alphabetically second.

My input will be a user input string of text, with spaces, but no special characters or capitalizations.

Example Input:
```
helloooooooo my name is joanne
```

My output should be the letters displayed by most frequent to least on new lines, and if there is a tie in frequency it should list out those ties in alphabetical order.

Expected Output:
```
o
e
n
a
l
m
h
i
j
s
y
```

We know we want to keep track of the order of two things: count and alphabeticized letters. How would we sort on more than one parameter?

Here's how I wrote my solution:
```python
# Takes the user's input and removes the spaces

string = list(raw_input().replace(' ',''))

# Creates a list called counts, where I will store counts for each letter of my string
# I chose to use a list over a dictionary since dictionaries don't retain order

counts = []

# I loop through each letter that exists in the string, but I want to be careful to
# use a set here so that my letters are unique and I'm not revisiting the same letter
# twice. Python sets are magical and amazing! I add to my counts list a tuple of:
# the number of letters in the string, and the letter itself like: (8: 'o')

for letter in set(string):
    counts.append((string.count(letter), letter))

# I now have a list, not sorted in any way. I can both sort by both the frequency and
# the letter at the same time.

double_sort = sorted(counts, key=lambda tup: (-tup[0], tup[1]))

# Now I've got a sorted list of tuples, and I can print out the second item (letter) of
# each tuple in order of frequency and then alphabetical

for i in range(0, len(double_sort)):
    print double_sort[i][1]

```

Awesome components of this, courtesy of Python:
- set() : creates a list without duplicates
- lambda : an anonymous function used once structured as `lambda arguments: expression`
- sorted() : sorts a list and returns a new list (better than .sort() which sorts a list in place and returns None)
- range() : a prettier version of JavaScript's `for(var i = 0; i < len(double_sort); i++){ }`

A deeper dive into sorted():
sorted()'s first argument is an iterable, such as a list. It then takes 3 optional components:
- cmp : function of two iterable arguments that comparies them and returns a positive number if it is greater than the second argument, negative if it is smaller, or zero if they are equal. This defaults to `None`.
- key : function used like a dictionary key but can be applied to iterables to extract an element. This defaults to `None` which makes a direct comparison between elements. In the above, I am creating a lambda function where I am passing in a tuple (tup) as an argument and makes both positions within the tuple accessible. The negative in front of the tup[0] which in this case is the number in my tuple means that I'm reversing the order of the counts. The tup[1] position refers to the letter, and that is being sorted in alphabetical order. If I had my tuples written as ('o', 8), I would just switch the position in the lambda function to `(-tup[1], tup[0])` and `print double_sort[i][0]`.
- reverse : if `reverse=True`, the comparison is reversed. I can't just use that here because the point is to split the tuple into two and reverse count but not alphabetical order.

Hopefully that provides a relatively comprehensive breakdown. Here's a really [helpful resource][resource] that dives into even more advanced sorting techniques with Classes.


[resource]: http://pythoncentral.io/how-to-sort-a-list-tuple-or-object-with-sorted-in-python/
