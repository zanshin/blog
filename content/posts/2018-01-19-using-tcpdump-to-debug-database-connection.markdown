---
layout: post
title: "Using tcpdump to Debug Database Connection"
date: 2018-01-19T21:42:00
tags:
- nerdliness
link:
---
This afternoon I had to determine why a particular database connection wasn't working. One of the
tools I ended up using was `tcpdump`. I don't pretend to understand even half of what this tool can
do. Here's a nice [tcpdump Tutorial and Primer with
  Examples](https://danielmiessler.com/study/tcpdump/ "tcpdump Tutorial and Primer with Examples").

Here's the command I ended up using to try and figure out what was up with my broken connection:

      sudo tcpdump -s 0 -i em2.1170 dst 10.130.228.99 and port 1521 -w /tmp/library.pcap

Without the `sudo` you likely won't be able to run the command. In English this command captures
full length packets on the network interface called `em2.1170`, going to IP address `10.130.228.99`
on port `1521`. Whatever the command captures is written to a file in `/tmp` called `library.pcap`.
This output file will be a binary, you'll need [Wireshark](https://www.wireshark.org "Wireshark") to
read it.

`-s` Sets the snaplen or number of bytes from each packet to capture. The default is 65535, and `-s
0` also sets it to 65535. Using `-s 0` is a backwards compatibility trick, which is useful when
hopping from one OS to another.

`-i em2.1170` Specifies which network interface to monitor. You may need to do an `ifconfig -a` to
determine which NIC to watch.

`dst 10.130.228.99 and port 1521` Tells tcpdump we want to monitor only destination 10.130.228.99 on
port 1521. Limiting what tcpdump captures is the only sane way to use it. A typical connection
generates lots and lots of packets. Lots.

`-w /tmp/library.pcap` Specifies that we want the capture to be saved as a pcap file in the `/tmp`
directory.

Using tcpdump can be a bit intimidating. There are lots of options, and it very powerful in that it
can do lots of filtering of the packet stream you are watching. The best way to learn it is to use
it. In my case today I only captured 11 packets while trying to connect to the database. Turns out
the database was no longer at the IP address. Something I could have determined with

    nc -v 10.130.228.99 1521

But that's a posting for another day.
