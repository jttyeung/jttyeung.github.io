---
layout: post
title:  "Deploying to Heroku and the Database Migration Nightmare"
date:   2017-06-30 21:38:00
tags: [software engineering, heroku, postgresql, vagrant]
comments: true
---


### What is Heroku?
It's a cloud platform that allows people to deploy their apps, among many other things. It's like Amazon Web Services (AWS) with training wheels. In fact, Heroku is built on top of AWS. Heroku has a free tier offering, hence it makes a great and widely popular platform for students, hobbyists, and bootcamp grads to deploy their app to the web.

<br>
### Why I Am Writing This Tutorial and Who This is For
There are a ton of tutorials online on how to deploy web apps to Heroku, and many of them are absolutely perfect. Heroku's is also not so bad, but I'm going to go a little further into breaking down the details for n00bs like me. I am a little embarassed to admit I spent about 5 hours or so banging my head against my keyboard in attempt to figure this one out. In particular I really had trouble with the database migration part so I'll be drilling down how to migrate a **PostgreSQL** database out of **Vagrant** (a virtual machine) into a Heroku database. This will be more or less geared to Hackbright folks, for who this problem applies to directly. If you want to learn how to deploy to AWS, [check out my friend Kate's detailed blog post about deploying to AWS][kate-aws]!

<br>
### How To Deploy

1. Create an account on [Heroku][heroku]
2. `$ brew install heroku` (Uses [Homebrew][homebrew])
3. Login to Heroku `$ heroku login`
4. Create an app on Heroku and add a git remote for it.
    ```
    $ heroku apps:create your-appname-here
    $ heroku git:remote -a your-appname-here
    ```

    The app will later be available at: https://your-appname-here.herokuapp.com

5. Now check the git remotes `$ git remote -v` and there should be at least two listed for heroku.

    <img src="{{url}}/images/heroku/gitremote.png" class="img-responsive center-block" />

6. Heroku needs a Procfile, otherwise known as a config file, to know how to handle and setup the app. Make one in the local root directory of your project.
```
$ nano Procfile
```

    Insert your Python server/routing file using "web" as the keyword. `web: python server.py` This will tell Heroku from what file to launch the server. Exit (CTRL+X) and save the file.

7. Heroku needs a runtime file to specify the version of Python it's running. By default it uses Python 3.x. Make one in the root directory of your project.
```
$ nano runtime.txt
```

    Insert: `python-2.7.13`. Exit (CTRL+X) and save the file.

8. Modify the PORT number specified in the server file because Heroku will randomly assign ports. Also make sure the app doesn't enter debug mode on Heroku. Git commit these changes.

    ``` python
    # server.py

    PORT = int(os.environ.get("PORT", 5000))

    DEBUG = "NO_DEBUG" not in os.environ

    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
    ```

9. Push the app to Heroku.
```
$ git push heroku master
```

10. For all secret keys, set them in the following format:
```
$ heroku config:set FLASK_APP_KEY='yoursupersecretappkey'
```

    Run `$ heroku config` to see that all the keys are there and configured properly.

<br>
Yay! The app should be up now. Not too bad. Now to the fun part:

<br>
### How To Migrate The PostgreSQL Database From Vagrant
There are two ways to do it: 1) The slow and painful way that I spent hours on, or 2) The faster way of doing it. There's really no reason to do it the slow and painful way unless practice creating databases and skirting around virtual machines sounds fun. The two methods both get the job done.

First, a little background:
At Hackbright our focus was using Vagrant to build our apps. All our tools are built on Vagrant, which is a nice way to package everything away onto a virtual machine. A couple problems with that that many of us discovered during our time at Hackbright: Some tools such as Sublime won't be on the virtual machine and it's not possible to use command line to launch programs like this. Every local file or folder that needs to be accessed in the virtual machine must be specified in the Vagrantfile (config file for Vagrant). More recently, I discovered that migrating a database outside of Vagrant requires a couple extra steps than what is provided on Heroku due to this setup.

