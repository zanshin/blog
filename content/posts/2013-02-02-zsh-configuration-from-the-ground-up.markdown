---
layout: post
title: "Zsh Configuration From the Ground Up"
date: 2013-02-02T13:31:00
comments: true
tags:
- nerdliness
link: false
---
In July of 2011 I attended the [Überconf](http://uberconf.com/conference/denver/2011/07/home "Überconf") in Denver Colorado. One of the evening sessions was [_Developer Productivity Power Up on Mac OS X_](http://uberconf.com/conference/denver/2011/07/session?id=23150 "Developer Productivity Power Up on Mac OS X") given by Matthew McCullough. In addition to [Github](http://github.com "GitHub"), [CloudApp](http://getcloudapp.com "CloudApp"), [Dropbox](http://dropbox.com "Dropbox"), [iTerm2](http://www.iterm2.com/#/section/home "iTerm2"), and [EC2](http://aws.amazon.com/ec2/ "EC2"), he demonstrated [zsh](http://www.zsh.org "zsh"), or z-shell. I had heard of zsh prior to his talk, but had never investigated it.

zsh is a superset of the venerable [Bash](http://www.gnu.org/software/bash/manual/bashref.html "Bash manual") shell. It has first class functions, modular enhancements, comes pre-installed on Mac OS X, and offers fantastic tab completion. As a jump start to getting a working zsh environment in place, Matthew pointed us toward [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh "oh-my-zsh"), a framework with tremendous community support. oh-my-zsh offers modular zsh plug-ins, Git repository information in your prompt, a customizable right-side prompt, themes, and more.

By cloning the [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh "oh-my-zsh") project on Github, selecting one of the themes, and changing your default shell to zsh you can have a flexible and powerful new shell in a matter of minutes. With a little judicious Googling and some experimentation it's easy to develop a shell environment that's tuned to your style of working. Over time I built up my prompt (the most visible portion of the environment) to display interactive version control status information from [Git](http://git-scm.com "Git"), [Mercurial](http://mercurial.selenic.com "Mercurial") (hg), or [Subversion](http://subversion.apache.org "Subversion") (svn) when the current directory was under version control. My right-prompt showed the current [RVM](https://rvm.io "RVM") managed [Ruby](http://www.ruby-lang.org/en/ "Ruby") and [Python](http://python.org "Python") [virtual environment](http://www.doughellmann.com/projects/virtualenvwrapper/ "virtualenvwrapper"). I could also see at a glance what user I was, on which machine, and the current directory path. Oh, and all in vibrant colors.

Over time the features of zsh that I've come to rely upon the most are the tab completion and some of the directory movement commands. However, recently I had become dissatisfied with the delay when opening a new shell in a tab or window. A several second delay wasn't unusual. In my efforts to pack as much information as possible into the prompt I created a resource intensive monster that was increasingly annoying. I began to question the need for dynamic svn repository information in the prompt when I rarely worked with Subversion any more.

Additionally, I had switched away from the main oh-my-zsh project to a [fork created by Steve Losh](https://github.com/sjl/oh-my-zsh "Steve Losh oh-my-zsh"). He added a function that exposed more status states for Git repositories. And I was using a Python script of his that exposed [Mercurial repository information for the prompt](http://stevelosh.com/projects/hg-prompt/ "hg-prompt"). My prompt was capable of informing me of many things based on the current context, but the underlying structure had grown large and burdensome. Two weeks ago I decided to pare down my zsh setup, and in doing so I hoped to achieve two goals. One, I wanted to have a much better understanding of what was actually driving my shell's environment. Two, I wanted to have a simpler, and hopefully quicker loading, setup.

## Lobotomizing My oh-my-zsh theme
My first thoughts were to remove some of the less used information from my zsh prompt theme. I had added svn information since we use svn at work. However my role there shifted and I have no real need (at the moment) for Subversion reporting in my prompt.

It was the matter of a couple minutes work to comment out the Subversion related code from my theme file and `source .zshrc`. The subjective measure of my prompt's loading time wasn't much improved.

Next up I commented out the Mercurial aspects of the prompt. I stared out using hg a few years ago but, following the herd, I've moved all my projects to Git and Github. Again, my prompt didn't really seem to be any faster.

Taking a new tack, I hunted around and found a completely new zsh theme I liked the general looks of called [Fino](https://github.com/robbyrussell/oh-my-zsh/blob/master/themes/fino.zsh-theme "Fino"). It had basic Git repository status information, RVM or [rbenv](https://github.com/sstephenson/rbenv/ "rbenv") Ruby information, and Python virtualenv reporting. With it in place in my `.zshrc` file the prompt was changed but I started getting error messages. `zsh: command not found: rvm_ruby` with every command issued.

Googling the message took me to a number of [stackOverflow](http://stackoverflow.com/questions/9561519/why-does-zsh-return-command-not-found-error-for-my-rvm-gems "zsh command not found") threads and some pages about Mac OS X's [path_helper](http://unix.stackexchange.com/questions/22979/path-helper-and-zsh "path_helper and zsh"). Something about the new theme wasn't getting along with the rest of my zsh environment.

## A Brief Digression into path_helper
[path_helper](http://www.softec.lu/site/DevelopersCorner/MasteringThePathHelper "Mastering the path_helper utility of Mac OS X") examines the contents of `/etc/paths.d` and adds entries to your `$PATH`. The consensus seems to be that while it's a good idea, it may not be implemented in the best fashion.

While I was reading all the pages I could find about path_helper, I wasn't seeing the forest for the trees. RVM, and rbenv, are dependent upon their libraries being first in the PATH. If the PATH is altered after those key libraries are setup, the order may no longer be correct.

Frustrated by my lack of success in either altering my theme or incorporating the Fino theme, and not getting the clue the path_finder Google results were giving me, I reverted to my original theme and changed my primary text editor from [TextMate](http://macromates.com "TextMate") to [Sublime Text 2](http://www.sublimetext.com "Sublime Text 2"). When in doubt, go shave a yak.

## Shaving the Sublime Text 2 Yak
I tend to collect open tabs in my browser. I usually have 30 or 40 open tabs and sometimes as many as 100. Periodically I scrub through them all and "do something" with at least some of them. Mentally stuck on the `zsh: command not found` error, I wandered through my open tabs and stopped on the nettuts plus [Perfect Workflow in Sublime Text](http://net.tutsplus.com/articles/news/perfect-workflow-in-sublime-text-free-course/ "Perfect Workflow in Sublime Text 2") free course. Next thing you know I've dusted off my previously installed, but never really used, Sublime Text 2 application and started adding plug-ins and a color theme or two. I wasn't solving my zsh theme issues, but I was using new and different tools to look at the reluctant code. When you can't see the solution, change glasses, right?

With a newly configured and tweaked editor ready for use I returned to the original project.

## Struggles with RVM
There are two Ruby environment managers: [RVM](https://rvm.io "RVM") and [rbenv](https://github.com/sstephenson/rbenv/ "rbenv"). I've used both in the past, although RVM has been my primary one for longer. The framework I use for my Websites is [Octopress](http://octopress.org "Octopress"), which is Ruby-based. I initially installed RVM to setup and configure the required Ruby and Gems to get my site infrastructure working.

Since the error message I was getting seemed to be pointing a finger at RVM I decided to switch to rbenv. Rather than solve the problem, I thought, I'll just switch environment managers. Easy as pie.

Rather than jeopardize my working-if-slow-loading environment I decided to use a different machine for my rbenv experiment. I have access to an older, but still serviceable aluminum MacBook Pro. I had recently formatted its hard drive and installed [Linux Mint](http://www.linuxmint.com "Linux Mint") on it just to explore that distribution. I wiped the drive and installed Mountain Lion and rebuilt the machine to match my personal machine as closely as possible with one key difference: I setup rbenv and not RVM.

At this point, with a test bed that I could afford to be risky with, I stepped back from trying to get oh-my-zsh working and considered switching to the other zsh framework I had read about.

## Looking at zshuery
[zshuery](https://github.com/myfreeweb/zshuery "zshuery") is a much lighter-weight framework than oh-my-zsh. Based on the commit activity it isn't nearly as frequently updated either. My concerns with it ran deeper than a seeming lack of support. Without digging into both oh-my-zsh and zshuery and comparing them at a nuts and bolts level I wouldn't know what one had that the other didn't. What would I gain with zshuery? What would I lose and have to recreate?

While starting out with oh-my-zsh was fantastic, it came with a hidden cost. Since I knew nothing about zsh prior to using the framework I had no way of knowing what was raw zsh and what was framework-added. To me, oh-my-zsh **was** zsh.

## We Interrupt this Program for a Brief Word About Writing Sorts
In my college internal data structures course we wrote a sort. After a lecture discussion the ins and outs of the algorithm I wrote my very own [bubble sort](http://ibmmainframes.com/viewtopic.php?t=15902 "Bubble sort in COBOL"). The following lecture the professor showed us the [JCL](http://en.wikipedia.org/wiki/Job_Control_Language "JCL") sort utility. At first I was upset that I spent all the time and effort to reinvent the sort wheel, but later I came to realize that I had a better understand and appreciation for sorts as a result of the exercise.

My zsh experience was the opposite of my sort experience. I started zsh with the polished, design-decisions-already-made-for-you solution. If I really wanted to get to the bottom of my zsh shell slowness I would need to build my own environment, eschewing frameworks.

## ze-best-zsh-config
Github is a wonderful place as people store all sorts of things there, open to the public. In my sifting of Google zsh search results I stumbled onto a repository cheekily named [ze-best-zsh-config](https://github.com/spicycode/ze-best-zsh-config "ze-best-zsh-config"). At first glance it looked well laid out. The various aspects of the configuration, options, exports, the prompt, history, aliases, and functions, were all isolated in their own `.zsh` files, and the resulting components brought together in the `.zshrc` file.

Here was a starting point for my own, hand-rolled zsh environment. I cloned the repository and started working through the `.zsh` files it contained line-by-line to understand them.

## Switching to rbenv
Installing and using rbenv isn't any harder than installing and using RVM. Reflecting the current active Ruby in my shell's right-prompt (RPROMPT) proved to be one of the hardest parts of this project.

I liked the code from the Fino theme for interrogating the host machine for either RVM or rbenv and then determining what Ruby was active. Copying that code to my new `prompt.zsh` file didn't work however. The right-prompt either showed nothing at all, or the line of code that should have resolved to the Ruby name. After an evening of Googling and trial and error I finally posted a [question on stackOverflow](http://stackoverflow.com/questions/14635206/rbenv-version-display-in-zsh-right-prompt-not-refreshing "rbenv version display in zsh right prompt not refreshing"). The next morning I not only had a working answer, I had an explanation of how it worked. I love the Internet.

## setopts, Exports, Aliases, Functions, Colors, Completions, and History
With my prompt sorted it was time to understand all the configuration options available to me, and setup my environment. Working from the `setops` included in ze-best-zsh-config, I looked everything up. Some I kept, others I changed, a few I dropped. Next I read through the options defined in zshuery.

I performed similar examinations of the colors, completions, history, exports, aliases, and functions .zsh files. I merged my existing functions and aliases into the starter files, and incorporated some more from zshuery.

From zshuery I liberated the idea of testing the host machine's operating system (`uname`) and setting an attribute. This allows me to have options that are OS specific.

## More path_helper Adventures
During the due diligence process I managed to break the right-prompt. Suddenly the `zsh: command not found` error was back. Somewhere along the line I had managed to break the path. After much searching and reading I finally created a `.zshenv` file and copied the code necessary to run `path_helper` there. I then altered this code to completely clear the path, ensuring that I had no unexpected cruft there. This [article about path_helper](http://www.softec.lu/site/DevelopersCorner/MasteringThePathHelper "Mastering the path_helper utility of Mac OS X") was instrumental in my getting the problem solved.

I also placed the path and shim setup for rbenv into the .zshenv file. With this file in place the `zsh: command not found` error disappeared. Hopefully for good.

## Putting it All Together
My new `.zshrc` file is just a list of `.zsh` files that get sourced.

{{< highlight bash   >}}
source ~/.zsh/checks.zsh
source ~/.zsh/colors.zsh
source ~/.zsh/setopt.zsh
source ~/.zsh/exports.zsh
source ~/.zsh/prompt.zsh
source ~/.zsh/completion.zsh
source ~/.zsh/aliases.zsh
source ~/.zsh/bindkeys.zsh
source ~/.zsh/functions.zsh
source ~/.zsh/history.zsh
source ~/.zsh/zsh_hooks.zsh
source  ${HOME}/.dotfiles/z/z.sh

{{< / highlight >}}

And those files each contain a portion of the overall configuration. I suppose they could all be combined into one large file, but I like breaking them up into logically related components.

### .zshenv
Here is where we override path_helper by calling it again ourselves. The PATH is cleared first and then rebuilt. The result is far less duplication of directories. rbenv is also setup here.

{{< highlight bash >}}
# Mac OS X uses path_helper and /etc/paths.d to preload PATH, clear it out first
if [ -x /usr/libexec/path_helper ]; then
    PATH=''
    eval `/usr/libexec/path_helper -s`
fi

# if rbenv is present, configure it for use
if which rbenv &> /dev/null; then
    # Put the rbenv entry at the front of the line
    export PATH="$HOME/.rbenv/bin:$PATH"

    # enable shims and auto-completion
    eval "$(rbenv init -)"
fi

{{< / highlight >}}

### checks.zsh
These tests allow me to later isolate exports, or setopt statement based on the host machine's operating system.

{{< highlight bash >}}
# checks (stolen from zshuery)
if [[ $(uname) = 'Linux' ]]; then
    IS_LINUX=1
fi

if [[ $(uname) = 'Darwin' ]]; then
    IS_MAC=1
fi

if [[ -x `which brew` ]]; then
    HAS_BREW=1
fi

if [[ -x `which apt-get` ]]; then
    HAS_APT=1
fi

if [[ -x `which yum` ]]; then
    HAS_YUM=1
fi

{{< / highlight >}}

### colors.zsh
A colorful shell is a happy shell. But the escaped codes are arcane and miserable to work with. Let's give them some readable names.

{{< highlight bash  >}}
autoload colors; colors

# The variables are wrapped in \%\{\%\}. This should be the case for every
# variable that does not contain space.
for COLOR in RED GREEN YELLOW BLUE MAGENTA CYAN BLACK WHITE; do
  eval PR_$COLOR='%{$fg_no_bold[${(L)COLOR}]%}'
  eval PR_BOLD_$COLOR='%{$fg_bold[${(L)COLOR}]%}'
done

eval RESET='$reset_color'
export PR_RED PR_GREEN PR_YELLOW PR_BLUE PR_WHITE PR_BLACK
export PR_BOLD_RED PR_BOLD_GREEN PR_BOLD_YELLOW PR_BOLD_BLUE
export PR_BOLD_WHITE PR_BOLD_BLACK

# Clear LSCOLORS
unset LSCOLORS

# Main change, you can see directories on a dark background
#expor tLSCOLORS=gxfxcxdxbxegedabagacad

export CLICOLOR=1
export LS_COLORS=exfxcxdxbxegedabagacad


{{< / highlight >}}

### setopt.zsh
There are a dizzying array of options available. These are a start.

{{< highlight bash >}}
# ===== Basics
setopt no_beep # don't beep on error
setopt interactive_comments # Allow comments even in interactive shells (especially for Muness)

# ===== Changing Directories
setopt auto_cd # If you type foo, and it isn't a command, and it is a directory in your cdpath, go there
setopt cdablevarS # if argument to cd is the name of a parameter whose value is a valid directory, it will become the current directory
setopt pushd_ignore_dups # don't push multiple copies of the same directory onto the directory stack

# ===== Expansion and Globbing
setopt extended_glob # treat #, ~, and ^ as part of patterns for filename generation

# ===== History
setopt append_history # Allow multiple terminal sessions to all append to one zsh command history
setopt extended_history # save timestamp of command and duration
setopt inc_append_history # Add comamnds as they are typed, don't wait until shell exit
setopt hist_expire_dups_first # when trimming history, lose oldest duplicates first
setopt hist_ignore_dups # Do not write events to history that are duplicates of previous events
setopt hist_ignore_space # remove command line from history list when first character on the line is a space
setopt hist_find_no_dups # When searching history don't display results already cycled through twice
setopt hist_reduce_blanks # Remove extra blanks from each command line being added to history
setopt hist_verify # don't execute, just expand history
setopt share_history # imports new commands and appends typed commands to history

# ===== Completion
setopt always_to_end # When completing from the middle of a word, move the cursor to the end of the word
setopt auto_menu # show completion menu on successive tab press. needs unsetop menu_complete to work
setopt auto_name_dirs # any parameter that is set to the absolute name of a directory immediately becomes a name for that directory
setopt complete_in_word # Allow completion from within a word/phrase

unsetopt menu_complete # do not autoselect the first completion entry

# ===== Correction
setopt correct # spelling correction for commands
setopt correctall # spelling correction for arguments

# ===== Prompt
setopt prompt_subst # Enable parameter expansion, command substitution, and arithmetic expansion in the prompt
setopt transient_rprompt # only show the rprompt on the current prompt

# ===== Scripts and Functions
setopt multios # perform implicit tees or cats when multiple redirections are attempted


{{< / highlight >}}

### exports.zsh
The PATH is altered here after having been cleared and started in `.zshenv`.

{{< highlight bash  >}}
# Currently this path is appended to dynamically when picking a ruby version
# zshenv has already started PATH with rbenv so append only here
export PATH=$PATH~/bin:/usr/local/bin:/usr/local/sbin:~/bin

# Set default console Java to 1.6
export JAVA_HOME=/System/Library/Frameworks/JavaVM.framework/Versions/1.6/Home

# Setup terminal, and turn on colors
export TERM=xterm-256color
export CLICOLOR=1
export LSCOLORS=Gxfxcxdxbxegedabagacad

# Enable color in grep
export GREP_OPTIONS='--color=auto'
export GREP_COLOR='3;33'

# This resolves issues install the mysql, postgres, and other gems with native non universal binary extensions
export ARCHFLAGS='-arch x86_64'

export LESS='--ignore-case --raw-control-chars'
export PAGER='less'
export EDITOR='subl -w'

#export NODE_PATH=/opt/github/homebrew/lib/node_modules
#export PYTHONPATH=/usr/local/lib/python2.6/site-packages
# CTAGS Sorting in VIM/Emacs is better behaved with this in place
export LC_COLLATE=C

# Virtual Environment Stuff
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Projects/django
source /usr/local/bin/virtualenvwrapper.sh

{{< / highlight >}}

### prompt.zsh
The visible tip of the zsh environment iceberg. Lots going on here.

The Python virtual environment, if one is active, is captured for display in the right-prompt.

The prompt character displayed is normally a `$` or maybe a `>`. I'm using the symbols Steve Losh had in his [extravagant zsh prompt](http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/ "My Extravagant zsh Prompt")

`box_name` is a clever way to show your preferred name for the machine you are on. Just create a `~/.box-name` file and put the name you want there. Or, on Mac OS X, use the `sudo scutil --set HostName <your-name-here>` command.

A variety of variables are set up for Git repository status reporting, and then there are some functions to interrogate Git. This information is shown in the main prompt.

The current Ruby active is determined by interrogating either RVM or rbenv, which ever is present on the machine. This function, `_update_ruby_version()`, has been added to the  `chpwd_functions` array like so: `chpwd_functions+=(_update_ruby_version)`. This means it is only executed when the directory changes.

Finally there is a function to get the name of the current working directory.

The primary prompt shows the username, box name, current working directory, and git branch and status (if present). The prompt is preceded by a blank line, and places the prompt character on a line of its own. This makes reading the console far easier.

zsh provides an error prompt, which I'm using to spell correct commands. The `export SPROMPT` line handles this.

Lastly the troublesome right-prompt or RPROMPT. Here the Python virtual environment information and active Ruby information is displayed. One of the `setops` defined above, `setopt transient_rprompt` causes the RPROMPT to only appear on the current, most recent, prompt. I'm not sure yet if I like this, but it does make the console seem less cluttered.

{{< highlight bash >}}
function virtualenv_info {
    [ $VIRTUAL_ENV ] && echo '('`basename $VIRTUAL_ENV`') '
}

function prompt_char {
    git branch >/dev/null 2>/dev/null && echo '±' && return
    hg root >/dev/null 2>/dev/null && echo '☿' && return
    echo '○'
}

function box_name {
    [ -f ~/.box-name ] && cat ~/.box-name || hostname -s
}

# http://blog.joshdick.net/2012/12/30/my_git_prompt_for_zsh.html
# copied from https://gist.github.com/4415470
# Adapted from code found at <https://gist.github.com/1712320>.

#setopt promptsubst
autoload -U colors && colors # Enable colors in prompt

# Modify the colors and symbols in these variables as desired.
GIT_PROMPT_SYMBOL="%{$fg[blue]%}±"
GIT_PROMPT_PREFIX="%{$fg[green]%} [%{$reset_color%}"
GIT_PROMPT_SUFFIX="%{$fg[green]%}]%{$reset_color%}"
GIT_PROMPT_AHEAD="%{$fg[red]%}ANUM%{$reset_color%}"
GIT_PROMPT_BEHIND="%{$fg[cyan]%}BNUM%{$reset_color%}"
GIT_PROMPT_MERGING="%{$fg_bold[magenta]%}⚡︎%{$reset_color%}"
GIT_PROMPT_UNTRACKED="%{$fg_bold[red]%}u%{$reset_color%}"
GIT_PROMPT_MODIFIED="%{$fg_bold[yellow]%}d%{$reset_color%}"
GIT_PROMPT_STAGED="%{$fg_bold[green]%}s%{$reset_color%}"

# Show Git branch/tag, or name-rev if on detached head
function parse_git_branch() {
  (git symbolic-ref -q HEAD || git name-rev --name-only --no-undefined --always HEAD) 2> /dev/null
}

# Show different symbols as appropriate for various Git repository states
function parse_git_state() {

  # Compose this value via multiple conditional appends.
  local GIT_STATE=""

  local NUM_AHEAD="$(git log --oneline @{u}.. 2> /dev/null | wc -l | tr -d ' ')"
  if [ "$NUM_AHEAD" -gt 0 ]; then
    GIT_STATE=$GIT_STATE${GIT_PROMPT_AHEAD//NUM/$NUM_AHEAD}
  fi

  local NUM_BEHIND="$(git log --oneline ..@{u} 2> /dev/null | wc -l | tr -d ' ')"
  if [ "$NUM_BEHIND" -gt 0 ]; then
    GIT_STATE=$GIT_STATE${GIT_PROMPT_BEHIND//NUM/$NUM_BEHIND}
  fi

  local GIT_DIR="$(git rev-parse --git-dir 2> /dev/null)"
  if [ -n $GIT_DIR ] && test -r $GIT_DIR/MERGE_HEAD; then
    GIT_STATE=$GIT_STATE$GIT_PROMPT_MERGING
  fi

  if [[ -n $(git ls-files --other --exclude-standard 2> /dev/null) ]]; then
    GIT_STATE=$GIT_STATE$GIT_PROMPT_UNTRACKED
  fi

  if ! git diff --quiet 2> /dev/null; then
    GIT_STATE=$GIT_STATE$GIT_PROMPT_MODIFIED
  fi

  if ! git diff --cached --quiet 2> /dev/null; then
    GIT_STATE=$GIT_STATE$GIT_PROMPT_STAGED
  fi

  if [[ -n $GIT_STATE ]]; then
    echo "$GIT_PROMPT_PREFIX$GIT_STATE$GIT_PROMPT_SUFFIX"
  fi

}


# If inside a Git repository, print its branch and state
function git_prompt_string() {
  local git_where="$(parse_git_branch)"
  [ -n "$git_where" ] && echo "on %{$fg[blue]%}${git_where#(refs/heads/|tags/)}$(parse_git_state)"
}

# determine Ruby version whether using RVM or rbenv
# the chpwd_functions line cause this to update only when the directory changes
function _update_ruby_version() {
    typeset -g ruby_version=''
    if which rvm-prompt &> /dev/null; then
      ruby_version="$(rvm-prompt i v g)"
    else
      if which rbenv &> /dev/null; then
        ruby_version="$(rbenv version | sed -e "s/ (set.*$//")"
      fi
    fi
}
chpwd_functions+=(_update_ruby_version)

function current_pwd {
  echo $(pwd | sed -e "s,^$HOME,~,")
}

PROMPT='
${PR_GREEN}%n%{$reset_color%} %{$FG[239]%}at%{$reset_color%} ${PR_BOLD_BLUE}$(box_name)%{$reset_color%} %{$FG[239]%}in%{$reset_color%} ${PR_BOLD_YELLOW}$(current_pwd)%{$reset_color%} $(git_prompt_string)
$(prompt_char) '

export SPROMPT="Correct $fg[red]%R$reset_color to $fg[green]%r$reset_color [(y)es (n)o (a)bort (e)dit]? "

RPROMPT='${PR_GREEN}$(virtualenv_info)%{$reset_color%} ${PR_RED}${ruby_version}%{$reset_color%}'

{{< / highlight >}}

### completion.zsh
Tab completion is like magic, and the incantations in the `completions.zsh` file are magic to me. I need to learn more about these.

{{< highlight bash >}}
autoload -U compinit && compinit
zmodload -i zsh/complist

# man zshcontrib
zstyle ':vcs_info:*' actionformats '%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{3}|%F{1}%a%F{5}]%f '
zstyle ':vcs_info:*' formats '%F{5}(%f%s%F{5})%F{3}-%F{5}[%F{2}%b%F{5}]%f '
zstyle ':vcs_info:*' enable git #svn cvs

# Enable completion caching, use rehash to clear
zstyle ':completion::complete:*' use-cache on
zstyle ':completion::complete:*' cache-path ~/.zsh/cache/$HOST

# Fallback to built in ls colors
zstyle ':completion:*' list-colors ''

# Make the list prompt friendly
zstyle ':completion:*' list-prompt '%SAt %p: Hit TAB for more, or the character to insert%s'

# Make the selection prompt friendly when there are a lot of choices
zstyle ':completion:*' select-prompt '%SScrolling active: current selection at %p%s'

# Add simple colors to kill
zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#) ([0-9a-z-]#)*=01;34=0=01'

# list of completers to use
zstyle ':completion:*::::' completer _expand _complete _ignored _approximate

zstyle ':completion:*' menu select=1 _complete _ignored _approximate

# insert all expansions for expand completer
# zstyle ':completion:*:expand:*' tag-order all-expansions

# match uppercase from lowercase
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'

# offer indexes before parameters in subscripts
zstyle ':completion:*:*:-subscript-:*' tag-order indexes parameters

# formatting and messages
zstyle ':completion:*' verbose yes
zstyle ':completion:*:descriptions' format '%B%d%b'
zstyle ':completion:*:messages' format '%d'
zstyle ':completion:*:warnings' format 'No matches for: %d'
zstyle ':completion:*:corrections' format '%B%d (errors: %e)%b'
zstyle ':completion:*' group-name ''

# ignore completion functions (until the _ignored completer)
zstyle ':completion:*:functions' ignored-patterns '_*'
zstyle ':completion:*:scp:*' tag-order files users 'hosts:-host hosts:-domain:domain hosts:-ipaddr"IP\ Address *'
zstyle ':completion:*:scp:*' group-order files all-files users hosts-domain hosts-host hosts-ipaddr
zstyle ':completion:*:ssh:*' tag-order users 'hosts:-host hosts:-domain:domain hosts:-ipaddr"IP\ Address *'
zstyle ':completion:*:ssh:*' group-order hosts-domain hosts-host users hosts-ipaddr
zstyle '*' single-ignored show

{{< / highlight >}}

### aliases.zsh
I've had some of these aliases for as long as I've been working on *nix-based machines. They are as much a part of my muscle memory as tying my shoe or combing my hair. Since zsh tries to spell correct commands, the nocorrect section is at the top. Here is where you put commands that you don't want spell checked every time they are used.

{{< highlight bash  >}}
# -------------------------------------------------------------------
# use nocorrect alias to prevent auto correct from "fixing" these
# -------------------------------------------------------------------
#alias foobar='nocorrect foobar'
alias g8='nocorrect g8'

# -------------------------------------------------------------------
# Ruby stuff
# -------------------------------------------------------------------
alias ri='ri -Tf ansi' # Search Ruby documentation
alias rake="noglob rake" # necessary to make rake work inside of zsh
#alias be='bundle exec'
#alias bx='bundle exec'
#alias gentags='ctags .'

# -------------------------------------------------------------------
# directory movement
# -------------------------------------------------------------------
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias 'bk=cd $OLDPWD'

# -------------------------------------------------------------------
# directory information
# -------------------------------------------------------------------
alias lh='ls -d .*' # show hidden files/directories only
alias lsd='ls -aFhlG'
alias l='ls -al'
alias ls='ls -GFh' # Colorize output, add file type indicator, and put sizes in human readable format
alias ll='ls -GFhl' # Same as above, but in long listing format
alias tree="ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'"
alias 'dus=du -sckx * | sort -nr' #directories sorted by size

alias 'wordy=wc -w * | sort | tail -n10' # sort files in current directory by the number of words they contain
alias 'filecount=find . -type f | wc -l' # number of files (not directories)

# -------------------------------------------------------------------
# Mac only
# -------------------------------------------------------------------
if [[ $IS_MAC -eq 1 ]]; then
    alias ql='qlmanage -p 2>/dev/null' # OS X Quick Look
    alias oo='open .' # open current directory in OS X Finder
    alias 'today=calendar -A 0 -f /usr/share/calendar/calendar.mark | sort'
    alias 'mailsize=du -hs ~/Library/mail'
    alias 'smart=diskutil info disk0 | grep SMART' # display SMART status of hard drive
    # Hall of the Mountain King
    alias cello='say -v cellos "di di di di di di di di di di di di di di di di di di di di di di di di di di"'
    # alias to show all Mac App store apps
    alias apps='mdfind "kMDItemAppStoreHasReceipt=1"'
    # reset Address Book permissions in Mountain Lion (and later presumably)
    alias resetaddressbook='tccutil reset AddressBook'
    # refresh brew by upgrading all outdated casks
    alias refreshbrew='brew outdated | while read cask; do brew upgrade $cask; done'
    # rebuild Launch Services to remove duplicate entries on Open With menu
    alias rebuildopenwith='/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.fram ework/Support/lsregister -kill -r -domain local -domain system -domain user'
fi


# -------------------------------------------------------------------
# remote machines
# -------------------------------------------------------------------
alias 'palantir=ssh mhn@palantir.ome.ksu.edu -p 11122'
alias 'pvnc=open vnc://palantir.ome.ksu.edu'
alias 'ksunix=ssh mhn@unix.ksu.edu'
alias 'veld=ssh mhn@veld.ome.ksu.edu'
alias 'dev=ssh mhn@ome-dev-as1.ome.campus'
alias 'wf=ssh markn@markn.webfactional.com'

# -------------------------------------------------------------------
# database
# -------------------------------------------------------------------
alias 'psqlstart=/usr/local/pgsql/bin/pg_ctl -D /usr/local/pgsql/data -l logfile start'
alias 'psqlstop=/usr/local/pgsql/bin/pg_ctl stop'
#alias mysql='mysql -u root'
#alias mysqladmin='mysqladmin -u root'

# -------------------------------------------------------------------
# ome devvm start, stop, ssh, and mount
# -------------------------------------------------------------------
alias 'startvm=VBoxHeadless --startvm devvm'
alias 'stopvm=VBoxManage controlvm devvm poweroff'
alias 'devvm=ssh -p 10022 ome@localhost'

# -------------------------------------------------------------------
# Mercurial (hg)
# -------------------------------------------------------------------
alias 'h=hg status'
alias 'hc=hg commit'
alias 'push=hg push'
alias 'pull=hg pull'
alias 'clone=hg clone'

# -------------------------------------------------------------------
# Git
# -------------------------------------------------------------------
alias ga='git add'
alias gp='git push'
alias gl='git log'
alias gpl="git log --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gs='git status'
alias gd='git diff'
alias gm='git commit -m'
alias gma='git commit -am'
alias gb='git branch'
alias gc='git checkout'
alias gcb='git checkout -b'
alias gra='git remote add'
alias grr='git remote rm'
alias gpu='git pull'
alias gcl='git clone'
alias gta='git tag -a -m'
alias gf='git reflog'
alias gv='git log --pretty=format:'%s' | cut -d " " -f 1 | sort | uniq -c | sort -nr'

# leverage aliases from ~/.gitconfig
alias gh='git hist'
alias gt='git today'

# curiosities
# gsh shows the number of commits for the current repos for all developers
alias gsh="git shortlog | grep -E '^[ ]+\w+' | wc -l"

# gu shows a list of all developers and the number of commits they've made
alias gu="git shortlog | grep -E '^[^ ]'"

# -------------------------------------------------------------------
# Python virtualenv
# -------------------------------------------------------------------
alias mkenv='mkvirtualenv'
alias on="workon"
alias off="deactivate"

# -------------------------------------------------------------------
# Oddball stuff
# -------------------------------------------------------------------
alias 'sloc=/usr/local/sloccount/bin/sloccount'
alias 'adventure=emacs -batch -l dunnet' # play adventure in the console
alias 'ttop=top -ocpu -R -F -s 2 -n30' # fancy top
alias 'rm=rm -i' # make rm command (potentially) less destructive

# Force tmux to use 256 colors
alias tmux='TERM=screen-256color-bce tmux'

# alias to cat this file to display
alias acat='< ~/.zsh/aliases.zsh'
alias fcat='< ~/.zsh/functions.zsh'
alias sz='source ~/.zshrc'


# -------------------------------------------------------------------
# some Octopress helpers
# -------------------------------------------------------------------
alias 'generate=date ; rake generate ; date ;'
alias 'gen=date ; rake generate ; date ;'
alias 'ingen=date ; rake integrate ; generate ; date ;'
alias 'deploy=rm deploy.log ; rake deploy > deploy.log ; tail -n 3 deploy.log ;'
alias 'np=newpost.rb'

# copy .htaccess files for zanshin.net and its image sub-directory
alias 'htaccess=scp /Users/mark/Projects/octopress/zanshin/source/htaccess/.htaccess markn@markn.webfactional.com:~/webapps/zanshin ; scp /Users/mark/Projects/octopress/zanshin/source/images/.htaccess markn@markn.webfactional.com:~/webapps/zanshin/images ;'

# deploy zanshin.net and move its .htaccess files
alias 'dz=deploy ; htaccess ;'

# -------------------------------------------------------------------
# Source: http://aur.archlinux.org/packages/lolbash/lolbash/lolbash.sh
# -------------------------------------------------------------------
alias wtf='dmesg'
alias onoz='cat /var/log/errors.log'
alias rtfm='man'
alias visible='echo'
alias invisible='cat'
alias moar='more'
alias icanhas='mkdir'
alias donotwant='rm'
alias dowant='cp'
alias gtfo='mv'
alias hai='cd'
alias plz='pwd'
alias inur='locate'
alias nomz='ps aux | less'
alias nomnom='killall'
alias cya='reboot'
alias kthxbai='halt'

{{< / highlight >}}

### bindkeys.zsh
Create your own keybindings for fun and profit. Still more material to learn better.

{{< highlight bash >}}
# To see the key combo you want to use just do:
# cat > /dev/null
# And press it

bindkey "^K"      kill-whole-line                      # ctrl-k
bindkey "^R"      history-incremental-search-backward  # ctrl-r
bindkey "^A"      beginning-of-line                    # ctrl-a
bindkey "^E"      end-of-line                          # ctrl-e
bindkey "[B"      history-search-forward               # down arrow
bindkey "[A"      history-search-backward              # up arrow
bindkey "^D"      delete-char                          # ctrl-d
bindkey "^F"      forward-char                         # ctrl-f
bindkey "^B"      backward-char                        # ctrl-b
bindkey -v   # Default to standard vi bindings, regardless of editor string

{{< / highlight >}}

### functions.zsh
Some of these are my own creation, others I've picked up along the way. The most recent addition, `path()` displays your current PATH beautifully. Immensely helpful when sorting out path issues.

{{< highlight bash  >}}
# -------------------------------------------------------------------
# compressed file expander
# (from https://github.com/myfreeweb/zshuery/blob/master/zshuery.sh)
# -------------------------------------------------------------------
ex() {
    if [[ -f $1 ]]; then
        case $1 in
          *.tar.bz2) tar xvjf $1;;
          *.tar.gz) tar xvzf $1;;
          *.tar.xz) tar xvJf $1;;
          *.tar.lzma) tar --lzma xvf $1;;
          *.bz2) bunzip $1;;
          *.rar) unrar $1;;
          *.gz) gunzip $1;;
          *.tar) tar xvf $1;;
          *.tbz2) tar xvjf $1;;
          *.tgz) tar xvzf $1;;
          *.zip) unzip $1;;
          *.Z) uncompress $1;;
          *.7z) 7z x $1;;
          *.dmg) hdiutul mount $1;; # mount OS X disk images
          *) echo "'$1' cannot be extracted via >ex<";;
    esac
    else
        echo "'$1' is not a valid file"
    fi
}

# -------------------------------------------------------------------
# any function from http://onethingwell.org/post/14669173541/any
# search for running processes
# -------------------------------------------------------------------
any() {
    emulate -L zsh
    unsetopt KSH_ARRAYS
    if [[ -z "$1" ]] ; then
        echo "any - grep for process(es) by keyword" >&2
        echo "Usage: any " >&2 ; return 1
    else
        ps xauwww | grep -i --color=auto "[${1[1]}]${1[2,-1]}"
    fi
}

# -------------------------------------------------------------------
# display a neatly formatted path
# -------------------------------------------------------------------
path() {
  echo $PATH | tr ":" "\n" | \
    awk "{ sub(\"/usr\",   \"$fg_no_bold[green]/usr$reset_color\"); \
           sub(\"/bin\",   \"$fg_no_bold[blue]/bin$reset_color\"); \
           sub(\"/opt\",   \"$fg_no_bold[cyan]/opt$reset_color\"); \
           sub(\"/sbin\",  \"$fg_no_bold[magenta]/sbin$reset_color\"); \
           sub(\"/local\", \"$fg_no_bold[yellow]/local$reset_color\"); \
           print }"
}

# -------------------------------------------------------------------
# Mac specific functions
# -------------------------------------------------------------------
if [[ $IS_MAC -eq 1 ]]; then

    # view man pages in Preview
    pman() { ps=`mktemp -t manpageXXXX`.ps ; man -t $@ > "$ps" ; open "$ps" ; }

    # function to show interface IP assignments
    ips() { foo=`/Users/mark/bin/getip.py; /Users/mark/bin/getip.py en0; /Users/mark/bin/getip.py en1`; echo $foo; }

    # notify function - http://hints.macworld.com/article.php?story=20120831112030251
    notify() { automator -D title=$1 -D subtitle=$2 -D message=$3 ~/Library/Workflows/DisplayNotification.wflow }
fi

# -------------------------------------------------------------------
# nice mount (http://catonmat.net/blog/another-ten-one-liners-from-commandlingfu-explained)
# displays mounted drive information in a nicely formatted manner
# -------------------------------------------------------------------
function nicemount() { (echo "DEVICE PATH TYPE FLAGS" && mount | awk '$2="";1') | column -t ; }

# -------------------------------------------------------------------
# myIP address
# -------------------------------------------------------------------
function myip() {
  ifconfig lo0 | grep 'inet ' | sed -e 's/:/ /' | awk '{print "lo0       : " $2}'
  ifconfig en0 | grep 'inet ' | sed -e 's/:/ /' | awk '{print "en0 (IPv4): " $2 " " $3 " " $4 " " $5 " " $6}'
  ifconfig en0 | grep 'inet6 ' | sed -e 's/ / /' | awk '{print "en0 (IPv6): " $2 " " $3 " " $4 " " $5 " " $6}'
  ifconfig en1 | grep 'inet ' | sed -e 's/:/ /' | awk '{print "en1 (IPv4): " $2 " " $3 " " $4 " " $5 " " $6}'
  ifconfig en1 | grep 'inet6 ' | sed -e 's/ / /' | awk '{print "en1 (IPv6): " $2 " " $3 " " $4 " " $5 " " $6}'
}

# -------------------------------------------------------------------
# (s)ave or (i)nsert a directory.
# -------------------------------------------------------------------
s() { pwd > ~/.save_dir ; }
i() { cd "$(cat ~/.save_dir)" ; }

# -------------------------------------------------------------------
# console function
# -------------------------------------------------------------------
function console () {
  if [[ $# > 0 ]]; then
    query=$(echo "$*"|tr -s ' ' '|')
    tail -f /var/log/system.log|grep -i --color=auto -E "$query"
  else
    tail -f /var/log/system.log
  fi
}

# -------------------------------------------------------------------
# shell function to define words
# http://vikros.tumblr.com/post/23750050330/cute-little-function-time
# -------------------------------------------------------------------
givedef() {
  if [[ $# -ge 2 ]] then
    echo "givedef: too many arguments" >&2
    return 1
  else
    curl "dict://dict.org/d:$1"
  fi
}



{{< / highlight >}}

### history.zsh
The variables control how the command history is managed.

{{< highlight bash >}}
# HISTORY
HISTSIZE=10000
SAVEHIST=9000
HISTFILE=~/.zsh_history

{{< / highlight >}}

### zsh_hooks.zsh
This file controls the use of the `precmd`, `preexec` and `postcmd` features. I'm not entirely sure I understand all there is to know about this. It's on the list to investigate more thoroughly.

{{< highlight bash >}}
function precmd {
  # vcs_info
  # Put the string "hostname::/full/directory/path" in the title bar:
  echo -ne "\e]2;$PWD\a"

  # Put the parentdir/currentdir in the tab
  echo -ne "\e]1;$PWD:h:t/$PWD:t\a"
}

function set_running_app {
  printf "\e]1; $PWD:t:$(history $HISTCMD | cut -b7- ) \a"
}

function preexec {
  set_running_app
}

function postexec {
  set_running_app
}

{{< / highlight >}}

### z.sh
[z](https://github.com/rupa/z "z") tracks your most used directories based on 'frequency'. By typing `z ` and part of a directory name I can quickly jump to that part of the file system. Obviously the longer you have it installed the better it performs. I highly recommend it.

## Looking Forward
My original RVM + oh-my-zsh configuration had the path and setup for RVM contained in the `.zlogin` file. The new rbenv + zsh configuration has the rbenv setup in `.zshenv`. I need to read more on these two files and decide which ought to be used.

I need to explore the subject of bindkeys more to fully understand what they are and how I can benefit from them. I also need to learn about `precmd`, `preexec`, and `postexec`. There use in my setup was copied from ze-best-zsh-config. And `zsh_hooks`.

My testbed machine has 100 GB of free space on it's hard drive that I am planning on using to install Linux Mint. Once that OS is setup and running I want to use my dotfiles repository, including the new zsh configuration, there. As I get things setup and working under Linux I'm sure there will be Linux-specific tweaks to add to the configuration.

In the end I'm not sure I've made my prompt load any faster. I certainly understand the processes and configuration behind it far better than before. I haven't taken the step of removing all the entires from `/etc/paths.d` and placing them directly into my $PATH. This feels like something that would need constant minding and I'm not ready for that yet.

I'll need to live with this setup for a while to discover things I've lost by leaving oh-my-zsh. Hopefully nothing to drastic or hard to configure myself. It's been an interesting couple of weeks sorting this out. I have a greater appreciation for my shell now, and a greater understanding of what makes it tick.

