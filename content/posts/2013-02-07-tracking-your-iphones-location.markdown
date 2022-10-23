---
layout: post
title: "Tracking Your iPhone's Location"
date: 2013-02-07T14:51:00
comments: true
tags:
- nerdliness
link: false
---
After reading Jack Perkes' article [Tracking Your iPhone's Location](http://pretengineer.com/post/tracking-iphone-location/ "Tracking Your iPhone's Location") I decided I wanted to do this with my phone. 
##Getting a Copy of the Project
I started by [forking](https://github.com/zan5hin/findi "findi") the Github [findi](https://github.com/pearkes/findi "findi") project. There is a sample [Heroku](http://www.heroku.com "Heroku") project as well, complete with instructions on using Heroku to host your tracking efforts. While I'm not using Heroku I did make use of the `bootstrap.py` and `record_location.py` scripts and `requirements.txt` file from the [findi-heroku-example](https://github.com/pearkes/findi-heroku-example "findi heroku example") project.

Once I had cloned the fork to my laptop, I copied the contents of the `bootstrap.py`, `record_location.py`, and `requirements.txt` files to my local copy of the project. This way my fork is based on the findi project itself, and not the example Heroku one, but I have the additional files from the example project.

I also added a [Python `.gitignore`](https://github.com/github/gitignore "gitignore templates") to my fork.

##Testing on the Command Line
Next I tested findi against my iPhone. findi wrappers Apple's Find My iPhone API and therefore is dependent upon your Apple ID. Once you instantiate a findi object using your Apple ID and Password, you can get a list of all the devices you are tracking. In my case that list contained 5 devices: my laptop, an original iPad, a brand-new iPad Mini, my iPhone, and my work iMac. 

Plugging the index of my iPhone (3, in a zero-based list) into the API gave my my current latitude and longitude. Using copy and paste I was able to verify my location on Google Maps. 

##Modifying the Script for My Device List
The `record_location.py` script expects a device mapped to your Apple account. 

{{< highlight python >}}
"Fetches an iPhone location from the Apple API and creates a Location Object"
    iphone = FindMyIPhone(APPLE_EMAIL, APPLE_PASSWORD)
    iphone_location = iphone.locate()
{{< / highlight >}}

Since I have 5 devices I changed the code slightly and hard-coded the index for my iPhone:

{{< highlight python >}}
"Fetches an iPhone location from the Apple API and creates a Location Object"
    iDevices = FindMyIPhone(APPLE_EMAIL, APPLE_PASSWORD)
    # my phone is the 4th device (index 3) in the list
    iphone_location = iDevices.locate(device_num=3)
{{< / highlight >}}

By default the script records the UTC time for each location. 

{{< highlight python >}}
date = Column(String, default=datetime.utcnow,
                  onupdate=datetime.utcnow)
{{< / highlight >}}

I'd rather have the time for my timezone, so I changed the `utcnow` method to be `today`:

{{< highlight python >}}
date = Column(String, default=datetime.today,
                  onupdate=datetime.today)
{{< / highlight >}}

Finally, in order to execute `record_location.py` easily from cron, I added a hash-bang to the top of the file:

{{< highlight python >}}
#!/usr/local/bin/python2.6
{{< / highlight >}}

My server through WebFaction provides multiple Python versions, the `python2.6` specifies the exact version I want. 

##Setting Up PostgreSQL and Cron
I used WebFaction's control panel to create a new PostgreSQL database, along with a database userid and password. `record_location.py` expects the Apple Email, Apple Password, and database URL to be in environment variables called `APPLE_EMAIL`, `APPLE_PASSWORD`, and `DATABASE_URL` respectively. At the command prompt I exported these variables, filling in the appropriate values:

{{< highlight bash  >}}
$ export APPLE_EMAIL="you@example.com"
$ export APPLE_PASSWORD="lettersAndNumbers"
$ export DATABASE_URL="postgresl://<user>:<password>:@localhost:5432:<databasename>"
{{< / highlight >}}

Running `bootstrap.py` with the exports in place created the table needed inside the PostgreSQL database.

Running the `record_location.py` script now resulted in a new row being inserted into the database. 

Cron runs in its own environment and knows nothing about my exports, so I created a `.cronvars` file to house the required variables, so that I could source them, thereby making them available to the cron environment when the the script was executed. Here's the line I added to my crontab:

{{< highlight bash  >}}
* 0 0 0 0 source $HOME/.cronvars; $HOME/pyapps/findi/record_location.py > /dev/null
{{< / highlight >}}

Initially I set the cron job to run every few minutes so I could see some rows appear in the table and verify that everything was working. Once it was clear that it was working, I changed the time to be `0`, or once an hour on the hour. 

##Fun and Profit
Now I have to wait a while to start collecting data from my phone's location; which by and large is my location. Eventually I'll use TileMill and MapBox to create a map. That will be the subject of a future posting.
