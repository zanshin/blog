---
layout: post
title: "How to Customize Ubuntu's Message of the Day"
date: 2017-08-31T07:04:00
tags:
- nerdliness
link:
---
I've always liked the message of the day the [Freenode](https://freenode.net "Freenode") displays
when you connect to IRC. With both a laptop and a desktop running Ubuntu 17 these days, I wanted to
have a custom message of the day (MOTD) that followed a similar pattern as Freenode uses.

Ubuntu stores the components of the MOTD in `/etc/update-motd.d`.

    $ cd /etc/update-motd.d
    $ ls -al
    total 56
    drwxr-xr-x   2 root root  4096 Aug 30 22:39 .
    drwxr-xr-x 140 root root 12288 Aug 30 22:28 ..
    -rwxr-xr-x   1 root root  1220 Aug 30 22:32 00-header
    -rwxr-xr-x   1 root root  1157 Jun 14  2016 10-help-text
    -rwxr-xr-x   1 root root  4196 Feb 15  2017 50-motd-news
    -rwxr-xr-x   1 root root    97 Jan 27  2016 90-updates-available
    -rwxr-xr-x   1 root root   299 Apr 11 10:55 91-release-upgrade
    -rwxr-xr-x   1 root root   129 Aug  5  2016 95-hwe-eol
    -rwxr-xr-x   1 root root   142 Jul 12  2013 98-fsck-at-reboot
    -rwxr-xr-x   1 root root   144 Jul 12  2013 98-reboot-required

Each of these parts is executed in numerical order, and each is a small bash shell script. You can
see the current MOTD by running

    $ run-parts /etc/update-motd.d/

In order to customize my message of the day I added a new part, `05-fermata`. The `05` puts it just
after the initial header, and `fermata` happens to be the name of the machine. The file itself
contains this:

    #!/bin/sh
    printf "\n "
    printf "\n Welcome to Fermata"
    printf "\n "
    printf "\n "
    printf "\n A fermata is a symbol of musical notation indicating that the note should be "
    printf "\n prolonged beyond the normal duration its note value would indicate. Exactly how"
    printf "\n much longer it is held is up to the discretion of the performer or conductor,"
    printf "\n but twice as long is common. It is usually printed above but can be occasionally"
    printf "\n below the note to be extended."
    printf "\n "

Now when I run `run-parts /etc/update-motd.d/` or when I `ssh` into the machine or create a new
terminal session, the MOTD includes the name of the machine and a brief description of that name.
