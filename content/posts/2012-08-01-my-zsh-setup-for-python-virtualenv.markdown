---
layout: post
title: "My zsh Setup for Python virtualenv"
date: 2012-08-01T16:16:00
comments: true
tags:
- nerdliness
link: false
---
One of my projects at work utilizes a Django-based API documentation tool. When I read Jeff Knupp's [Starting a Django Project the Right Way](http://www.jeffknupp.com/blog/2012/02/09/starting-a-django-project-the-right-way/ "Starting a Django Project the Right Way") posting I decided I wanted to setup [virtualenv](http://www.virtualenv.org/ "virtualenv") on my machine. And not just install it but also add the virtual environment information to my [zsh rprompt](http://zsh.sourceforge.net/Intro/intro_14.html "zsh rprompt").

Here's how I accomplished that goal.

##virtualenv Information
Using Steve Losh's excellent [My Extravagant Zsh Prompt](http://stevelosh.com/blog/2010/02/my-extravagant-zsh-prompt/ "My Extravagant Zsh Prompt") posting as a jumping off point, I added the following function to my zsh-theme file:

``` bash virtualenv_info
function virtualenv_info {
	[ $VIRTUAL_ENV ] && echo '('`basename $VIRTUAL_ENV`') '
}
```
    
This function tests to see if there is an active virtual environment and then echos the name of it as the function's output. 

##RPROPMT
Next I added a call to the `virtualenv_info` function to my RPROMPT or right-prompt. I already had my RVM controlled Ruby version displayed there in red, so I set the `virtualenv_info` to be green.

``` bash RPROMPT
case `uname` in
    Darwin)
	RPROMPT='%{$fg[green]%}$(virtualenv_info)%{$reset_color%}% %{$fg[red]%}$(rvm_ruby_prompt)%{$reset_color%}'
	;;
esac
```
    
The case statement test for `Darwin` prevents this portion of the prompt from running on my Ubuntu virtual machine, where I also have zsh setup but where I don't have RVM.

##Usage
Creating a new virtual environment is simple,

    $ virtualenv <environmentname>
	
Activating the new (or an existing) environment requires this command:

    $ source ./<environmentname>s/bin/activate
	
By default virtualenv wants to prepend the name of the active environment to your prompt. Since I want it only in my right-prompt I need to set `VIRTUAL_ENV_DISABLE_PROMPT` to any non null character before activating the environment. To make the activation command shorter, and to ensure that `VIRTUAL_ENV_DISABLE_PROMPT` is always set I created a new function sourced from my `.zshrc`:

``` bash activate() function
activate() {
  export VIRTUAL_ENV_DISABLE_PROMPT='1'
  source ./$1/bin/activate
}
```
    
Now I can just type `activate <environmentname>` and I'm switched to that Python environment with the virtualenv name shown in the right-prompt.
	
	mhn at palantir in ~
	○ activate apidoc                               [ruby-1.9.3-head]

	mhn at palantir in ~
	○                                      (apidoc) [ruby-1.9.3-head]
	
You can view my complete zsh setup in my [dotfile](https://github.com/zan5hin/dotfiles "dotfiles") repository on Github.
