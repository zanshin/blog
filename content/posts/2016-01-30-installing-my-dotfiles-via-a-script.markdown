---
layout: post
title: "Installing My Dotfiles Via A Script"
date: 2016-01-30T15:47:00
tags:
- snippet
link:
---
For too long now I have been putting off creating a script to setup my collection of [dotfiles](http://github.com/zanshin/dotfiles "dotfiles")
 on a
new machine. My excuse has always been, "I don't need to set them up on a new machine that often."
Still it would be nice to run one command rather then enter multiple `ln -s ~/.dotfiles/... ...`
commands in a row.

Here's my [make.sh](http://github.com/zanshin/dotfiles/blob/master/make.sh "make.sh") script:

    #!/usr/bin/env bash

    #
    # This script creates symlinks for desired dotfiles in the users home diretory.
    #

    # Variables
    dotfiles_dir=~/.dotfiles
    dirs="bash gem git openconnect tmux"

    # Update dotfiles to master branch
    echo "Updating $dotfiles_dir to master"
    cd $dotfiles_dir;
    git pull origin master;
    cd;

    echo ""

    function makeLinks() {
      # For each directory in dirs, make a symlink for each file found that starts
      # with a . (dot)
      for dir in $dirs; do
        echo "Linking $dir files"
        cd $dotfiles_dir/$dir;
        for file in *; do
          ln -svf $dotfiles_dir/$dir/$file ~/.$file
        done
        echo ""
      done

      # Handle odd-ball cases
      # Vim files¬
      echo "Linking vim files"
      ln -svf $dotfiles_dir/vim ~/.vim;
      ln -svf $dotfiles_dir/vim/vimrc ~/.vimrc;
      ln -svf $dotfiles_dir/vim/vimrc.bundles ~/.vimrc.bundles;

      # ssh
      echo ""
      echo "Linking ssh configuration."
      ln -svf $dotfiles_dir/ssh/config ~/.ssh/config

      echo ""
      echo "Caveats:"
      echo "Vim:  If remote server, rm .vimrc.bundles"
      echo "Bash: If local server, rm .bashrc.local"

      echo ""

      echo "Finished."
    }

    if [ "$1" == "--force" -o "$1" == "-f" ]; then
      makeLinks;
    else
      read -p "This may overwrite existing files in your home directory. Are you sure? (y/n) " -n 1;
      echo ""
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        makeLinks;
      fi;
    fi;
    unset makeLinks;

Some Caveats:

* This script works for the way I have my dotfiles arranged in `~/.dotfiles`. Each tool has a directory containing the file or files that make up the configuration. None of the files are preceeded by a dot (.) in my repository, so the link command adds that.

* My Vim configurtion and my ssh config don't follow this pattern, so they are handled separately.

The `dirs` variable has a list of the configurations I want to setup using this script. All of the files in each of those directories is symlinked in turn. I'm using the `-svf` flags on the `ln` statement. 

* `s` for symlink, of course 
* `v` for verbose
* `f` for force if the link already exists

To make the script a scant more friendly it offers a `--force` option, that eliminates the "Are you sure?" prompt.

As with any script you find laying around on the Internet, read the source and understand what it's doing before unleashing it's awesome powers on your computer.
