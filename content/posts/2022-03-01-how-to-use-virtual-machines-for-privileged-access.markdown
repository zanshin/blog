---
layout: post
title: "How to use Virtual Machines for Privileged Access"
date: 2022-03-01T07:10:00
tags:
- nerdliness
link:
---
## Objective
Separate all privileged access work from non-privileged access work as a security measure. Directly
accessing servers or administrative web pages from the same machine that you read email or do web
browsing is a potential security risk. To mitigate this risk, create a "privileged access
workstation", or PAW, to support all work that needs to be conducted securely.

## Constraints
### Separate Privileged Access Workstation (PAW)
There needs to be separation between the machine hosting the PAW and the machine used for email and
normal browsing. In other words, running a VM to act at the PAW on a computer that is used for email
defeats the purpose. Therefore the PAW needs to be distant from the computer used for email, etc.

In our AWS Service Catalog we have a product that creates a Linux workstation that can be access via
ssh or remote desktop, provided the connection is through the VPN. The VM is only addressable via
the private network; it has no public IP address. This EC2 instance satisfies the
separation requirement.

### Virtual Private Network (VPN)
Access to any device on the internal network requires the use of a VPN. The VPN required is Global
Protect from Palo Alto. It is configured as a full tunnel VPN, so all traffic from the device
connected will flow through the VPN. In practice this has caused periodic issues with applications
like Zoom, Office 365, and has resulted in some performance degradation.

It is possible to write a script that splits the tunnel, routing only work related traffic through
the VPN and all other traffic through the gateway address the host machine has. This script is
fragile, however, as Global Protect, openconnect, and even the local operating system, all can and
will have updates that break the script. It is a "high cost" solution that is outside of any support
provided by the security team or the local help desk. Using the native client for GP is the least
objectionable option.

### Hardware
While using two separate computers, one for secure activities and one for non-secure activities
would be a potential solution, space constraints, not to mention maintaining two separate physical
computers, makes this solution less desirable. Instead, use a single computer capable of running a virtual machine.

## Solution
I'm opting to use two virtual machines, one locally hosted on my desktop and the other hosted at
AWS. The local VM will have the Global Protect native client installed, and will be used solely to
establish the VPN connection. ssh and RDP traffic will flow through this machine, to and from the
AWS VM.

Hosting a local VM for the VPN isolates it from any local activities, such as Zoom and Office 365.
This local VM isn't resource intensive, as it won't be doing any work; it's a pass through to the
AWS VM.

The remote VM, hosted at AWS, is where all the privileged work will occur. It has a private network
address and therefore doesn't require the VPN for any of the activities it will perform.

The final topography is a local desktop, running MacOS 12, that has an Ubuntu 20.04 VM running in
VirtualBox. The Ubuntu VM has the Global Protect client installed. At the start of the day this
client is used to establish a VPN connection, which has a 12 hour time limit. Through a ssh
connection using port forwarding, both ssh and RDP traffic are directed through the local VM to the
AWS VM.

## Setup and Configuration
### Local VM
I installed the latest version of VirtualBox and downloaded an Ubuntu 20.04 Desktop ISO. I setup the
VM with 4 GB of RAM and 30 GB of storage. I created a user account with the same name as my work
account, and I generated an ssh keypair.

    ssh-keygen -t ed25519 -o -a 100 -f ~/.ssh/id_ed25519 -C "email@example.com"

Next I installed the Linux Global Protect client. With it installed I can establish a VPN session.

### Remote VM
We created a Service Catalog entry that creates a Linux administrator workstation. It is hardened to
some extent, does not allow ssh via password, and creates a key pair. This workstation can be
configured with all of my tools and settings.

### Local Host
From my desktop I can now ssh to the local Ubuntu VM, and then ssh to the AWS workstation. It is
possible to chain the two ssh commands together into one command using the `-t` flag. If the local
VM is called `foo` and the AWS VM is called `bar` the ssh command to sign in looks like this.

    ssh -t foo \ ssh -t bar

Remote Desktop (RDP) works over port 3389. Adding some port forwarding to the ssh command it is
possible to pipe the RDP traffic from the local host to the AWS VM. The new command now looks like
this.

    ssh -t -L 3389:localhost:3389 foo \ ssh -t -L 3389:localhost:3389 bar

This command can be shortened by using the AWS VM fully qualified domain name in place of
`localhost` in the first half of the command.

    ssh -t -L 3389:bar.aws.tld:3389 foo \ ssh -t bar

In my RDP client (Microsoft Remote Desktop) I created an entry for `localhost`. Once the ssh command
has been issued, I can open an RDP session from my local machine that resolves on the AWS VM.

## Daily Usage
My daily usage pattern follows these steps.

1. Sign into the local Ubuntu VM
2. Establish a Global Protect VPN session using the native client
3. From a terminal on the local host run the ssh command to forward port `:3389` to the AWS VM
4. From a terminal on the local host establish any additional ssh session I desire, leaving off the
   port forwarding.

I've been using this setup for several days now, and it is working smoothly. By keeping the
resolution on the RDP session relatively small, 1920x1080, there isn't much lag while using it. I
have a tmux session on the AWS VM that I connect to once I'm signed in, so that my session is always
there.

Any privileged activity that requires a command line happens in a terminal on my local machine, that
is connected via ssh through the local VM to the AWS VM. Any privileged web-based activity happens
in a browser running on the AWS VM, accessed via RDP.

## Summary
While it would be possible to eliminate the local VM, by running the VPN on the local desktop,
separating these two concerns provides enough benefit to make the extra setup and configuration
worthwhile. I have duplicated this setup on my work laptop, so I can connect in the same manner when
I'm using it. Thanks to tmux I'm able to pick up the same session without any effort.

I may explore the command line Global Protect client to see if it is easier to use than the GUI one.
I would still have to go to the local VM to establish the VPN session, but I could do it from the
command line rather than through a GUI.

