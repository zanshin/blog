---
layout: post
title: "Daily Homebrew Update Alias"
date: 2013-09-04T07:57:00
comments: true
tags:
- nerdliness
link: false
---
Increasingly I rely upon libraries and applications installed via [Homebrew](http://brew.sh "Homebrew"). In addition the commands for listing installed brews, searching for new brews, or installing brews, there are several maintenance commands that should be run on a regular basis in order to keep your brews healthy and happy.

Rather then run these commands serially, and manually, I've created the following alias that runs them for me.

{{< highlight bash >}}
$ alias bu='brew update; brew upgrade; brew cleanup; brew doctor'
{{< / highlight >}}
 
**brew update** updates the Homebrew installation making sure you have the latest version installed. It also refreshes the list of available brews to their latest versions.

**brew upgrade** upgrades any brews you have installed to the latest version as provided for my the update step above.

**brew cleanup** removes outdated brews from your Cellar and keeps your installation tidy.

**brew doctor** verifies that all the components necessary for brew to work properly (like having the current Xcode command line tools) are in place and functioning.

Every day I take a moment to run `bu` in my Terminal and my Homebrew setup works reliably as a result.
