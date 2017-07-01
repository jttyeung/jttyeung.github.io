---
layout: post
title:  "Why Jekyll and Bootstrap?"
date:   2016-11-06 19:43:00 -0700
tags: [jekyll, bootstrap]
comments: true
---

Since my last website built in the early 2000's, the web has changed - a lot. I actually had another site (now defunct) using Wordpress.org in 2013, but the backend for that was setup by a friend. I would have happily gone back to Wordpress had I not thought, "but why?" This question led me to Google and reading about all the benefits of using Jekyll.

### I wanted a challenge, but also a smarter (and easier) way to build sites.
Jekyll isn't quite for beginners. The [setup][setup] assumes a bit of knowledge, but can also be simple if I had just chosen to go with the default theme and wanted nothing more than a blog. The best part of Jekyll is that it builds the site into static pages based off customizable templating, and it uses Markdown too! That meant that once I had my template setup I could just type away my posts without having to constantly fiddle with page styling. The cherry on top is the built-in compatibility with blogging features such as tags, posts, and plug-ins (e.g. [disqus][disqus]).

### I wanted a free site.
Jekyll is basically the foundation of GitHub. Which means it's natively supported by [GitHub Pages][github-pages] and I host my site for free!

### I wanted a static site generator.
What's all the rage about static sites? For me my main reasons for choosing a static site generator were performance and security. Static sites are pretty much always going to be faster than one built dynamically - for a simple personal website, who needs the clutter anyhow? I also coincidentally started building this site just after I started dipping my feet into information security, and knowing what I know now I would rather err on the side of caution on this one. [This site][static] sums up the advantages of a static site generator pretty well.

### I wanted to be able to visually optimize my site with ease.
Having built websites before, I know the enormous amount of headache that goes into styling a website and all the browsers (and versions) that are the bain of a developer's existence. Yes, I'm looking at you, Internet Explorer. [#IEhate][iehate] Not to mention there's a whole new level of playing field since the early days of the smartphone... I for one get really annoyed when I visit a site via my phone and it's just about the most aggravating thing to navigate through (due to sizing or other weird incompatibility issues when viewed on a much smaller screen).

Voila... and in comes [Bootstrap][bootstrap] to save the day! Having just learned about Bootstrap through an introductory online course, I was THRILLED. I knew this was going to be the solution for templating anything myself. Bootstrap fixes the major templating issues of having to think about pixels or what device a user will be viewing my site from.

<br>

### That pretty much sums up why I ultimately went with Jekyll and Bootstrap. One month later... I am extremely happy with my choice and haven't looked back!

[static]: https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/
[github-pages]: https://pages.github.com/
[setup]: /jekyll/bootstrap/2016/10/24/6-step-guide-to-set-up-jekyll-with-bootstrap.html
[disqus]: https://disqus.com/
[iehate]: https://twitter.com/hashtag/iehate
[bootstrap]: http://getbootstrap.com/
