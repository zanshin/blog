---
layout: post
title: "Changing My tmux Command Prefix to Tic"
date: 2014-12-27T23:21:00
tags:
- nerdliness
link:
---
By default the [tmux](http://tmux.sourceforge.net "tmux") Command Prefix is Control-B (`<C-b>`). As this isn't the easiest key combination on the standard US layout QWERTY keyboard most tutorials suggest remapping it to Control-A (`<C-a>`). I went one step further and remapped my Caps Lock key to be a control key (I wasn't using it anyway). Now any time I need to communicate to the tmux server I can `<C-a>` plus a command key.

The tmux commands I issue frequently are:

    <C-a> c - create a new pane inside the current window
    <C-a> , - rename the current pane
    <C-a> # - switch to the pane numbered #
    <C-a> d - detach from the current session
    <C-a> s - synchronization toggle, syncs all panes or turns sync off
    <C-a> o - maximizes current pane by minimizing all others
    <C-a> i - equalizes size of all panes
    <C-a> z - hides all but current pane (great for copying)

Some of these -- creating a new pane or renaming a pane -- happen infrequently in the life of a tmux session. Others -- switching panes using their index number -- happen dozens of times a day.

Using `<C-a>` as the Command Prefix adds a two-key combination to each of the tmux sever commands I issue. Until quite recently this wasn't an issue. However I watched several installments of [Learn tmux](http://minimul.com/teaches/tmux "Learn tmux") the other day and one of the first suggestions made was to use the backtic character: `` ` `` as the Command Prefix.

The trick to this mapping is to set up your `.tmux.conf` file to pass along a `` ` `` when two are pressed back-to-back. This way you can still utilize the backtic character (as I have creating this posting).

    unbind C-b
    set -g prefix `
    bind ` send-prefix

The `unbind C-b` removes the default Command Prefix binding (Control-b). The ``set -g prefix ` `` make `` ` `` the new Command Prefix key. And ``bind ` send-prefix`` uses send-prefix to pass `` ` `` along to the application. Without the last line above you'll lose the ability to type `` ` ``. 

After having used tmux with `<C-a>` as my Command Prefix for the better part of two years now, switching to `` ` `` will take some effort, but I think the savings in key strokes over time will be well worth it.
