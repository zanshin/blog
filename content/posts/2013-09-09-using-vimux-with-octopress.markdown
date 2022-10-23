---
layout: post
title: "Using Vimux With Octopress"
date: 2013-09-09T12:37:00
comments: true
tags:
- nerdliness
link: false
---
Using [Vim](http://www.vim.org "Vim") as your editor with Octopress works well
enough except that you have to either exit out of the editor or open a second
session in order to generate the site to see your new posting. Using
[Vimux](https://github.com/benmills/vimux "Vimux") you can run commands in
a separate pane without losing focus in your Vim pane. This turns out to be
perfect for creating or editing posts for an Octopress site.

First you need to add the Vimux bundle to your Vim configuration. Since I'm
using [Vundle](https://github.com/gmarik/vundle "Vundle") I just added this
line to my `.vimrc` file.

{{< highlight vim >}}
Bundle 'benmills/vimux'
{{< / highlight >}}

And then installed the new bundle.

{{< highlight vim >}}
Bundle 'benmills/vimux'
:BundleInstall
{{< / highlight >}}


The Vimux help (`:h vimux`) does a great job of explaining the various commands
and options provided by the bundle. Here are the settings I added to my
`.vimrc`.

{{< highlight vim >}}
Bundle 'benmills/vimux'
let g:VimuxHeight = "30"
let g:VimuxOrientation = 'v'
let g:VimuxUseNearestPane = 0
{{< / highlight >}}


The height setting controls what percentage of your current pane will be
given over to the Vimux pane. The orientation settings controls whether the new
pane is vertically below the current one (`v`) or horizontally to the right of
it (`h`). The `VimuxUseNearestPane` when set to true (`1`) will use the nearest
open tmux pane rather than space within the pane containing your Vim session.

With these settings in place I added some general Vimux mappings.

{{< highlight vim >}}
Bundle 'benmills/vimux'
nmap <leader>vp :VimuxPromptCommand<cr>
{{< / highlight >}}


This brings up a `Command? ` prompt where you can enter any command your shell
recognizes. 

{{< highlight vim >}}
Bundle 'benmills/vimux'
nmap <leader>vl :VimuxRunLastCommand<cr>
{{< / highlight >}}


As the name suggests, `VimuxRunLastCommand` reissues the last command.

{{< highlight vim >}}
Bundle 'benmills/vimux'
nmap <leader>vq :VimuxCloseRunner<cr>
{{< / highlight >}}


`VimuxCloseRunner` closes the Vimux pane.

{{< highlight vim >}}
Bundle 'benmills/vimux'
nmap <leader>vx :VimuxInterruptRunner<cr>
{{< / highlight >}}


The interrupt runner command halts the command in the runner.

Rather than have to bring up the Vimux command prompt with `,vp` and then type
in my Octopress generate alias, I created some more mappings with Octopress
specific commands.

{{< highlight vim >}}
Bundle 'benmills/vimux'
nmap <leader>vg :call VimuxRunCommand("gen")<CR>
nmap <leader>vi :call VimuxRunCommand("ingen")<CR>
nmap <leader>vz :call VimuxRunCommand("dz")<CR>
namp <leader>vd :call VimuxRunCommand("deploy")<CR>
{{< / highlight >}}


The first of these, `vg` runs my alias for `rake generate`, building what ever
is currently in the `source/_posts` directory. I make heavy use of `rake
isolate` as my site contains over 2,000 entries and takes more than 8 minutes
to generate. 

Which explains the next mapping, `vi`. `ingen` is my alias that runs a `rake
integrate` followed by a `rake generate`. Typically I only run this command
when a new posting has been proofread and is ready to be published.

I have two [Octopress](http://octopress.org "Octopress") sites, one of which is
still on an much older version of Octopress. The `rake deploy` task for this
older version doesn't handle `.htaccess` files, so my `dz` alias chains
together the commands necessary to rsync my site and copy the `.htaccess` files
into place.

Finally the `vd` mapping issues my alias for a regular `rake deploy` which
works for my new Octopress site.

Having Vimux in place allows me to work on a new page or posting, generating
the site as I go, without losing focus in my Vim session. It has made creating
new content for my sites simpler and more satisfying.
