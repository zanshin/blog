---
layout: post
title: "How to Use Homebrew Zsh Instead of Mac OS X Default"
date: 2013-09-03T08:42:00
comments: true
tags:
- nerdliness
link: false
---
Out of the box Mac OS X version 10.8.x (Lion) comes with zsh version 4.3.11 (i386-apple-darwin12.0). However zsh is currently at version 5.0.2 (x86_64-apple-darwin12.2.1). Here's how to use the newer version.

Install zsh using [Homebrew](http://brew.sh "Homebrew").

{{< highlight bash >}}
$ brew install zsh
{{< / highlight >}}

Edit `/etc/shells` to add a new entry for the Homebrew zsh.

{{< highlight bash >}}
$ brew install zsh
$ sudo vim /etc/shells
{{< / highlight >}}

The resulting `/etc/shells` file should look like this:

{{< highlight bash >}}
$ cat /etc/shells
/bin/bash
/bin/csh
/bin/sh
/bin/tcsh
/bin/zsh
/usr/local/bin/zsh
{{< / highlight >}}

The `/usr/local/bin/zsh` location is the symlink Homebrew creates when installing zsh.

To actually change the shell assigned to your user account run

{{< highlight bash >}}
$ chsh -s /usr/local/bin/zsh
{{< / highlight >}}

Now you have the most recent zsh as your shell. 
