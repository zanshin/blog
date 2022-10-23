---
layout: post
title: "Switching From Rvm to Rbenv"
date: 2012-03-06T17:02:00
comments: true
tags:
- nerdliness
link: false
---
Since I am reinstalling everything on my machine this week I decided to switch from [RVM](http://beginrescueend.com/ "RVM") to [rbenv](https://github.com/sstephenson/rbenv "rbenv"). The biggest reason for the switch is to try something new. Also, rbenv doesn't fiddle with commands like `cd` in order to work.

##Removing rvm  
Removing rvm is dead simple and necessary as the two won't co-exist nicely.

    $ rvm implode
	
You may also want to run

    $ gem uninstall rvm
	
##Installing rbenv  
I used [brew](http://mxcl.github.com/homebrew/ "Homebrew"), but you can installing manually too if you like.

    $ brew install rbenv
	$ brew install ruby-build
	
[ruby-build](https://github.com/sstephenson/ruby-build "ruby-build") is a plug-in that allows for easier building of Rubies. Once the two brew commands are done you will need to add the following to your bash or zsh profile:

    eval "$(rbenv init -)"
	
##Getting a Ruby  
Downloading and building a Ruby is simple:

    $ env CC=/usr/bin/gcc rbenv install 1.9.3-p125 
	
As of version 4.2, Xcode is LLVM-only and no longer includes GCC. You can install GCC with these binary
packages on Mac OS X: `https://github.com/kennethreitz/osx-gcc-installer/downloads`. Once you've got a working gcc compiler in place, the `env CC=/usr/bin/gcc` specifies its location. And `1.9.3-p125` is the version and patch level of Ruby to compile.  

##Displaying Ruby Information in your Prompt  
Adding a display of the current Ruby version to my zsh prompt was also easy. I simply embedding the following into my prompt:

    rbenv version-name
	
##Setting Ruby Version
Setting the Ruby version to use globally or for a project is also simple. To set the global Ruby version issue a command like this:

    $ rbenv global 1.9.3-p125
	
You can override the global version on a per project basis like so:

    $ rbenv local 1.9.2-p290
	
Both of these commands result in a `.rbenv-version` file being written that contains the appropriate version indication.

The README file for the [rbenv repository](https://github.com/sstephenson/rbenv "rbenv") on Github lays all of this and more out very nicely. 

