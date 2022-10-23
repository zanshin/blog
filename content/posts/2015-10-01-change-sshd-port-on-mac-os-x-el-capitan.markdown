---
layout: post
title: "Change sshd Port on Mac OS X El Capitan"
date: 2015-10-01T17:01:00
tags:
- nerdliness
link:
---
Previously I had written about how to [change the sshd port for Mac OS X Lion and Mountain Lion](https://zanshin.net/2012/07/03/change-sshd-port-on-mac-os-x-lion/ "Change SSHD Port on Mac OS X Lion"). The basic premise is still the same, but the introduction of El Capitan's System Integrity Protection (SIP) requires a slightly altered approach to having sshd running on an alternate port.

In a nutshell the controlling plist, `/System/Library/LaunchDaemons/ssh.plist`, can no longer be edited. So instead you need to make a copy of this file and store it elsewhere. In my case I put it in `/Library/LaunchDaemons`. Then using `launchctl` you can cause your new plist to be started whenever the computer is booted. The detailed steps follow.

##Create a copy of the plist
Copy `ssh.plist` using `sudo` and rename it to `ssh2.plist`. The renaming is important, otherwise `launchctl` won't discriminate between your plist and the official one, which will result in your alternate port not being visible.

    $ sudo cp /System/Library/LaunchDaemons/ssh.plist /Library/LaunchDaemons/ssh2.plist

##A new Label and a new port number
There are two changes to make in the plist. First it needs a different label to distinguish it from the original, and second it needs to specify the alternate port you wish to use.

Provide a different Label for the plist by changing this:

    <key>Label</key>
    <string>com.openssh.sshd</string>

to this:

    <key>Label</key>
    <string>com.openssh.sshd2</string>

Setting the port number to your alternate by changing the SockSeviceName string (`ssh`) to the port number you want to use. In other words, change this:

    <key>SockServiceName</key>
    <string>ssh</string>

to this:

    <key>SockServiceName</key>
    <string>99999</string>

where `99999` is a valid port number.

##Activate your new sshd port
Using `launchctl` you can launch a new instance of the sshd daemon, one that listens to your alternate port. The `launchctl` command to do this looks like:

    $ sudo launchctl load -w /Library/LaunchDaemons/ssh2.plist

If you ever wanted to unload this plist, run this command:

    $ sudo launchctl unload /Library/LaunchDaemons/ssh2.plist

To verify that your new port is being listened to, run 

    $ netstat -at | grep LISTEN

Your new sshd port should be listed.

##Caveats
As always, making changes to the murky innards of your operating system and its supporting configurations can be risky. Make copies, backup before making changes, and proceed with caution. It is worth noting that this setup _does not_ turn off port 22, it merely allows access on an alternate port. The machine I did this to is behind my employer's boarder and firewall which blocks port 22 traffic.

##References
I made use of the following resources for this posting.

* [http://stackoverflow.com/questions/30768087/restricted-folder-files-in-os-x-el-capitan](http://stackoverflow.com/questions/30768087/restricted-folder-files-in-os-x-el-capitan)
* [http://www.macworld.com/article/2948140/os-x/private-i-el-capitans-system-integrity-protection-will-shift-utilities-functions.html](http://www.macworld.com/article/2948140/os-x/private-i-el-capitans-system-integrity-protection-will-shift-utilities-functions.html)
