---
layout: post
title: "Display Notification Center Alerts on Remote Machines"
date: 2012-09-04T10:23:00
comments: true
tags:
- apple
- nerdliness
link: false
---
During evenings and over weekends my Internet browsing may lead me to items I want to pursue while at work. In the past I have sent my work email account mail with URLs to articles or software that I wanted to look into further while at work. The problem with this practice is that my work email account is read by my personal computer, so I end up with an unread email badge staring me in the face all weekend long. 

[Matt Gemmell](http://mattgemmell.com "Matt Gemmell")'s recently released [Sticky Notification](http://mattgemmell.com/2012/08/22/sticky-notifications/ "Sticky Notifications") tool allows you to quickly create a sticky notification (one that must be dismissed). This is great for ADD types like myself, to create reminders of what I was working on when I have to leave a task before it is completed for some reason. What would make it even better would be a way to create sticky reminders on remote machines.

One of the hints today on the Mac OS X Hints page is a method for [creating Notification Center alerts from the command line](http://hints.macworld.com/article.php?story=20120831112030251&utm_source=dlvr.it&utm_medium=twitter "Display Notification Center Alerts from the command line and AppleScript"). Using that hint, a short shell function, and the ability to shell into my work computer remotely, I am now able to create new notices on my work computer.

##Step 1: Install Display Notification Center Alert action
The hint on Mac OS X Hints relies upon an [Automator](http://support.apple.com/kb/HT2488 "Automator") action created by Automated Workflows. Download the [Display Notification Center Alert Automator Action](http://www.automatedworkflows.com/2012/08/26/display-notification-center-alert-automator-action-1-0-0/ "Display Notification Center Automator Action") and follow the directions for installing it. (Basically double-click on the action file.)

##Step 2: Create a DisplayNotification workflow
Fire up Automator and create a new workflow. Locate the freshly installed Display Notification Center Alert action from the list and drag it to your workflow. Follow the directions in the [command line Notification Center Alert](http://hints.macworld.com/article.php?story=20120831112030251&utm_source=dlvr.it&utm_medium=twitter "Display Notification Center Alerts from command line") hint and create three variables (title, subtitle, and message) and associate them with their corresponding fields in the action. Finally save the action. I followed the hint's suggestion and created a `~/Library/Workflows` directory and saved my new workflow there.

##Step 3: Test the workflow
From the command line test your new action to make sure it works. Once you tire of creating new alerts move on to Step 4.

    $ automator -D title='Testing' -D subtitle='testing' -D message='Is this thing on?' 
	~/Library/Workflows/DisplayNotification.wflow
	
(Note: command should be all on one line, it's broken into two lines here for readability concerns.)

##Step 4: Create a shell function to call the Automator workflow
Rather than have to type the entire command necessary to run the workflow each time I want to create a new alert, I created a short shell function to encapsulate it.

    notify() {
	  automator -D title=$1 -D subtitle=$2 -D message=$3 ~/Library/Workflow/DisplayNotification.wflow
	}
	
With this function in place all I need to do to create a new alert is

    notify 'This is my alert' 'It is a very fine alert' 'Filled with alert goodness'
	
##Step 5: Profit!
Now I can create alerts on any of the (Mountain Lion) computers I use, from any other computer I use simply by secure shelling into them and running one command.

##Update
After getting all of this to work, you may wish to visit the Notifications panel of System Preferences. In the list of alerts under "in Notification Center" you'll find an entry for "Automator Runner". Changing its display style from the default "Banners" to "Alerts" will cause any command line triggered alert to be sticky, requiring your dismissal. Excellent.
