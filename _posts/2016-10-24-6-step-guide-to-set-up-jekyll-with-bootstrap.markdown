---
layout: post
title:  "6-Step Guide to Set Up Jekyll with Bootstrap"
date:   2016-10-24 10:32:00 -0700
categories: [jekyll, bootstrap]
comments: true
---

Let me just start off by saying that setting up Jekyll with Bootstrap was ridiculously difficult, but it really doesn't have to be. I had a lot of "fun" (meaning several head-bashing-against-the-wall moments) with this and basically built and tore down this site five times over before it was finally up and running. ([This is the first website I've made since 2002...][about-me] and the web has surely changed since the days of simple HTML and CSS!)

#### There were several "all-in-one packages" I considered before I decided integrate the two myself
- [Jekyll Bootstrap][jekyll-bootstrap]
- [Octopress][octopress]
- Honorable mention: [ruhoh][ruhoh]

#### Issues I ran into
- [Jekyll Bootstrap][jekyll-bootstrap] is no longer maintained. The documentation I was trying to follow got me as far as the setup of the website, but I had no idea how to add or utilize Bootstrap and there were very limited themes available to plug-and-play.
- I then moved on to [Octopress][octopress]. Again, easy-peasy setup, more themes available, and the Jekyll site structure was starting to look a bit more familiar to me on the second run. I was working off Octopress 3.0, the newest version at the time of writing this, and still got stuck on integrating Bootstrap and customizing templates.
- I never ended up using [Ruhoh][ruhoh], but this was the successor of Jekyll Bootstrap, made by the same developer. It touted a true all-in-one simple site setup, but I shied away from this option in the end because I felt compelled to try to learn how to setup a site from "scratch".


---


I finally decided to go with plain ol' [jekyll][jekyll], integrate Bootstrap myself, and create my own custom template. That's not to say that the above methods wouldn't provide a solid foundation for Jekyll-Bootstrap, but I eventually learned to do it this way.

#### *This guide is intended for beginners, however it assumes some base knowledge of
- [Command line][unix]
- [HTML][html] & [CSS][css]
- [Jekyll][jekyll]
- [Bootstrap][bootstrap]
- [GitHub][github]
- Also good to know: [Markdown][markdown]

<br />

## **The Setup**

<br />

#### 1. Use the quickstart guide to setup [Jekyll as instructed][jekyll-quickstart].

#### 2. Download [Bootstrap] - the Sass version. Go to the folder `assests\stylesheets`.

#### 3. Place `_bootstrap.scss` and the `bootstrap` folder and all its contents into a new folder named `_sass` in the root of the Jekyll project.

#### 4. In the `Gemfile` of the Jekyll project, add the following line

```
gem "sass"
````

#### 5. Go to the `_config.yml` file and add the following

```
sass:
    style: :compressed
    sass_dir: _sass
```

Be sure to quit out of and restart the Jekyll server anytime the `_config.yml` file is changed.
#### 6. Update the `css/main.scss` file to this

```
---
---
@import bootstrap
```

All else in `main.scss` can be deleted unless the built in minima theme will be used. To modify bootstrap settings add code **after** the two sets of dashes, but **before** the `@import bootstrap`. The `bootstrap` folder in `_sass` contains the modifiable variables. An example view of a `main.scss` file when I want to update the headings font typeface to Arial is

```
---
---
$headings-font-family: "Arial", sans-serif;

@import bootstrap
```

<br />

### And that's it in 6 easy steps! -- Bootstrap styling can now be used directly in the HTML.


<br />
Did you find this guide helpful? Comment below - feedback is welcome.


[about-me]: /software%20engineering/2016/10/16/why-im-aspiring-to-be-a-software-developer.html
[jekyll]: https://github.com/jekyll/jekyll
[jekyll-quickstart]: https://jekyllrb.com/
[jekyll-bootstrap]: https://github.com/plusjade/jekyll-bootstrap
[ruhoh]: https://github.com/ruhoh
[octopress]: http://octopress.org/
[bootstrap]: https://getbootstrap.com/
[markdown]: http://kirkstrobeck.github.io/whatismarkdown.com/
[github]: https://github.com/
[html]: http://www.w3schools.com/html/
[css]: http://www.w3schools.com/css/
[unix]: https://www.google.com/#q=learn+command+line