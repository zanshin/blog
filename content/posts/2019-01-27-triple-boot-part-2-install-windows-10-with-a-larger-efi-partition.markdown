---
layout: post
title: "Triple Boot Part 2: Install Windows 10 with a Larger EFI Partition"
date: 2019-01-26T13:03:00
tags:
- nerdliness
link:
---
> This posting is part of a multi-part series on configuring a laptop with three different operating
> systems using systemd-boot. The series starts with [How to Install Three Operating Systems on One
> Laptop](https://zanshin.net/2019/01/26/how-to-install-three-operating-systems-on-one-laptop/
> "How to Install Three Operating Systems on One Laptop").

Installing Windows is very straight forward; answer a few questions (and mute Cortana) and you're
all set. However if you want to alter the size of the EFI partition to be larger the process is not
so straight forward.

I was able to figure it out with the help of this article: [How to Change the UEFI System Partiton
Size in Windows Setup](https://www.ctrl.blog/entry/how-to-esp-windows-setup "How to Change the UEFI
System Partition Size in Windows Setup").

In a nutshell when the partition dialog appears you will open a command line window, and use the
`diskpart` command to delete everything but the Recovery partition. Next you create and format
a larger EFI partition. When you leave the command line and return to the graphical dialog and
reselect New the installer will create the missing partitions and keep the ones already created.

From the article:

* Select your installation target and make sure it has no partitions (except unallocated space)
* Click the New and then the Apply button.

You should now have four partitions: Recovery, System (ESP), MSR, and Primary.

* Select each of the System, MSR, and Primary partitions in turn and click the Delete button to delete these partitions. Leave the Recovery partition in place.
* Press *Shift+F10* to open the Command Prompt
* Type *diskpart.exe* and press Enter to open the disk partitioning tool
* Type *list disk* and press Enter to list out your disks
* Type *select disk n* where n is the number for the disk you want to install to as identified by the above command and press Enter
* Type *create partition efi size=550* where 550 is the desired size of the ESP in Mebibytes (MiB), and press Enter
* Type *format quick fs=fat32 label=System* and press Enter to format the ESP
* Type *exit* and press Enter to exit the disk partitioning tool
* Type *exit* and press Enter again to exit the Command Prompt

You should now be back in the graphical Windows Setup partitioning tool where nothing has changed since the last time you looked at it.

* Click the Refresh button to detect your partition changes

You should now have a disk with a default Windows Recovery tools partition, a 500 MiB UEFI System Partition, and some unallocated space for your Windows installation.

Select the unallocated space from the disk list and click the New button to automatically recreate the MSR and System partition in the remaining space.

Proceed with the rest of the install following the prompts. Mute Cortana or [suffer the
results](https://www.youtube.com/watch?v=Rp2rhM8YUZY "Hi I'm Cortana").

Once the Windows installation is finished you are ready to move on to [Triple Boot Part 3: Install
Arch Linux and Set Up
systemd-boot]((https://zanshin.net/2019/01/26/triple-boot-part-3-install-arch-linux-and-setup-systemd-boot/
"Install Arch Linux and Set Up systemd-boot").

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
