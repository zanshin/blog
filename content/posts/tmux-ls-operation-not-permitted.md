---
title: "Tmux Ls Operation Not Permitted"
date: 2022-11-19T20:50:29-06:00

tags:
- tmux
- macos
---
I updated to MacOS Ventura a day or two after it was officially released. I had been running it on
one of my computers since the public betas started mid-summer. Until tonight, I haven't had any real
problems with it.

This evening I created a new `tmux` session and wasn't able to run the `ls` command. I got this
error message:

    ls .: Operation not premitted

A few searches led me to a couple of articles talking about a similar issue with Apple's Terminal
app. The solution there was to make sure Terminal was listed in the "Full Disk Access" pane of
"Security & Privacy" inside System Settings (formerly System Preferences).

I added `tmux` to that list, and quit out of all the active tmux sessions I had, then recreated one
and my ability to run commands from within `tmux` had been restored.

Here are the steps to do the same thing I did.

1. Open System Settings
2. Select Security & Privacy
3. Select the Privacy tab
4. Select Full Disk Access from the list
5. Click the `+` sign to add a new entry
6. Search for `tmux` and select it
7. Restart/recreate any open tmux sessions

I hope this was a mistake on Apple's part that will be correcting in a future release. I really
don't want to add all the Homebrew installed utilities and applications to the Full Disk Access
list.
