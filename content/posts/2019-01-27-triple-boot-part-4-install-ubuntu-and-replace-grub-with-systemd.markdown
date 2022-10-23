---
layout: post
title: "Triple Boot Part 4: Install Ubuntu and Replace GRUB2 with systemd-boot"
date: 2019-01-26T22:42:00
tags:
- nerdliness
link:
---
> This posting is part of a multi-part series on configuring a laptop with three different operating
> systems using systemd-boot. The series starts with [How to Install Three Operating Systems on One
> Laptop](https://zanshin.net/2019/01/26/how-to-install-three-operating-systems-on-one-laptop/
> "How to Install Three Operating Systems on One Laptop").

Like Windows 10, Ubuntu has straight forward installation process. The only deviation we are going
to take from the default install is how we partition the hard drive. In the previous posting, while
we setup Arch Linux, we prepared a partition for Ubuntu to use. Also, we want to map in the shared
data partition.

Follow the guided install. When you reach the "Updates and other software" dialog you can make some
choices. I choose the "Normal installation", "Download updates while installed Ubuntu", and "Install
third-party software for graphics and Wi-Fi hardware and additional media formats" options.

On the "Installation type dialog, choose "Something else". This will allow us to control exactly
where Ubuntu gets installed. After clicking on "next" you will see a breakdown of the partitions on
the drive.

Click `/dev/sda6` to select it and then click "Change...". In the popup dialog, change the "Use as:"
drop down to be `Ext4 journaling file system`. And change the "Mount point:" to `/` (or root). Click
"OK".

Now click to select `/dev/sda2` which should have "Windows Boot Manager" listed in the "System"
column. This is the UEFI system partition that Windows created, and that we put systemd-boot into
during the Arch Linux install. Ubuntu is going to put GRUB2 there. After the install is finished we
will create a loader entry for Ubuntu and remove GRUB2.

With `/dev/sda2` selected click "Change...". The "Use as:" option should already say "EFI System
Partition". Click "OK".

Click "Install Now" to continue the installation. After the installation process completes, and you
reboot, you be presented with a GRUB2 boot loader, that will list Ubuntu, Arch, and Windows. If you
are satisfied with that boot loader, then you are done. Congratulations, you have a machine with
three operating systems coexisting, side-by-side.

