---
layout: post
title: "Check if Reboot is Required on Linux"
date: 2022-10-13T08:23:00
tags:
- nerdliness
link:
---
Here are some ways to determine if your Linux system requires a reboot following an updated.

## RedHat OS Family
Applies to `RedHat`, `CentOS`, and `Amazon-Linux`.

Install the `yum-utils` package, which contains the command `needs-restarting`. This command can be
used to check if a full reboot is required because of kernel or core library updates (using the `-r`
option) or what services need restarting (using the `-s` option). The command returns a `0` if a
reboot is not required, or a `1` if it is, so it can be scripted.

{{< highlight shell >}}
$ sudo needs-restarting -r
Updating Subscription Management repositories.
Core libraries or services have been updated since boot-up:
  * kernel
  * systemd

Reboot is required to fully utilize these updates.
More information: https://access.redhat.com/solutions/27943
{{< / highlight >}}

## Debian OS Family
Applies to `Debian` and `Ubuntu`.

If the file `/var/run/reboot-required` exists then the system needs a reboot. This script example
shows how this can be checked.

{{< highlight shell >}}
#!/bin/bash
if [ -f /var/run/reboot-required  ]; then
  echo 'reboot required'
fi
{{< / highlight >}}

A list of packages with pending changes that require a restart are listed in
`/var/run/reboot-required.pks`

{{< highlight shell >}}
$ sudo cat /var/run/reboot-required.pkgs
libssl1.0.0
{{< / highlight >}}


There is a helper tool for Debian/Ubuntu called `needsrestart` that can be installed.

{{< highlight shell >}}
sudo apt install needsrestart
{{< / highlight >}}

Running this program with not options specified, will attempt to restart all services that have been
updated. It can also be run interactively to see which services require restarts.

{{< highlight shell >}}
sudo needsrestart -r i
{{< / highlight >}}


