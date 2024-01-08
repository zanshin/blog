---
title: "Use Asdf to Manage Neovim Nightly"
date: 2024-01-07T22:43:10-06:00

tags:
- asdf
- neovim
---
I've been using the Neovim nightly build for some time. The way I have been accomplishing this is to
update my local clone of the Neovim repository, and then make and install the application. This
works, but it does take a little time.

With `asdf` and the `neovim` plugin I can easily update to the latest nightly version.

To add the `neovim` plugin to `asdf`

    asdf plugin add neovim

To install the nightly build of `neovim`

    asdf install neovim nightly

To make the nightly version the global default

    asdf global neovim nightly

In order to update the nightly version you need to remove the old nightly version first, so I have
this bash alias setup.

    alias update-nvim='asdf uninstall neovim nightly && asdf install neovim nightly'

And, since `asdf` will let me have multiple version of Neovim installed, I could have the stable
version on hand, and use it for a project if I wanted to.
