---
layout: post
title: "Setup Openconnect for Mac OS X Lion"
date: 2013-08-27T14:39:00
comments: true
tags:
- nerdliness
link: false
---
Rather than use Cicso's AnyConnect (which has given me trouble in the past) I have setup [Openconnect](http://www.infradead.org/openconnect/ "Openconnect") for VPN access.

Here is a high level set of steps to install and configure it for your use. As always, proceed at your own risk, make a backup, complete your last will and testament, and accept that your computer may overheat and fuse into a worthless pile of slag as a result of following these directions.

##Installs
You'll need openconnect and vpnc-script.

I used [Homebrew](http://brew.sh "Homebrew") to install [openconnect](http://www.infradead.org/openconnect/ "openconnect").

{{< highlight bash >}}
$ brew install openconnect
{{< / highlight >}}

The caveats for openconnect warn you that you'll need the TUN/TAP kernel extensions. Get TUN/TAP from `http://tuntaposx.sourceforge.net/download.html`. After running the installer, run

{{< highlight bash >}}
$ cd /Library/Extensions
$ sudo kextload -v tun.kext
{{< / highlight >}}

Download [vpnc-script](http://www.infradead.org/openconnect/vpnc-script.html "vpnc-sccript"). I saved mine to `/usr/local/bin/vpnc-script`. Make sure the script is executable.

{{< highlight bash >}}
$ chmod +x /usr/local/bin/vpnc-script
{{< / highlight >}}

##Configuration
You can view the openconnect command options by running

{{< highlight bash >}}
$ sudo openconnect
{{< / highlight >}}

Rather than enter the options each time you want to create a virtual private network, create an openconnect configuration file and put the configuration values you need there.

{{< highlight bash >}}
$ cd ~
$ touch .openconnect
$ vim .openconnect
{{< / highlight >}}

Here is my `.openconnect` file:

{{< highlight properties >}}
authgroup=*****VPN
user=****
no-cert-check
script=/usr/local/sbin/vpnc
background
passwd-on-stdin
{{< / highlight >}}

Fill in your own authgroup and user information. 

There is no configuration necessary for vpnc-script.

##Running openconnect
With a configuration file in place, here's how to start a VPN:

{{< highlight bash >}}
$ sudo openconnect --config ~/.openconnect https://your.vpn.url
{{< / highlight >}}

If you don't want to have to enter your local account password for the `sudo` command, you can add an exception for the openconnect command to `/etc/sudoers`, like so:

{{< highlight bash >}}
$ sudo visudo -f /etc/sudoers
{{< / highlight >}}

And add this line to the file:

{{< highlight properties >}}
%admin  ALL=(ALL) NOPASSWD: /usr/local/bin/openconnect
{{< / highlight >}}

Finally, create an alias for the openconnect command above to make life easier.
