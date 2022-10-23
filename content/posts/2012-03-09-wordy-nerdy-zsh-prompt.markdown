---
layout: post
title: "Wordy Nerdy Zsh Prompt"
date: 2012-03-09T15:31:00
comments: true
tags:
- nerdliness
link: false
---
I've been using [zsh](http://www.zsh.org/ "zsh") has my primary shell since attending [Überconf](http://uberconf.com/conference/denver/2012/06/home "Überconf") last July in Denver Colorado. For all intents and purposes it's a superset of the venerable bash shell. I've also been using [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh "oh-my-zsh"), which is a community driven framework for managing your zsh configuration.

Yesterday evening I refactored my prompt using Steve Losh's [My Extravagant Zsh Prompt](http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/ "My Extravagant Zsh Prompt") posting as a jumping off point. The end result is a nicely colorful, informationally dense prompt. In addition to showing me what machine I'm on, it displays the current working directory, the Ruby version, and information about source control should the working directory contain either a [Git](http://git-scm.com/ "git"), [Mercurial (hg)](http://mercurial.selenic.com/ "hg"), or [Subversion (svn)](http://subversion.apache.org/ "svn") repository.

A picture, or screen shot, is worth a thousand words.

![Prompts](https://zanshin.net/images/prompts.png)

And here's an annotated image that explains all the parts and pieces.

![Annotated prompts](https://zanshin.net/images/annotated-prompts.png)

##What You'll Need  
* zsh
* Steve Losh's [oh-my-zsh](http://github.com/sjl/oh-my-zsh/ "oh-my-zsh") fork
* Steve Losh's [hg-prompt](http://stevelosh.com/projects/hg-prompt/ "hg-prompt") package

##Create an oh-my-zsh theme  
I copied the Soliah theme when I started with oh-my-zsh originally. Over time I've completely modified it to suit my tastes. Browse through the [theme offerings](https://github.com/robbyrussell/oh-my-zsh/wiki/themes "oh-my-zsh themes") and find one you like. Make a copy and give it a unique name. I named mine after my domain, or `zanshin.zsh-theme`.

You can grab a copy of my theme file from my [dotfiles](https://github.com/zan5hin/dotfiles "dotfiles") repository on Github.

##The Prompt  
From left to right my prompt shows me:

* The `user name` I'm currently logged in under
* The `hostname` of the machine I'm currently at
* The `path` to the current working directory

If there is a source control repository present at the working directory, git, hg, or svn, information about the state of the repository is shown next.

For **Git** repositories the prompt character changes to a `±` and this information is shown:

* The `branch` name
* A `[dirty]` flag if there are tracked but not committed changes
* A `[untracked]` flag if there are untracked changes present

For **hg** repositories the prompt character changes to a `☿` and the following information is shown:

* The `branch` name
* The location of the checkout relative to the `tip`

For **svn** repositories the prompt character changes to a `⚡` and the following information is shown:

* The `trunk`, `branch`, or `tag` currently checked out
* The `revision` number
* And a `[dirty]` indicator if there are uncommitted changes

##Right Prompt  
Zsh supports the idea of a right prompt and I've made use of this to show the current Ruby version. I'm using [rbenv](https://github.com/sstephenson/rbenv "rbenv") to manage my Ruby versions. The presence of a `.rbenv-version` file triggers changing the Ruby in effect. My right prompt queries rbenv to determine what to display.

{{< highlight bash >}}
RPROMPT='%{$fg[red]%}$(rbenv version-name)%{$reset_color%}%'
{% endhighlight%}

##Subversion Prompt  
Steve Losh's prompt works beautifully as-is for git and hg repositories. I wanted to extend my prompt to work for subversion repositories since my employer is subversion-based. I got the bulk of my svn prompt from this [Landon Fuller](https://github.com/landonf "Landon Fuller") gist.

{% gist 1156969 %}

I stripped out some of his code, paring it down to just the bare essentials to display svn information. What his prompt script didn't provide was a way to indicate whether or not the working directory had uncommitted changes. Using output from the [bash prompt builder](http://andrewray.me/bash-prompt-builder/index.html "bash prompt builder") as an example I was able to add a test for uncommitted changes.

##Source Code  
Here's a copy of the complete zsh-theme I'm using.

{{< highlight bash >}}
{% raw %}
# ----------------------------------------------------------------------------
# Using bits from Steve Losh
#	http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/
# ----------------------------------------------------------------------------

# ----------------------------------------------------------------------------
# Shows little symbol '±' if you're currently at a git repo,
#                     '☿' if you're currently at a hg repo,
#                     '⚡' if you're currently at a svn repo,
#                 and '○' all other times
# ----------------------------------------------------------------------------
function prompt_char {
    git branch >/dev/null 2>/dev/null && echo '±' && return
    hg root >/dev/null 2>/dev/null && echo '☿' && return
	svn info >/dev/null 2>/dev/null && echo '⚡' && return
    echo '○'
}

# ----------------------------------------------------------------------------
# hg prompt
# depends upon ~/Projects/hg/hg-prompt
# ----------------------------------------------------------------------------
function hg_prompt_info {
    hg prompt --angle-brackets "\
< on %{$fg[magenta]%}<branch>%{$reset_color%}>\
< at %{$fg[yellow]%}<tags|%{$reset_color%}, %{$fg[yellow]%}>%{$reset_color%}>\
%{$fg[green]%}<status|modified|unknown><update>%{$reset_color%}<
patches: <patches|join( → )|pre_applied(%{$fg[yellow]%})|post_applied(%{$reset_color%})|pre_unapplied(%{$fg_bold[black]%})|post_unapplied(%{$reset_color%})>>" 2>/dev/null
}

# ----------------------------------------------------------------------------
# svn prompt
# based on: https://gist.github.com/1156969 
# with help from: http://andrewray.me/bash-prompt-builder/index.html
# ----------------------------------------------------------------------------
function svn_prompt_info {
	# Set up defaults
	local svn_branch=""
	local svn_repository=""
	local svn_version=""
	local svn_change=""

	# only if we are in a directory that contains a .svn entry
	if [ -d ".svn" ]; then
		# query svn info and parse the results
		svn_branch=`svn info | grep '^URL:' | egrep -o '((tags|branches)/[^/]+|trunk).*' | sed -E -e 's/^(branches|tags)\///g'`
		svn_repository=`svn info | grep '^Repository Root:' | egrep -o '(http|https|file|svn|svn+ssh)/[^/]+' | egrep -o '[^/]+$'`
		svn_version=`svnversion -n`
		
		# this is the slowest test of the bunch
		change_count=`svn status | grep "?\|\!\|M\|A" | wc -l`
		if [ "$change_count" != "       0" ]; then
			svn_change=" [dirty]"
		else
			svn_change=""
		fi
		
		# show the results
		echo "%{$fg[blue]%}$svn_repository/$svn_branch @ $svn_version%{$reset_color%}%{$fg[yellow]%}$svn_change%{$reset_color%}"
		
	fi
}

# ----------------------------------------------------------------------------
# git prompt variables
# depends on using Steve Losh fork of oh-my-zsh
# ----------------------------------------------------------------------------
ZSH_THEME_GIT_PROMPT_PREFIX=" on %{$fg[blue]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[yellow]%} [dirty]"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$fg[yellow]%} [untracked]"
ZSH_THEME_GIT_PROMPT_CLEAN=""

# ----------------------------------------------------------------------------
# zee prompt (ha ha)
# ----------------------------------------------------------------------------
PROMPT='
%{$fg[blue]%}%n%{$reset_color%} at %{$fg[yellow]%}%m%{$reset_color%} in %{$fg[green]%}${PWD/#$HOME/~}%b%{$reset_color%}$(hg_prompt_info)$(git_prompt_info)$(svn_prompt_info)
$(prompt_char) '

# ----------------------------------------------------------------------------
# rubies are red, and so my Ruby version is too
#----------------------------------------------------------------------------
RPROMPT='%{$fg[red]%}$(rbenv version-name)%{$reset_color%}%'

{% endraw %}
{{< / highlight >}}
