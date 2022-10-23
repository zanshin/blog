---
layout: post
title: "How to Move VirtualBox Guest Hard Drives"
date: 2011-10-17T08:53:00
comments: true
tags:
- nerdliness
link: false
---
The guest hard drive created by [VirtualBox](https://www.virtualbox.org/ "VirtualBox") to house each guest operating system is rather large. If you want to move this directory to another location on your system to regain space, here's how.

## Locate the VirtualBox Configuration XML file
VirtualBox stores information about guest operating systems and the setup of your VirtualBox installation in a file called `VirtualBox.xml`. On Mac OS X this file is located in the system Library folder: `/Library/VirtualBox/VirtualBox.xml`. On most Linux distributions it is located in `~/.VirtualBox/VirtualBox.xml`.

Note that VirtualBox doesn't expect you to edit this file manually. The comment block opening the XML file indicates you should use the VBoxMange command line tool or the VirtualBox Manager GUI to make changes to this file. Edit the XML file at your own risk. Make a backup first. You must stop all VirtualBox guests, and quit VirtualBox before manually editing this file. Otherwise when you quit VirtualBox it will overwrite your changes.

## Edit the VirtualBox Configuration XML file
Use your favorite editor to edit the XML file. Locate the `<MachineRegistry>` block in the file. This is where the location of each guest OS is specified. On my Mac OS X system, each entry looks something like this:
    
    `<MachineEntry uuid="{52dd04ba-a6e6-498c-9f9e-b3435a51ef3c}" src=/Users/mark/VirtualBox VMs/Ubuntu/Ubunt.vbox"/>`
    
Change the `src` parameter to point to the new location. Save the XML file.

## Move the Guest OS directory
Move the guest operating system directory, in the example above the `Ubuntu/`, to the new location.

## Start VirtualBox
Start VirtualBox and select the newly moved guest OS and everything should work as before.

In my case I moved six guest operating systems (Windows XP, Windows 7, Ubuntu 10, Ubuntu 11, Xubuntu 11, and Fedora 16) from the SSD drive to a spinning drive on my iMac, freeing up nearly 60 GB of SSD space.

