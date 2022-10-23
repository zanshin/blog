---
layout: post
title: "Solving Operation not Permitted Errors over Remote Access"
date: 2021-06-18T12:39:00
tags:
- nerdliness
link:
---
Recently I purchased a 24" M1 iMac. One of my goals was to have a central place for all my digital
content: movies, audiobooks, music, and photos. My venerable late-2013 MacBook Pro has a 1TB drive
that cannot hold my entire collection along with my other files, applications, and the operating
system.

For some time now I've been using an external USB drive to house my media. This drive has been
plugged into an even more venerable 2009 MacBook Pro. The reason for using the much older laptop as
host for my media is simple: that laptop doesn't get moved. If the external drive were attached to
my primary machine, I would constantly be moving it, with the laptop, or mounting and dismounting
it.

With all my music, movies, and audiobooks offloaded to the external drive, there was enough room
left on my primary laptop for all my photos, and the rest of my files. It wasn't ideal, but it
worked.

The new iMac has 256GB internal storage, and a pair of 4TB external drives. I have spent
considerable time this past week consolidating all my digital media to one of the 4TB drives. I've
also put my software projects directory, called `code`, there. When I am away from my desk and want
to access something on the external drive on the iMac, those files are just an ssh connection away.

From the MacBook Pro I am using iTerm2 and ssh. From the iPadPro I'm using [blink](https://blink.sh
"Blink.sh") since it includes [mosh](https://mosh.org "mosh"), or mobile shell. The advantage to
mosh is that the session stays in sync even if the connection is interrupted. Since iPadOS is fairly
aggressive about stopping idle processes, using an ssh connection becomes tiresome as you are
constantly having to reestablish it. With mosh, once you are connected you stay connected until you
end the session.

I believe, though I am no longer certain, that the first remote session on my iMac was done from the
iPadPro using mosh. On the iMac there is a component of mosh, `mosh-server` the runs and manages the
incoming connection. This will play a key part in what happened with my ability to remotely access
files over ssh/mosh.

MacOS allows you to control how your computer is shared. Under the Sharing preference pane in System
Preferences, there is a `Remote Login` option. With that selected you can login to the local
computer from a remote computer. Once Remote Login is enabled, there is a second option, `Allow full
disk access for remote users`. This should be enough to permit ssh or mosh session access to any of
the disks mounted.

In my case I was getting an `Operation not permitted` error any time I tried to access any external
drive attached to the iMac. I got this error whether I used ssh or mosh, and from any remote device:
iPadPro or MacBook Pro.

When the first remote login occurs a setting is added to `Full Disk Access` under the Security &
Privacy Privacy pane. This setting is called `sshd-keygen-wrapper`. If it isn't listed, or is listed
and enabled, then full disk access is granted. If it is there and no enabled, however, full disk
access is not granted. In my case, sshd-keygen-wrapper was present but not enabled.

I suspect that mosh (and mosh-server) having been the mechanism for the initial remote session, left
the setting in a state where no remote access to external drives was allowed. Once I enabled that
setting I was able to remotely access external drives using either ssh or mosh.

This Apple discussion thread, and the links it contains, do a better job of explaining the ins and
outs of sshd-keygen-wrapper.
[https://discussions.apple.com/thread/250352651](https://discussions.apple.com/thread/250352651) I
found this link through the `##apple` IRC channel.
