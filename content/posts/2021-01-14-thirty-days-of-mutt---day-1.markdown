---
layout: post
title: "Thirty Days of Mutt - Day 1"
date: 2021-01-14T12:34:00
tags:
- nerdliness
link:
---
I have often tinkered with [mutt](https://www.mutt.org "mutt") but I've never really *used* it
beyond occasionally checking mail with it. I want to see if it will really work for me as my primary
email client. Therefore I've dusted off my mutt configuration, and starting today, January 14, I
plan on using it for all my personal email for the next 30 days.

## First Issue
I keep all my "dot files" in a Git repository on GitHub. It's very cleverly called
[dotfiles](https://github.com/zanshin/dotfiles "dotfiles"). On each of my machines I clone this
repository and then I use symlinks to wire configuration files into the places their respective
applications expect to find them.

Under the `mutt` directory in my dotfiles repository one of the files is the configuration for
[msmtp](https://marlam.de/msmtp/ "About msmtp"), which is an SMTP client. I use this to send mail
from mutt out into the ether. msmtp expects to find its configuration file, `msmtprc` in your home
directory, or under `.config/msmtp/` as `config`. When I set mutt up, I put `.msmtprc` in my home
directory.

Actually I put a symlink to the file in my home directory:

    cd ~
    ln -s ~/.dotfiles/mutt/msmtprc .msmtprc

I haven't used mutt for a little while, and when I tried to send an email this morning I got an
error message saying, "configuration file not found". After some experimenting I discovered that
everything works if the file itself in in my `$HOME`, but it fails if there is a symlink to the
file.

On the mutt IRC channel I was able to get a confirmation from another person that a symlinked
`.msmtprc` file does not work. I have no idea why.

## Relearning Commands
Since I haven't used mutt in sometime, I've forgotten some keyboard commands. By reading through my
`muttrc` file I refreshed my memory on some of my personalizations, but I still need to brush up on
things like tagging emails so I can archive them in mass.

It will take some time to adjust to reading HTML heavy emails in lynx. It works, but it's a bit like
reading the actual Matrix code rather than seeing the woman in the red dress.

## Day 1
I'm calling it a success. I got sending email working again, and I've read my incoming email.
