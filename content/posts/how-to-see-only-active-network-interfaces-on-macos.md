---
title: "How to See Only Active Network Interfaces on Macos"
date: 2024-03-04T09:10:45-06:00
draft: true

tags:
- Apple
- MacOS
- Interface
---
MacOS has a number of network interfaces making the output from `ifconfig` messy and not easily
visually parsed.

## Network Interfaces
A non-exhaustive list of network interfaces you might see on MacOS includes

* `ap1` - Access Point. Used if you are using your Mac as a wireless access point where you are
  sharing its connection.
* `awsl0` - Apple Wireless Direct Link. WiFi P2P link for AirDrop, Airplay, etc. Also used for
  Bluetooth.
* `llw0` - Low latency WLAN interface. Used by the Skywalk system.
* `utnun#` - Tunneling interface. Use for VPN connections. MacOS seemingly hangs on to multiple
  `utun` interfaces, even after they aren't in use.
* `lo0` - Loopback or localhost
* `gif0` - Software Network Interface
* `stf0` - 6to4 tunnel interface
* `en0` - Ethernet interface
* `en1` - Wireless interface
* `en5` - iBridge / Apple T2 Controller
* `en6` - Bluetooth PAN
* `en8` - iPhone USB
* `en9` - VM network interface
* `en10` - iPad
* `bridge0` - Thunderbolt Bridge

## List current IP addresses
A simple way to see the current list of IP addresses your Mac has is by using an alias like this.

    alias inet='ifconfig | grep inet | grep -v inet6'

Which produces output similar to this.

```
   ❯ inet inet 127.0.0.1 netmask 0xff000000
        inet 192.168.6.39 netmask 0xfffffc00 broadcast 192.168.7.255
        inet 192.168.65.1 netmask 0xffffff00 broadcast 192.168.65.255
        inet 100.101.18.109 --> 100.101.18.109 netmask 0xffffffff
```

 While that can be useful, it would be nicer to know which interface had which IP address.

## List current IP addresses and the network interface
This command will display the name of the network interface and the assigned IP address for the
active network interfaces.

    ip -4 addr show | awk '/inet/ {print $NF, $2}' | column -t

In order for this command to work, the `iproute2mac` formula via Homebrew.

The `ip -4 addr show` displays all the network interfaces having an IPv4 address.

```
❯ ip -4 addr show
lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384
        inet 127.0.0.1/8 lo0
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
        ether 74:a6:cd:b6:eb:7f
        inet 192.168.6.39/22 brd 192.168.7.255 en0
utun8: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> mtu 1280
        inet 100.101.18.109 --> 100.101.18.109/32 utun8
bridge100: flags=8a63<UP,BROADCAST,SMART,RUNNING,ALLMULTI,SIMPLEX,MULTICAST> mtu 1500
        ether 76:a6:cd:6b:c1:64
        inet 192.168.65.1/24 brd 192.168.65.255 bridge100

```

The `awk` statement filters for the line containing `inet` and then prints the last field from that
line (`$NF`) and the second field (`$2`). The last field is the interface name and the second field
is the assigned IP address.

The `column -t` command formats the output into columns.
```
❯ inet
lo0        127.0.0.1/8
en0        192.168.6.39/22
utun8      100.101.18.109
bridge100  192.168.65.1/24
```


