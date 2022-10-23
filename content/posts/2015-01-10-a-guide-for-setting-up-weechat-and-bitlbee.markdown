---
layout: post
title: "A Guide for Setting Up Weechat and Bitlbee"
date: 2015-01-10T21:00:00
tags:
- nerdliness
link:
---
## Introduction
With polished chat and IRC clients like [Adium](https://adium.im "Adium") and [Textual](http://www.codeux.com/textual/ "Textual 5") readily available why would you want to use a terminal-based, largely text-only IRC client for instant messaging? For me the reason was to have the same chat regardless of which computer I was using at the moment. Not the same chat _application_, the same chat. By using [Weechat](https://weechat.org "Weechat") and [Bitlbee](http://www.bitlbee.org/main.php/news.r.html "Bitlbee") in conjunction with tmux I'm able to create a singleton instance of my chat, complete with logs and all my chat providers. This posting is a guide to how I accomplished this setup.

## The Setup
At my employment I have a desktop with a static IP address. By installing both Weechat and Bitlbee on that machine, and launching Weechat inside a tmux session, I can secure shell to my desktop from any of my other computers and attach to the `chat` tmux session. With one single instance of weechat+bitlbee installed this way I've centralized my instant message and IRC experience. One set of logs, one set of configuration files, one of everything.

The steps that follow were all done on OS X. Your experience will certainly vary on other operating systems.

## Install bitlbee

    $ brew install bitlbee


## Install weechat

    $ brew install weechat --with-lua --with-perl --with-python --with-ruby --HEAD --with-aspell

Add Lua, Perl, Python, and Ruby flags to support scripts (plug ins) in those languages. The `--HEAD` flag installs the latest available version of weechat. `--with-aspell` provides spell check support. To use this you first need to install aspell (using brew or method of your choice) along with any languages you wish. See the [weechat documentation](http://www.weechat.org/files/doc/stable/weechat_user.en.html "weechat documentation").


## Start bitlbee

    $ bitlbee -F -u <your-user-id>

The `-F` flag starts bitlbee as a daemon. And the `-u` flag followed by your user id starts it as you and not as root. It is recommended to not run bitlbee as root.


## Start weechat

    $ weechat


## Configure weechat

There are almost a thousand settings in weechat, so configuration option combinations are nearly limitless.

    /set *
    ...
    980 options (matching with "*")


### Getting help

The best way to get help for any weechat configuration option is to use the `/help` command.

    /help <command>

You can also see "settable" options using the `/set` command.

    /set *

or use the * wildcard

    /set *nick*

bitlbee also has excellent built-in help, accessed by using the `help` (no leading slash) command in the `&bitlbee` control channel.

Also, be sure to periodically save your settings or they won't be persisted when you quit weechat.

    /save

You should also save your bitlbee work periodically.

    save

### Basic weechat setup and configuration
These are the configuration settings I've made.

Saner time format:

    /set weechat.look.buffer_time_format “%H:%M:%S”

Use a tilde (~) between panes within weechat:

    /set weechat.look.separator_horizontal “~”

Position the weechat nicklist bar on the left:

    /set weechat.bar.nicklist.position left

And limit the nicklist bar width to 15 characters:

    /set weechat.bar.nicklist.size 15

Mute the time color:

    /set weechat.color.chat_time gray

Set the background color for the status bar (at the bottom):

    /set weechat.bar.status.color_bg black

Turn off highlighting of your own nick, it gets annoying otherwise.

    /set weechat.color.chat_nick_self *!lightgreen

Limit the width of the buffers side bar:

    /set weechat.bar.buffers.size 20

#### Status bar settings
Don't hide the status bar:

    /set weechat.bar.status.hidden off

Mute the status bar background:

    /set weechat.bar.status.color_bg darkgray

Configure the contents of the status bar:

    /set weechat.bar.status.items “buffer_number+:+buffer_name+{buffer_nicklist_count}+buffer_filter,completion,scroll”

Allow for multi-line input:

    /set weechat.bar.input.size 0
    /set weechat.bar.input.size_max 3

### Miscellaneous weechat settings
Hide join/leave messages in IRC (After enabling freenode)

    /set irc.look.smart_filter on
    /filter add irc_smart * irc_smart_filter *

Use array of colors for participants in channels or chat rooms.

    /set weechat.color.chat_nick_colors red,green,brown,blue,magenta,cyan,white,lightred,lightgreen,yellow,lightblue,lightmagenta,lightcyan

Colorize nick list away status. First check every _x_ minutes, second limits to nicklists of a size or smaller (less processing)

    /set irc.server_default.away_check 5
    /set irc.server_default.away_check_max_nicks 25

One of my favorites, substitue the UTF-8 `hookrightarrow` character for the nick when the same person has multiple back-to-back messages.

    /set weechat.look.prefix_same_nick ↪

## Scripts (plugins)
weechat has a large library of [scripts](https://weechat.org/scripts/ "scripts") (think plugins). Here are the 4 that I use.

* buffers.pl - Sidebar with list of buffers
* highmon.pl - Highlight monitor
* iset.pl - Interactive Set for configuration options
* autosort.py - Automatically or manually keep buffers sorted and grouped by server


### buffers

[buffers.pl](https://weechat.org/scripts/source/buffers.pl.html/ "buffers.pl") provides a nice sidebar presentation of all the open buffers (channels or individual chats) you have open. There are a number of settings for buffers (64!); here are the ones I use:

    /set buffers.color.number white
    /set buffers.look.hotlist_counter on
    /set buffers.name_size_max 20
    /set buffers.color.current_bg default
    /set buffers.color.current_fg blue
    /set buffers.color.hotlist_message_bg default
    /set buffers.color.hotlist_message_fg yellow

These are fairly self explanatory. Show the number for each buffer, and indicate how many new messages are in a buffer. Limit the length of buffer names to 20 characters. Make the name of the current buffer blue against a default background -- my terminals are black, and make any buffer with new activity yellow against the default background.

### highmon

[highmon.pl](https://weechat.org/scripts/source/highmon.pl.html/ "highmon.pl") creates a highligh monitor allowing you to see mentions of your nick, or any other key word you choose. Since my given name is `Mark` I actually have my highlight monitor set to ignore uses of `mark`,  e.g., `bookmark`, to prevent highlight notification I don't want. Like buffers, highmon has a number settings. I used Pascal Poitras's [Weechat Hightlight](http://pascalpoitras.com/2013/08/09/weechat-highlight/ "Weechat Highlight") to get my highligh monitor setup.


### iset

[iset.pl](https://weechat.org/scripts/source/iset.pl.html/ "iset.pl") creates an interactive `set` interface for configuration options. It has a search feature that makes find obscure options a bit easier.


### autosort

[autosort.py](https://weechat.org/scripts/source/autosort.py.html/ "autosort.py") by default groups your channels by server. I'm using this script to mimic GUI chat clients in grouping chatrooms and individual chats under their owning server. More on this in the *Advanced Topics* section at the end of this article.


## Create a sidebar with list of all people from all servers

These steps will create a sidebar containing a list of all people in all your networks: IRC, Jabber, et cetera. It makes use of the weechat `/bar` command. Read the `/help bar` output to learn more.

Create the bar and populate it

    /bar add bitlist root right 15 on "@irc.Bitlbee.&bitlbee:buffer_nicklist"

Configure the bar. I no longer remember where I found these settings. Your mileage may vary.

    /set weechat.bar.bitlist.color_bg = default
    /set weechat.bar.bitlist.color_delim = default
    /set weechat.bar.bitlist.color_fg = 37
    /set weechat.bar.bitlist.conditions = ""
    /set weechat.bar.bitlist.filling_left_right = vertical
    /set weechat.bar.bitlist.filling_top_bottom = columns_vertical
    /set weechat.bar.bitlist.hidden = off
    /set weechat.bar.bitlist.items = "@irc.Bitlbee.&bitlbee:buffer_nicklist"  (default: "")
    /set weechat.bar.bitlist.position = right
    /set weechat.bar.bitlist.priority = 0
    /set weechat.bar.bitlist.separator = on
    /set weechat.bar.bitlist.size = 15
    /set weechat.bar.bitlist.size_max = 0
    /set weechat.bar.bitlist.type = root

The result of this will be a column on the right side of the terminal showing the ids of all the people connected to your IRC and chat servers. People online will be indicated by a plus sign, e.g., `+somebuddy`.

# Configure Weechat for IRC
Out of the box weechat is an IRC client so by default it connects you to freenode using generic connection settings. You can customize your connection like this.

Set your IRC nicks

    /set irc.server.freenode.nicks “your-irc-nick”

This can be a comma delimited list.

Set your IRC username

    /set irc.server.freenode.username “your-irc-username”

Set your real name or pseudonym

    /set irc.server.freenode.realname “Your Name”

Configure things to automatically connect

    /set irc.server.freenode.autoconnect on

Add the list of channels you'd like to always join

    /set irc.server.freenode.autojoin “#channel1,#channel2,#channel3,#weechat”


### Change your IRC passphrase
If you ever need or want to change your IRC account passphrase, here's how.

    /set irc.server.freenode.command /msg nickserv identify NEWPASSHERE


### Joining/parting channels and being away

To join a channel use the `/join` command:

    /join #channel

or use the short form

    /j #channel

Or to leave a channel use the `/part` command:

    /part [quit message]

You can mark yourself as away:

    /away <away message>

You can also mark yourself as away for `-all` connected servers

    /away -all <away message>

And you can return from being away

    /away [-all]


# Configure bitlbee in weechat
bitlbee is a gateway to servers that aren't IRC servers. Jabber, Twitter, Yahoo! and others are possible. The setup described below is for a Google Talk and Jabber account.


## Connect to bitlbee server

bitlbee runs on port 6667

    /connect localhost 6667

The connection will use a default user name based on your IRC name. Since you haven't created or signed into a `nick` yet the id used will likely be your operating system account.


## Autoconnect Bitlbee

If you'd like to have weechat automatically connect to bitlbee, create a server in weechat for the connection. Here the tag `im` for instant message is used as the server name.

    /server add im localhost -autoconnect


## Register a password for bitlbee

Change to the control channel called `&bitlbee` and register a password for the account. This creates an XML file on the host system named for the user to store connections and chat room information.

    register <password>

### Create a "instant message" server
Combining the two previous commands, here's how you would create a server called `im` for "instant message" that automatically connects when you start weechat, and further identifies you to bitlbee using the previously registered password, do this:

    /server add im localhost/6667 -autoconnect
    /set irc.server.im.command "/msg &bitlbee identify YOUR_PASS"


## Add accounts

While in the `&bitlbee` control channel (denoted by the `&`) add a Jabber account:

    account add jabber you@server.tld <password>

Or add a Google Talk account.

    account add jabber first.last@gmail.com <password>

Use the `ac list` (`ac` is short for `account`) to see your newly created accounts.

    ac list

If you want to see the full name of an buddies on GTalk and not just their account short name, you can do this:

    ac gtalk set nick_format %full_name

# Conclusion
I've been using weechat+bitlbee as my primary chat interface for the better part of a year now. I'm still learning the ins and outs of how to tweak this setup. The most recent change has been to have individual bitlbee connections for each service rather than having all services merged into a single &bitlbee control channel. Combined with some buffers.pl settings changes the result is quite nice.

# Advanced Topics
## Multiple bitlbee users

If you want to separate individual and group chats by service (MSN, Yahoo!, Jabber, GTalk, et cetera) you need to create separate bitlbee users and register a password for each.

In a &bitlbee channel use `/nick` to change your identity and then use `register` to set a password for that identity.

    /nick gtalk
    register <password>

Next create a new weechat server and connect to it.

    /server add gtalk  localhost/6667 -autoconnect
    /connect gtalk

Move to the &bitlbee control channel belonging to `gtalk` and switch to to new nick and identify yourself.

    /nick gtalk
    identify <password>

Now you can add your Google Talk account as described above. Repeat these steps for Jabber or MSN or what have you.

## Adjusting the buffer list
These settings changes will make use of the multiple bitlbee (and IRC for that matter) connections.

    /set irc.look.server_buffer independent
    /set buffers.look.indenting on
    /set buffers.look.show_number off

By default the server buffers are all merged together (`merge_with_core`), using `independent` splits them apart. Turning indenting on causes the channels belonging to a service to be indented. And turning buffering numbering off cleans up the look.

Here's an image of the final result.

[![weechat](https://zanshin.net/images/weechat.png)](https://zanshin.net/images/weechat.png)


