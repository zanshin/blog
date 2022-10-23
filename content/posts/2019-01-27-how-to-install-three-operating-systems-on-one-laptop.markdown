---
layout: post
title: "How to Install Three Operating Systems on One Laptop"
date: 2019-01-26T10:28:00
tags:
- nerdliness
link:
---
> This posting is part of a multi-part series on configuring a laptop with three different operating
> systems using systemd-boot. The series starts with [How to Install Three Operating Systems on One
> Laptop](https://zanshin.net/2019/01/26/how-to-install-three-operating-systems-on-one-laptop/
> "How to Install Three Operating Systems on One Laptop").


For as long as I have had a personal computer I've always wanted to explore different operating
systems and their associated ecosystems. My first Gateway 2000 computer (a 486 SX that ran at 33
MHz) came with Windows 3. I promptly formated the drive and installed IBM's OS 2 Warp. Later that
machine would have Windows 3.1 and Windows 2000 installed on it. I also toyed around with BeOS.

For the past 17 years I've been a staunch macOS user on my daily driver laptop. And for the past 10
years I've been fortunate enough to use macOS in my professional life too. Either through VirtualBox
or on a spare computer (when I had one) I've toyed around with Linux through a number of different
distros. Red Hat, Fedora, Ubuntu, Debian, and Arch. I even went so far as to install [Arch Linux on a
MacBook
Pro](https://zanshin.net/2015/02/05/how-to-dual-boot-mac-os-x-and-arch-linux-on-a-macbook-pro/ "How
to Dual Boot Mac OS X and Arch Linux on a MacBook Pro"). (Note: This how to is very out of date.)

About 18 months ago I bought an [ASUS Q325UA](https://zanshin.net/2017/07/29/asus-q325ua-review/ "ASUS Q325UA Review") 2-in-1 laptop. It has become my Linux test bed. I've lost
count of how many times I've formatted its SSD and installed a different OS or combination of OSes.
I'm employed as a Systems Engineer supporting a mixed environment of Linux and Windows servers.
Ubuntu Server is the Linux variant the vast majority of our infrastructure runs, with a handful of
RedHat machines.

With that in mind I've decided to triple boot my Asus, installing Windows 10, Arch Linux, and Ubuntu 18.04 LTS
Desktop. And, for no reason other than I haven't used it before, I wanted to use systemd-boot in place
of GRUB2 for the boot loader. The Asus supports UEFI so systemd-boot will work.

The Windows 10 partition is mostly to have a Windows install, I don't expect to use it very much.
The Asus has a 500GB SSD, and I'm going to give Windows 120GB. Both Arch and Ubuntu will have a 60GB
root + home partition. The remaining 240-ish GB will be a shared ext4 file system mounted in both
Linux installations. That way I can keep distribution specific settings and configurations separately from
data, pictures, and documents.

On paper here's how this breaks down:

* /dev/sda1 499M Windows Recovery partition
* /dev/sda2 100M EFI (more on this below)
* /dev/sda3 16M Microsoft reserved
* /dev/sda4 116G Windows 10
* /dev/sda5 60G Arch Linux (root and home) ext4
* /dev/sda6 60G Ubuntu 18.04 (root and home) ext4
* /dev/sda7 ~240G Data ext4

Since Windows doesn't play well with others it is best to install it first and then add the second
(and third) operating system. By default the Windows installer creates a 100M EFI partition. This
was large enough for the Arch kernals, but not for Arch *and* Ubuntu. My first attempt at this
failed when trying to  set up systemd-boot after the Ubuntu install. Had I been content to use Grub
the installation of all three systems would have been done. In order to accommodate systemd-boot and
two Linux distributions, I started over and increased the size of the EFI partition the Windows
installer creates.

The postings linked to below detail the set up processes I followed. I don't go into personalization
or configuration beyond having a working, network attached instance of each operating system.

* [Triple Boot Part 1: Create Bootable USB
  Installers](https://zanshin.net/2019/01/26/triple-boot-part-1-create-bootable-usb-installers/
  "Create Bootable USB Installers")
* [Triple Boot Part 2: Install Windows 10 with a Larger EFI
  Partition](https://zanshin.net/2019/01/26/triple-boot-part-2-install-windows-10-with-a-larger-efi-partition/
  "Install Windows 10 with a Larger EFi Partition")
* [Triple Boot Part 3: Install Arch Linux and Set Up
  systemd-boot](https://zanshin.net/2019/01/26/triple-boot-part-3-install-arch-linux-and-setup-systemd-boot/
  "Install Arch Linux and Set Up systemd-boot")
* [Triple Boot Part 4: Install Ubuntu 18 Desktop and Replace Grub with
  systemd-boot](http://zanshin.net/2019/01/26/triple-boot-part-4-install-ubuntu-and-replace-grub-with-systemd/
  "Install Ubuntu and Replace GRUB with systemd-boot")

As always with computer how to articles found on the Internet you should take care in following
along. Backup your data. Be prepared for it to not work and to have to search for answers. Be
willing to start over. More than once. Have fun.
