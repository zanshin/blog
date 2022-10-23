---
layout: post
title: "How to List Brew Dependencies"
date: 2014-02-03T23:36:00
tags:
- nerdliness
link:
---
Recently, after updating my installed brews, I wanted to see a list of dependencies for each
installed brew. [Homebrew](http://brew.sh "Homebrew") provides a couple of useful commands to show dependencies.

## brew deps
You can see the dependencies for a given brew by running the `brew deps` command.

    $ brew deps osxfuse
    autoconf
    automake
    gettext
    libtool

## brew uses --installed
You can also ask brew to tell you which brews use a particular formula with `brew uses --installed`.

    $ brew uses --installed autoconf
    automake fuse4x htop-osx osxfuse sshfs

The `--installed` parameter is important, without it the results will be *all* brew formulas,
installed or otherwise.


## Brew Dependencies
Both of these are useful commands but I wanted a way to list all installed brews along with their
dependencies. This is the "one-liner" I came up with after some experimentation.

    $ brew list | while read cask; do echo -n $fg[blue] $cask $fg[white]; brew deps $cask | awk '{printf(" %s ", $0)}'; echo ""; done

The color specifications here are for `zsh`. If you want to use this command on `bash` it would look
like this.

    $ brew list | while read cask; do echo -n "\e[1;34m$cask ->\e[0m"; brew deps $cask | awk '{printf(" %s ", $0)}'; echo ""; done

Here is a sample of the output.

    $ brew list | while read cask; do echo -n $fg[blue] $cask $fg[white]; brew deps $cask | awk '{printf(" %s ", $0)}'; echo ""; done
     apple-gcc42
     autoconf
     automake  autoconf
     cscope
     faac
     ffmpeg  faac  lame  pkg-config  texi2html  x264  xvid  yasm
     fontconfig  freetype  libpng  pkg-config
     freetype  libpng
     fuse4x  autoconf  automake  fuse4x-kext  gettext  libtool
     fuse4x-kext
     gettext
     git
     giter8
     glib  gettext  libffi  pkg-config  xz
     gnu-go
     htop-osx  autoconf  automake  libtool
     imagesnap
     jenkins
     lame
     libdvdcss
     libevent
     libffi
     libgpg-error
     libiconv
     libksba  libgpg-error
     libpng
     libtool
     libxml2
     libxslt  libxml2
     libyaml
     macvim  cscope
     mercurial
     mtr  pkg-config
     ngrep
     openssl
     ossp-uuid
     osxfuse  autoconf  automake  gettext  libtool
     pkg-config
     popt
     readline
     reattach-to-user-namespace
     sbt
     scala
     sqlite  readline
     sshfs  autoconf  automake  gettext  glib  libffi  libtool  osxfuse  pkg-config  xz
     szip
     texi2html
     tig
     tmux  libevent  pkg-config
     vim
     wget  openssl
     x264  yasm
     xvid
     xz
     yasm
     youtube-dl

And here is a screen shot showing the colors.

![brew dependencies](https://zanshin.net/images/brewdeps.png)

