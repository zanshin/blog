---
layout: post
title: "Preparing for Git 2.0"
date: 2013-11-11T23:15:00
tags:
- nerdliness
link:
---
After a recent update to Git I started getting the following message when doing a `git push`.

    warning: push.default is unset; its implicit value is changing in 
    Git 2.0 from 'matching' to 'simple'. To squelch this message 
    and maintain the current behavior after the default changes, use: 
    
      git config --global push.default matching

    To squelch this message and adopt the new behavior now, use: 
    
      git config --global push.default simple

The `push.default` setting controls what happens when you do a `git push` without specifying a branch. When `push.default` is set to `matching` _all local branches are pushed to their matching remote pairs_.

The new default, `simple`, means that when you do a `git push` without specifying a branch, _only your current branch will be pushed to the one `git pull` would normally get your code from_. 

As the message explains you can configure this setting in your `.gitconfig` file by using one of the two lines below.

    git config --global push.default matching

or

    git config --global push.default simple

I've gone ahead and set my `push.default` to be `simple`.

