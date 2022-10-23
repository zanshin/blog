---
layout: post
title: "How to Update a Github Fork"
date: 2013-01-10T17:27:00
comments: true
tags:
- nerdliness
link: false
---
Once upon a time you found a project on Github that caught your fancy and you made a fork of your very own. You made some changes and time passed. Now you realize that the original project has some new features you want in your fork. What to do?

##Step 1
Add a `remote` to the original, or upstream project.

{{< highlight bash >}}
$ git remote add upstream git://github.com/originalOwner/project.git
{{< / highlight >}}

You can confirm the remote with this command:

{{< highlight bash >}}
$ git remote -v
{{< / highlight >}}

There will (at least) be a pair of references to `origin` (your fork of the project) and a pair of references to `upstream`, the new remote you've added for the upstream project.

##Step 2
Fetch all the changes from the upstream project. This will gather all the branches of that upstream project.

{{< highlight bash >}}
$ git fetch upstream
{{< / highlight >}}

##Step 3
Make sure you are on the master branch of your local repository:

{{< highlight bash >}}
$ git checkout master
{{< / highlight >}}

##Step 4
Rebase your branch so that any changes you've made which aren't in the upstream repository are replayed, thus preventing you from losing them.

{{< highlight bash >}}
$ git rebase upstream/master
{{< / highlight >}}

##Step 5
Push your newly updated local repository to your Github fork. You may need to add the `-f` flag to force the push on the initial push after a rebase.

{{< highlight bash >}}
$ git push [-f] origin master
{{< / highlight >}}
