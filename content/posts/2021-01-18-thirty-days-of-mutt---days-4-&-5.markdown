---
layout: post
title: "Thirty Days of Mutt - Days 4 & 5"
date: 2021-01-18T07:21:00
tags:
- nerdliness
link:
---
Having not used mutt regularly for some time now, I've had to relearn its built-in keyboard commands
as well as some of the macros that I created.

# Custom Keyboard Commands
I currently have four separate email accounts setup in mutt. I'm actually using
[neomutt](https://neomutt.org "neomutt") which has the sidebar already baked in. I have the sidebar
setup to list each account with the folders I'm interested in: INBOX, Drafts, Sent, Junk, and
Archive.

I have two sets of macros that let me jump to the inbox of any account directly. I can key `.1` or
`.2` or `.3` or `.4` to access the accounts by their relative position in the list. I can also use a
letter designation: `m`, `r`, `n`, `c`, preceded by a dot to accomplish the same thing. I set the
letter shortcuts up first, and later added the numbers.

I also have a shortcut, `.s` to save an email to that account's Archive folder. And a shortcut to
move mail to the junk folder, `.j`. Both of these work in conjunction with to built-in tag, `t`
command to operate on multiple emails.

I can also move up and down the list of mailboxes using the arrow keys. Once a mailbox has focus,
pressing the right-arrow key refreshes the contents of that box.

Finally I have some filter defined as macros, allowing me to view unread mail only, `.u`, to see
only today's email (read or unread), `t`, to see this week's mail, `.w`. `.a` removes any filter
allow all mail to be viewed again.

Being able to customize the possible interactions with mutt is one of its most compelling features.
