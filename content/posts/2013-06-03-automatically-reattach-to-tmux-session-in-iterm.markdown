---
layout: post
title: "Automatically Reattach to Tmux Session in iTerm"
date: 2013-06-03T15:30:00
comments: true
tags:
- nerdliness
link: false
---
[tmux](http://tmux.sourceforge.net "tmux") is a terminal multiplexer — it allows you to create a terminal session containing one or more windows, each containing one or more panes. You can have multiple sessions, and you can attach to and detach from any session, even remotely, making tmux a powerful tool, especially when you work with lots of command line tools.

My tmux usage centers around a single session that contains multiple windows, one for each current activity or project. Depending on the activity a window may have multiple panes splitting the display horizontally or vertically. Recreating my tmux session can take some time, so I figured out how to automatically reattach to an existing tmux session or create a new one anytime I start my terminal program, [iTerm2](http://www.iterm2.com/#/section/home "iTerm2").

In the preferences for iTerm2, select the 'Profiles' tab, and then the 'General' pane for your default profile. In the 'Command' section of the 'General' pane locate the 'Send text at start:' setting. Put this command in, substituting your session name for `base`.

    tmux attach -t base || tmux new -s base

Now anytime you start iTerm2 (or create a new window) tmux will try to attach to a session called `base`, or, if that session doesn't exist, it will create a new session called `base`.

In practice this means I can simply quit iTerm2, which detaches me from the current session. When I next start iTerm2 I'll be reconnected, and all my windows and panes will be there.
