---
layout: post
title: "Thirty Days of Mutt - Day 8"
date: 2021-01-21T10:16:00
tags:
- nerdliness
link:
---
Eight days into my month long test of mutt and I'm starting to have second thoughts about the
duration of the experiment. My thinking was that 30 days would be long enough to firmly develop
habits with mutt. However, I am finding some of the hindrances that come with mutt (or at least my
configuration of it) more than I want to deal with.

Ultimately I was going to trial several different email programs, each for 30 days, to see which one
came the closest to my ideal. I am relatively neutral about email. It is my preferred method of
communicating. Composing an email allows me to order my thoughts. And the social contract, from my
perspective, is that the recipient can take their time in composing a response. I treat chat or
messaging the same way. I don't expect an immediate response. Chat is ephemeral whereas email has
longevity.

Mutt introduces slightly more friction to my desired work flow than I think I am willing to abide.
The handling of file types that may be attached to the email is the single largest pain point. Since
I run mutt on a server and access it through ssh and tmux, I can't use any mechanism to open a
browser from the email, as the browser would be on the server and not on the computer I happen to be
using. Image files are not possible with my setup.

Granted I could replicate my mutt setup on each computer and rely upon local tools to handle images,
etc. It is a non-trivial amount of work to setup mutt. Off the top of my head there's mutt, mbsync,
msmtp, neovim, GnuPG, and urlview to install and configure. Currently mutt is on an Ubuntu machine.
My other computers are macOS and Arch Linux. Adapting the install to those operating systems
_should_ be straight forward.

Maintaining the setup in multiple locations would not be fun. I don't want to have to Sysadmin my
email program. I want to read, reply, compose, and archive my email.

I may give mutt another day or two. Ten is nice round number. Then I'll write up an evaluation of
it, comparing it to my ideal email client. And I'll move on to the next candidate.
