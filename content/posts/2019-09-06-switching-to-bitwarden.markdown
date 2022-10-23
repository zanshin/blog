---
layout: post
title: "Switching to Bitwarden"
date: 2019-09-06T13:06:00
tags:
- nerdliness
link:
---
For the past eight or so years I've been using [1Password](https://1password.com/ "1Password") as my password manager. It works both on my
Macs and on my iOS devices. The browser extension on the Macs has always been good, and the iOS one
has gotten better. I like that it stores more than just passwords; email account, credit cards,
passports, and secure notes to name a few. At last count I have nearly 600 total items stored in my
1Password vault.

Recently I've been exploring other password options. I have a laptop running Arch Linux, and a NUC
that has Ubuntu 18 installed on it. I'd like to have password management there too. After a lot of
research, and some experimentation, I've switched to [Bitwarden](https://bitwarden.com/ "Bitwarden").

Bitwarden is free, has a hosted or a self-hosted option, works on Windows, Linux, and macOS, and has
browser extensions for Google Chrome, Mozilla Firefox, Safari, Vivaldi, Opera, Brave, Microsoft
Edge, and even Tor Browser. There are mobile apps for iOS and Android, and there is a command line
interface. Oh, and you can access your vault via the web as well.

The types of objects Bitwarden knows about out of the box include Logins, Cards, Identity, and
Secure Notes. The Secure Notes object allows you to define new field to hold text, boolean values,
or hidden text (think passwords). The interface is clean and lightweight.

While it is possible to export your 1Password vault and import it into Bitwarden, and even though I
initially did just that, I decided to take a more curated approach. I deleted all the entries from
the import and manually created entries for those items I wanted and frequently used in 1Password.
Spread out over a couple of days it took me perhaps 4 hours to create 130 entries in my new
Bitwarden vault. Along the way I made use Bitwarden's password generator and cleaned up some weaker
passwords, and some duplicate passwords.

On the 1Password side I added two "smart folders": one called 1Password and one called Bitwarden.
The 1Password folder displays all the items that do not have a tag with the value `bitwarden`. The
Bitwarden folder does the opposite; it shows only items that do have a `bitwarden` tag. This allows
me to know which 1Password entries I've moved.

Initially I setup the browser extension for Firefox. I use Firefox primary for work; it holds all
the web applications I use as a part of my job. One option the extension has that is very nice is
automatic fill. Open a page that has a recognizable login form and Bitwarden will pre-fill the user
and password fields for you. All you need to do is press enter. Very nice.

Getting the Safari extension installed was more problematic. Every time I clicked on the link I was
take to the Safari Extension Gallery, where there was no evidence of Bitwarden. After several
attempts from different computers I finally did a search and found this issue on the Bitwarden
GitHub account: [Publish Safari Extensions as a Safari App Extensions](https://github.com/bitwarden/browser/issues/664 "Publish Safari Extensions as a Safari App Extensions"). Toward the bottom of the comments there is a link to a new beta version of the desktop app that includes a working Safari extension. As Apple works to protect individual privacy they are changing underlying frameworks and altering long standing protocols, which in turn requires the developer put in extra effort in order to support what is likely a small(er) audience.

With the new extension in place, Safari (my primary browser) now auto-fills login forms and works as
expected. I've also installed Bitwarden and the Firefox and Vivaldi extension on my Arch Linux
laptop, and I've setup the iOS app and it's extension on my iPhone and iPad.

I am pleased with Bitwarden, and I'm also pleased to have started reviewing and cleaning up my
password vault. For now I'm keeping 1Password installed as I am sure there will be seldom used
accounts that I'll want to migrate. However, I've disabled the browser extensions for 1Password so
that I'm only using the Bitwarden one.

Applications like Bitwarden and 1Password make good password hygiene possible and practical. If you
aren't using a password manager, I highly recommend either of these two applications.
