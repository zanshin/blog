---
layout: post
title: "Deleting Apple System Logs to Speed Up Zsh"
date: 2012-08-17T10:22:00
comments: true
tags:
- nerdliness
link: false
---
For the past year I have been using the [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/ "oh-my-zsh") framework to configure my zsh prompt and environment. My one complaint about oh-my-zsh is its slowness spawning a new shell. When I use Cmd-T in iTerm to create a new
tab I often have to wait 3 or 4 or even 5 seconds for that new shell to become active. This is unacceptable.

Searching for "speed up oh-my-zsh" lead me to the [zsh stars incredibly slowly](http://superuser.com/questions/236953/zsh-starts-incredibly-slowly "zsh starts incredibly slowly") discussion. From there I went to [speed up a slow terminal by clearing log files](http://osxdaily.com/2010/05/06/speed-up-a-slow-terminal-by-clearing-log-files/ "Speed Up a Slow Terminal by Clearing Logs Files"). My `/private/var/logs/asl` directory did have some `*.asl` or [Apple System Log Files](http://crucialsecurityblog.harris.com/2011/06/22/the-apple-system-log---part-1/ "The Apple System Log - Part 1"). Using the suggested `rm` command I deleted all `*.asl` files in my `/private/var/logs/asl` directory.

    $ sudo rm /private/var/logs/asl/*.asl

Prior to deleting the `*.asl` files I tested the start time of my shell like this:

    $ time zsh -i -c exit
    zsh -i -c exit 0.35s user 0.40s system 12% cpu 5.953 total

After deleting the `*.asl` files the time dropped considerably:

    $ time zsh -i -c exit
    zsh -i -c exit 0.27s user 0.21s system 96% cpu 0.496 total

NB: As with any low-level mucking about on your computer, proceed at your own risk. I don't fully understand everything that ASL files are used for. Deleting the set my computer has accumulated seems to have considerably speed ip spawning new shells without any detrimental side effects. Your experience may vary.
