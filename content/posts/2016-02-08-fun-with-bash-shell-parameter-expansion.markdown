---
layout: post
title: "Fun With Bash Shell Parameter Expansion"
date: 2016-02-08T22:45:00
tags:
- snippet
link:
---
Recently I switched back to `bash` from `zsh` for my shell environment. I needed a consistent shell
on my local machines as well as on remote servers. One aspect of my bash environment that wasn't
working the way I wanted was displaying the current Git branch and Git status information when the
current directory was Git controlled. 

In my original attempt at building my prompt I combined `PS1` and `prompt_command`. This worked on
OS X machines, but not on Linux-based operating systems. After splitting apart the line of
information I wished to display via the `prompt_command` from the actual prompt (controlled by
`PS1`), none of the `PS1` substituitions were working. Here's the line before:

    function prompt_command {
      export PS1="\n\u at \h in \w $(git_prompt_string)\n$ "
    }

And here's the code after:

    function prompt_command {
      printf "\n$(id -un) at $(hostname) in ${PWD} $(git_prompt_string)"
    }

The PROMPT_COMMAND is set to the function above, and the `PS1` prompt has the `$`:

    export PROMPT_COMMAND=prompt_command
    export PS1="\n$ "

Instead of using `\u` for the current user, I'm using `id -un`. For the hostname, `hostname` rather
than `\h`. And `PWD` displays the current working directory in place of `\w`.

The problem with `PWD` is that it displays the full path, and I wanted a `~` when in my `$HOME`
directory. Fortunately [Steve Losh](http://stevelosh.com "Steve Losh") has already solved this
puzzle in his [My Extravagent Zsh
Prompt](http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/ "My Extravagant Zsh Prompt")
posting.

Here's the solution:

    ${PWD/#$HOME/~}

It's deceptively simple, and took me a few minutes to understand, with the help of the [Shell
Parameter
Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html#Shell-Parameter-Expansion
"Shell Parameter Expansion") section of the Bash Manual.

The pattern `${parameter/pattern/string}` works in the following manner.

> The pattern is expanded to produce a pattern just as in filename expansion. Parameter is expanded
and the longest match of pattern against its value is replaced with string. If pattern begins with
‘/’, all matches of pattern are replaced with string. Normally only the first match is replaced. If
pattern begins with ‘#’, it must match at the beginning of the expanded value of parameter. If
pattern begins with ‘%’, it must match at the end of the expanded value of parameter. If string is
null, matches of pattern are deleted and the / following pattern may be omitted. If parameter is ‘@’
or ‘*’, the substitution operation is applied to each positional parameter in turn, and the
expansion is the resultant list. If parameter is an array variable subscripted with ‘@’ or ‘*’, the
substitution operation is applied to each member of the array in turn, and the expansion is the
resultant list.

What all that means is `$HOME` is expanded and if it matches the expanded `$PWD`, starting at the
beginning of the string, then the matching characters are replaced with a `~`. The key is the `#`
before `$HOME`.

Here's the final `printf` line:

    printf "\n$(id -un) at $(hostname) in ${PWD/#$HOME/~} $(git_prompt_string)"A

You can see the complete `.bashrc` file in my [dotfiles](http://github.com/zanshin/dotfiles
"dotfiles") repository.
