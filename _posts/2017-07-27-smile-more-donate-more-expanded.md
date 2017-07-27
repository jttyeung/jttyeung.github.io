---
layout: post
title:  "Smile More, Donate More :) Expanded"
date:   2017-07-27 04:20:00
tags: [software engineering, browser extensions, aws, node.js, nginx, certbot, https]
comments: true
---


### What is [Smile More, Donate More :)][website]

Catch up with the [last blog post][last blog] I wrote.


<br>
### The Expansion

Okay, so I've been obsessed with this browser extension since I've created it. Building something that I can use myself (and others can too) is mildly addicting. *[Understatement][adem].* It's not necessarily unique or amazing as far as projects go, but I am really proud of and happy with it... so much so that I've decided to expand the extension to Firefox and Opera browsers, create a [support email][support], and create a [website][website] for it.


<br>
### Objectives

- Learn what it takes to deploy to other web browsers. On my evaluation list was: Firefox, Safari, Internet Explorer, and Opera.

- Refresh my knowledge of JavaScript/Node.js. I know I probably didn't need to use node for my website - it's incredibly overkill - but I wanted to practice deploying a Node server on AWS.

- Learn [AWS][aws]. Previously, I deployed apps on [Heroku][heroku] and [DigitalOcean][digital-ocean]. With all the AWS buzz, it was as good time as any to learn some AWS.

- Learn [Nginx][nginx]. I recently went to an [EFF Certbot][eff] installation event and installed a basic app on DigitalOcean with an Apache/Ubuntu configuration (but took it down because of costs). This time I wanted to play around with Nginx/Ubuntu to see what differences there were.


<br>
### Biggest Bottlenecks (a.k.a. time-sucks)

- Creating better resolution icons and other browser marketing materials for the app. Now that I was expanding, it was time to have an icon that didn't look so pixelated.

- Re-learning Node and Express. Having not used it in several months, it's easy to forget syntax.

##### Even bigger (...errr, smaller?) bottlenecks:

