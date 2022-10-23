---
layout: post
title: "How to Set TextMate 2 Properties"
date: 2012-01-31T15:44:00
comments: true
tags:
- nerdliness
link: false
---
I've been using the TextMate 2 Alpha since its release in December. For the work I do (largely Markdown editing and some minor scripting) it has been stable and a joy to use. TextMate 2 introduces a properties file where you can specify global or project specific properties. Every time I start a new markdown file I get part way through before I remember to visit **Edit | Spelling | Check spelling as you type**. Today I decided it was time to learn how to set that option once and for all.

A little Googling led me to this [TextMate 2 .tm_properties](http://gist.github.com/1478685 "TextMate 2 .tm_properties") gist. After reading through it a couple times, and through all the comments, I cobbled together the beginnings of a .tm_properties file for my use.

{{< highlight text >}}

# .tm_properties file from http://gist.github.com/1478685
# ---------------------------------------------------------

# ---------------------------------------------------------
# Display the name of the home directory
# ---------------------------------------------------------
windowTitle    = "$TM_DISPLAYNAME - ${CWD/^.*\///}"

# ---------------------------------------------------------
# Omit .tm_properties so it doesn't show in the browser
# ---------------------------------------------------------
include        = ".htaccess"

# ---------------------------------------------------------
# Exclude old *.tmproj files
# ---------------------------------------------------------
exclude        = "{$exclude,*.tmproj}"

# ---------------------------------------------------------
# Variables
# ---------------------------------------------------------
TM_FULLNAME   = "Mark H. Nichols"
TM_ORGANIZATION = "zanshin.net"
TM_GIT        = "/usr/local/bin/git"
TM_HG         = "/usr/local/bin/hg"

# ---------------------------------------------------------
# General Settings
# ---------------------------------------------------------
showInvisibles = true
spellChecking  = true

[ text ]
softWrap       = false
wrapColumn     = 80
softTabs       = true
tabSize        = 2

[ text.html.markdown ]
softWrap       = true
wrapColumn     = "Use Window Frame"
softTabs       = false
tabSize        = 4

[ text.plain ]
softWrap       = true
wrapColumn     = "Use Window Frame"
softTabs       = false
tabSize        = 4

[ source ]
softWrap       = false
wrapColumn     = 80
softTabs       = true
tabSize        = 2

[ source.plist ]
softTabs       = false
tabSize        = 4

[ source.tm-properties ]
spellChecking  = false


{{< / highlight >}}

Most of the options I'm setting here are self-explanatory. The `windowTitle` setting at the top causes the TextMate window title to display the current working directory (CWD) in the title - helpful when you have multiple project windows open at once.

This properties file is stored at the root of my home directory, making it global to all TextMate sessions. You can also have project specific .tm_properties files stored at the root of any given project. Here's the very simple template I'm using for my projects. It just appends my project name to the window title.

{{< highlight text >}}
projectDirectory = "$CWD"
windowTitle      = "$TM_DISPLAYNAME - Zanshin"

{{< / highlight >}}

You can clone or fork my global .tm_properties file, along with many of my other [dot files on Github](https://github.com/zan5hin/dotfiles "dotfiles").
