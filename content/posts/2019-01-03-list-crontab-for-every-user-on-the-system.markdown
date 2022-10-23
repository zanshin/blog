---
layout: post
title: "List crontab for Every User on the System"
date: 2019-01-03T10:14:00
tags:
- nerdliness
link:
---
On your local computer you probably have a good idea of any cron jobs that have been setup. When you
are working on a remote machine or server, know what cron jobs are in place can be useful. Here's a
way to find them all.

    cat /etc/passwd | cut -f1 -d: | xargs -I '{}' sudo crontab -u '{}' -l

Here is a breakdown of this command.

`cat /etc/passwd` concatenates the file to standard out. This output is piped to `cut -f1 -d:` which
removes (cuts) sections from each line of the input file. The `-f1` flag indicates we only want the
first field from each line. The `-d:` indicates we want to delimit fields using the colon character.
The output from this command, a list of user IDs cut from `/etc/passwd`, is piped to `xargs -I '{}'`
which builds and executes commands (one per input value). The `-I '{}'` is the replacement string
used in the subsequent command, `sudo crontab '{}' -l`. The command lists the crontab for the user
passed in to `xargs` from the `cut` command.

The result of all of this is a list of all the crontab entries on the machine.
