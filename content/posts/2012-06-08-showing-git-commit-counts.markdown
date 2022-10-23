---
layout: post
title: "Showing Git Commit Counts"
date: 2012-06-08T15:11:00
comments: true
tags:
- nerdliness
link: false
---
For sometime I've thought that that using the commit count on a project would make a good version number algorithm. My idea has been to have a file in the project that contains a number. That number is created by a commit hook. Each commit increments the number. I guess this would be more of a "build" number than a true version number. Either way, it would eliminate all the trouble over how to come up with a reliable way to have a `MM.mm.pppp` version number where `MM` is the major release, `mm` is the minor release, and `pppp` is the patch number.

A quick Google search led me to [How to get the git commit count](http://stackoverflow.com/questions/677436/how-to-get-the-git-commit-count "How to get git commit count") on StackOverflow. As of this posting, answer 14 had two `git shortlog` commands I liked enough to include in my [aliases](https://github.com/zan5hin/dotfiles/blob/master/.zsh/aliases "aliases") file.

##Show total number of commits in the current repository
This command shows the total number of commits in the current repository for all developers.

    git shortlog | grep -E '^[ ]+\w+' | wc -l
	
##Show number of commits by developer
This command is a variation on the first command. It shows each developer's name and then the number of commits they've made to the repository.

    git shortlog | grep -E '^[^ ]'
	

My next project will be to create a git commit hook that works with the first git shortlog command to populate a build count file.
