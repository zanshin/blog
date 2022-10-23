---
layout: post
title: "Setup Jenkins for iOS Builds"
date: 2012-02-27T10:32:00
comments: true
tags:
- nerdliness
link: false
---
After reading [Continuous Deployment for iOS Apps](http://parveenkaler.com/2012/02/04/continuous-deployment-for-ios-apps/ "Continuous Deployment for iOS Apps") I decided to setup a [Jenkins continuous integration server](http://jenkins-ci.org/ "Jenkins CI") of my own, and to configure it to build my tiny little iOS projects. Rather than use a script to trigger the build I used the XCode [plugin for Jenkins](https://wiki.jenkins-ci.org/display/JENKINS/Plugins "plugins") to manage the build. In addition to the Xcode plugin I'm using the Git plugin so I can build from Github.

Here are the steps I took to get this working.

##Install Jenkins  
[Homebrew](http://mxcl.github.com/homebrew/ "Homebrew") is my preferred package installation tool and since there is a Jenkins formula for brew I used it to install the server.

    $ brew install jenkins
	
##Start Jenkins  

    $ java -jar /usr/local/Cellar/jenkins/1.447/lib/jenkins.jar
	
##Add plugins  
By default Jenkins is configured to run at `localhost:8080`. Open Jenkins in your browser and click on the `Manage Jenkins` link on the Jenkins dashboard. On the **Manage Jenkins** page that is returned click on the `Manage Plugins` link. On the **Plugins Manager** page, select the `Available` tab. Scroll down the list and select the **Git** and **Xcode** plugins. Click `Install without Restart`. Once Jenkins restarts you are ready to proceed. 

##Specify Location of Xcode  
With the release of Xcode 4.3 Apple has changed the location of Xcode. Previously it was in `/Developer`. Now it appears as an application in `/Applications`. I ran the `xcode-select` command to specify the new location of the executables.

    $ sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer
	
You can verify your configuration (if you are using Xcode 4.3) like so:

    $ xcode-select -print-path && xcodebuild -version
	/Applications/Xcode.app/Contents/Developer
	Xcode 4.3
	Build version 4E109
	$ 
	
##Create a new Jenkins project  
I created a "freestyle" project for my build and named the build after my project. Under the **Source Code Management** section I selected `Git`, and I filled in the path using my Github repository URL. This is the same URL you would use when cloning the project from the command line.

Under **Build Triggers** I added two conditions. I set a periodic build to occur once a day, at 12:05 pm. **Build periodically** uses [crontab](http://www.thegeekstuff.com/2009/06/15-practical-crontab-examples/ "crontab examples") style notation, so the configuration looks like

    05 12 * * * 
	
I also selected **Build when a change is pushed to Github**. Giving the nature of my development process (evenings and weekends) this is probably the more reasonable long term choice. 

I selected `Xcode` for the **add build step** drop down. This entry is available after adding the XCode plugin. I checked the `Clean before build?` option, and left all other options alone. My first builds failed as I don't have a paid Apple Developer membership and the signing certificate that comes with that membership. By default the Xcode plugin tries to build your application for a device, and that requires a signing certificate. By adding the following path to the **SDK** setting I was able to specify the Simulator SDK for my build.

    /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator5.0.sdk/
	

With the Simulator SDK specified by build succeeds. 

##Future Benefits  
Having a CI server setup and running for the student level exercises I am currently completing might seem like overkill. But I like the level of maturity having this process in place brings. At a glance now I can see which projects are building and which are broken. Once I have more developed applications that make use of unit testing, having a CI server and process in place will really start to pay off.


