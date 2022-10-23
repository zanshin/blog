---
layout: post
title: "How to Manage Bash Paths on MacOS"
date: 2019-09-19T16:02:00
tags:
- nerdliness
link:
---
### Viewing your bash path
The easiest way to view your bash path is to run

    env

Then visually parse the output looking for the `PATH` entry and then read that line.

A slightly better way to view your bash path is to run

    env | grep -i path

This will eliminate all the environment variables that aren't paths.

    $ env | grep -i path
    SQLITE_EXEMPT_PATH_FROM_VNODE_GUARDS=/Users/mark/Library/WebKit/Databases
    PATH=/Users/mark/.rbenv/shims:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/usr/local/MacGPG2/bin:/opt/X11/bin:/Users/mark/bin:/usr/local/sbin:/usr/local/go/bin:/Users/mark/.cargo/bin
    GOPATH=/Users/mark/code/go

Personally I find parsing a list delimited by `:` to be difficult. So I use a simple function to
break the path apart, displaying each entry on its own line, and color coding it along the way.
Here's the function:

    path() {
    local blue="\033[1;34m"
    local green="\033[0;32m"
    local cyan="\033[0;36m"
    local purple="\033[0;35m"
    local brown="\033[0;33m"
    local reset_color="\033[0m"
      echo $PATH | tr ":" "\n" | \
        awk "{ sub(\"/usr\",   \"$green/usr$reset_color\"); \
               sub(\"/bin\",   \"$blue/bin$reset_color\"); \
               sub(\"/opt\",   \"$cyan/opt$reset_color\"); \
               sub(\"/sbin\",  \"$purple/sbin$reset_color\"); \
               sub(\"/local\", \"$brown/local$reset_color\"); \
               print }"
    }

After setting some local variables to hold bash color codes, the function echoes the `$PATH`
environment variable, using the `tr`, or translate command, to convert each `:` into a new line
character, `\n`. The output of `tr` is passed to `awk` which colorizes the output but substituting
some key words into the same keywords surrounded by color codes.

Here's a sample output:

