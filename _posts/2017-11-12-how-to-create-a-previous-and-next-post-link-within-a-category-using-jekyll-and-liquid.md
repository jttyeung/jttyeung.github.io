---
layout: post
title:  "How to Create a Previous and Next Post Link Within a Category Using Jekyll and Liquid"
date:   2017-11-12 18:02:00
tags: [software engineering, jekyll, liquid]
comments: true
---


## The Problem

Recently, I've been building out the [help site][omnihelp] for [OmniBuilds.com][omnibuilds] using Jekyll on GitHub pages and ran into an issue extracting the previous and next post links for each help article within categories.

Jekyll provides nice [variables][variables]: `page.previous` and `page.next` to get the next chronological post written (by date). A really great example of how this is done with Jekyll and Liquid is [here][prev-next-blog]; this post is the inspiration of my solution below.

However, for the [OmniHelp site][omnihelp] we needed a previous and next page link for articles only within the current category that the user is viewing. Given that we were building help pages, it also did not make sense to use chronological date order of posts to determine what was the previous or next article since we often add to and re-order the help articles. Additionally, Liquid templating with Jekyll proved to make things a little more complicated because I couldn't just mix vanilla JavaScript with Liquid.

<br>
## The Solution

Jekyll has some [fancy helper variables][jekyll-fancy] that provide a way to do what I'd normally try to do with JavaScript. Essentially I wanted to know how many articles exist within a category. With that number of articles (articles.length), I could determine the articles array length. I could loop through the articles array and find the index of the current article (by matching the page.title to the article.title).

I could then set that current article index as my current index, then subtract/add 1 to it to get the previous/next article index. With these new indices I could call on the previous/next articles using articles[index]. Lastly, I used a series of if/else statements to separate out the two edge cases: when it's the first or last article in the array.

Below is my code. From lines 1-21 I'm recreating Jekyll's `page.previous` and `page.next` variables to demonstrate how the code works without categories. Lines 24-59 demonstrate how it works with categories. I'm taking all the articles (sorted by weight) within the current category a user is in, and then using the sorted_articles as the array that I loop through to produce my previous or next article links.

That's it! It took a while for me to solve this using Liquid's syntax; there are a lot of hidden useful features to the language not often used. Hope this is useful; if I can help in any way let me know!

<br>
<script src="https://gist.github.com/jttyeung/a3e9a99974739a34bceaad40616a85e8.js"></script>





[omnibuilds]: https://www.omnibuilds.com
[omnihelp]: http://help.omnibuilds.com
[variables]: https://jekyllrb.com/docs/variables/
[prev-next-blog]: http://david.elbe.me/jekyll/2015/06/20/how-to-link-to-next-and-previous-post-with-jekyll.html
[jekyll-fancy]: https://gist.github.com/smutnyleszek/9803727
