---
layout: post
title: "Bash History Search Bind Keys"
date: 2016-01-26T18:02:00
tags:
- snippet
link:
---
I recently switched back to bash shell from zsh and in doing so I lost zsh's history search. From
your zsh prompt if you type in part of a command and then press the up arrow, you'll be shown the
previous occurrence of that command. Repeated up arrows walk you through all previous occurrences. A
very handy tool, and one I grew fond of.

Here's how to have this history search in bash.

First use the `read` command to learn what code is transmitted by the up or down arrow key press.

    $ read
    ^[[A  # up arrow
    ^[[B  # down arrow

Control-c will return you to your prompt from the read builtin command.

Parsing the up and down arrow strings reveals that they both start with an escape character `^[` and
then the key value itself: `[A` or `[B`.

The bash function to search history is `history-search-backward` or `history-search-forward`. So
binding `^[[A` to `history-search-backward` and `^[[B` to `history-search-forward` emulates the
arrow key behavior from zsh.

Here is what I have in my `.bash_bindkeys` file, which is sourced from my `.bashrc` file.

    bind '"\e[A":history-search-backward'
    bind '"\e[B":history-search-forward'

The `\e` is the escape character (`^[`) from the read builtin output. With these bindings in my `.bashrc` I can enter part of a command and search back through my history using my arrow keys. 
