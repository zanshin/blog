---
layout: post
title: "Using Teamocil To Manage Tmux Sessions"
date: 2014-07-02T22:05:00
tags:
- nerdliness
link:
---
When I am wearing my operations hat at work I need ready access to a number of servers, 15 or so. I use [tmux](http://tmux.sourceforge.net "tmux") to create a “console” session that is broken into 5 separate windows, each further divided into panes (one per server). The windows are rough categories: production, alpha, web, ESB, etc. I also normally have a “tools” session in a separate Terminal instance that contains 4 more windows, each to utility servers that I use periodically throughout the day.

Rather than try to create these tmux sessions by hand I’ve been using a tool called [`teamocil`](https://github.com/remiprev/teamocil "teamocil") to capture the session::window::pane configuration in YAML files. With a `console.yml` file I can setup the entire console session with a single command.

Here’s how I set things up.

First you need to install the `teamocil` Gem.

    $ gem install teamocil

Next you’ll need a space to keep the YAML files that describe your tmux sessions. teamocil expects this to be called `~/.teamocil`

    $ mkdir ~/.teamocil

teamocil comes with a command that will use your $EDITOR to create new session configuration files.

    $ teamocil —edit console

The [teamocil web site](http://teamocil.com "Teamocil site") has good documentation on the options and attributes required to setup a configuration. Here is a sanitized version of my console.yml file.

{{< highlight yaml >}}
session:
  name: "console"
  windows:
    - name: "prod"
      root: "~"
      options:
        synchronize-panes: true
      layout: even-vertical
      panes:
        - cmd: "ssh prod1"
        - cmd: "ssh prod2"
        - cmd: "ssh prod3"
        - cmd: "ssh prod4"
    - name: "web"
      root: "~"
      options:
        synchronize-panes: true
      layout: even-vertical
      panes:
        - cmd: "ssh web1"
        - cmd: "ssh web2"
        - cmd: "ssh web3"
        - cmd: "ssh web4"
        - cmd: "ssh web5"
    - name: "esb"
      root: "~"
      options:
        synchronize-panes: true
      layout: even-vertical
      panes:
        - cmd: "ssh hub1"
        - cmd: "ssh hub2"
    - name: alpha
      root: "~"
      options:
        synchronize-panes: true
      layout: even-vertical
      panes:
        - cmd: "ssh alpha1"
        - cmd: "ssh alpha2"
        - cmd: "ssh alpha3"
        - cmd: "ssh alpha4"
{{< / highlight >}}

The `name` attribute is the name that will appear in my tmux status bar. `root` sets the directory in which each pane will be created. The `synchronize-panes` option is particularly nice as it allows me to type commands in one pane and have them run in all panes. The `layout` attribute determines whether the panes are vertically stacked, horizontally arranges or tiled.

Since I have my terminal set to [create or reattach to my base tmux session](https://zanshin.net/2013/06/03/automatically-reattach-to-tmux-session-in-iterm/ "Automatically Reattach to tmux Session in iTerm") creating my console session is one command away. 

    $ teamocil console

In seconds I have 5 windows (the original, prod, alpha, web, and ESB), each subdivided in to as many panes as there are servers. Quick, simple, repeatable. 

