---
layout: post
title: "Thirty Days of Mutt - Day 3"
date: 2021-01-16T06:55:00
tags:
- nerdliness
link:
---
Mutt is attractive to me for several reasons. And there are some things about it that detract from
it as a everyday email solution.

## Customization
Nearly every facet of mutt can be customized to your liking. Colors, layout, key bindings, even the
tools used to receive or send emails can be selected. Setting up mutt and getting everything just
the way you want is no minor task. I dare say your understanding of how email is sent, received, and
stored will improve as a result of installing mutt.

## Encryption
Email encryption ought to be included in every email client. It should be dead simple to use.
Unfortunately it is neither wide spread nor easy to use. However, once you put in a little effort to
add encryption to mutt, using for emails is very simple. While it may not be a true first class
citizen, as a feature, it is very close to that. Too many other email clients ignore encryption
altogether, or only provide it through 3rd-party add-on libraries.

## Email in a Single Place
My mutt install is on a single computer. I have my home network setup to allow me to access this
computer from anywhere. Mutt (and [weechat](https://weechat.org "weechat") for that matter) are always running on this computer. By
running them inside a [tmux[(https://github.com/tmux/tmux "tmux") session I can remotely access the computer, attach to tmux and get to my
mail. I can be attached to that tmux session from multiple computers at the same time. All are
seeing the exact same running process. Instead of having my mail synced to every computer, it is
synced to one computer, where I can access it.

## Nerd Quotient
Finally I like mutt since it is nerdy. Getting it up and running is a bit of a hurdle. Learning the
ins and outs and adapting to it are another hurdle. As with anything difficult, there is
satisfaction is mastering it.

## Requires Dedication
On the minus side of the equation, mutt does require more effort and more dedication than using
Gmail, say. My mutt setup consists of mutt, mbsync, msmtp, GnuPG, and urlview. This doesn't include
the Ubuntu OS it's running or, or some ancillary tools like tmux and Neovim. I guess you could say
mutt is like a kit car. One that requires an effort to construct, and that will require on-going
maintenance to keep in good running condition.

## HTML Emails
Reading emails that are basically web pages is cumbersome at best. Some HTML emails are surprisingly
easy to view and read. Others expose horridly complex, obfuscating HTML, wrapped around very little
actual content.

If there is going to be one reason I don't keep mutt as my email, it will be the difficulties around
HTML email,


