---
title: "My Neovim Configuration"
date: 2023-11-18T20:51:26-06:00
draft: true

tags:
- Neovim
- Configuration
- Nerdliness
---
Many people have a Neovim configuration, this one is mine.

## Background
I've been using vi, or Vim, or Neovim since 1997. I still have a steno notepad from 1997 with some
of my early notes on particular command sequences. My use was sporadic until around 2007 or 2008,
when I started using Vim as my primary editor for personal projects. And since 2012 or so it has
been my primary tool at work, as I've been working as a system administrator since then.

My editor configuration has evolved from a small single file, to a large `.vimrc`, and finally to a
multi-file, Lua-based Neovim configuration.

## Configuration Structure
My configuration lives in the `~/.config/nvim` directory and has this high-level directory
structure.

    ├── README.md
    ├── after
    │   └── plugin
    ├── init.lua
    ├── lazy-lock.json
    ├── lua
    │   └── zanshin
    ├── parked
    └── spell

The README file is just that. It gives a brief overview of my configuration for anyone who may
stumble across it on GitHub.

The `after/plugin` directory holds the individual configuration for the plugins I have installed.

`init.lua` is the configuration's entry point.

`lazy-lock.json` is part of the package management system, Lazy.

Plugins I'm not currently using have their configuration file `parked`.

The words I've added to the spelling dictionary are kept in the `spell` directory.

The `lua/zanshin` directory holds my mappings, option settings, etc. By namespacing my settings this
way, I avoid any inadvertent collisions with the installed plugins.

## Mappings, Options, Autocmds, Colors, and Diagnostics
The entry point to my configuration is the `init.lua` file in the `.config/nvim` directory. It
contains a single line.

    require("zanshin")

The `zanshin` directory acts as a namespace. Among the other Lua files it contains, there is another
`init.lua` file. `init.lua` is a special file, akin to a reserved word in a programming language.
When Lua encounters a `require` command that specifies only a directory, and there is an `init.lua`
file present, the contents of that inner file are processed.

The `lua/zanshin/init.lua` file has this content.

    require("zanshin.helpers")  -- functions to wrap commands
    require("zanshin.mappings") -- mappings
    require("zanshin.lazy")     -- manage plugins
    require("zanshin.options")  -- anything that gets set
    require("zanshin.colors")   -- color theme
    require("zanshin.autocmds") -- autocommands
    -- require("zanshin.diagnostics") -- LSP diagnostic settings

Each of these `require` commands brings in another Lua file holding some portion of my
configuration. These portions are my attempt to logically breakdown my configuration in to small
chunks. The `lua/zanshin` directory hold these files.

    ├── autocmds.lua
    ├── colors.lua
    ├── diagnostics.lua
    ├── helpers.lua
    ├── init.lua
    ├── lazy.lua
    ├── mappings.lua
    ├── options.lua

### helpers
Rather than use the full command for things like mapping keystrokes or setting options, I have a
small collection of aliases defined.

    -- Helpers
    cmd = vim.cmd -- to execute Vim commands. E.g., cmd('pwd')
    fn = vim.fn -- to call Vim functions. E.g., fn.bunnr()
    g = vim.g -- a table to access global variables
    opt = vim.opt -- to set options
    api = vim.api -- for api calls

    -- Create mappings with noremap option set to true
    function map(mode, lhs, rhs, opts)
      local options = { noremap = true, silent = true }
      if opts then options = vim.tbl_extend('force', options, opts) end
      vim.api.nvim_set_keymap(mode, lhs, rhs, options)
    end

