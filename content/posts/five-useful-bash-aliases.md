---
title: "Five Useful Bash Aliases"
date: 2023-12-25T07:51:36-06:00

tags:
- Bash
- Aliases
---
Here are five bash aliases that I find useful.

## List contents of current directory, sorted by size

    alias 'dus=du -sckx * | sort -nr'

Here is a breakdown of the command.
- `du` -- command estimates file system usage
- `-s` -- creates a total for each argument
- `-c` -- creates a grand total
- `-k` -- sets the block size to kilobytes. Using `-m` would set it to megabytes
- `-x` -- skips directories on other file systems

The output of the `du -sckx *` command is then piped to `sort -nr`.
- `sort` -- sorts lines
- `-n` -- does a numerical sort
- `-r` -- reverses the result, so it is in descending order

## Show all currently assigned IPv4 IP addresses

    alias inet='ifconfig | grep inet | grep -v inet6'

Here is a breakdown of the command.
- `ifconfig` -- lists the current network interface configuration
- `| grep inet` -- returns only the lines with `inet`
- `| grep -v inet6` -- eliminate those lines with `inet6`, i.e., IPv6

Depending on your OS you may need to use `ip a` instead of `ifconfig`.

## List directory contents sorted by modification time

    alias latr='ls -latr'

Here is a breakdown of the command.
- `ls` -- lists directory contents
- `-l` -- use the long format
- `-a` -- do not ignore hidden files
- `-t` -- sort by modification time, newest first
- `-r` -- reverse the sort order

The mnemonic I use for this alias is "later".

## Look up a word's definition

    alias 'define=curl dict://dict.org/define:"$@"'

Here is a breakdown of the comment.
- `curl` -- transfers a URL, in this case `dict://dict/org/define`
- `"$@"` -- the search term provided

## Make a password

    alias makepass='openssl rand -base64 15'

Here is a breakdown of the command.
- `openssl` -- runs the `openssl` command line tool
- `rand` -- generates pseudo-random bytes
- `-base64` -- use base64
- `15` -- make the resulting password 15 characters long
