---
layout: post
title: "Triple Boot Part 3: Install Arch Linux and Setup systemd-boot"
date: 2019-01-26T15:44:00
tags:
- nerdliness
link:
---
> This posting is part of a multi-part series on configuring a laptop with three different operating
> systems using systemd-boot. The series starts with [How to Install Three Operating Systems on One
> Laptop](https://zanshin.net/2019/01/26/how-to-install-three-operating-systems-on-one-laptop/
> "How to Install Three Operating Systems on One Laptop").

Unlike most Linux distributions, Arch Linux doesn't have an installer. Instead you are dropped into
a live Arch environment, running off the install media, that allows you to create your Arch
installation from the disk up. The first time installing Arch can be a bit daunting, but after you
make a few mistakes and start over once or twice, it'll start to make more sense.

The [Arch Linux Wiki](https://wiki.archlinux.org "Arch Linux Wiki") is vast and comprehensive. It is
an excellent reference for any Linux distribution, not just Arch. Like a lot of documentation,
however, it is sometimes a bit lacking in actual examples. Read the documentation carefully and
completely and you should be okay.

It is best to follow the [Installation
Guide](https://wiki.archlinux.org/index.php/Installation_guide "Installation Guide"). I like to
augment the guide using a couple of YouTube channels.

[LearnLinuz.tv](https://www.youtube.com/channel/UCxQKHvKbmSzGMvUrVtJYnUA) has great content
including several multi-part series on installing Arch Linux. The [Getting Started with Arch Linux
(3rd Edition)](https://www.youtube.com/watch?v=t5j5oQpij1Q&list=PLT98CRl2KxKHjq4YVsHqp9BbfDhtImhrN
"Getting Started with Arch Linux (3rd Eidtion)") series is the latest, and well worth a watch. Jay,
the host, walks you through installing Arch, setting up pacman, installing a desktop environment,
and more.

[GloriousEggroll](https://www.youtube.com/channel/UCUMSHXWczvxHy9e8silnVNw "GloriousEggroll") also
has some excellent video tutorials. I used his [Arch Linux NetworkManager / Wifi Setup
Guide](https://www.youtube.com/watch?v=MAi9DurTRQc&t=303s "Arch Linux NetworkManager / Wifi Setup
Guide") to solve issues I had recently getting network connectivity after the first boot into a new
Arch installation.

There are dozens and dozens of YouTube channels and videos dedicated to Arch Linux, some are better
than others.

Here are the steps I followed to add Arch Linux as the second of three operating systems on my Asus.

### Step 1
Create bootable USB with Arch Linux ISO

### Step 2
Boot from installer USB. The resulting screen will look like this:

    Arch Linux 4.20.0-arch1-1-ARCH (tty1)

    archiso login: root (automatic login)

    root@archiso ~ #


### Step 3
Use wifi-menu to attach to network and verify you have Internet connectivity

    wifi-menu
    ping google.com

On my Asus there is a short delay after running wifi-menu before the ping runs successfully.

### Step 4
Install tmux

    pacman -Sy tmux

I find it useful to use tmux when it is time to chroot in to the new Arch installation. I'll explain
more then.

### Step 5
Verify boot mode

    ls /sys/firmware/efi/efivars

If nothing lists then you aren't running under UEFI. Stop and go sort that out at your computers
BIOS setup screen.

### Step 6
Update system clock

    timedatectl set-ntp true

### Step 7
Partition the disk to add the partitions both the Arch and Ubuntu installations will use, as well as
the shared data partition. My SSD has a total capacity of 500 GB, and approximately 120 of those
were used for Windows 10. The sizes below are based on those figures. Your sizes may vary. Void
where prohibited.

    fdisk -l

Note that `/dev/sda1-4` are used by Windows, we want to leave these in place. Now run `fdisk`
against the drive to partition it.

    fdisk /dev/sda

* Create `/dev/sda5` as 60G Linux file system. This will hold root and home for Arch.
* Create `/dev/sda6` as 60G Linux file system. This will be root and home for Ubuntu.
* Create `/dev/sda7` as ~240G Linux file system. This will be the shared data partition.

### Step 8
Formatted the newly created partitions to be Linux file systems.

    mkfs.ext4 /dev/sda5
    mkfs.ext4 /dev/sda6
    mkfs.ext4 /dev/sda7

### Step 9
Mount the partitions so we can access them. In my setup `/dev/sda5` is the root+home partition for
Arch. `/dev/sda2` is the UEFI partition created when Windows 10 was installed. Make sure to use your
partitions numbers here.

    mount /dev/sda5 /mnt
    mkdir /mnt/boot
    mount /dev/sda2 /mnt/boot   # this is the EFI partition Windows 10 created

### Step 10
Run the install. The step you've been waiting for.

    pacstrap -i /mnt base base-devel

Say yes to all members in both the `base` and `base-devel` packages. I selected the
`systemd-resolved` option. Depending on the speed of your Internet connection this make take a little while. Sit back, relax. Enjoy a Mexican Coca-Cola with real sugar.

### Step 11
Mount the `data` partition. In the next step we are going to generate the `fstab` (file system table)
and we want this drive mapping included.

    mkdir /mnt/data
    mount /dev/sda7 /mhn/data

### Step 12
Generate the file system table (fstab).

    genfstab -U -p /mnt >> /mnt/etc/fstab

### Step 13
Change root into the installed system using tmux. The `chroot` command changes the apparent root of
the file system. But running it you are in effect running your newly install Arch instance. By using
`tmux` you can have a second screen, which may be useful in looking up or displaying information.
UUIDs or PARTUUIDs, for example. `tmmux` is relatively easy to use. The `tmux` command will create a
new session. Inside that session `ctrl+b %` will split the screen vertically and `ctrl+b rightarrow`
or `ctrl+b leftarrow` will switch between the two screens. Typing `exit` will exit the split screen or
the session.

    tmux    # ctrl+b % to split ctrl+arrow to move
    arch-chroot /mnt

### Step 14
Install more things. Not all of these packages are necessary to complete a basic Arch install, but
I'm going to want them eventually so why not install them now.

    pacman -Sy openssh linux-headers git neovim vim tmux wpa_supplicant networkmanager

### Step 15
Set time zone and hardware clock. I live in the Central time zone of the United States. Adjust the
region and city to your time zone. You can list the directory contents of `/usr/share/zoneinfo` to
find what you need.

    ln -sf  /usr/share/zoneinfo/America/Chicago /etc/localtime
    hwclock --systohc --utc

### Step 16
Set your locale. Localization is used by programs and services in Linux.

    vi /etc/locale.gen   # Uncomment en_US.UTF-8

If you aren't familiar with `vi` or `vim` use `nano`. Or learn some `vi` basics. It's on virtually
every Linux-based system you'll ever interact with.

Now generate the locale.

    locale-gen

### Step 17
Set a root password. Pick a good one and remember it. If you do forget it, you can use the installer
to mount your partitons, `chroot` into the Arch install and change the password again.

    passwd

### Step 18
Setup systemd-boot. I will admit that I have this working, and I understand what I did, but I am not
a systemd expert nor am I a systemd-boot expert. I botched this on one earlier install attempt (had
the wrong partition (recovery instead of EFI) mapped and ended up starting over.

    bootctl --path /boot install
    bootctl update

Following the documentation on the [systemd-boot](https://wiki.archlinux.org/index.pjp/Systemd-boot
"systemd-boot") page, the `/boot/loader/loader.conf` file needs to be edited. Following that a
"loader entry" for Arch needs to be created. In addition to the Arch wiki page I found [Installing
Arch Linux the EFI/systemd-boot
Way](https://fhackts.wordpress.com/2016/09/09/installing-archlinux-the-efisystemd-boot-way/
"Installing Arch Linux the EFI/systemd-boot Way") helpful.

Edit `/boot/loader/loader.conf`. Mine looks like this:

    default arch
    timeout 5
    editor  no

The `default arch` line indicates the loader entry is called `arch.conf` (the `.conf` suffix is not
required). The boot loader will wait 5 seconds before booting the default OS. And finally, the
`editor` setting determines whether one can access the kernel parameters editor or not. Since the
root password can be bypassed, `no` is the suggested value.

Now create `/boot/loader/entires/arch.conf`. There is a basic sample at
`/usr/share/systemd/bootctl/loader.conf`.

Mine looks like this:

    title   Arch Linux
    linux   /vmlinuz-linux
    initrd  /intel-ucode.img
    initrd  /initramfs-linux.img
    options root=PARTUUID=58004e6b-c0ae-134f-bc93-c319667025f5 rw

In order to get the PARTUUID for the root partition, run this command:

    blkid -s PARTUUID -o value /dev/sda5

Note: PARTUUID is not the same as UUID.

The `intel-ucode.img` file named in that configuration had to be installed on my setup.

    pacman -S intel-ucode

More about [Microcode](https://wiki.archlinux.org/index.php/Microcode "Microcode").

After all the above steps if you list the directory at `/boot` you should see something like this:

    EFI initramfs-linux-fallback.img initramfs-linux.img intel-ucode.img loader vmlinuz-linux

`EFI` and `loader` are directories. `loader` should have your `loader.conf` file and a sub-directory
called `entries` that has your `arch.conf` file.

### Step 19
Exit from the chroot (and tmux if you used it) and unmount all your mounts and reboot. This is the
last step. When your system reboots you should be at a login prompt in your Arch installation.

    exit
    umount -R /mnt
    reboot

When the machine reboots you should see the boot loader screen (if you selected a timeout value in
your `arch.conf`) with entires for "Arch Linux", "Windows Boot Manger", and "Reboot into Firmware
Interface".

If you aren't at a login prompt, backtrack through the steps, and look up any error messages
presented. Good luck.

## Post Install Setup
Briefly here are a few things I do immediately after Arch boot successfully.

### Finish locale setup
It wasn't possible to run the `localectl` command prior to the instance booting.

    localectl set-locale LANG="en_US.UTF-8"

### Set a hostname

    hostnamectl set-hostname dvorak

Add an entry to `/etc/hosts`

    127.0.0.1   dvorak

### Setup network access from command line
This can be tricky. Depending on the chipset your network interface(s) these directions may or may
not be of use.

Running `lspci -k` will output all your kernel drivers. Find your wireless driver (or Ethernet) and
use the driver name, `iwlwifi` e.g., to search for documentation on proper setup.

The steps below ensure that only NetworkManager is running and only it is controller the network
interfaces.

#### Disable netctl
Lookup the name of the wireless interface

    ip a

Wireless interfaces start with `wl`. Mine is called `wlp1s0`. You may or may not have `netctl`
enabled. This following command will disable it, if it is present.

    systemctl disable netctl-auto@wlp1s0.service

#### Enable NetworkManager
Run the following `systemctl` command to enable NetworkManger. The capitalization is important.

    systemctl enable NetworkManager.service

You should see some output indicating the several symlinks were created. To complete the
NetworkManager setup you need to reboot.

    reboot

#### Use `nmcli` tool to setup connection
NetworkManger has a command line tool called `nmcli`. Run the following commands to get a list of
access points and then connect to the AP of your choice.

    nmcli device wifi list   # get a list of wifi access points
    nmcli device wifi connect <BSSID> password <password>
    ip a

The `ip a` command at the end should show an IP address assigned to your wireless network interface.

### Create a user account for yourself
If you installed `base-devel` way back on the `pacstrap` command, the `sudo` package is already
installed. Use `visudo` to enable the `wheel` group. Search the file and uncomment the `wheel`
section.

    visudo

Create your account.

    useradd -mg users -G wheel,storage,power -s /bin/bash <accountname>

Set your password.

    passwd <accountname>

### Create a swapfile
I like to use a swapfile over a swap partition. The file is easier to resize.

    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

The statements above create a 2G swapfile at `/swapfile`, change the permissions, format it as swap,
and append its definition to the existing fstab.

# Summary
Hopefully you now have a working, if bare bones, Arch Linux installation. You should also have a
working systemd boot loader that includes both Arch and Windows, and that lets you boot into either
OS. In the next posting I'll add Ubuntu 18 to the mix, and replace the Grub boot loader it installs
with systemd-boot. Proceed to [Triple Boot Part 4: Install Ubuntu 18 Desktop and Replace GRUB with
systemd-boot](http://zanshin.net/2019/01/26/triple-boot-part-4-install-ubuntu-and-replace-grub-with-systemd/
"Install Ubuntu 18 Desktop and Replace GRUB with systemd-boot").

> This posting is part of a mulit-part series on installing three operating systems on a single
> laptop.
>
> * [Triple Boot Part 1: Create Bootable USB Iinstallers](https://zanshin.net/2019/01/26/triple-boot-part-1-create-bootable-usb-installers/
>  "Create Bootable USB Installers")
> * [Triple Boot Part 2: Install Windows 10 with a Larger EFI
>    Partition](https://zanshin.net/2019/01/26/triple-boot-part-2-install-windows-10-with-a-larger-efi-partition/
>  "Install Windows 10 with a Larger EFi Partition")
>* [Triple Boot Part 3: Install Arch Linux and Set Up
>  systemd-boot](https://zanshin.net/2019/01/26/triple-boot-part-3-install-arch-linux-and-setup-systemd-boot/
>  "Install Arch Linux and Set Up systemd-boot")
>* [Triple Boot Part 4: Install Ubuntu 18 Desktop and Replace Grub with
>  systemd-boot](http://zanshin.net/2019/01/26/triple-boot-part-4-install-ubuntu-and-replace-grub-with-systemd/
>  "Install Ubuntu and Replace GRUB with systemd-boot")
