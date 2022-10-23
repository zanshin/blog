---
layout: post
title: "Formatting and Reinstalling Mac OS X Lion"
date: 2012-03-06T10:25:00
comments: true
tags:
- nerdliness
link: false
---
Last week I [rebuilt my work desktop](https://zanshin.net/2012/03/01/a-clean-slate/ "A Clean Slate"), a 27" iMac, in an effort to get the new SSL VPN client from Cisco to work without causing a kernel panic. This was successful and so I repeated the process on my personal laptop as it also panciked after 30 seconds of connection via AnyConnect.

Rebuilding a TimeMachine supported work computer is one thing. Rebuilding your personal computer -- home to all your pictues, documents, and other assorted bits of digital flotsam -- is a vastly more stressful endevor. 

I started by making a bootable copy of my hard drive using [Carbon Copy Cloner](http://www.bombich.com/ "Carbon Copy Cloner"). Knowing that a complete copy of my hard drive would take hours I started the process late Saturday evening and went to bed after making sure it was running properly. Sunday morning the process had completed.

Next I verified that the clone was bootable. Restarting my MacBook Pro while holding down the `Option` key I was able to select which drive to boot from. The clone booted perfectly, if a bit slower than the regular hard drive. After rebooting again to the internal hard drive, I made sure I could mount the FireWire drive and access its contents.

Inserting a DVD I made for the iMac project, that contains a [bootable copy of Mac OS X Lion](http://reviews.cnet.com/8301-13727_7-20080989-263/how-to-create-an-os-x-lion-installation-disc/ "Create a bootable Lion installation disk"), I rebooted the computer again, this time holding down the `C` key to boot from the optical drive. Using Disk Utility I crossed my fingers and formatted the drive. Having crossed the Rubicon I then spent the rest of Sunday and a good chunk of Monday rebuilding my machine.

The process, while time consuming, as been straight forward and relatively easy. As I noted yesterday, having a Github [repository with my primary configuration files](https://zanshin.net/2012/03/05/best-repository-ever/ "Best repository ever") made getting much of my daily use environment reestablished far easier. Having learned from past experience I kept notes in Evernote as I went along -- should I ever need to repeat this process I'll have a recipe to follow.

Here then, for posterity, are my notes.

##Saturday, March 3, 2012

* Backed up computer using CarbonCopy Cloner

##Sunday, March 4, 2012

* Verified backup was bootable and that it was readable from laptop
* Booted using bootable Lion DVD
* Formatted hard drive
* Installed Lion
* Completed initial setup, including iCloud setup
* Opened Safari - iCloud sync of book marks worked
* Downloaded and installed Cisco AnyConnect client 2.5.2019
* VPN connection works and is stable. Yay! \o/
* Downloaded and installed Google Chrome
* Installed [Alfred](http://www.alfredapp.com/ "Alfred") via App Store
	* configured Alfred
* Installed [Evernote](http://evernote.com "Evernote") via App Store
	* Synchronized Evernote
* Installed Xcode - need the compiler for RVM and brew
* Changed shell default to zsh
* Renamed hard drive and computer
* Downloaded [Xcode command line tools](https://developer.apple.com/library/ios/#documentation/DeveloperTools/Conceptual/WhatsNewXcode/Articles/xcode_4_3.html "Xcode Command Line Tools")
* Installed [Homebrew](http://mxcl.github.com/homebrew/ "Homebrew") package manager
* brew install git
* Installed [iTerm 2](http://www.iterm2.com/#/section/home "Iterm 2") 1.0.20120203
* Ran software update
	* iTunes 10.5.3
	* AirPort Utility
* Installed [Growl](http://growl.info/ "Growl") via App Store
* Installed [RVM](http://beginrescueend.com/ "RVM")
    * rvm install 1.9.2-p290 --with-gcc=clang _-- Xcode 4.3 gcc doesn't work_
* Installed [Dropbox](http://dropbox.com "Dropbox")
    * Started dropbox sync
* Installed [IntelliJ IDEA 11 Community Edition](http://www.jetbrains.com/idea/download/ "IntelliJ IDEA")
    * which required installing Java for Mac OS X 10.7 Update 1
* Installed [Kindle](http://www.amazon.com/gp/feature.html/ref=kcp_mac_mkt_lnd?docId=1000464931 "Kindle") via App Store
* Installed [Skitch](http://www.evernote.com/skitch/ "Skitch") via App Store
* Opened Address Book - verified that iCloud sync worked
* Installed [GeekTool](http://projects.tynsoe.org/en/geektool/ "GeekTool") via App Store
* Installed [Marked](http://markedapp.com/ "Marked") via App Store
* Installed [Adium 1.5rc4 beta](http://adium.im/beta/ "Adium")
    * Added Twitterrific buddy list theme
    * Added ymous message style theme
    * Added jabber, GTalk, and Yahoo! accounts
* Pinned dock to start (upper) corner on left side of screen  
     `defaults write com.apple.dock.pinning -string [start | middle | end]`
     `killall Dock`
    * Set hidden on
* Created src directory in home 
* Cloned [Soloraized](https://github.com/altercation/solarized "Solarized") color repository into src directory
* Configuring iTerm 2
    * Set window size to 30 x 115
    * Importing Solarized Dark theme
* Generating new ssh public/private key pair
    * Copied new public key to Github
* Cloned dotfiles repos and setup symbolic links
* Cloned [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh "oh-my-zsh") and set up theme
* Installed [1Password](https://agilebits.com/onepassword/mac "1Password")
	* connected to dropbox stored repository
* Installed [XMarks](http://www.xmarks.com/ "Xmarks")
    * on Chrome
    * on Safari
* Installed [Twitterrific 4.4.6](http://twitterrific.com/ "Twitterrific")
* Installed [iPulse 2.1.10](http://iconfactory.com/software/ipulse "iPulse")
* Copied from backup to hard drive
    * Documents
    * EBooks
    * Manuals
    * Movies
    * bin
    * src
    * Sites
    * Projects
* Installed [TextMate 2 alpha](http://blog.macromates.com/2011/textmate-2-0-alpha/ "TextMate 2")
    * Applied license
    * Downloaded Solarized theme
* Purchased iPhoto from iLife 11 as Lion doesn't come with it
    * Copying old iPhoto library package and replacing new one 
    * Restarted iPhoto - allowing it to upgrade the iPhoto database
* Copied all non-iPhoto images from backup to hard drive
* Installed [NetNewsWire](http://netnewswireapp.com/ "NetNewsWire")
* Stopped and restarted VPN Connection successfully
* Copied [Reeder](http://reederapp.com/mac/ "Reeder") app from back up to hard drive -- it works.
* brew install [MacVIM](http://code.google.com/p/macvim/ "MacVim")
    * Using --with-ruby-command=/usr/bin/ruby
    	* this is still failing….

##Monday, March 5, 2012

* Setting up Mail accounts
* Installed [SpamSieve](http://c-command.com/spamsieve/ "SpamSieve")
* Starting iTunes migration
* Installing 1Password browser extensions
    * Chrome
    * Safari
* Installing [Fetch](http://fetchsoftworks.com/ "Fetch")
* Downloading purchases from iTunes Store
    * Music
    * Apps
* Installed [MagicPrefs](http://magicprefs.com/ "MagicPrefs")
* Installed Microsoft Office 2011 for Mac (32-bit)
    * Ran Office updater
* Installed [F.lux](http://stereopsis.com/flux/ "F.lux")
* Installed [GitHub for Mac 1.2](http://mac.github.com/ "Github for Mac")
* Installed [SourceTree](http://www.sourcetreeapp.com/ "SourceTree") via App Store
* Installed [HandBrake](http://handbrake.fr/ "HandBrake")
* Installed [Sparrow Lite](http://sparrowmailapp.com/ "Sparrow Lite") via App Store
    * Configured Gmail accounts
* Running bundle install for Octopress sites
* Installed [POW](http://pow.cx/ "POW")
    * setting symbolic links for Octopress sites
* Copying public ssh key domain host to allow for password-less access

##Tuesday, March 6, 2012

* Installed [Things](http://culturedcode.com/things/ "Things")
    * applied license
    * pointed to dropbox hosted database
* Installed [iStumbler beta](http://istumbler.net/beta/ "iStumbler")
* Installed [Apache Directory Studio](http://directory.apache.org/studio/ "Apache Directory Studio")
* Copying Unix calendar files from Dropbox/calendar to /usr/share/calendar 

##Epilogue

There are a few more tasks yet to complete. I need to install Portal and Portal2 again, and set up [Sibelius](http://www.sibelius.com/home/index_flash.html "Sibelius"). And I'm still tweaking various fonts sizes, Growl notification settings, et cetera. 

Wiping my hard drive and starting over has resolved the issue of kernel panics when running AnyConnect. However this solution didn't solve the problem. I don't know what was common to both the iMac and MacBook Pro that caused the crashes. I've got another MacBook Pro that also has Lion installed and it works perfectly with the new AnyConnect client. My best guess is that there was some low-level residue left over from installing/removing software, and or from migrating from Snow Leopard (and Leopard before that). It was a heavy handed solution that ends the problem. 
