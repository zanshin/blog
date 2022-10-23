---
layout: post
title: "Arch Linux on a MacBook Pro Part 2: Preparing for Dual-Boot"
date: 2015-02-05T21:04:00
tags:
- nerdliness
link:
---
##Introduction and Motivation

This is the second part in a series on dual booting Arch Linux and Mac OS X on a MacBook Pro. This installment covers the preparation of the MacBook Pro for dual booting. [Part One]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer") covered creating a bootable USB drive with the Arch Linux installer. Installing the base Arch Linux operating system and getting the dual boot between Arch and OS X working is covered in [Part Three]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation"). Setting up the system, configuring Xorg, installing Gnome and Awesome are all covered in [Part Four]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration").

My day job has transitioned to system administration and infrastructure automation ([Chef!](http://chef.io "Chef")). All of our virtual infrastructure (with rare exceptions) is based on Linux so I am keenly interested in learning more about its underpinnings. Setting up Arch Linux and sorting through its configuration challenges seems like a good way to jump into the deep end of the Linux pool.

[Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer")  
[Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot")  
[Arch Linux on a MacBook Pro Part 3 - Base Installation]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation")  
[Arch Linux on a MacBook Pro Part 4 - System Configuration]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration")  

##Prepare the MacBook Pro
In my case I am maintaining a small OS X installation on the MacBook Pro (MBP) to allow for firmware updates. I used a Yosemite USB boot drive to format the drive and re-partition it. Initially it had one 320 GB partiton, I split that into two: an OS X drive ~80 GB and a second partition for Arch that is about 240 GB.

If you want to keep what is already on the OS X partition you can use Disk Utility to shrink that partition, creating free space for the Arch Linux installation. Just be careful to leave enough free space in the OS X partition for future growth and about 25% unused disk for swapping.

You can also use `About This Mac` and its `System Report` option to note the make and model of your video chipset. This will be essential when setting up Xorg at the end of the Arch install.

Once you have the MBP partitioned the way you like you are ready to start the Arch install process. Insert the USB drive you set up in [Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer") and reboot the laptop. Once the screen goes black, hold down the left `Option` key under the list of available drives appears. Select the USB drive with the arrow keys and press `Enter`. [Arch Linux on a MacBook Pro Part 3 - Base Installation]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation") will take you through the basic Arch install.
