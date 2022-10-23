---
layout: post
title: "Converting my Neovim Configuration to Lua"
date: 2022-03-06T18:32:00
tags:
- nerdliness
link:
---
Professionally I started using [Vi](https://en.wikipedia.org/wiki/Vi "Vi") in 1997 on AIX. Personally
I started using [Vim](https://www.vim.org "Vim") around 2008 when I
began using [Octopress](http://octopress.org "Octopress") as my static site generator. In November 2011 I started keeping the
configuration in a Git repository. In December 2014 I started using [Neovim](https://neovim.io "Neovim") in addition to Vim. Eventually
my use of Vim tapered off, and for the past several years I haven't bothered to keep my
Vim configuration up-to-date. It has now been deprecated in my dotfiles repository in favor of Neovim.

The size and complexity of my configuration has ebbed and flowed over time; generally trending
toward more complexity and greater size. When I set out to migrate to a Lua based configuration
file, my `init.vim` file was just over 1000 lines long, excluding comments and white space.

## Why Convert to Lua?
To paraphrase Gregory Mallory, "Because I can."

All kidding aside I converted for two reasons. First I don't know anything about
[Lua](https://www.lua.org "Lua") , and this was a
chance to learn a little about this language. Second, it would force me to examine my entire
configuration, allowing for some house cleaning.

The support for Lua is still evolving, so having your configuration written in Lua is pretty close
to bleeding edge. For me, tinkering with my Neovim setup is part of the enjoyment of using Neovim,
so I'm willing to endure some pain caused by being closer to the leading edge of development.

## Objectives
### Modular
Rather than have a single, monolithic file, containing my entire configuration, I wanted to
modularize my setup. Fortunately many of the examples I found on GitHub and the
[r/vimporn](https://www.reddit.com/r/vimporn/ "r/vimporn") and [r/neovim](https://www.reddit.com/r/neovim/ "r/neovim")
Reddits are broken out into directories and files.

### Concise
Only install the plugins I have a use for. My previous Neovim configuration had gotten
crufty, bloated even, with plugins I no longer used, and with odd mappings I no longer remembered
the purpose for.

### Portable
I have several computers of my own, and a couple provided by my employer, I need this configuration
to be portable and relatively easy to install in a variety of environments. My preferred OS is
MacOS, but I work on Ubuntu and AmazonLinux servers professionally, and I have a Linux laptop for
personal experimentation.

## Process
Not wanting to corrupt my current Neovim configuration, I chose to start experimenting with a Lua
configuration on a Raspberry Pi. I simply didn't setup my configuration when I installed Neovim on
the Pi. Since this meant I was using the configuration I was making to edit the configuration I was making
(eating my own dog food), I was painfully aware any time I managed to break something.

When, in the course of exploring other people's configurations, I discovered some new plugin that I
wanted right away, I'd add it to the `init.vim` Neovim
configuration on my other machines, by embedding the Lua code in the Vimscript base.

Eventually I felt I understood enough about how to structure a Lua configuration, that I started in
earnest with a new branch of my dotfiles repository. That branch continued to improved and I started
using it for everyday use about a month ago.

This past weekend I watched nearly all of the videos in the "[Neovim from Scratch](https://www.youtube.com/playlist?list=PLhoH5vyxr6Qq41NFL4GvhFp-WLd5xzIzZ "Neovim from Scratch")" series on YouTube,
which resulted in a major refactoring of my setup. The result is cleaner and better organized. It is
also more robust.

## Organization
My Neovim configuration is organized into several directories and about 40 files. While this may
seem like a lot, the structure is straight forward and easy to understand.

{{< highlight bash >}}
nvim
├── lua
│   ├── config
│   │   ├── lsp
│   │   │   ├── settings
│   │   │   │   ├── jsonls.lua
│   │   │   │   └── sumneko_lua.lua
│   │   │   ├── handlers.lua
│   │   │   ├── init.lua
│   │   │   └── lsp-installer.lua
│   │   ├── cmp.lua
│   │   ├── gitsigns.lua
│   │   ├── gundo.lua
│   │   ├── lualine.lua
│   │   ├── nvim-comment.lua
│   │   ├── nvim-tree.lua
│   │   ├── tabline.lua
│   │   ├── telescope.lua
│   │   ├── toggleterm.lua
│   │   ├── treesitter.lua
│   │   └── which-key.lua
│   └── usr
│       ├── autocmds.lua
│       ├── colors.lua
│       ├── helpers.lua
│       ├── mappings.lua
│       ├── options.lua
│       └── plugins.lua
├── plugin
│   └── packer_compiled.lua
├── spell
│   ├── en.utf-8.add
│   └── en.utf-8.add.spl
├── .gitignore
├── README.md
└── init.lua
{{< / highlight >}}

### nvim Directory
The `nvim` directory is located in `~/.config`. It contains the `init.lua` file, a README, the Git
repository and ignore file, and a `lua` directory. The `init.lua` file has a list of `requires`, one
for each of these categories.

* autocmds
* colors
* helpers
* mappings
* options
* plugins

`autocmds`, `colors`, `mappings`, and `options` all contain what you would expect: auto commands, my
color scheme, all my key mappings, and all my options.

`helpers` has several functions that are useful for creating mappings or setting options.

`plugins` sets up my plugin manager of choice, and all the plugins I use.

The actual files referenced by these `requires` are kept in `~/.config/nvim/lua/usr`. Putting them in a folder
under the `lua` directory creates a namespace, which is useful in avoiding collisions with files that
might be included in plugins added later. The namespace directory can be called anything, I chose
`usr` since the contents are for me, and since `user` might show up in a plugin. Many people use
their GitHub account name for this namespace directory.

### lua Directory
The `lua` directory has two sub-directories: `config` and `usr`.

`config` is where the configuration files for plugins are kept. For any plugin where there is a
configuration file, that file is kept here. Since setting up and maintaining language servers is
slightly different than most plugins, there is a separate directory under `config` for LSP specific
configurations.

As described above, `usr` contains the files that describe my mappings, options, auto commands,
color scheme, and plugins.

## Specific Examples
The entire configuration can be viewed and cloned from my
[dotfiles](https://github.com/zanshin/dotfiles/tree/refactor/nvim "nvim dotfiles") repository.
However there are some specific examples I think are important enough to draw attention to.

### Use of protected calls
Including a plugin via the Lua `require` statement will result in an error if the plugin can't be
found or isn't available. When this happens the Neovim configuration won't load properly. Using the Lua
`pcall` function to wrap the require allows the status of the call to be captured and tested, thus
protecting the rest of the configuration process.

Each of my plugin configuration files has this code block at the start of the file.

{{< highlight lua >}}
local status_ok, plugin_handle = pcall(require, "plugin_name")
if not status_ok then
  return
end
{{< / highlight >}}

The actual name of the plugin is substituted in for `plugin_name`. `plugin-handle` is a
local variable that is used by the rest of the file as it points to the instance of the plugin
returned by the require statement. A print statement or `vim.notify` statement could be added just
ahead of the `return`, if you wanted to provide some visible feedback in the event of a failed
require.

### Packer
#### Automatic Install
I'm using [Packer](https://github.com/wbthomason/packer.nvim "Packer") to manage my plugins. The
following code block will automatically install Packer if it isn't already installed.

{{< highlight lua >}}
local fn = vim.fn
local install_path = fn.stdpath('data')..'/site/pack/packer/start/packer.nvim'
if fn.empty(fn.glob(install_path)) > 0 then
  PACKER_BOOTSTRAP = fn.system {
    'git',
    'clone',
    '--depth',
    '1',
    'https://github.com/wbthomason/packer.nvim',
    install_path,
  }
  print "Installing Packer, close and reopen Neovim."
  vim.cmd [[packadd packer.nvim]]
end
{{< / highlight >}}

In essence this clones the GitHub repository for Packer into the proper location in the file
system.

#### Refresh on Save
This block of code will trigger a `:PackerSync` command any time the `plugins.lua` buffer is
written. Very useful for updating the current list of plugins.

{{< highlight lua >}}
vim.cmd [[
  augroup packer_user_config
    autocmd!
    autocmd BufWritePost plugins.lua source <afile> | PackerSync
  augroup end
]]
{{< / highlight >}}

#### `use` and `get_config`
All of the plugins are managed inside this code block.

{{< highlight lua >}}
return packer.startup(function(use)

-- plugins go here

if PACKER_BOOTSTRAP then
    require('packer').sync()
  end
end)
{{< / highlight >}}

Each plugin is identified by a `use` statement.

{{< highlight lua >}}
use { "plugin_name" }
{{< / highlight >}}

It is possible to specify dependencies on other plugins as a part of the `use` statement.

{{< highlight lua >}}
use {
  "plugin_name",
  requires { "dependency" },
}
{{< / highlight >}}

It is also possible to specify the configuration file for the plugin here.

{{< highlight lua >}}
use {
  "plugin_name",
  config = get_config("plugin"),
}
{{< / highlight >}}

`get_config` is a small helper function I included in the `plugins.lua` file.

{{< highlight lua >}}
local function get_config(name)
  return string.format("require(\"config/%s\")", name)
end
{{< / highlight >}}

## Plugins
Currently I am using the following plugins.

* [packer](https://github.com/wbthomason/packer.nvim "packer") - Plugin management
* [nvim-cmp](https://github.com/hrsh7th/nvim-cmp "nvim-cmp") - Code completion
* [gitsigns](https://github.com/lewis6991/gitsigns.nvim "gitsigns") - Visual Git activity markers
* [gundo](https://github.com/sjl/gundo.vim "gundo") - Wrapper around basic undo
* [lualine](https://github.com/nvim-lualine/lualine.nvim "lualine") - Status bar
* [nvim-comment](https://github.com/terrortylor/nvim-comment "nvim-comment") - Toggle comments on or off
* [nvim-tree](https://github.com/kyazdani42/nvim-tree.lua "nvim-tree") - File explorer
* [tabline](https://github.com/kdheepak/tabline.nvim "tabline") - Tab and buffer status line that integrates with lualine
* [telescope](https://github.com/nvim-telescope/telescope.nvim "telescope") - Fuzzy finder
* [toggleterm](https://github.com/akinsho/toggleterm.nvim "toggleterm") - Wrapper around terminal display within neovim
* [treesitter](https://github.com/nvim-treesitter/nvim-treesitter "treesitter") - Abstract symbol tree tool used for code syntax operations
* [which-key](https://github.com/folke/which-key.nvim "which-key") -key - Popup command Completion

There are others (dependencies and ancillary plugins) I haven't listed. See the my GitHub repository
for the complete set.

## Conclusion
I've been using my "new and improved" Neovim configuration for several days now. Other than a couple
of minor tweaks to plugin settings and mappings, it has worked flawlessly. I've been able to install
it on all my computers, with very little effort. The only part that isn't complete is the tracking
of words I've added to the spelling dictionary.

Neovim continues to be my favorite tool, and tinkering with its configuration is a very satisfying
activity.

## Appendix

These are some of the sources I used while converting from a vimscript based configuration to a Lua
based configuration.

* [https://oroques.dev/notes/neovim-init/](https://oroques.dev/notes/neovim-init/)
* [https://github.com/rockerBOO/awesome-neovim#snippet](https://github.com/rockerBOO/awesome-neovim#snippet)
* [https://microsoft.github.io/language-server-protocol/implementors/servers/](https://microsoft.github.io/language-server-protocol/implementors/servers/)
* [https://blog.inkdrop.app/how-to-set-up-neovim-0-5-modern-plugins-lsp-treesitter-etc-542c3d9c9887](https://blog.inkdrop.app/how-to-set-up-neovim-0-5-modern-plugins-lsp-treesitter-etc-542c3d9c9887)
* [https://github.com/ryanoasis/nerd-fonts#option-4-homebrew-fonts](https://github.com/ryanoasis/nerd-fonts#option-4-homebrew-fonts)
* [https://teukka.tech/luanvim.html](https://teukka.tech/luanvim.html)
* [https://crispgm.com/page/neovim-is-overpowering.html](https://crispgm.com/page/neovim-is-overpowering.html)
* [https://www.reddit.com/r/neovim/comments/kfxqcr/how_to_migrate_from_initvim_to_initlua/](https://www.reddit.com/r/neovim/comments/kfxqcr/how_to_migrate_from_initvim_to_initlua/)
* [https://github.com/nanotee/nvim-lua-guide/](https://github.com/nanotee/nvim-lua-guide/)
* [https://vonheikemen.github.io/devlog/tools/configuring-neovim-using-lua/](https://vonheikemen.github.io/devlog/tools/configuring-neovim-using-lua/)
* [https://icyphox.sh/blog/nvim-lua/](https://icyphox.sh/blog/nvim-lua/)
* [https://www.youtube.com/playlist?list=PLhoH5vyxr6Qq41NFL4GvhFp-WLd5xzIzZ](https://www.youtube.com/playlist?list=PLhoH5vyxr6Qq41NFL4GvhFp-WLd5xzIzZ)