![Image showing output of path function](https://zanshin.net/images/bash-path.png "Image showing
output of path function")

One advantage to this output is it is far easier to find duplicates or path elements that are out of
order.

### A path_helper primer
macOS includes a utility called
[path_helper](http://www.softec.lu/site/DevelopersCorner/MasteringThePathHelper "Master the
path_helper utility of MacOSX"). The utility hopes to simplify management of your path. Knowing
about it, and working with it, is the key to simplifying your path.

path_helper relies upon two sets of information. First is a list of standard paths found in
`/etc/paths`. On my macOS computer `/etc/paths` contains:

    $ cat /etc/paths
    /usr/local/bin
    /usr/bin
    /bin
    /usr/sbin
    /sbin

The second set of information used is the `/etc/paths.d` directory. Applications that make use of
path_helper know to put a file at this location that contains their path element. Again from my
computer, the contents of `/etc/paths.d`

    $ ls -al /etc/paths.d
    total 24
    drwxr-xr-x    5 root  wheel   160B Sep 30  2018 ./
    drwxr-xr-x  126 root  wheel   3.9K Sep 19 14:10 ../
    -rw-r--r--    1 root  wheel    13B Oct 26  2016 40-XQuartz
    -rw-r--r--    1 root  wheel    23B Feb  2  2015 MacGPG2
    -rw-r--r--    1 root  wheel    17B Oct 25  2017 go

Looking at the `go` entry, for example, we see:

    /usr/local/go/bin

Returning to the image showing the output of my path function, you can see the Go entry in the list.
As well as entries for X-Quartz and MacGPG2. Also you can see the five standard path elements in
positions 2 - 6. Obviously the `/Users/mark/.rbenv/shims` entry was pre-pended to `$PATH`. And it is
also obvious that some things are getting added to the list twice.

Understanding that path_helper will seed `$PATH` with the standard elements, and any elements found
in `/etc/paths.d`, it is now possible to clean up what is added to `$PATH`, and in what order they
are added, in the bash configuration.

### My bash configuration
My bash configuration is broken up into several files as the outgrowth of near constant tinkering
and tweaking.

    la -la ~/.dotfiles/bash/
    total 136
    drwxr-xr-x@ 12 mark  staff   384B Sep 19 14:12 ./
    drwxr-xr-x@ 40 mark  staff   1.3K Aug 15 22:33 ../
    -rw-rw-r--   1 mark  staff   7.3K Aug 25 22:11 bash_aliases
    -rw-rw-r--@  1 mark  staff   389B May  5  2016 bash_bindkeys
    -rw-rw-r--@  1 mark  staff   1.9K Jan 20  2016 bash_colors
    -rw-rw-r--@  1 mark  staff   1.8K Mar 22  2016 bash_docker_functions
    -rw-rw-r--   1 mark  staff    16K Aug 15 22:33 bash_functions
    -rw-rw-r--   1 mark  staff   2.1K Sep 19 14:12 bash_profile
    -rw-rw-r--   1 mark  staff   5.1K Sep 19 14:12 bashrc

(It is worth noting that the files are in my `$HOME` via symlinks.) The `bash_profile` file contains all the additions to my path.

I start off by clearing my `$PATH` and executing path_helper to seed to with the contents of
`/etc/paths` and `/etc/paths.d`.

    if [ -x /usr/libexec/path_helper ]; then
    	PATH=""
    	eval `/usr/libexec/path_helper -s`
    fi

The `-x` conditional looks for an executable file; this allows the same `bash_profile` to be used on
Linux machines without throwing errors.

For each element I want to add to `$PATH` I follow a similar pattern: test for the presence of the
directory to be added, and if it is there, append it (or pre-pend it) to the variable. For example:

    # set PATH so it includes user's private bin if it exists
    if [ -d $HOME/bin ] ; then
      PATH="${PATH}:${HOME}/bin"
    fi

Will add my personal `bin` directory to the list, at the end of the current list.

You can see my current `bash_profile`, and the rest of my bash configuration, in my GitHub
[dotfile](https://github.com/zanshin/dotfiles "dotfiles") repository. Here's a sample from
my `bash_profile`:

    # set PATH so it includes user's private bin if it exists
    if [ -d $HOME/bin ] ; then
      PATH="${PATH}:${HOME}/bin"
    fi

    # add Go path for Linux
    if [ -d /usr/local/go/bin ] ; then
      PATH="${PATH}:/usr/local/go/bin"
      export GOPATH=$HOME/code/go
    fi

    # Enable path for Rust
    if [ -d $HOME/.cargo/bin ] ; then
      PATH="${PATH}:$HOME/.cargo/bin"
    fi

    export PATH

### Duplicate entries
Close reading of the path function output in the image above, and of the contents of `/etc/paths.d`,
and of the sample `bash_profile` above, will show that the path for Go is in my `$PATH` twice. Once
from the entry in `/etc/paths.d` and once from the lines in my `bash_profile`.

I have, and use, multiple computers running macOS. At work I have a pair of desktops and a laptop,
and at home I have my personal laptop. Apparently I used a different method to install Go at work
than I did at home. The method I used on my personal laptop created the `/etc/paths.d` entry, while
the method I used at work did not. I can either remove the lines from `bash_profile` or add an entry
to `/etc/paths.d`. Since I maintain my bash configuration I've decided to remove the entry
`/etc/paths.d` (on any machine I find it) and rely upon the code in my `bash_profile`.

### Conclusion
Here are my tips for keeping your path up to date and easy to work with.

* Start with `path_helper` and add what you need in your `$PATH` to that initial set of elements.
* Try to localize all the additions to your path in one place in your bash configuration.
* Periodically display your path using the `path` function, and address anything the strikes you as out of place or
no longer needed.
* Pay attention to applications like [Homebrew](https://brew.sh "Homebrew") or [rbenv](https://github.com/rbenv/rbenv "rbenv") that want to manipulate your path.
