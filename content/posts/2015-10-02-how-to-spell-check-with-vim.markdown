---
layout: post
title: "How to Spell Check with Vim"
date: 2015-10-02T14:47:00
tags:
- nerdliness
link:
---
I have never been a good speller, therefore I rely on spell check to help ensure that my writing doesn't contain basic spelling errors. Most modern software that is centered around text provides spell checking. However I do most of my writing, including all of the posts on Zanshin.net, using Vim - a decidedly un-modern text editor.

Fortunately Vim is incredibly flexible and it is relatively straight-forward to enable spell checking. 

##Enable spell checking
You can turn spell checking on or off with

    set spell
    set nospell

##Default language
The default language used is US English. You can change this to another language with

    set spelllang=en_gb

The above example sets the language to British English.

In my `.vimrc` I have a number of file type specific settings, including spell checking. I only enable spell checking for a limited number of file types, as spell checking code isn't very useful. The three `autocmd` entries I have are:

    autocmd FileType mail setlocal spell spelllang=en_us
    autocmd BufRead COMMIT_EDITMSG setlocal spell spelllang=en_us
    autocmd BufNewFile,BufRead *.md,*.mkd,*.markdown set spell spelllang=en_us

The first is for when I'm using mutt for my mail - it turns spell checking on while I'm composing or replying to messages. The second activates spell check for Git commit messages. The last autocmd set spelling on for Markdown files.

##Your own dictionary
It is possible to add words to your own dictionary using the `zg` key combination. You can undo the add with `zug`. It is also possible to mark a word as incorrectly spelled using `zw`. `zuw` undoes the incorrect marking.

##Find misspelled words
You can jump forwards or backwards through the buffer to the next flagged work using

    ]s
    [s

Once you've located a word, `z=` will bring up the list of suggested words, pick the associated number and press return and the new word will be substituted in for the old one.

##Help
All of this and more can be found in the Vim help pages

    :help spell


