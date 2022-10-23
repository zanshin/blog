---
layout: post
title: "MacBook Pro Fan Replacement"
date: 2012-07-18T15:30:00
comments: true
tags:
- apple
- nerdliness
link: false
---
At the tail end of last week I noticed that my [mid-2009 MacBook Pro](http://support.apple.com/specs/ "Apple serial number lookup") was making an intermittent rattling sound. My first fear was that my hard drive was failing. I did some Googling and found this command which queries the hard drive's [S.M.A.R.T.](http://en.wikipedia.org/wiki/S.M.A.R.T. "S.M.A.R.T.") status:

    $ diskutil info disk0 | grep SMART'
	
`diskutil` is the command line interface to [Disk Utility](http://support.apple.com/kb/HT2055 "Disk Utility"). A returned status of `verified` is good. Anything else is cause for alarm. My hard drive consistently shows `verified` when I run this command. 

My next thought was that one of the two fans in the enclosure must be the cause. After shutting down the laptop and removing the bottom of the case I used a can of compressed air to blow out any accumulated dust and cat hair. I didn't get much out and after reassembling the machine the rattle returned.

Using the Dashboard widget [iStat Pro](http://islayer.com/apps/istatpro/ "iStat Pro") I could see that both fans were running about 2000 rpm under normal load. To test the theory that one of the fans was causing the rattle I fired up [Portal 2](http://www.thinkwithportals.com/ "Portal 2"). As the fan noise increased, and the measured speed cleared 3000 rpm, the rattle increased in volume and frequency. And I was able to locate the sound on the left side of the laptop, under the ESC key.

A search for replacement fans led me to the [iFixit](http://ifixit.com "iFixit.com") site where I was able to order a replacement left-sde fan. That part came in the mail today and after a few minutes work I had swapped the fans. The iFixit site has very clear, concise [directions](http://www.ifixit.com/Guide/Installing-MacBook-Pro-15-Inch-Unibody-Mid-2009-Left-Fan/1711/1 "Installing MacBook Pro Left Fan") complete with pictures to walk you through the process. I cannot recommend them enough.

My laptop has been up and running for nearly 30 minutes since the replacement without a hint of rattle. I'll give it some more time just to be certain but I am confident that I diagnosed and fixed the problem.
