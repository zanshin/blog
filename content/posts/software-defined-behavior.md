---
title: "Software Defined Behavior"
date: 2023-04-13T19:28:30-05:00

tags:
- iterm
- habits
- behavior
---
For the past ten years or so, my primary terminal emulator has been [iTerm2](https://iterm2.com
"iTerm2"). Recently I have been
experimenting with other terminal emulators. The current test subject is
[Alacritty](https://alacritty.org "Alacritty"). Switching to a
different piece of software has exposed a learned behavior that I'm not sure I'm willing to give up.

iTerm2 employs what I think of as a document model. You open the software once, but can have
multiple "documents" open simultaneously. In this case each document is another terminal session.
Since they are all children of the application you can cycle through them using the CMD-\` keyboard
shortcut.

On the desktop where I keep my terminal windows (multiple desktops is another topic for another
day), I typically have three terminal windows open. In the upper left quadrant I have a window where
I keep my daily log open in a text editor. The lower left quadrant has a window where my ICR client
(Weechat) and Mutt email live, each in their own tmux window. Both Mutt and Weechat run on a small
server in my home, so I ssh into that machine and attach to a tmux session which holds those two
applications. The right side of my screen is a single terminal window where I do most of my work. I
usually have several tmux session defined, each centered around either a long running task, or some
recurring administration function I want to return to again and again.

Since iTerm2 uses a document model I can use the CMD-\` shortcut to hop from terminal to terminal.
Alacritty does not employ a document model. Each of the three terminal windows described above is a
unique instance of Alacritty. In order to switch from one to another I need to use CMD-Tab. CMD-Tab
brings up the application switcher, and sometimes there are several applications I have to tab past
to get to the next Alacritty window. Furthermore, from the application switcher you can't tell which
Alacritty window you are about to open. When you CMD-\` you are taken to the window so you know
immediately which window you are at.

For now, I'm going to return to iTerm2 so I can keep my in-application window switching ability.
