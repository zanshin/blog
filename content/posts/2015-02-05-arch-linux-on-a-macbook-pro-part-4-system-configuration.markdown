---
layout: post
title: "Arch Linux on a MacBook Pro Part 4: System Configuration"
date: 2015-02-05T22:51:00
tags:
- nerdliness
link:
---
##Introduction and Motivation

This is the fourth part in a series on dual booting Arch Linux and Mac OS X on a MacBook Pro. This part covers setting up Xorg, getting the Nvidia graphics sub-system working, and installing Gnome and Awesome. At the end the is a bibliography of some of the many sites I used as references. [Part One]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer") covered creating a bootable USB drive with the Arch Linux installer. [Part Two]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot") discussed how to prepare the MacBook Pro. Installing the base Arch Linux operating system and getting the dual boot between Arch and OS X working was covered in [Part Three]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation"). 

My day job has transitioned to system administration and infrastructure automation ([Chef!](http://chef.io "Chef")). All of our virtual infrastructure (with rare exceptions) is based on Linux so I am keenly interested in learning more about its underpinnings. Setting up Arch Linux and sorting through its configuration challenges seems like a good way to jump into the deep end of the Linux pool.

[Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer")  
[Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot")  
[Arch Linux on a MacBook Pro Part 3 - Base Installation]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation")  
[Arch Linux on a MacBook Pro Part 4 - System Configuration]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration")  

##Setup Wireless
You need to download the proprietary Broadcom driver, and then make a package, and finally install the package. (I did this under the chroot used to setup Arch, but didn't test it until the base install was completed and I was logging in via my account. Consequently you may need to use `sudo` for some of these commands.)

    $ mkdir src
    $ cd src
    $ wget https://aur.archlinux.org/packages/br/broadcom-wl/broadcom-wl.tar.gz
    $ tar xf broadcom-wl.tar.gz
    $ cd broadcom-wl/
    $ makepkg -s
    
Note: If you are doing this under the `chroot` you'll have to `su` to the user account you created earlier to run the `makepkg` command.

Next use the `packman` command below to install the newly made package.

    $ pacman -U /tmp/usb/broadcom-wl-6.30.223.248-4-x86_64.pkg.tar.xz
    
After the package installation, load the kenel modules necessary for WPA2 connections

    $ modprobe wl lib80211_crypt_tkip
    
Finally use the `wifi-menu` command to connect to a wireless network. Note: you may have to install some dependencies via `pacman -S <dependency>`. 

##64-bit Pacman
In order to make the library of 64-bit wrapped 32-bit applications available edit `/etc/pacman.conf` and uncomment the `multilib` lines. Then update the system using:
 
    $ pacman -Syu
    
##More packages
Next install all the basic utilities needed to build 32-bit or 64-bit packages.

    $ sudo pacman -S multilib-devel fakeroot git jshon wget make pkg-config autoconf automake patch
    
Press `enter` to install all members in `group multilib-devel`. And say yes to removing those packages in conflict.

#AUR
The "Arch User Repository" is a user-managed package repository with a huge number of packages. To access it install `packer`, which uses the same command syntax as `pacman`. I create a `src` directory in my  home to hold such things as this.

    $ mkdir src
    $ cd src
    $ wget http://aur.archlinux.org/packages/pa/packer/packer.tar.gz
    $ tar xf packer.tar.gz
    $ cd packer
    $ makepkg -s
    $ pacman -U packer-20140817-1-any.pkg.tar.xz
    
##Sound
ALSA works out of the box with Macs so install it via:

    $ pacman -S alsa-utils
    
Then use

    $ alsamixer
    
to control the speakers. Make sure to disable channels for speakers you don't have. Test your speakers with

    $ speaker-test -c 2
    
where `2` is the number of speakers.

##Xorg
Setting up Xorg will enable your video card, trackpad, backlight, et etera. 

Install the base packages for Xorg, using: 

    $ sudo pacman -S xorg-server xorg-xinit xorg-server-utils xorg-server-devel mesa. 
    
Note that the mesa package is included for 3D support, if you do not have a 3D capable graphics card you can skip this package.

##NVIDIA
Getting the NVIDIA card working was the hardest part of the install for me. In the end I used the [Nouveau](https://wiki.archlinux.org/index.php/nouveau "Nouveau") driver as the Nvidia ones didn't work. Follow the instructions on the Nouveau page and you should be okay. 

At this point you will need to reboot your machine to load the proper kernel modules and module blacklists.

##Desktop
There are lots of choices in each of the three major desktop manager categories (stacking, tiling, and dynamic). To try something completely different I decided to install Awesome as well as Gnome.

##Gnome
Awesome didn't so much work out of the box, so I installed Gnome.

$ pacman -S gnome gnome-extra

It will install lots of packages which, depending on your download speed, may take a while.

This command:

$ sudo systemctl enable gdm.service

will set Gnome to start when you boot your computer. 

##Awesome
One of the many postings I used to figure all of this out talked about [Awesome](http://awesome.naquadah.org "Awesome"), and since I'd never seen it before I thought I'd give it a try.

Start off by getting some fonts:

    $ pacman -S ttf-dejavu ttf-ubuntu-font-family
    
Then install awesome from the official respoitory.

    $ pacman -S awesome

Now you can select which desktop environment you want when you sign in, either Gnome or Awesome. You'll want to read the Awesome wiki and documentation, as out of the box it provides no configuration.

##Conclusion
I've only scratched the surface of configuring and using Arch Linux. But I now have a capable machine running both OS X and Arch with which to learn.

I relied heavily on a large number of websites to figure all of this out. These are the most heavily used.

[Dual Boot Arch Linux on MacBook Pro Installation](http://codylittlewood.com/arch-linux-on-macbook-pro-installation/)

[Arch Linux on MacBook Pro Retina 2014 with DM-Crypt, LVM and suspend to disk](http://loicpefferkorn.net/2015/01/arch-linux-on-macbook-pro-retina-2014-with-dm-crypt-lvm-and-suspend-to-disk/)  

[Arch Linux: System Installation](https://www.youtube.com/watch?v=kQFzVG4wZEg)

[Arch Linux: From Post-Install to Xorg](https://www.youtube.com/watch?v=DAmXKDJ3D7M)

[Awesome](http://awesome.naquadah.org)

[Xorg](https://wiki.archlinux.org/index.php/Xorg)

[Swap](https://wiki.archlinux.org/index.php/swap)

[Disable clearing of boot messages](https://wiki.archlinux.org/index.php/Disable_clearing_of_boot_messages)

[root partition read only after update systemd](https://bbs.archlinux.org/viewtopic.php?id=142564)

[Failed to start Remount Root and Kernel File System (systemd)](https://bbs.archlinux.org/viewtopic.php?id=178329)

[Blkid returns nothing, but has no error](https://bbs.archlinux.org/viewtopic.php?id=144104)

I **highly** recommend reading the [Arch Beginners's Guide](https://wiki.archlinux.org/index.php/beginners'_guide "Arch Beginners' Guide"). The `#archlinux` IRC channel is vibrant and can also be a source of help.

##Feedback
If you've gotten this far in the series and or if you've successfully (or not) tried to dual boot a MacBook Pro with Arch, I'd love to hear from you. You can reach me via email link in my sidebar. 
