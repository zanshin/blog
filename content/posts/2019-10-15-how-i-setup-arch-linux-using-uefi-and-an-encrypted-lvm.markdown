---
layout: post
title: "How I Setup Arch Linux Using UEFI and an Encrypted LVM"
date: 2019-10-15T07:13:00
tags:
- nerdliness
link:
---
There are numerous articles and blog postings detailing how to install Arch Linux. This one is mine.
I've been fascinated with Arch Linux for several years. I like that it is very much a "some assembly
required" distribution. Nearly every other installer hides away the underlying
complexity of installing and configuring an operating system. The Arch installation process exposes
you to all the details and lets you determine how much or how little you want to put on your
machine. Exposure to all the details can be cause for both excitement and frustration. Fortunately
there are excellent resources to help you.

The single best resource is the [Arch Linux Installation
Guide](https://wiki.archlinux.org/index.php/Installation_guide "Installation Guide"). You should
read that completely before installing Arch Linux. In fact, you should follow that to do your
install and not follow my setup.

Arch Linux is a rolling release and a moving target. Rolling release distributions constantly get
updates, there is no schedule where once or twice a year a major update to the distribution is
released. You can update your install everyday. Sometimes multiple times in a single day. Or you can
do it once a week. It's entirely up to you.

As for being a moving target.... In the time it took me to work through the installation process I
wanted and capture the steps in this posting, the contents of the [`base`
group](https://www.archlinux.org/news/base-group-replaced-by-mandatory-base-package-manual-intervention-required/) were changed. It no
longer includes a kernel, or an editor, or other software that you might expect or need. So the
`pacstrap` command to install the operating system could no longer be just

    pacstrap -i /mnt base

But instead needs to be something like

    pacstrap -i /mnt base linux linux-firmware mkinitcpio lvm2 vi

All of which leads to this disclaimer. Follow my installation steps at your own risk. Read the
installation guide. Use the [Arch Wiki](https://wiki.archlinux.org "Arch Linux Wiki"). The answers
to your questions are there. Join the [Arch Linux Reddit](https://www.reddit.com/r/archlinux/ "Arch
Linux reddit") or go old school and use the `#archlinux` channel on freenode.

## Installation Goals
Here are my high-level goals for this Arch installation:

* I want to have Arch Linux as the sole operating system on the computer.
* I want to have the drive (except for the boot partition) encrypted.
* I want to use LVM so that I can resize root and home if necessary.
* I want to use i3 (or maybe Sway) as a Window Manager and perhaps not have a desktop environment.

For equipment I have an [ASUS Q325UA](https://zanshin.net/2017/07/29/asus-q325ua-review/ "ASUS Q325UA Review") laptop with a dual-core i7 CPU running at 2.7 GHz, 16 GB of RAM, Intel graphics, a 512 GB SSD, and a 1920x1080 13" screen in a 16:9 ratio. It's a good little computer that runs Linux
rather well.

## Installation Steps
### Preamble
I am presuming that you have already downloaded the Arch Linux installer and flashed it to a USB
drive. If not, there are instructions online describing how to accomplish this step.

### Boot the installer
Using whatever hot key on your equipment allows you to access the BIOS, ensure that the USB drive
with the installer on it is first in the boot order and restart your computer.

### Establish connectivity and update the package repository
My laptop doesn't have an Ethernet jack, so I use WiFi for connectivity. Use `wifi-menu` to select
an access point and get connected. Once connected, verify that you have an IP address and can reach
the Internet.

    wifi-menu
    ip addr show
    ping archlinux.org

Now that you have connectivity, update the package repository indexes.

    pacman -Syyy

And while we are at it, set the time and date.

    timedatactl set-ntp true

### Disk partitioning
I am going to setup three disk partitions:

1. An EFI partition
1. A boot partition
1. A partition to hold my LVM setup

Start by determining what device you want to use for the install.

    fdisk -l

In my case `/dev/sda` is the disk.

### Partition the drive
Open the `fdisk` tool.

    fdisk /dev/sda

You can see the current partition scheme by using the `p` for print command.

    p

#### Create the EFI partition
The EFI partition I created is 500MB in size and has a type of `EFI Partition`. Here are the
commands I used.

    g (creates an empty GPT table)
    n (creates a new partition)
    <enter> (accept the partition number)
    <enter> (accept the starting position)
    +500M (set the partition size)
    t (set the partition type)
    1 (for EFI partition)

#### Create the boot partition
I wanted a 500MB boot partition. (I'm obsessive and two 500MB partitions adds up to 1000, which is
more pleasing than say a 300M EFI and 400M boot only equaling 700M.)

    n
    <enter>
    <enter>
    +500M

By default the partition type is Linux filesystem, so there is no need to change the type of the
boot partition.

#### Create the LVM partition
I used the remainder of the drive space for the LVM partition.

    n
    <enter>
    <enter>
    <enter> (use all remaining disk space)
    t
    <enter> (accept offered (last) partition number)
    31 (LVM type partition)

#### Verify the partition scheme
Display (print) the partition scheme and verify that it is what you want.

    p

#### Finalize the partition scheme changes
Once this step is completed the partition changes will be written to the drive.

    w

### Format the EFI and boot partitions
The EFI partition wants to use the FAT file system, and boot wants to be ext4.

    mkfs.fat -F32 /dev/sda1
    mkfs.ext4 /dev/sda2

### Setup encryption
The entire third disk partition, `/dev/sda3`, will be encrypted using
[LUKS](https://wiki.archlinux.org/index.php/Dm-crypt/Device_encryption). This is where the
passphrase for the encryption will be set, and where the name of the cryptdevice will be set.

    cryptsetup luksFormat /dev/sda3
    cryptsetup open --type luks /dev/sda3 lvm

The first command will create the encryption and ask for the passphrase. Make sure you note what the
phrase is, losing it means you'll never be able to open this partition.

The second command opens the newly created encrypted partition and gives it the wildly inventive
name of `lvm`.

### Setup LVM
I wanted to have separate logical volumes for `root` and `home`. For naming I went as simply as I
could.

* Physical volume is `/dev/mapper/lvm`
* Volume group is `vg`
* Root logical volume is `lv_root` and will be 50G in size
* Home logical volume is `lv_home` and will be 250 G in size

Here are the commands I used to accomplish this LVM configuration.

    pvcreate --dataalignment 1m /dev/mapper/lvm
    vgcreate vg /dev/mapper/lvm
    lvcreate -L 50GB vg -n lv_root
    lvcreate -L 250GB vg -n lv_home

Next we need to load the necessary modules

    modprobe dm_mod

Finally we have LVM scan for volumes and activate the volume group

    vgscan
    vgchange -ay

### Format the root and home partitions.

    mkfs.ext4 /dev/vg/lv_root
    mkfs.ext4 /dev/vg/lv_home

### Mount the root partition, create remaining mount points, and mount partitions

    mount /dev/vg/lv_root /mnt

    cd /mnt
    mkdir boot efi home

    mount /dev/sda2 boot
    mount /dev/vg/lv_home home
    mount /dev/sda1 efi

The root partition mounts to `/mnt` and the remaining mount points are all contained within root.
For no good reason I'm mounting the EFI partition in `/efi` rather than `/boot/EFI`.

Run the mount command to verify that all the mounts are correct

    mount

### Install Arch Linux base packages
As I mentioned above, due to changes in the base package, the contents of this command changed
recently. In addition to base, I'm also installing a kernel, the firmware package, mkinitcpio, and
an editor.

    pacstrap -i /mnt base linux linux-firmware mkinitcpiio vi

Depending on your connection speed and location in the world this may take a while to complete.

### Generate the fstab file
With everything mounted, and an Arch installation located at `/mnt` I can generate the `/etc/fstab`
file.

    genfstab -U -p /mnt >> /mnt/etc/fstab

Verify the contents of this file. (`!$` is bash shorthand for "last argument from previous
command".)

    cat !$

### Access the in-progress Arch installation
The rest of the steps happen inside the new Arch installation. This command changes root to the new
install.

    arch-chroot /mnt

### Install additional packages
The `pacstrap` command was a good start, but there are more package necessary to complete the
installation.

    pacman -S base-devel grub efibootmgr dosfstools openssh os-prober mtools linux-headers networkmanager network-manager-applet wpa_supplicant wireless_tools dialog vim

### Enable NetworkManager
Once the install is complete, and the machine is rebooted, having NetworkManager ready to use will
be helpful.

    systemctl enable NetworkManager

### Edit initial ramdisk configuration to enable encryption
In order for the encryption to work, the `/etc/mkinitcpio.conf` file needs to be edited.

    vi /etc/mkinitcpio.conf

Find the `HOOKS` line (approximately line 51) and add `encrypt lvm2` bewteen `block` and
`filesystems`. Save the file.

### Create the initial ramdisk for the kernel

    mkinitcpio -p linux

### Generate your locale

    vi /etc/locale.gen (uncomment en_US.UTF-8 - or your locale)
    locale-gen

### Set a root account password

    password

### Create a user account for yourself

    useradd -mg users -G wheel <username>
    passwd <username>

### Install sudo

    pacman -S sudo

### Allow users in `wheel` group to use sudo

    visudo

Uncomment `%wheel ALL=(ALL) ALL` line. It's very near the end of the file.

### Setup Grub and EFI
This step is vitally important. A mistake here will prevent your system from booting. Ask me how I
know.

Start by editing the `/etc/default/grub` file. There are three changes to make here.

1. Uncommenting the `GRUB_ENABLE_CRYPTODISK=y` line
1. Adding `cryptdevice=/dev/sda3:vg:allows-discards` to the `GRUB_CMDLINE_LINUX_DEFAULT` line
1. Adding `lvm` to the `GRUB_PRELOAD_MODULES` line

The first change is made by removing the `#` at the beginning of the `GRUB_ENABLE_CRYPTODISK=y`
line.

The second change is the trickiest. Edit the `GRUB_CMNLINE_LINUX_DEFAULT` line and add
`cryptdevice=/dev/sda3:vg:allow-discards` to it. In my case I put it just before the `quiet`
argument that was already there. A typo here, say spelling the argument `cryptodevice` will render
the configuration inoperable. There won't be any errors, but the machine will only boot to a `grub`
prompt.

The third change is to add `lvm` to the list of preloaded modules. The list is space-delimited. I
put `lvm` at the end of the list.

Here are those three lines *after* the edits. The rest of the file is not shown below.

    ...
    GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3 cryptdevice=/dev/sda3:vg:allow-discards quiet"
    ...
    GRUB_PRELOAD_MODULES="part_gpt part_msdos lvm"
    ...
    GRUB_ENABLE_CRYPTODISK=y
    ...

Once the changes have been made and saved Grub can be installed

    grub-install --target=x86_64-efi -efi-directory=/efi --bootloader-id=grub_uefi --recheck

Since I opted to put the EFI partition in a non-standard location, I needed to add the
`--efi-directory=/efi` directive to the command.

Finally generate the grub configuration file

    grub-mkconfig -o /boot/grub/grub.cfg

### Create a swapfile
Rather than have an entire partition devoted to swap, I'm using a swap file instead. Easier to
resize and manage.

    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile

And add the new `/swapfile` to the `/etc/fstab` file.

    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

The `-a` on the `tee` command is crucial, leave that off and the `/etc/fstab` file will be
overwritten, not appended to.

### Exit, unmount, and reboot
At this point the installation process is complete. Exit the chroot, unmount devices, and reboot.
The `umount` command will likely produce some errors, these can be ignored.

    exit
    umount -a
    reboot

If all has gone well the computer should reboot. It will ask for the passphrase used to
encrypt/decrypt the LVM partition. Once that has been entered the bootstrap will complete. If you
get the Grub menu and can select Arch Linux, and then end at a login prompt, then the install was
successful.

However, the computer is still not completely setup. In my case I chose to install the i3 window
manager, and the Sway window manager. I also installed lightdm as a display manager. Below are some
additional commands and setup configuration I made immediately following the install. Your mileage
may vary, void where prohibited, please hesitate to call.

## Post Install
### Enable sudo logging
I like having a record of all the sudo commands I've issued. Edit `/etc/sudoers` using `visudo` and
add this line

    Defaults logfile=/var/log/sudo

### Set time zone and hardware clock

    sudo ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime
    hwclock --systohc --utc

### Complete locale setup

    localectl set-locale LANG="en_US.UFT-8"

### Set a hostname

    hostnamectl set-hostname <hostname>

### Connect to wireless
Run this command to get a list of access points

    nmcli d wifi list

And run this command to join one. Yes, the password is in plain text. It gets stored that way too.

    nmcli d wifi connect <BSSID> password <password>

### Generate a 4096-bit ssh key

    ssh-keygen -t rsa -b 4096

### Setup Arch User Repository (AUR)
The AUR is one of the best features of the Arch ecosystem. Add the following the end of the
`/etc/pacman.conf` file

    [archlinuxfr]
    Server = http://repo.archlinux.fr/$arch

### Tweak the pacman mirror list
By default the pacman mirror list includes all the mirrors, worldwide. pacman performance can be
improved by using the [Arch Mirrorlist](https://archlinux.org/mirrorlist) to generate one for you.
This will probably be easier to accomplish *after* you've installed a window manager or desktop
environment and a browser.

### Install `yay` for AUR access
[Install yay](https://www.ostechnix.com/yay-found-yet-another-reliable-aur-helper/ "Install yay")

### Install i3 Window Manager

    yay -S i3-gaps i3blocks i3lock i3status
    yay -S xf86-input-libinput xorg-server xorg-xinit xorg-apps mesa xf86-video-intel lib32-intel-dri lib32-mesa lib32-libgl

Create `~/.xinit` file and put this line in it

    exec i3

Run `startx` to open i3 session. Note, with no terminal emulator installed, and no typical desktop
tools installed, running i3 may be a bit anti-climactic.

### Install Sway
Sway is a Wayland based alternative to i3.

    yay -S wlroots-git sway-git

Copy the default sway config. Sway starts from the command line by running `sway`.

### Install terminator terminal emulator

    yay -S terminator

Edit i3 and Sway configurations to make terminator the terminal they use.

## Summary
At the end of this process I have a functioning Arch Linux installation, running on LVM and booting
via EFI. I've got separate `root` and `home` partitions, and some unallocated drive space to grow
either or both of those logical volumes. Wireless networking is up and running, and I'm able to
search for and manage packages using the `yay` AUR tool and `pacman` wrapper. Two tiling window
managers, i3 and Sway, are install and working, and I've got lightdm setup as my display manager.
The rest of the setup will evolve over time.
