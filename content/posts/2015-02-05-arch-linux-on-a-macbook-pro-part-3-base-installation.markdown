---
layout: post
title: "Arch Linux on a MacBook Pro Part 3: Base Installation"
date: 2015-02-05T22:07:00
tags:
- nerdliness
link:
---
##Introduction and Motivation

This is the third part in a series on dual booting Arch Linux and Mac OS X on a MacBook Pro. This part covers partitioning the drive, the base Arch installation, and getting the dual boot setup. [Part One]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer") covered creating a bootable USB drive with the Arch Linux installer. [Part Two]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot") discussed how to prepare the MacBook Pro. Setting up the system, configuring Xorg, installing Gnome and Awesome are all covered in [Part Four]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration").

My day job has transitioned to system administration and infrastructure automation ([Chef!](http://chef.io "Chef")). All of our virtual infrastructure (with rare exceptions) is based on Linux so I am keenly interested in learning more about its underpinnings. Setting up Arch Linux and sorting through its configuration challenges seems like a good way to jump into the deep end of the Linux pool.

[Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer")  
[Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-2-preparing-for-dual-boot "Arch Linux on a MacBook Pro Part 2 - Preparing for Dual Boot")  
[Arch Linux on a MacBook Pro Part 3 - Base Installation]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-3-base-installation "Arch Linux on a MacBook Pro Part 3 - Base Installation")  
[Arch Linux on a MacBook Pro Part 4 - System Configuration]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration")  

##Determine the MacBook Pro version
Determine the version of MacBook Pro you have. These instructions are for a Mid 2010 model or 6,2 in Apple parlance. Minor hardware differences may make these instructions not work if you have a significantly different MacBook Pro, e.g., one with a SSD.

##Boot from the Arch USB Drive
Insert the USB drive containing the bootable Arch ISO (from [Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-1-creating-a-usb-installer "Arch Linux on a MacBook Pro Part 1 - Creating a USB Installer")) and boot or restart the MBP. Hold the left Option key down until the drive selection window appears.

Select the `EFI Boot` disk using the arrow keys, and press `enter` to start.

Select the `Arch Linux` option from the boot menu, or let the time out do it for you. Once the initial boot completes (should be fairly quick) you see a prompt like this:

    Arch Linux 3.17.6-1-ARCH (tty1)
    
    archiso login: root (automatic login)
    root@archiso ~ #
    
Congratulations, you've got root.

##Get connected
You'll need to be connected to the Internet to complete the setup. The easiest way is via Ethernet. If you don't have Ethernet available, skip ahead to the **Setup Wireless** section at the start of [Arch Linux on a MacBook Pro Part 4 - System Configuration]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration"), and setup wireless now. These instructions assume you have working Ethernet.

Type:

    $ dhcpcd
    
This will start the DHCP client and get an IP address lease from your LAN. You can verify that you have working connectivity by pinging something, Google for example.

    $ ping -c 3 google.com
    
##Determine drive mapping
In order to proceed you'll need to know the drive mapping scheme. The easiest way to get that information is via

    $ fdisk -l
    
which lists the existing partitions. If you created two partitions when preparing the MBP, you should see a partition with a `Type` of **Apple HFS/HFS+** with a size that matches the size you set aside for Arch. In my case this was `/dev/sda4`. All the partitioning commands below will use `/dev/sda4`, you should substitute the designation for your drive.

##Partitioning
Now that we know the drive designation we can use `cgdisk` tp setup the partitions for our install. Run

    $ cgdisk /dev/sda
    
to see the current state of the disk and to access the partitioning utility. The output will be similar to what is shown below.

    Part #  Size      Partition type      Partition name
            3.0 Kib   free space
    1       200 Mib   EFI System          EFI system partition
    2       78.8 Gib  Apple Core Storage  Macintosh HD
    3       619.9 MiB Apple boot          Recovery HD
    4       223.4 Gib Apple HFS/HFS+      Untitled 1
            128.0 Mib free space
            
We are going to add 6 partitons:

    Linux boot loader 128 Mib
    swap 8 Gib
    boot 256 Mib
    root 40 Gib
    var 12 Gib
    home ~160 Gib
    
The `Linux boot loader` will later be blessed as bootable using OS X. The final result should look like this:

    Part #  Size        Partition type      Partition name
            3.0 Kib     free space
    1       200 Mib     EFI System          EFI system partition
    2       78.8 Gib    Apple Core Storage  Macintosh HD
    3       619.9 MiB   Apple boot          Recovery HD
    4       128.0 Mib   Apple HFS+          Linux boot loader from Apple
    5       8.0 Gib     Linux swap          swap
    6       256.0 Mib   Linux filesystem    boot
    7       40.0 Gib    Linux filesystem    root
    8       12.0 Gib    Linux filesystem    var
    9       163.1 Gib   Linux filesystem    home
    
To navigate around `cfdisk`, use the left and right arrow keys to select a command and use the up and down arrow keys to select the partition and/or the free space. Once you have the partitions set the way you desire, select the `Write` option to create the new partitions.

Begin by deleting the `Untitled 1` HFS partition created when you setup the MBP. Next subdivide it into the 6 new partitions. You can use **K**, **M**, and **G** to specify sizes. Accept the starting location offered by the tool when creating a new partition, then enter the size desired. You can use the `L` option to look up filesystem type codes. Apple HFS+ is `af00`, Linux filesystem is `8300` (the default), and Linux swap is `8200`. Finally give the new partition a name. Repeat for each partition. On the last partition accept the default size offered to use up all remaining space. This means you should do `home` last to give it as much space as possible.

Select `Write` and then confirm that you want to overwrite the disk. Once the display returns you can `Quit` from cgdisk.

Running `fdisk -l` again should show your new partition scheme. If it doesn't look like you want or expected, repeat the cgdisk process to fix things.

##Format the partitions
Now it's time to format the partitions.

    $ mkfs.ext2 /dev/sda6
    $ mkfs.ext4 /dev/sda7
    $ mkfs.ext4 /dev/sda8
    $ mkfs.ext4 /dev/sda9
    
And create the swap and use it.

    $ mkswap /dev/sda5
    $ swapon /dev/sda5
    
Note that we skipped `/dev/sda4` as that will be setup using OS X later.

##Mount the filesystem
In order to acces the new partitions they must be mounted. First mount your root partition.

    $ mount /dev/sda7 /mnt
    
And within the `root` mount just created, create mount points and mount `boot`, `var`, and `home`.

    $ mkdir /mnt/boot && mount /dev/sda6 /mnt/boot
    $ mkdir /mnt/var && mount /dev/sda8 /mnt/var
    $ mkdir /mnt/home && mount /dev/sdc9 /mnt/home
    
##Install Arch
With the partitions created and formated, and with the filesystem mounted, the operating system can now be installed using `pacstrap`.

    $ pacstrap /mnt base base-devel

This will install ~140 packages and could take a while based on your download speeds. Sit back and watch the progress.

##Set fstab
Once the packages are installed it's time to record your file system settings in `fstab`. Use the `genfstab` command to generate your `fstab`

    $ genfstab -p /mnt >> /mnt/etc/fstab
    
You can view the fstab using `less`

    $ less /mnt/etc/fstab
    
##Initial Configuration
Now you can set up your desired hostname, proper time zone, the hardware clock, create a user account for yourself, and enable `sudo`.

First you need to `chroot` into the new system.

    $ arch-chroot /mnt /bin/bash
    
Set your hostname.

    $ echo arch > /etc/hostname
    
Set your time zone. I'm in the US Central time zone so I used `Chicago`. Adjust this to your location.

    $ ln -s /usr/share/zoneinfo/America/Chicago /etc/localtime
    
And set the hardware clock.

    $ hwclock --systohc --utc
    
Create your user account and generate a password for it.

    $ useradd -m -g users -G wheel -s /bin/bash you && passwd you
    
While you're at it, create a `root` password too.

    $ passwd
    
You'll want `sudo` installed so that when you are signed in to your account you can run commands requiring `root` privilege. `pacman` is the command line package manager for Arch, so we'll use that.

    $ sudo pacman -S sudo
    
Edit `/etc/sudoers` and uncomment the `wheel` line. The `-G wheel` portion of the `useradd` command above added you to the `wheel` group. By uncommenting this group in the `sudoers` file you'll allow all `wheel` members to run commands as `sudo`. You need to use `visudo` to edit this file.

    $ visudo

Set your locale.

    sudo vi /etc/locale.gen
    
and uncomment the locales you want. For me this was `en_US.UTF-8 UTF-8` and `en_US ISO-8859-1`.

Generate the locale.

    $ locale-gen
    
And set the `/etc/locale.conf` and export your settings.

    $ echo LANG=en_US.UTF8 > /etc/locale.conf
    $ export LANG=en_US.UTF-8
    
Double check `/etc/mkinitcpio.conf` to make sure `keyboard` is after `autodetect` in the HOOK section.

    $ less /etc/mkinitcpio.conf
    
Then run:

    $ mkinitcpio -p linux
    
##Bootloader configuration and setup
This is somewhat confusing. The best way to do this is to boot directly from your MBP's EFI boot loader, which means creating a `boot.efi`.

Grab the package:

    $ pacman -S grub-efi-x86_64
    
And then, edit `/etc/default/grub` and alter `GRUB\_CMDLINE\_LINUX_DEFAULT` to look like this:

    GRUB_CMDLINE_LINUX_DEFAULT="quiet"
    
which I believe is the default setting.
    
Then you can generate the `boot.efi` with GRUB which you just installed. You’ll want to put this on a USB device because you’re going to be switching into OS X in a minute.

    $ grub-mkconfig -o boot/grub/grub.cfg
    $ grub-mkstandalone -o boot.efi -d usr/lib/grub/x86_64-efi -O x86_64-efi --compress=xz boot/grub/grub.cfg
    
This is going to create a file in the current directory called `boot.efi`. Copy it to a USB device. Check your devices then make a directory to mount your USB. Copy the `boot.efi` file onto your USB drive. You may have to determine the path to the USB drive.

    $ mkdir /mnt/usbdisk && mount /dev/sdb /mnt/usbdisk
    $ cp boot.efi /mnt/usbdisk/
    
##Exit and reboot to OS X
Now you can exit `chroot` and unmount everything, and reboot back to OS X.

Exit chroot.

    $ exit
    
Unmount all filesystems. And reboot.

    $ reboot
    
Restart the computer and boot into OS X. Run `Disk Utility` and select `/dev/sda4` which is the "Linux boot loader from Apple" partition created earlier. Using Disk Utility erase this partition by selecting "Mac OS X Journaled" and clicking on `Erase`. This is where the Grub2 image will go.

Open up Terminal and issue the following sequence of commands to create directories and files necessary for this partition.

    $ cd /Volumes/disk0s4
    $ mkdir System mach_kernel
    $ cd System
    $ mkdir -p Library/CoreServices
    $ cd Library/CoreServices
    $ touch SystemVersion.plist
    
Copy the `boot.efi` image from the USB drive as a peer to `SystemVersion.plist`.

    $ cp /Volumes/usbdrive/boot.efi .
    
Edit `SystemVersion.plist` to look like this:

    <xml version="1.0" encoding="utf-8"?>
    <plist version="1.0">
    <dict>
        <key>ProductBuildVersion</key>
        <string></string>
        <key>ProductName</key>
        <string>Linux</string>
        <key>ProductVersion</key>
        <string>Arch Linux</string>
    </dict>
    </plist>
    
Next "bless" the partition so that it is bootable.

    $ sudo bless --device /dev/disk0s4 --setBoot
    
Now when you boot or restart the MBP, a Grub menu with Arch Linux should appear. To boot into OS X you'll need to hold down the left Option key. Test this and make sure it works before proceeding to [Arch Linux on a MacBook Pro Part 4 - System Configuration]({{ site.url }}/2015/02/05/arch-linux-on-a-macbook-pro-part-4-system-configuration "Arch Linux on a MacBook Pro Part 4 - System Configuration").

