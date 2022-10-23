---
layout: post
title: "Bash Script to Manage VPN Routes"
date: 2020-09-30T19:55:00
tags:
- nerdliness
link:
---
In my day job I use a VPN, specifically GlobalProtect from Palo Alto. In our installation it is
setup to be "full duplex" — all the traffic from your local machine is routed through the VPN.
Previous we had a half duplex setup, where only the private network traffic was routed through the
VPN.

GlobalProtect has a client, which was setup by our security staff. It's dead simple to use and
annoying to work with. Between the DNS jiggery-pokey that GP does, and my own DNS settings, I've had
problems with some non-work sites not working.

The alternative to using the official client is to use
[OpenConnect](https://www.infradead.org/openconnect/ "OpenConnect"). This requires installing it and
using it on the command line, but doesn't mess with IP traffic as badly as GP wants to. The problem
is that OpenConnect doesn't setup routes for the private network, and therefore some work-related sites
don't work.

My choices, then, are: (1) Use the official GP client and live with all my traffic being routed
through the VPN, and have some sites not work, or (B) use OpenConnect and have some other things not work.

There is a third choice. Write a script to figure out the routing rules that need to be added to the
routing table, and use that, along with OpenConnect, to establish your VPN connection. One of my
co-workers created a script and shared it with me. His was able to work on either Linux or macOS. I
only use macOS for work, so I didn't need the Linux specific stuff. Therefore my script is a bit
more compact and straight-forward than his.

As will all scripts you find on the Internet, use caution before blindly putting them to use. This
script works for me, in my situation, with my edge cases. Your mileage will almost certainly vary.


    #!/bin/bash
    set -e
    set -o pipefail

    # Dependencies
    # brew install iproute2mac - gets ip command for macOS
    if ! [[ -x $(command -v ip) ]] ; then
      echo "ip command not found"
      echo "Run brew install iproute2mac to install it"
      echo "Then run $0 again"
      exit
    fi

    # Colors
    RED='\033[0;31m'
    BLUE='\033[0;34m'
    NC='\033[0m'

    # This script works on macOS. It futzes with the routing table
    # to only route 10.* and 129.130.* traffic over the Global Protect
    # VPN, if that VPN is active.

    # Detemine what gateway traffic is flowing through
    GATEWAY=$(netstat -nr | grep -v "::" | grep default | awk '{print $2}')
    echo -e "Gateway:                ${BLUE}$GATEWAY${NC}"

    # Determine which network interface the host is using
    LOCAL_IFACE=$(ip route show | grep default | awk '{print $5}')
    echo -e "Local interface in use: ${BLUE}$LOCAL_IFACE${NC}"

    # GP VPN IP range and prefix - macOS strips the `.0` in the netmask
    GPVPN_RANGE="10.130.48.0/20"
    GPVPN_PREFIX="^10.130.48"
    echo -e "Global Protect range:   ${BLUE}$GPVPN_RANGE${NC}"
    echo -e "Global Protect prefix:  ${BLUE}$GPVPN_PREFIX${NC}"

    # Protect local IP from being routed
    if [[ "$(netstat -nr | grep -E "192\.168\.4\.1")" ]] ; then
      VERB="replace"
    else
      VERB="add"
    fi

    echo
    echo "Setting a route for the local network"
    echo -e " ${RED}ip route $VERB 192.168.0.0/2 dev $LOCAL_IFACE ${NC}"
    sudo ip route "$VERB" 192.168.0.0/16 dev "$LOCAL_IFACE"

    if [[ "$(netstat -nr | grep -E $GPVPN_PREFIX)" ]] ; then
      VERB="change"
    else
      VERB="add"
    fi

    echo
    echo "Setting a route for the GP VPN"
    echo -e " ${RED}route $VERB $GPVPN_RANGE $GATEWAY ${NC}"
    sudo route "$VERB" "$GPVPN_RANGE" "$GATEWAY"

    # Start the VPN...
    sudo openconnect  --user=mhn --protocol=gp --script "$HOME/src/openconnect/vpnc-script" gpvpn.ksu.edu

    exit 0
