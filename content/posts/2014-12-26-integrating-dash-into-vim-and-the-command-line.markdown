---
layout: post
title: "Integrating Dash Into Vim and the Command Line"
date: 2014-12-26T23:07:00
tags:
- nerdliness
link:
---
[Dash](http://kapeli.com/dash "Dash") is an outstanding documentation and API reader for Max OS X. Dash gives you instant, offline, access to over 150 documentation sets -- including cheatsheets, vendor documentation, and user submitted docsets. It's well worth evey penny of it's $19.95 cost. And if that wasn't enough you can easily integrate Dash into any number of editors and/or application launchers. 

Here's how I've integrated into my Vim setup and into my command line.

##Vim
The [dash.vim](https://github.com/rizzatti/dash.vim "dash.vim") plugin adds a family of `:Dash` commands and mappings to your Vim configuration. The mapping that I use is this:

    :nmap <silent> <leader>d <Plug>DashSearch

This mapping allows me to seach Dash for the term currently under my cursor. This one mapping has vastly improved my Dash usage, so much so that I haven't bothered to discover what else this plugin adds to Vim.

##Command Line
[Brett Terpstra](http://brettterpstra.com "Brett Terpstra") regularly creates and writes about wonderful functions, shell scripts, and tool integrations. In [Bash and Dash](http://brettterpstra.com/2014/05/10/bash-and-dash/ "Bash and Dash") he talks about two shell functions that let you search Dash's docsets from the command line. The first

    # Open argument in Dash
    function dash() {
      open "dash://$*"
    }

searches Dash for the query provided. Each Dash docset is associated with a shortcut, so you can search for things like `ruby:FileUtils` or `chef:service`. 

The second,

    function dman() {
      open "dash://manpages:$*"
    }

searches the `manpages` docset, allowing you to view man pages in Dash rather than in your terminal.

Since I spend most of my working day at the command line or in Vim, these simple configurations make it vastly easier to search documentation.
