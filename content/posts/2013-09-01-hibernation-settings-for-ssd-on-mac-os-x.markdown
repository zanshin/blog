---
layout: post
title: "Hibernation Settings for SSD on Mac OS X"
date: 2013-09-01T15:36:00
comments: true
tags:
- nerdliness
link: false
---
In order to provide as much as 30-days of stand-by time on Retina MacBook computers that are equipped with Solid-State Drives (SSD) the computer is configured to enter deep hibernation after just one hour stand-by time by default. Upon waking the computer after an hour or more has passed there will be a 3 to 5 second delay as the data that was cached to the SSD is recovered so that the computer's state can be restored.

I personally found this delay to be annoying and so I changed the stand-by delay to be longer. Instead of the default 4200 seconds, or seventy minutes, I have mine set to 86,400 seconds or 1,440 minutes. Which is 24 hours.

Open Terminal.app and issue the following command to see the current settings.

{{< highlight bash >}}
$ pmset -g
{{< / highlight >}}

Here is the output on my computer prior to changing the `standbydelay`.

{{< highlight bash >}}
Active Profiles:
Battery Power          1*
AC Power          2
Currently in use:
 standbydelay         4200
 standby              1
 halfdim              1
 sms                  1
 hibernatefile        /var/vm/sleepimage
 darkwakes            0
 disksleep            10
 sleep                10
 autopoweroffdelay    14400
 hibernatemode        3
 autopoweroff         1
 ttyskeepawake        1
 displaysleep         2
 acwake               0
 lidwake              1
{{< / highlight >}}

By issuing this command,

{{< highlight bash >}}
$ sudo pmset -a standbydelay 86400
{{< / highlight >}}

I changed the stand-by delay to be a full 24 hours.

It is also possible to change the `hibernationmode` setting, by default `3` to `0` which would eliminate hibernation entirely. I choose to simply delay hibernation rather than eliminate it.

This thread on [apple.stackexchange.com](http://apple.stackexchange.com/questions/57175/is-a-3-5-second-delay-normal-for-a-retina-macbook-pro-to-wake-up-from-sleep "Delay waking up a MacBook Pro from sleep") has more details.

Since making the change my 13" Retina MacBook Pro awakens immediately on most occasions, as I tend to use it every day. 
