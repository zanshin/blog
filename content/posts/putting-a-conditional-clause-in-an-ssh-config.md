---
title: "Putting a Conditional Clause in an Ssh Config"
date: 2024-02-05T22:02:22-06:00

tags:
- ssh
- config
---
Enough years ago that I no longer remember when I discovered this trick, I added the following
clause to my `.ssh/config` file.

    # Access GitHub even when port 22 isn't available
    Host github.com
      HostName ssh.github.com
      Port 443
      user git

In a nutshell, this allows you to access GitHub over port 443, instead of the usual port 22. Various
places block port 22 traffic; having this in your configuration file sidesteps that problem.

Until last week this worked perfectly. Then it stopped working, but only on my work laptop. Not on
my personal laptop, not on the Linux admin workstation running in AWS, not from any of my collection
of Raspberry Pies or the Intel NUC that is my IRC and mutt host, only from my work laptop.

Thanks to a GitHub repository, all my configuration files are shared between the various computers I
use. The same `.ssh/config` worked everywhere but my work computer.

Recently my employer suffered an intrusion--we were hacked. Security has been tightened considerably.
Including not allowing `ssh` traffic over ports that aren't `:22`. As soon as I commented out the
GitHub clause, all my `git` commands started working again.

Some searching and reading of the [`ssh` man
page](https://www.man7.org/linux/man-pages/man5/ssh_config.5.html "ssh config man page") and a little experimenting allowed me to create
this slightly altered clause.

    # Access GitHub even when port 22 isn't available
    # Host github.com
    Match user !<user> host "github.com"
      HostName ssh.github.com
      Port 443
      user git

The `Match` keyword allows you to place conditions on the directives that follow. The `user` and
`host` keywords (must be lowercase) let me place a guard around the GitHub port 443 setup. If I am
signed in as my work id, then the clause is skipped, meaning a normal ssh connection over port 22.
For any other user the clause is used, to access GitHub. There are several other keywords that
`Match` can operate against, allowing you to create some sophisticated conditional restrictions in
your `.ssh/confg` file.
