---
layout: post
title: "A Script to Install My Dotfiles"
date: 2017-05-31T22:29:00
tags:
- nerdliness
link:
---
A year or so ago I created a script that allowed me to quickly install
my dotfiles on a new computer. The script wasn't terribly sophisticated, but it got the job done.
Called [make.sh](http://github.com/zanshin/dotfiles/blob/master/make.sh) it takes an all-or-nothing
approach to setting up my configurations.

Recently I ran across a Bash script that serves as a [general purpose Yes/No prompt
function](https://davejamesmiller.com/2011/04/23/bash-general-purpose-yes-no-prompt-function-ask).
Using this script as a jumping off point I was able to create a more sophisticated
[install.sh](https://github.com/zanshin/dotfiles/blob/master/install.sh) script that allows me a
more granular approach to setting up my dotfiles.

## Ask
The ask function lets you create Yes/No prompts quckly and easily. Follow the link above for more
details. I was able to default some of my configurations to `Yes` or install, and others to `No` or
don't install.

## Key/Value Pairs
In order to keep my script [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) I needed to
have a list of the configuration files paired with their default install/don't install setting.
Turns out you can do key/value pairs in Bash. It works like this:

    for i in a,b c_s,d ; do 
      KEY=${i%,*};
      VAL=${i#*,};
      echo $KEY" XX "$VAL;
    done

The key/value pairs are comma separated and space delimited, e.g., `key,value key,value key,value`.
By using Bash [parameter substitution](http://tldp.org/LDP/abs/html/parameter-substitution.html)
it's possible to separate the key and value portions of each pair.

My list of pairs looks like this:

    tuples="bash,Y gem,Y git,Y openconnect,Y tmux,Y slate,Y hg,N textmate,N"

The loop the processes these pairs looks like this:

    for pair in $tuples; do
      dir=${pair%,*};
      flag=${pair#*,};
      if ask "Setup $dir" $flag; then
        echo "Linking $dir files"
        cd $dotfiles_dir/$dir;
        for file in *; do
          ln -sf $dotfiles_dir/$dir/$file ${HOME}/.$file
        done
      fi
      echo ""
    done

Each key/value pair is a directory (`dir`) and a install/don't install flag (`flag`). My dotfiles repository is organized into directories, one for each tool or utility. The fourth line is where the `ask` function comes into play. Using the `flag` from the key/value pair it creates a prompt that is defaulted to either `Y/n` or `y/N` so that all I need to do is hit the enter key.
Within each directory there are one or more files needing to be symlinked. The inner loop walks through the list of files creating the necessary symlink. 

## Linking Directories
Some of my configurations have directories or are trageted at locations where simple symlinking won't work.

Neovim, for example, all lives in `~/.config/nvim`. Symlinking directories can produce unexpected results. Using the `n` flag on the symlink statement treats destination that is a symlink to a directory as if it were a normal file. If the `~/.config/nvim` directory already exists, `ln -sfn ...` prevents you from getting `~/.config/nvim/nvim`.

My Vim setup contains both directories and individual files.

My ssh config needs to be linked into the `~/.ssh` directory.

The linking for each of these three exceptions is handled outside the main loop in the script. 
 
## The install.sh script
Here's the entire [install.sh](https://github.com/zanshin/dotfiles/blob/master/install.sh) script. 
