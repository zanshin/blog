---
layout: post
title: "Why Bash Strict is Not a Good Idea"
date: 2022-10-07T07:57:00
tags:
- link
link: http://mywiki.wooledge.org/BashFAQ/105
---
Like many, I found, read, and followed the articles about "bash strict mode" believing it would make
my scripts better. In some cases my scripts worked fine. In others I had strange results, that were
only addressed by removing `set -e`. This article explains why "strict" mode is probably not a good
idea.
