---
layout: post
title: "Searching Files for a String"
date: 2014-02-04T22:57:00
tags:
- nerdliness
link:
---
My website uses [Mint](http://haveamint.com "Mint") as a visitor tracking system. One of the Peppers
(as plug-ins are called) displays errors; 404 being the primary culprit.

Last night someone manged to get a 404 trying to visit my posting about my [tmux
Configuration](https://zanshin.net/2013/09/05/my-tmux-configuration/ "My tmux Configuration"). Only
instead of the date portion of the URL being `2013/09/05` it was `2013/09/06`. I was curious if
perhaps I'd referenced that posting myself and had gotten the URL wrong. A quick Google search
showed me how to use `grep` to show all occurrences of a string in a set of files.

Here's the command template:

    $ grep -rnw 'diretory' -e "pattern"

`-r` makes the command recuse through all files, `-n` causes the line number to be displayed, and
`-w` matches against the whole word. There are two optional parameters, `--exclude` and `--include`
that can be used for more efficient searching. E.g.,

    $ grep --include={*.md,*.markdown} -rnw 'directory' -e "pattern"

Or you could exclude things to improve search efficiency.

    $ grep --exclude=*.o -rnw 'directory' -e "pattern"

So in my case I ran this command from the root of my Jekyll installation.

    $ grep -rnw _posts -e "2013-09-06"

And got no results. For comparison I ran this command.

    $ grep -rnw _posts -e "2013-09-05"
    _posts/2013-09-05-my-tmux-configuation:4:date: 2013-09-05 09:31

The single result shows the only occurrence of that date string is on line 4 of the posting itself,
in the YAML header.

So not only do I know that the 404 was the fault of the visitor I also know how to rapidly search a
directory of files for a string using
[grep](https://www.kernel.org/pub/software/scm/git/docs/git-grep.html).
