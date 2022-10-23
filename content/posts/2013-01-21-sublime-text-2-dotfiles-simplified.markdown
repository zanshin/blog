---
layout: post
title: "Sublime Text 2 Dotfiles Simplified"
date: 2013-01-21T14:25:00
comments: true
tags:
- nerdliness
link: false
---
When I first started exploring [Sublime Text 2](http://www.sublimetext.com/ "Sublime Text"), I added what I thought were the necessary preference files and folders to my dotfiles repository. I've since come to understand that you only need to house one specific folder to effective version and share your personalized Sublime Text 2 configuration.

First make sure Sublime Text 2 is not running. 

Next make a copy of `~/Library/Application Support/Sublime Text 2/Packages/User` to the local copy of your dotfiles repository.

{{< highlight bash  >}}
$ cp -r ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/Users ~/.dotfiles
{{< / highlight >}}

Switch to the original location of the `Users` directory, delete it, and then create a symlink to the copy in your dotfiles repository.

{{< highlight bash  >}}
$ cd ~/Library/Application\ Support/Sublime\ Text
$ rm -rf Users
$ ln -s ~/.dotfiles/Users Users
{{< / highlight >}}

Storing the `Users` directory in your dotfiles works only if you are using [Package Control](http://wbond.net/sublime_packages/package_control "Package Control"). Package Control keeps a list of your installed packages in a `.sublime-settings` file stored in `User`. When installing Sublime Text 2 on a new machine, you should first install Package Control and then link to your `User` directory in your local dotfiles repository. Package Controller will find the list of packages, see that it does not have them installed locally, and fetch them in the background (you can observe it working in your Sublime console).

**Bonus Tip**  
If you manage to bork your Sublime Text install and want to nuke it from orbit to start over just remove your data folder. Depending on your operating system here is where the data folder can be found:

* Mac OS X: `~/Library/Application Support/Sublime Text 2`
* Linux: `~/.config/sublime-text-2`
* Windows: `%APPDATA%\Sublime Text 2`

To return to a fresh-out-of the-box install:

1. Exit Sublime Text 2
2. Delete the directory as shown above
3. Start Sublime Text 2

**This will wipe out all your preference settings and installed packages. Use as a last resort only.**
