---
layout: post
title: "Drag but Can't Drop Fixed"
date: 2013-06-05T08:50:00
comments: true
tags:
- nerdliness
- apple
link: false
---
Every so often, usually after a restart or re-boot, I would be unable to drag and drop on my MacBook Pro. For example, when moving mail to a new folder I could click on the mail and drag it to the destination but when I let released the trackpad the mail stayed "stuck" to the mouse pointer. I'd have to move the mail back to its original location and click there to release it. Moving icons had the same problem: I could drag, but not drop. 

This morning, after updating to 10.8.4, the issue cropped up again and I think I've fixed it once and for all.

In the past I would bring up the Force Quit dialog (Option-Command-Escape) and restart the Finder. Today, however, restarting the Finder didn't solve the problem. Some Google searched led me to several forum postings that indicated some third-party software may contribute to the issue. In my case the culprit was [AirDisplay](http://avatron.com/apps/air-display "AirDisplay").

[Avatron](http://avatron.com "Avatron"), the makers of AirDisplay, are aware of the problem, saying that (for my model of MacBook Pro) I should [sleep and wake the computer](http://avatron.com/lion "Lion & Mountain Lion Compatibility") after every restart or login. Which explains why the problem always seemed to go away eventually. 

Since I don't use AirDisplay very much, I decided to completely remove it from my system. Just deleting the preference pane from System Preferences doesn't work as AirDisplay, and many other third-party addons, insert kernel extensions or `kext` files into your system. Since AirDisplay allows the use of an iPad as a secondary screen, it has need of intercepting (or at least being aware of) drag and drop operations. It seems that the kext or kexts involved were interfering with normal drag and drop operations.

Searching for "[completely remove AirDisplay](http://avatron.com/downloads/AirDisplayFAQv3.pdf "completely remove AirDisplay") revealed that there is an uninstaller for it hidden in `Applications/Utilities`. Once I ran that (which required a reboot) drag and drop started working normally again.
