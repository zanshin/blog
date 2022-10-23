---
layout: post
title: "A Clean Slate"
date: 2012-03-01T17:08:00
comments: true
tags:
- nerdliness
link: false
---
> **tl;dr:** Kernel panics caused by Cisco AnyConnect VPN client are tough to resolve. I had to format the drive and start over with a fresh copy of Mac OS X Lion.

My employer, [Kansas State University](http://ksu.edu "Kansas State University"), has recently improved the security of our network by upgrading from an [IPSEC](http://en.wikipedia.org/wiki/IPsec "IPsec") VPN to an [SSL](http://searchsecurity.techtarget.com/definition/SSL-VPN "What is SSL VPN") VPN. The new [VPN](http://en.wikipedia.org/wiki/Virtual_private_network "Virtual Private Network") required a new client and we were all given a link to the proper [Cisco AnyConnect](http://www.cisco.com/en/US/netsol/ns1049/index.html "Cisco AnyConnect") image to use. In my case the new client caused a kernel panic approximately 30 seconds after a connection was established.

Over the course of the past two weeks I have tried a number of things to resolve this situation. Some of these ideas were my own and others came from various system administrators and or the security team. The list is more or less in the order I attempted each fix.

I tried:

*  Removing the previous Cisco VPNClient by running the /usr/local/bin/vpn_uninstall script
*  Removing, and re-installing the new AnyConnect client
*  Creating a new user account and installing the AnyConnect client there
*  [Reseting the PRAM](http://support.apple.com/kb/ht1379 "Reseting your Mac's PRAM and NVRAM")
*  [Disabling IPv6](http://support.apple.com/kb/HT4667 "Disabling IPv6")
*  Reinstalling Lion
*  Installing the latest AnyConnect Client (3.0.5080)
*  Removing VirtualBox
*  [Reseting the SCM](http://support.apple.com/kb/HT3964 "Reseting System Management Controller") Reseting the SCM was something I tried based on this [thread on Apple Support](https://discussions.apple.com/thread/3063762?start=15&tstart=0 "Kernel panic after Cisco AnyConnect establishes connection").

After each attempt my computer would again kernel panic after 30 or 31 seconds. To make this story more interesting, I actually was trying this on three different Macintosh computers. A 27" mid-2010 iMac, a 15" mid-2009 UniBody MacBook Pro, and a 15" 2008 MacBook Pro. All three machines were running the same build of OS X 10.7.3, build 11D50. By and large they have the same applications installed and are setup similarly. The 2008 MBP worked with AnyConnect, both the iMac and the 2009 MBP failed to work with the new VPN client.

As the iMac has a SSD boot drive I focused most of my testing effort on that machine -- the reboot following each successive kernel panic was much faster than on the MacBook Pro's spinning drive.

By examining the system.log leading up to the kernel panic one of the security guys identified a potential problem with Bonjour. The error message, shown below, seemed to indicate that the advertising of Bonjour services might be the issue. 

{{< highlight bash  >}}
mDNSResponder[17]: mDNSPlatformSendUDP sendto(9) failed to send packet on InterfaceID 0000000000000005   en0/6 to FF02:0000:0000:0000:0000:0000:0000:00FB:5353 skt 9 error -1 errno 13 (Permission denied) 140204455605799
{{< / highlight >}}

He also found a set of instructions that showed how to [disable the Bonjour DNS Responder](http://www.remotemacserver.com/?p=20 "Disable Bonjour DNS Responder"). Trying this actually seemed to work at first. My computer didn't kernel panic at 30 seconds, although the connection timer stopped at `00:30`. The kernel panic came when I tried to close the connection. 

With no more ideas I decided to back up the drive and install a fresh copy of Lion. While I've only had this iMac for about a year, I migrated from the previous Mac Pro. This means there are files and settings that were created under Tiger, and which have migrated through Leopard and Snow Leopard on their way to Lion. In other words, the amount of cruft in the file system was unknown.

After burning a [bootable DVD with the Lion installer](http://reviews.cnet.com/8301-13727_7-20080989-263/how-to-create-an-os-x-lion-installation-disc/ "Bootable Lion DVD Instructions") the install process took about an hour. Once I complete the initial setup I downloaded the AnyConnect installer and installed the client. Lo and behold, the connection didn't cause a kernel panic. Not at 30 seconds, not at 5 minutes. Not at all. (So far.)

Going forward my plan is to carefully re-add the software I need to my iMac, testing the VPN stability along the way. The ideal situation would be to discover some incompatible software or setting -- something that I can rectify on the MacBook Pro, avoiding the need to back it up, wipe its drive, and re-install Lion.