- Learning Amazon Web Services (AWS) basics and how to deploy my node app on it. Check out [this section below for a few notes and tips on implementation][deployment], or check out my friend [Kate's excellent blog post about how to deploy to AWS with Python, Flask, and PostgreSQL][kate].

- Learning Nginx. I still don't feel as if I have a strong grasp of Apache/Nginx configurations after this, but it was nice to get some practice using these web servers. I imagine this is something that will take time to get acquainted with.


<br>
### Lessons Learned

- Firefox (Mozilla) and Opera use many of the same APIs as Chrome. Holla IE and Safari. Holla.

- On that note, Apple requires developers to pay $99/year to develop for Apple. What. No.

- Documentation, documentation, documentation. I love great documentation. It's interesting that the more developer docs I read through, the more I realize how important simple things can make a big difference for a developer's desire to use an API. UX (like page layout) of the docs pages makes a HUGE difference, along with solid usage examples with code/photos, and thoroughness of explanations. Having now used Mozilla's, Chrome's, and Opera's docs, I've found that I learned something new in every one - does this mean no one docs is perfect?

- Mozilla and Opera have an extensions code validation and review process so it doesn't immediately get posted publicly like that of Chrome extensions. Opera's review process takes... forever. As of today it's not been reviewed and it's been over a week. Crossing fingers and hoping it'll be posted soon!

- When zipping files using Mac OS, it also zips hidden .DS_Store files and a hidden __MAXOSX folder with files. These hidden files are [resource files][resource files] which come up as a "hidden file flagged" warning in Mozilla's add-ons validation process. I believe it's pretty harmless to include, but a quick zip using command line can exclude hidden files in a zip file: `zip -r directory-name.zip . -x ".*" -x "__MACOSX" "*.DS_Store"`

- On my third browser extension development, I finally found a bug in my own code. (I knew it was too good to be perfect on the first release.) Having worked with issue tracking quite a bit in my past jobs, I really enjoyed [writing up my own issue and using GitHub to track and close it][issue]. (It was my first Git issue!) GitHub has a pretty nice and simple issue tracker.

- Reviewing for consistency in small things like wording/comments gets pretty hairy once there are several slightly different versions. I imagine in a non-packaged version I'd use a template and fill in the template code with whatever browser type applies. Since I'm creating a packaged extension for every single browser, there may not be an easier way to manage changes in the app that should be applied for every browser version.


<br><a name="deployment"></a>
### AWS Deployment & My Learning Path

1. Learn AWS. I learned some basic terminology and navigation in the three chapter lessons of the Certified Solutions Architect Associate [A Cloud Guru][acloudguru]. This was tremendously helpful in building a foundation for AWS deployment. (Some of their courses are available for purchase through Udemy for just $10!) It also was helpful to have deployed my Hackbright app to Heroku previously; there seems to be deployment patterns between services.

2. Translate. I studied my friend [Kate's blog post][kate] in detail, several times over, and kept referring back to it throughout the deployment process (and while setting up HTTPS). It was helpful to think in terms of Python/Flask/PostgreSQL because that's the stack I'm most familiar with, and then try to translate what that meant for my Node.js app.

3. Deploy with AWS Elastic Beanstalk. I actually went to the AWS Loft in San Francisco (amazing!) and the architects there were extremely patient with my n00b questions. #1 (Learn AWS) was really key to my ability to communicate better with them. Also, installing and deploying the [AWS sample node app][sample-app] was helpful in comparing configuration notes to my own app. Within an hour, my site was deployed using Elastic Beanstalk!

4. Tear it down and redo it from scratch (i.e. without Elastic Beanstalk). Learning the hard way was the ultimate goal. As with [my struggle with deploying to Heroku][heroku-post], I found that it's always fun and educational to do things the both the fast/slow and good/bad way. I created and destroyed EC2 instances over and over again to fix server setup problems just about as many times as I created/destroyed PostgreSQL databases during my last Heroku deployment.

5. I found a [really, really excellent two-part article on how to deploy a Node.js app with Nginx on AWS][deploy-aws]. It is so well written and explained there that I decided I don't need to rewrite my own tutorial. Huzzah!

6. A helpful missing piece to the above is [this guide on how to sync S3 objects to the EC2 instance][s3-sync].

7. [This article][route-ec2] from Amazon helped me route my Route 53 purchased domain to my EC2 instance.

8. The last step: HTTPS setup. [Certbot][eff] is a free and easy way to get a certificate installed on the server. Following that guide, I used a [SSL test][ssl-test] to test my server's certificate and configuration, and it gave me a 'B' score. To get to [A-status][a-status], I followed [DigitalOcean's guide (step 4: Updating Diffie-Hellman Parameters)][do-https].

<br>
And somehow, like magic, [there it is][website]. If I were to re-deploy using both methods with the knowledge I have now, I estimate it would take me less than 10 minutes to deploy with Elastic Beanstalk and probably closer to an hour without. I haven't exactly figured out why anyone would not want to use Elastic Beanstalk, [but here are a few good considerations from another dev's perspective][eb-downside]. By the way, [check out the site and download the browser extension][website] if you haven't already. :)

[deployment]: #deployment
[aws]: https://aws.amazon.com
[eff]: https://certbot.eff.org
[heroku]: https://www.heroku.com/
[digital-ocean]: https://www.digitalocean.com/
[support]: mailto:smilemoredonatemore@gmail.com
[website]: https://smilemoredonatemore.com
[adem]: http://kingkiller.wikia.com/wiki/Adem_sign_language
[last blog]: https://jttyeung.github.io/2017/07/02/smile-more-donate-more.html
[resource files]: https://en.wikipedia.org/wiki/Resource_fork
[issue]: https://github.com/jttyeung/smile-more-donate-more/issues/1
[kate]: https://kathryn-rowe-portfolio.herokuapp.com/aws_demo
[acloudguru]: https://acloud.guru/
[nginx]: https://www.nginx.com/resources/wiki/
[heroku-post]: https://jttyeung.github.io/2017/06/30/deploying-to-heroku-and-the-database-migration-nightmare.html
[route-ec2]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html
[deploy-aws]: https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171
[sample-app]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html#nodejs-dynamodb-tutorial-deploy
[do-https]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04
[ssl-test]: https://www.ssllabs.com/ssltest/
[a-status]: https://www.ssllabs.com/ssltest/analyze.html?d=smilemoredonatemore.com
[s3-sync]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonS3.html
[eb-downside]: https://medium.com/dev-talk/elastic-beanstalk-advantages-and-drawbacks-be814615af01