Getting systemd-boot working with all three operating systems is a bit trickier. While the EFI
specification (ESP) doesn't prohibit having multiple ESP (EFI System Partition), it is [not the best
idea](https://superuser.com/questions/688617/how-many-efi-system-partitions-esp-can-a-computer-have/688758#688758).
A better idea is to have multiple subdirectories in your EFI partition, to separate individual
operating systems from each other. After the Windows 10 install the EFI partition (in my setup
mapped under Linux to `/boot`) has a single directory called `EFI`. This contains the Windows 10
boot loader. At the end of part 3 the `loader.conf` and `loader/entires/arch.conf` files were setup
for Arch. The following kernel files were also created.

    initramfs-linux-fallback.img
    initramfs-linux.img
    intel-ucode.img
    vmlinuz-linux

Unless you are using multiple kernel versions with Arch Linux (something I'm not doing) there will always
be a single kernel for Arch. Meaning the four files listed above will always be the only kernel
files Arch depends upon.

Ubuntu does allow for the use of multiple kernels. These files all have a version number as a part
of their name, e.g., `vmlinuz-4.15.0-44-generic`. While it would be possible to leave those files at
`/boot` a tidier way to organize them is to create a directory for the Ubuntu systemd-boot files.
Rather than have to manually update the files, and associated configuration changes with each kernel
update or change, kernel hooks can be used to automatically move the kernel files to the proper
directory and update the `loader/entires` files.

## Setup systemd-boot for Ubuntu
I followed [Replace GRUB2 with systemd-boot on Ubuntu
18.04](https://blobfolio.com/2018/06/replace-grub2-with-systemd-boot-on-ubuntu-18-04/ "Replace GRUB2
with systemd-boot on Ubuntu 18.04") and the [Ubuntu 16.04
systemd-boot](https://gist.github.com/0x414A/7f1c27ac24f05a42ed43aa73946a7033#gistcomment-2601173
"Ubuntu 16.04 systemd-boot") gist to configure my existing systemd-boot setup to include the newly
installed Ubuntu.

As the blobfolio.com posting points out,

> Unlike a lot of software, boot loaders can generally exist independently of one another. To be safe, you should leave your working GRUB2 around until you are confident you have systemd-boot set up correctly. If you screw something up, don’t sweat it! Just re-reboot, open your BIOS’ boot menu, and point it to GRUB2.

In the `/boot` directory you will find all the kernels and related files that Ubuntu installed.
Debian-based systems like Ubuntu won't install package files to a FAT partition. Since the
`/boot/efi` directory is really a FAT32 file system mount point, none of the Ubuntu kernels will be
installed there. You'll have to copy them yourself.

    sudo -i   # Run these commands as root, it's easier
    cd /boot/efi
    mkdir ubuntu
    cd ubuntu
    cp config-* /boot/efi/ubuntu
    cp initrd.img-* /boot/efi/ubuntu
    cp System.map-* /boot/efi/ubuntu
    cp vmlinuz-* /boot/efi/ubuntu

With a directory under `/boot/efi` just for Ubuntu it will be easier to keep kernels for different
distributions tidy. My 18.04 installation dropped two kernels, 4.15.0-29 and 4.15.0.43, so there
were two files each for `config-*`, `initrd.img-*`, `System.map-*`, and `vmlinuz-*`. With the files
copied it's time to setup a loader entry for Ubuntu.

Switch to the `/boot/efi/loader/entries` directory and create a new `*.conf` file for each Ubuntu
kernel you want to expose in the boot loader list. I setup two files, `ubuntu-4.15.0-29-generic.conf` and
`ubuntu-4.15.0-43-generic.conf`.

    cd /boot/efi/loader/entires
    vi ubuntu-4.15.0-29-generic.conf
    cp ubuntu-4.15.0-29-generic.conf ubuntu-4.15.0-43-generic.conf
    vi ubuntu-4.15.0-43-generic.conf

Both files look like this:

    title   Ubuntu 4.15.0-##-generic
    linux   /ubuntu/vmlinuz-4.15.0-##-generic
    initrd  /ubuntu/initrd.img-4.15.0-##-generic
    options root=PARTUUI=26032c35-9f53-fd41-93a2-9bb466e572cf rw

Where `##` is either `43` or `29`. As with the configuration file for Arch Linux, lookup the
PARTUUID for the Ubuntu root partition (`/dev/sda6`) with

    blkid -s PARTUUID -o value /dev/sda6

Since Ubuntu is a graphical environment, you can do this in a separate terminal and copy the result
into your conf file.

I used a slightly modified version of the script giving in the
[blobfolio](https://blobfolio.com/2018/06/replace-grub2-with-systemd-boot-on-ubuntu-18-04/ "Replace
GRUB2 with systemd-boot on Ubuntu 18.04") article. Here's my script:

    # This is a simple kernel hook to populate the systemd-boot entries
    # whenever kernels are added or removed.
    #

    # The PARTUUID of your disk.
    # Must be PARUUID and not UUID
    PARTUUID="9dad7c53-d6d2-754e-8896-26feff826adf"
    ROOTFLAGS="errors=remount-ro"

    # Our kernels.
    KERNELS=()
    FIND="find /boot -maxdepth 1 -name 'vmlinuz-*' -type f -print0 | sort -rz"
    while IFS= read -r -u3 -d $'\0' LINE; do
    	KERNEL=$(basename "${LINE}")
    	KERNELS+=("${KERNEL:8}")
    done 3< <(eval "${FIND}")

    # There has to be at least one kernel.
    if [ ${#KERNELS[@]} -lt 1 ]; then
    	echo -e "\e[2msystemd-boot\e[0m \e[1;31mNo kernels found.\e[0m"
    	exit 1
    fi

    # Perform a nuclear clean to ensure everything is always in perfect
    # sync.
    rm /boot/loader/entries/ubuntu*.conf
    rm -rf /boot/efi/ubuntu
    mkdir /boot/efi/ubuntu

    # Copy the latest kernel files to a consistent place so we can keep
    # using the same loader configuration.
    LATEST="${KERNELS[@]:0:1}"
    echo -e "\e[2msystemd-boot\e[0m \e[1;32m${LATEST}\e[0m"
    for FILE in config initrd.img System.map vmlinuz; do
        cp "/boot/${FILE}-${LATEST}" "/boot/efi/ubuntu/${FILE}"
        cat << EOF > /boot/efi/loader/entries/ubuntu.conf
    title   Ubuntu ${LATEST}
    linux   /ubuntu/vmlinuz
    initrd  /ubuntu/initrd.img
    options root=PARTUUID=${PARTUUID} rw rootflags=${ROOTFLAGS}
    EOF
    done

    # Copy any legacy kernels over too, but maintain their version-based
    # names to avoid collisions.
    if [ ${#KERNELS[@]} -gt 1 ]; then
    	LEGACY=("${KERNELS[@]:1}")
    	for VERSION in "${LEGACY[@]}"; do
    	    echo -e "\e[2msystemd-boot\e[0m \e[1;32m${VERSION}\e[0m"
    	    for FILE in config initrd.img System.map vmlinuz; do
    	        cp "/boot/${FILE}-${VERSION}" "/boot/efi/ubuntu/${FILE}-${VERSION}"
    	        cat << EOF > /boot/efi/loader/entries/ubuntu-${VERSION}.conf
    title   Ubuntu ${VERSION}
    linux   /ubuntu/vmlinuz-${VERSION}
    initrd  /ubuntu/initrd.img-${VERSION}
    options root=${PARTUUID} rw rootflags=${ROOTFLAGS}
    EOF
    	    done
    	done
    fi

    # Success!
    exit 0

The script makes sure there is a kernel present to work with. Then it removes all the `ubuntu*-conf`
files from `/boot/loader/entires`, deletes the `/boot/efi/ubuntu` directory and recreates it. I.e.,
empties it. It then makes a new `ubuntu.conf` file for the latest kernel version present and copies
those files into place. Next it makes `ubuntu-#.##.#-##-generic.conf` file for all other kernels
present, and moves their files into place.

The script is executed by two kernel hooks. The `postinst` (post install) and `postrm` (post remove)
hooks. The hooks are directories in `/etc/kernel`. With the script copied into place and given the
proper ownership and permissions everything is set.

During the next `apt upgrade` that includes kernel changes the script will be run automatically. It
outputs messages to the console so you can see what it is doing. (I have some typos in my script,
and had to run it a couple times to get it working.

With everything in place, reboot, and change the boot order to put the `Linux Boot Manager` first.
This is the entry that corresponds to the Arch systemd-boot configuration. On my BIOS the `ubuntu`
entry is second. This corresponds to the GRUB2 setup that Ubuntu installed. The last entry is
`Windows Boot Manager` which is, of course, the Windows boot manager.

Hopefully the boot manager will appear listing Arch Linux, one or more Ubuntu instances, and the
Windows boot Manager. Test each entry to make sure they all work. I misspelled `vmlinuz` as `vmlinux` and got an error when trying to load Ubuntu.

Once everything is tested you can, if you like, remove the GRUB2 setup from Ubuntu.

Purge the package:

    sudo apt purge grub*

And purge any obsolete dependencies:

    apt autoremove --purge

This may or may not remove all the files GRUB deposited into `/boot` and `/boot/efi`. You can
manually remove any leftovers.

# Summary
You should now have systemd-boot working with three different operating systems, Windows 10, Arch
Linux, and Ubuntu 18 LTS. Admittedly, setting up systemd-boot with three operating systems is a lot
of work. That GRUB2 does it with little or no fuss is perhaps a compelling reason to stick with
GRUB. However, GRUB is getting a bit long in the tooth. systemd-boot is one alternative.
[rEFInd](https://www.rodsbooks.com/refind/ "rEFInd") is another alternative.

If you have followed some or all of this series drop me an email and let me know how it turned out.

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
>* [Triple Boot Part 4: Install Ubuntu 18 Desktop and Replace GRUB2 with
>  systemd-boot](http://zanshin.net/2019/01/26/triple-boot-part-4-install-ubuntu-and-replace-grub-with-systemd/
>  "Install Ubuntu and Replace GRUB with systemd-boot")
