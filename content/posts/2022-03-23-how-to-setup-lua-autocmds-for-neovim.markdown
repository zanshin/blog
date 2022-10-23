---
layout: post
title: "How to Setup Lua Autocmds for Neovim"
date: 2022-03-23T07:09:00
tags:
- nerdliness
link:
---
The latest nightly builds of Neovim now have Lua-based `autocmd` support. Previously `autocmd` and `augroup`
commands needed to be wrapped inside a `vim.cmd` block so that the Vimscript-based statements
would work.

The nightly builds now include `nvim_create_augroup` and `nvim_create_autocmd` commands that allow
you to create auto command groups and auto commands without resorting to nesting Vimscript in your
Lua-based configuration.

## Helpers
I created two helper functions: one for creating auto groups, and one for creating auto commands.

{{< highlight lua >}}
    local agrp = vim.api.nvim_create_augroup
    local acmd = vim.api.nvim_create_autocmd
{{< / highlight >}}

## Auto groups
For each set of related auto commands I wanted, I created a group. So that the group names will sort
to the top of the output when running `:au <event>`, I preceded each name with an underscore. For
example, this group is where I keep any command that is aimed at all file types.

{{< highlight lua >}}
    local _general = agrp("_general", { clear = true })
{{< / highlight >}}

The `clear = true` isn't strictly required, as it is the default. But I like it as a reminder that
the group will clear previously set commands.

## Autocmds
The format of the the `nvim_create_autocmd` statement took me a little bit of experimenting to
figure out. Here is an example of what I ended up with.

{{< highlight lua >}}
    acmd({ "FocusLost" },
         { pattern = "*",
           command = ":wa",
           group = _general })
{{< / highlight >}}

The first dictionary defines the event (or events) this autocommand is triggered by. The second
dictionary defines the pattern to match, the command to run, and identifies the group the command
belongs to. In the example above, the event is `FocusLost`, the pattern is `*`, the command is
`:wa`, and the group is `_general`.

I have a number of groups and commands for various file types. Even for relatively short, simple
commands I followed the same multi-line format. This way all the `autocmd` groups in the file look
the same. The file itself can be viewed
[here](https://github.com/zanshin/dotfiles/blob/master/nvim/lua/usr/autocmds.lua "autocmds.lua").
