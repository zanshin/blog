---
layout: post
title: "Update a Github Fork From the Original Repository"
date: 2012-01-12T15:10:00
comments: true
tags:
- nerdliness
link: false
---
While it is easy to create forks of other projects through [Github](http://github.com "Github"), it isn't as easy to update your fork from the parent repository. The following steps are what I do to update my fork. These steps assume that you have a local copy of the repository and that everything is up to date and committed.

First you need to add a remote to the repository you forked.

    $ git remote add --track <branchname> <projectname> git://github.com/<gitmember>/<project>.git

Where,

* branchname: is the name of the branch on the parent repository you want to update from. Usually this will be `master`
* projectname: is the name you want to reference this remote by. I typically use the project's actual name or a shortened version of it. You'll already have a remote called `origin` for your forked instance of the project, so call it something other than `origin`.
* gitmember: is the name of the parent repository's owner
* project: is the name of the repository containing the branch you want to update from

To see that the remote was successfully added you can run

    $ git remote -v

which will show all the remotes your local repository currently has.

Next you want to fetch all the changes from the newly added remote.

    $ git fetch <projectname>

Where `projectname` is the name you assigned to the remote above. 

This fetch operation will create a new branch in your repository called `projectname/branchname`. With that in place you are ready to merge.

    $ git merge projectname/branchname

That's all there is to updating your fork from the parent repository.
