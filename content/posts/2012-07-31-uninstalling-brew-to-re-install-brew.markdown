---
layout: post
title: "Uninstalling Brew to Reinstall Brew"
date: 2012-07-31T14:37:00
comments: true
tags:
- nerdliness
link: false
---
[Homebrew](https://github.com/mxcl/homebrew "homebrew") rocks as a package management tool for Max OS X. Except when it doesn't.

A couple of days ago when I ran

    brew doctor
	
I got a whole slew of messages instead of the 

    $ brew doctor
	Your system is raring to brew.
	
output that I expected. The primary issue centered around a file called `voldemort.rb`. I have no idea what in my collection of brews required that formula. Rather than go through a potentially lengthy debugging session to figure out how to untangle the mess I decided to just wipe out brew and reinstall everything.

I started by making a list of all the brews I had installed

    $ brew list > ~/Desktop/brews.txt

Next quick Google search lead me to [Uninstalling brew (so I can reinstall)](http://dev.enekoalonso.com/2011/08/09/uninstalling-brew-so-i-can-reinstall/ "Uninstalling brew (so I can reinstall)") by Eneko Alonso. His posting neatly outlined these steps for removing brew from your system:

    $ cd `brew --prefix`
	$ rm -rf Cellar
	$ brew prune
	$ rm -rf Library .git .gitignore bin/brew README.md share/man/man1/brew
	$ rm -rf ~/Library/Caches/Homebrew
	
To install brew again:

    $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	
Next up you need to reinstall any brews you had on hand. Since doing this to my laptop my `brew doctor` output is clean and raring to go. 
