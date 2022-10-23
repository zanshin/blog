---
layout: post
title: "Renaming Github Repository"
date: 2012-04-03T08:25:00
comments: true
tags:
- nerdliness
link: false
---
When I first started using [Octopress](http://octopress.org "Octopress") I forked the repository on [Github](http://github.com "Github") giving me my own repository called "octopress". Ever since I've wanted to have it named after my website since that is what the repository really contains. Turns out renaming a Github repository is simple.

1. First navigate to the "Admin" page for the repository you wish to rename. Change the **Repository Name** and click on the **Rename** button. Github will present you with a warning dialog. You should pay attention to this if you are renaming a repository shared by multiple people. In my case I'm the only committer and therefore I was able to ignore the warning.

2. Next you need to drop and re-add the remote on your local copy. (You could, I suppose, remove the local copy entirely and re-clone the repository. The drop and re-add is faster.)

{{< highlight bash >}}
$ git remote rm origin
$ git remote add origin git@github.com:"yourusername"/"projectname".git
{{< / highlight >}}
	
I made sure I had committed and pushed all changes to Github before starting this process, but this wasn't necessary -- just me being cautious.
