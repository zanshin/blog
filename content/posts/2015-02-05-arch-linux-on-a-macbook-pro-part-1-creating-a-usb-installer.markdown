---
layout: post
title: "Arch Linux on a MacBook Pro Part 1: Creating a USB Installer"
date: 2015-02-05T20:51:00
tags:
- nerdliness
link:
---
##Introduction and Motivation

This is part one in series on dual booting Arch Linux and Mac OS X on a MacBook Pro. This part covers creating a bootalbe USB installer. [Part Two]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot") discusses how to prepare the MacBook Pro. Installing the base Arch Linux operating system and getting the dual boot between Arch and OS X working is covered in [Part Three]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation"). Setting up the system, configuring Xorg, installing Gnome and Awesome are all covered in [Part Four]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration").

My day job has transitioned to system administration and infrastructure automation ([Chef!](http://chef.io "Chef")). All of our virtual infrastructure (with rare exceptions) is based on Linux so I am keenly interested in learning more about its underpinnings. Setting up Arch Linux and sorting through its configuration challenges seems like a good way to jump into the deep end of the Linux pool.

[Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer")  
[Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot")  
[Arch Linux on a MacBook Pro Part 3 - Base Installation]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation")  
[Arch Linux on a MacBook Pro Part 4 - System Configuration]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration")  

##Download an Arch Linux ISO
Visit the [Arch download site](https://www.archlinux.org/download/) and grab an ISO.

##Convert the ISO to UDRW Format
The image needs to be in Read/Write Universal Disk Image Format (UDRW) format. Use the command line tool `hdiutil` to convert the file.

    $ hdiutil convert -format UDRW -o destination_file.img source_file.iso
    
The resulting image will actually be called `destination_file.img.dmg` as hdiutil will append that suffix. The file format extension won't matter, so you can ignore it.

##Prepare the USB Drive
While some of this can be done using GUI tools, not all of it can, so I'll describe all the steps using the command line.

###Find the name of the USB drive
Insert the drive and then run this command:

    $ diskutil list
    
The output will look something like this:

    /dev/disk0
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *500.1 GB   disk0
       1:                        EFI                         209.7 MB   disk0s1
       2:          Apple_CoreStorage                         399.5 GB   disk0s2
       3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
       5:                 Apple_Boot Boot OS X               134.2 MB   disk0s5
    /dev/disk1
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:                  Apple_HFS MacOSX                 *399.2 GB   disk1
    /dev/disk2
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *2.0 GB     disk2
       1:       Microsoft Basic Data UNTITLED 1              2.0 GB     disk2s1
       
In this case the USB is `/dev/disk2`.

###Prepare the drive
Prepare the USB by making it all free space. **This will delete all data on the USB drive.**

    $ diskutil partitionDisk /dev/disk2 1 "Free Space" "unused" "100%"
    
Substitute the proper designation for your USB drive.

###Copy the ISO
Now we can copy the converted image to the USB drive.

    $ dd if=destination_file.img.dmg of=/dev/disk2 bs=1m
    
The dd command does not show any output before it has finished the copy process, so be patient and wait for it to complete. When the command does complete OS X will try to mount the drive and fail as it won't recognize the formatting. Click ignore or eject.

###Eject the drive
If you clicked ignore above you can eject the drive from the command line.

    $ diskutil eject /dev/disk2
    
Now the bootable image is ready to be used. Proceed to [Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot").
