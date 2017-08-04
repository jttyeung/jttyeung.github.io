---
layout: post
title:  "Smile More, Donate More :)"
date:   2017-07-02 18:54:00
tags: [software engineering, browser extensions]
comments: true
---


[<img src="https://raw.githubusercontent.com/jttyeung/smile-more-donate-more/master/screenshots/smilemore-1400x560.png" class="img-responsive center-block" />][smilemore]
<br>

### What is [Smile More, Donate More :)][smilemore]

**[Smile More, Donate More :)][smilemore]** is a lightweight Chrome extension built in JavaScript, HTML, and CSS. While browsing on Chrome, the extension captures any Amazon.com URL requests entered by the user and sends the browser to [AmazonSmile (https://smile.amazon.com)][smile] instead. AmazonSmile is Amazon's charity program for non-profit organizations. For every purchase through AmazonSmile, Amazon donates 0.5% of the price of eligible items to the user's charity organization of choice. [Learn more about the program here.][smile-program]


<br>
### Why I Built This

I've been wanting to build a Chrome extension for ~~shits~~ smiles and giggles since I completed Hackbright, but I wasn't really sure what to build. Earlier this week I realized that I had been ordering a ton of things through Amazon.com (Prime Member/addict here) and I had forgotten I was supposed to be using AmazonSmile instead. I kicked myself for not remembering this, and then the idea suddenly popped into my head: why not build an app for that?

Oh.... duh. That's how every software engineer solves their problems. Make the machine do the thinking... so I don't have to. :)


<br>
### What This Project Means To Me

I have a heart and soul. A big part of me, despite all the other fun/side projects I do, wants to be an engineer that will help improve the lives of others. (No, I didn't just leave my last career to do meaningless work as a code monkey.) I recently spoke with career coaches at an event hosted by [PyLadies][pyladies] and "a purposeful career/life" came out as one of my top priorities that they suggested aiming for. I may be asking for a lot out of my first (hopefully soon) job given my novice engineering abilities, but the least I can do is try, try until I succeed.

I built this Chrome extension because it's a small automation task that will help contribute money to my selected organization, [Khan Academy][khan]. Khan Academy has amazing tutorials online to help people learn any subject of their choice, and it's free to all users. Its subjects target students in school, but some courses like their coding lessons, are widely applicable to all ages. I love this organization because it hits the core of what I believe in: free and accessible education for all.

The other special thing about this project is that it'll be the first public release of something I've built, that does not include any past portfolio or blog sites or my Hackbright (learning) project. I will be sharing this with all my friends and family and publicly online, it's something I want everyone to use, and I have enabled reviews of the extension on Chrome's Web Store. This may be the first time I'm getting actual developer feedback. (Yikes.) Regardless, I am excited to get people to use it so Amazon can donate more to charities. As the largest online retailer (and growing), everyone is or will be using Amazon. Even though they only donate 0.5% of eligible item purchases, the combined donation amount can be impactful. To this date, Amazon has donated $54.5 million. Let's keep this going.


<br>
### Challenges and Surprises

- Building the app and redirect functionality itself was incredibly easy (even though it was in Javascript).The [Chrome extensions setup guide][chrome setup] was really easy to follow, and I was able to establish the core functionality in about half an hour.

- Learning very quickly that I will probably never download Chrome extensions without thorough research on the app and developer.Just with a little fiddling around, it's possible to see that an extension can be built with malicious intent or to track a user's actions. I'm not a security expert nor am I familiar with how closely Google keeps tabs on the published apps, but this alarmed me a bit. That's why I've decided not to gather any data about my users, and to use simple and readable [open source code][github] for others to review.

- Troubleshooting was difficult. I spent a decent amount of time trying to figure out how to troubleshoot. Answer: Right-click on the extension and click "inspect popup". Still not as good as just being able to inspect on the fly with normal browser apps with Chrome Dev Tools, but better than nothing.

- There are many ways to accomplish the same task (for my project). As I was reading through Google's documentation, I longed for more concrete example uses and explanations of the methods allowed. There were too many permutations of possible ways to build my code and I couldn't figure out what to use. I ended up reading through much of the documentation, googling, researching on Stack Overflow, and even looking at other people's examples on GitHub to try to make sense of folder structure, naming schema, and method usage. Turns out that there were several ways to create a redirect, and I chose (IMHO) the best method. Of the methods the first was to capture the HTTP request before any TCP connection is made to Amazon, and the second and third would capture the HTTP response. I believe the third would partially (or fully) render the page before a redirect would happen. The first method was an obvious winner given the extra efficiency/performance. In a sense, the description of my app doesn't really make sense because it's not actually redirecting a user as much as it is modifying the request that the browser makes for the user, but I left it as such because it seemed to be the easiest way to explain it to the general populous without going into too much detail.

- CSS (Cascading Style Sheets). I forgot how much I hate those little boxes.

- Learning that I had to pay $5 in order to publish apps on the Chrome Web Store. I usually like free, but I had already worked so hard and wanted this app to succeed so bad that I paid for the opportunity to share my work.

- Learning what it takes to publish an app on the Chrome Web Store. Very specific requirements, a lot of descriptors and information, and even more pictures/screenshots! (Little did I know how much of this project would be dedicated to front-end design and making it presentable.) I pulled out my rookie Photoshop skills to quickly design a bunch of icons and banners of different sizes. Design has always been something I've wanted to spend more time on, but haven't (yet). I'm definitely a left-brainer so this was a challenging (and fun) task.

- I wanted to provide some extra features in a website (outside of my Chrome extension) that would let users search charitable organizations by category, etc. if they did not know what organization they wanted to support. Currently AmazonSmile's search for charitable organizations has only a search by location or organization name. It sucks. I wish I could rebuild their search so it has filters and sorting capabilities (or at least give me an API to work with)!

<br>

Here's a live action screencast of what the extension looks like on Chrome. Notice no matter what page I try to visit on Amazon, I will only be taken to the AmazonSmile version of that page:
<br>

[<img src="https://github.com/jttyeung/smile-more-donate-more/raw/master/smilemore-screencast.gif" class="img-responsive center-block" />][smilemore]

<br>

Overall, this was a really fun project for me. It was a joy to put together my first launch in an app store, learn about how Chrome extensions work, and flex my (tiny) front-end muscles. Moreover, it was exciting to be able to build an idea from concept to product entirely on my own. Hopefully there will be more soon! If you tried my Chrome extension, please feel free to contact me or leave a message below for feedback. Any feedback is appreciated - thanks!

Keep Smiling :)

<br>
[<img src="https://github.com/jttyeung/smile-more-donate-more/blob/master/screenshots/smilemore-screencast.gif?raw=true" class="img-responsive" />][smilemore]


[smilemore]: https://chrome.google.com/webstore/detail/smile-more-donate-more/lbicnnogjkpfkhokabdopjibhlcejhop?hl=en-US&gl=US
[pyladies]: http://www.pyladies.com/
[smile]: https://smile.amazon.com
[smile-program]: https://smile.amazon.com/gp/chpf/about/ref=smi_se_rspo_laas_aas
[khan]: https://www.khanacademy.org/
[chrome setup]: https://developer.chrome.com/extensions/getstarted
[github]: https://github.com/jttyeung/smile-more-donate-more