1. It's not possible to simply move the database from Vagrant or any machine to Heroku. First, a new database must be created on Heroku, then it must be "restored" from existing data. (The 'hobby-dev' signifies the free tier database being created.)
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

2. Sometimes it takes a while for the database to be available on Heroku. This command tracks the status of the creation if any time is needed.
```
$ heroku pg:wait
```

3. This command will show where the database on Heroku is located. 'DATABASE_URL' is database's alias name.
```
$ heroku config -s | grep DATABASE_URL
DATABASE_URL='postgres://somelongurlstringto.amazonaws.com'
```

4. In the server.py file, modify the database connection settings for Heroku.

    ``` python
    # server.py

    connect_to_db(app, os.environ.get("DATABASE_URL"))
    ```

5. In the model.py (database model) file, modify the database connection settings for Heroku.

    ``` python
    # model.py

    def connect_to_db(app, db_uri=None):

        app.config['SQLALCHEMY_DATABASE_URI'] = db_uri or 'postgres:///your-database-name'
    ```

6. Now there's a Heroku database and the current app database. To transfer the existing data:

    **Method 1** (slower): While in Vagrant, create a `pg_dump` of your current database. Exit Vagrant (but still be in the virtualenv). Brew install PostgreSQL to your local machine. Create a local psql database. Restore that database using the dump file. The local database will be used going forth in the next Method 1 steps.

    **Method 2** (faster): Create a login for a superuser with a password in the local PostgreSQL database.
    ```
    $ psql
    CREATE ROLE your-username-here WITH LOGIN SUPERUSER PASSWORD 'your-password-here';
    \q
    ```

    Continue Method 2 Steps.

7. Create a compressed pg_dump from the database.

    **Method 1** (outside of Vagrant), run:
    ```
    $ pg_dump -Fc --no-acl -h localhost -U your-computer-username your-database-name > database.dump
    ```

    To find the computer username: `$ id -un`

    **Method 2** (Inside Vagrant) and in your project folder, run the same command as above, but substitute your-computer-username with whatever superuser username was created in the last step. Add PGPASSWORD= to the beginning with the password set for the superuser.
    ```
    $ PGPASSWORD=your-superuser-password pg_dump -Fc --no-acl -h localhost -U  your-superuser-name > database.dump
    ```

    -Fc: custom format dump<br>
    --no-acl: prevent dumping of database access priviledges<br>
    -h: host (is localhost in this case)<br>
    -U: username

    This command should return nothing, and that means that your database dump was successful.

8. On the local drive, find database.dump. It now needs to be hosted somewhere on the web so Heroku can find it. Heroku suggests Amazon Web Services (S3), but I thought it would be easier using Dropbox since I already have that setup and I'm not too worried about the security of my database data. To use Dropbox, add the file to a public folder, right click the file and select "Copy Dropbox Link".
    
    For Dropbox links: The link should look something like 'https://www.dropbox.com/s/a96bd93tey3t7a9/dumpity.dump?dl=0'. I had read in some posts online that some people were not able to get the next step working without modifying the link. It worked both ways for me, but if there's any trouble with the next step try changing the end of the link dl=0 to dl=1.

9. Migrate data using a database restore. The first link following 'restore' in the line below is where the database should be restored from (source, i.e. Dropbox, AWS, etc.), and the second is DATABASE_URL (destination, i.e. Heroku database). DATABASE_URL uses the Heroku database alias that was created earlier so it's not necessary to write out the entire Heroku generated URL here. While on the local drive connected to Heroku via the Terminal, run:
```
$ heroku pg:backups:restore 'https://your-dropbox-or-s3-hosted.dump' DATABASE_URL
```

<br>

And there it is... the app and database are live! Being inside Vagrant somehow disallowed pg_dumps unless a database user and password is setup. That made the difference between recreating a database entirely on a local drive, and not. I can't exactly state the reason behind this, but hopefully this will save hours of confusion for someone else trying to deploy their Heroku app in the future.


[homebrew]: https://brew.sh/
[heroku]: https://www.heroku.com/
[kate-aws]: https://kathryn-rowe-portfolio.herokuapp.com/aws_demo

