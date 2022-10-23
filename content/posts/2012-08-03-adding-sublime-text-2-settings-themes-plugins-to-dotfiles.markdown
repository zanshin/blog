---
layout: post
title: "Adding Sublime Text 2 Settings, Themes, and Plugins to Dotfiles"
date: 2012-08-03T12:55:00
comments: true
tags:
- nerdliness
link: false
---
Updated: 21 January 2013

> Saving all three directories under the Sublime Text 2 entry in `~/Library Application Support` is overkill. You really only need to keep the `~/Library/Application Support/Sublime Text 2/Packages/User` directory. Read [Sublime Text 2 Dotfiles Simplified](https://zanshin.net/2013/01/21/sublime-text-2-dotfiles-simplified/ "Sublime Tecxt 2 Dotfiles Simplified") for a more complete explanation and write up.

After reading more and more about [Sublime Text 2](http://www.sublimetext.com/ "Sublime Text") I decided to give it a try. The first thing you do with any new software is tweak the preferences and settings to suit your needs and aesthetics. Sublime Text 2 stores settings, themes, and plugins in the `~/Library/Application Support/Sublime Text 2` directory in three separate folders:

* Installed Packages
* Packages
* Pristine Packages

I've already got a [dotfiles](https://github.com/zan5hin/dotfiles "dotfiles") repository on [Github](http://github.com "Github") where I store all my shared configuration files. Here's how I added my Sublime Text configuration.

First **close Sublime Text 2**.

Next add a directory called `Sublime Text 2` to the working copy of your dotfiles repository

    $ cd ~/.dotfiles
	$ mkdir Sublime\ Text\ 2
	
Move these folders from `~/Library/Application Support/Sublime Text 2` to the `Sublime Text 2` directory in `.dotfiles`.

    $ cd ~/.dotfiles/Sublime\ Text\ 2
	$ mv ~/Library/Application\ Support/Sublime\ Text\ 2/Installed\ Packages .
	$ mv ~/Library/Application\ Support/Sublime\ Text\ 2/Packages .
	$ mv ~/Library/Application\ Support/Sublime\ Text\ 2/Pristine\ Packages .
	
Next create symbolic links in the `~/LibraryApplication Support/Sublime\ Text\ 2` directory to the new location of the settings directories.

    $ cd ~/Library/Application\ Support/Sublime\ Text\ 2
	$ ln -s ~/.dotfiles/Sublime\ Text\ 2/Installed\ Packages ./Installed\ Packages
	$ ln -s ~/.dotfiles/Sublime\ Text\ 2/Packages ./Packages
	$ ln -s ~/.dotfiles/Sublime\ Text\ 2/Pristine\ Packages ./Pristine\ Packages
	
For each added machine where you install Sublime Text you will need to remove the three settings directories from their default location and replace them with links to the set in your `.dotfiles` repository.

Finally update the README for your `.dotfiles` repository with enough of these instructions to remind you what you did six months from now when you stumble upon it again.


