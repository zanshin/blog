---
layout: post
title: "Triple Boot Part 1: Create Bootable USB Installers"
date: 2019-01-26T12:24:00
tags:
- nerdliness
link:
---
> This posting is part of a multi-part series on configuring a laptop with three different operating
> systems using systemd-boot. The series starts with [How to Install Three Operating Systems on One
> Laptop](https://zanshin.net/2019/01/26/how-to-install-three-operating-systems-on-one-laptop/
> "How to Install Three Operating Systems on One Laptop").

Since my primary operating system is macOS I used Boot Camp to create a Windows 10 USB installer.
The process is deadly slow - it took 2 1/2 hours for Boot Camp to tell me the Windows image I had
selected was too big for the 8GB flash drive I was using. And another 2 1/2 hours to finish the job
with a smaller image.

# Create Windows 10 Installer
[Download a Windows 10 Disk Image
(ISO)](https://www.microsoft.com/en-us/software-download/windows10ISO "Download Windows 10 Disk
Image"). The October image was too large for my 8GB flash drive, so I used the April image. After
the install is finished one of updates will be the October image.

Open up Boot Camp and follow the directions. Be prepared for a very long wait. Since it takes so
long to create the USB installer using Boot Camp, I bought two additional USB drives, one each for
Arch and Ubuntu. Having each OS on its own USB drive makes starting over much quicker and less
painful.

If your base OS is Windows or Linux there are installer creating directions for both on line.

# Create a Linux Installer
[Download an Arch Linux ISO](https://www.archlinux.org/download/ "Arch Linux Download")  or
[Download an Ubuntu 18.04 ISO](https://www.ubuntu.com/#download "Ubuntu Download"). The steps for
preparing the USB drive and copying the ISO are the same for both Linux distributions.

## Prepare the USB Drive

While some of this can be done using GUI tools, not all of it can, so I'll describe all the steps using the command line.

### Find the name of the USB drive

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

In this case the USB is /dev/disk2.

### Format the drive

Format the USB by making it all free space. This will delete all data on the USB drive.

    $ diskutil partitionDisk /dev/disk2 1 "Free Space" "unused" "100%"

Substitute the proper `/dev/disk#` designation for your USB drive.

## Copy the ISO

Now we can copy the converted image to the USB drive.

    $ dd if=somethingsomething.iso of=/dev/rdisk2 bs=1m

Substitute the name of the ISO you downloaded in the `if` (in file) parameter. Double check that you have the proper disk specified in the `of` (out file) parameter, `dd` is not forgiving. The `dd` command does not show any output before it has finished the copy process, so be patient and wait for it to complete. When the command does complete macOS will try to mount the drive and fail as it won't recognize the formatting. Click ignore or eject.

## Eject the drive

If you clicked ignore above you can eject the drive from the command line.

    $ diskutil eject /dev/disk2

The bootable USB installer is now ready to be used. You are now ready to proceed to [Triple Boot
Part 2: Installing Windows with a Larger EFI
Partition](https://zanshin.net/2019/01/26/triple-boot-part-2-install-windows-10-with-a-larger-efi-partition/
"Install Windows 10 with a Larger EFI Partition").

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

