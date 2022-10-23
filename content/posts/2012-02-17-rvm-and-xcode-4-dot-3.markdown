---
layout: post
title: "RVM and Xcode 4.3"
date: 2012-02-17T10:51:00
comments: true
tags:
- nerdliness
link: false
---
During the installation of [Xcode 4.3](https://developer.apple.com/xcode/index.php "Xcode 4.3") you are given the option to remove previous versions of XCode and the XCode installer. You are warned that the entire `/Developer` directory will be deleted. One of the hidden implications of this is the loss of various command line tools. The **gcc* compiler for example.

After installing Xcode 4.3 on one of my machines I tried to install a different Ruby build using [RVM](http://beginrescueend.com/ "RVM"). The install failed since no compiler could be found. Fortunately I had seen an article about [Homebrew and the new XCode command line bundle](http://kennethreitz.com/xcode-gcc-and-homebrew.html "XCode gcc and Homebrew") and I rightly figured that installing those tools would allow RVM to complete the installation of new Rubies.

To add the command line tools, open XCode 4.3 (it's now an application in your `/Applications` directory) and then open Preferences. Under the `Download` tab select `Components` and then click on `Install` for `Command Line Tools`. 

**Update:** The Command Line Tools bundle may not be 100% complete. I wasn't able to use `bundler` to install the default set of gems for [Octopress](http://octopress.org "Octopress"). A google search on the error led me to the [rb-fsevent issues](https://github.com/thibaudgg/rb-fsevent/issues/20 "rb-fsevent issues") page, where one of the comments suggested using a pre-compiled version of rb-fsevent.

I changed the line in my `Gemfile` to look like this:

    gem 'rb-fsevent', :git => 'git://github.com/ttilley/rb-fsevent.git', :branch => 'pre-compiled-gem-one-off'
	
and then my `bundle install` command completed successfully.
