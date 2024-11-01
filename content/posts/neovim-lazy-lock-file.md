---
title: "Neovim Lazy Lock File"
date: 2024-10-31T21:01:47-05:00

tags: 
- Neovim
- Lazy
---
The [Lazy](https://github.com/folke/lazy.nvim "lazy.nvim") plugin manager for Neovim makes use of a lock file to track the
current version of each plugin. The file, `lazu-lock.json`, is a peer to the
`init.lua` file at the root of my configuration.

Between my personal laptop, work laptop, virtual admin workstation for work,
and two or three other personal machines, I have multiple active installations
of my Neovim configuration. MacOS and several flavors of Linux make up the
operating systems involved.

I've been using Git and GitHub to manage my "dotfiles" for years. Any time I
setup a new machine I create a new SSH key and copy it to GitHub, then I clone
my dotfiles repository, and finally run my install script. Neovim, Git, tmux,
bash, and several other configuration files are copied or linked into place.

Until a day or two ago, the Neovim configuration included the Lazy Lock file.
However, every time I'd update the plugins on one machine, it would create merge
conflicts on the other machines. The easiest way to resolve the conflicts was
to delete the `lazy-lock.json` file, and then run a Lazy Sync to recreate it. 

It occurred to me that having the same exact version of plugins on each machine
wasn't important. I was re-running the sync process already, to clean up the
merge conflicts, why not just run it as needed? I'd still have the same plugins
installed, but the exact version may differ slightly.

This has made running a Lazy Sync have less mental overhead (no more worries
about merge conflicts) and it has made pulling the latest version of my
dotfiles to a machine quicker and easier.
