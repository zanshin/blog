---
layout: post
title: "Change SSHD Port on Mac OS X Lion"
date: 2012-07-03T09:19:00
comments: true
tags:
- nerdliness
link: false
---
**Updated: May 1, 2013**
The steps below also work for Mac OS X Mountain Lion (10.8) with a couple of minor alterations.

The format of the entries in `/etc/services` puts the UDP or TCP designator after the port number instead of after the service name. So they should look like this:

    ssh2 11122/tcp # my ssh port
    ssh2 11122/udp # my ssh port

And in order to unload and reload the `ssh.plist` you'll have to `sudo`.

    $ sudo launchctl unload /System/Library/LaunchDaemons/ssh.plist
    $ sudo launchctl load /System/Library/LaunchDaemons/ssh.plist

**End of Update**

My employer is getting ready to block all access to the usual ssh port (22). While this may seem like a security-through-obscurity measure it does eliminate the endless pounding of scripts against that well-known port. In preparation for the upcoming block on port 22 I followed the steps outlined in [Mac OS X Lion - Changing SSHD Port](http://robsavino.wordpress.com/2011/08/09/mac-os-x-lion-changing-sshd-port "Mac OS X Lion - Changing SSHD Port") to permanently change the ssh port on all my machines.

In a nutshell you first edit the `/etc/services` file and add an entry for the port number you wish to use for secure shell access. Pick one that isn't already used for something else, e.g., **11122**. Add two lines to the services file, one for TCP and one for UDP:

    ssh2/udp  11122
	ssh2/tcp  11122
	
Next you need to edit the `/System/Library/LaunchDeamons/ssh.plist` file. Here you want to search for the original ssh entry and alter it to point to your new ssh entry.

Search for

    <key>SockServicesName</key>
	<string>ssh</string>
	
and change it to read

    <key>SockServicesName</key>
	<string>ssh2</string>
	
Save both changes and then reboot your machine. Or unload and reload the services using

	launchctl unload /System/Library/LaunchDaemons/ssh.plist
	launchctl load /System/Library/LaunchDaemons/ssh.plist
	
Finally, in the Sharing pane of System Preferences make sure that `Remote Login` is selected. This toggles the SockService on or off. By changing the port number that SockService points to in the `ssh.plist`, and by defining the new port number in `/etc/services` you've set this toggle up to control your new secret sshd port.

The Mac OS X Firewall (under Security & Privacy in System Preferences) can be either on or off without effecting the Remote Login setting. Although why you would want to have the Firewall off is beyond me.

For convenience sake you can create an alias for any machine you regularly access

    alias buildBox='ssh userid@machinename.tld -p 11122'
	
As with any change to low level configuration information on your system proceed with caution and have a good backup handy. 
    
