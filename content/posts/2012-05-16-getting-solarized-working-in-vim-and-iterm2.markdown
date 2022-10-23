---
layout: post
title: "Getting Solarized Working in Vim and iTerm2"
date: 2012-05-16T14:27:00
comments: true
tags:
- nerdliness
link: false
---
For some time now I've been using the [Solarized](http://ethanschoonover.com/solarized "Solarized") color scheme for my editors and console windows. The one place I wasn't having any success with Solarized was running [Vim](http://www.vim.org/ "Vim") in [iTerm2](http://www.iterm2.com/#/section/home "iTerm2"). After much searching and some trial and error experimenting I finally found the root problem.

##Root Problem
You must have `syntax on` in your **.vimrc** in order for colors to work.

##.vimrc
Here's the relevant portion of my **.vimrc** file:

```
syntax on
set background=dark
let g:solarized_termtrans = 1
colorscheme solarized 
```
Without `syntax on` the colors from the Solarized theme do not appear for me in either Terminal or iTerm2. The `let g:solarized_termtrans = 1` setting controls transparency. Without this setting the scheme looks horrid in Terminal. The `g:solarized_termtrans` setting seems to have little or no effect in iTerm2.

In both Terminal and iTerm2 I have the terminal type set to `xterm-256color`.

