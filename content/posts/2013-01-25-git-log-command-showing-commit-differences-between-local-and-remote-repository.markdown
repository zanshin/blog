---
layout: post
title: "Git Log Command Showing Commit Differences Between Local and Remote Repository"
date: 2013-01-25T07:55:00
comments: true
tags:
- nerdliness
link: false
---
Wouldn't it be nice to have a quick command you could run to visualize the commits on your local git repository that weren't on the remote branch just prior to pushing them? Or perhaps to see what commits had been made remotely before pulling them down to your local copy and triggering a merge?

This brief how-to will explain just such a `git log` command, and how to setup the upstream tracking branch to enable the functionality required by the `log` command.

##First Iteration
The first iteration of this command hard codes the remote branch name making it useful only if all your work is always on the same branch.

{{< highlight bash >}}
$ git log origin/master..HEAD --graph --pretty=format:'%Cred%h%Creset %d %s %Cgreen(%cr)%Creset %Cblue[%an]%Creset' --abbrev-commit --date=relative
{{< / highlight >}}

###Explanation
The `..HEAD` portion of the command specifies a range for the log command to work against. In this case from current position on the master branch graph of the local repository to the HEAD position on origin copy of the master branch. By indicating the range with `..HEAD` the log command will show those commits that exist on the local graph but not on the origin graph.

The rest of the command is just one way to condense and format the log command output. In this case we display an ASCII "railroad-style" graph of branchings, colorize the information displayed, abbreviate the commit message, and use relative dates.

As stated above, this command only works for branches called `master`.  A better command would determine the name of the current branch and use it for the comparison.

##Second Iteration
{{< highlight bash >}}
git log @{u}..HEAD --graph --decorate --left-right --boundary --pretty=format:'%Cred%h%Creset %d %s %Cgreen(%cr)%Creset %Cblue[%an]%Creset' --abbrev-commit --date=relative
{{< / highlight >}}

By making use of the `@{u}` parameter the command now works regardless of the current branch. The suffix @{upstream} to a reference (short form <refname>@{u}) refers to the branch the reference is set to build on top of. A missing reference defaults to the current branch.

So this second command works for the current branch, regardless of what it is named. But it still only shows the local commit differences. Wouldn't it be better to see both the local commits not yet on the remote **and** the remote commits not yet on the local?

##Third Iteration
The notation `A..B` means revisions in B that are not in A. Adding dot to the list, e.g., `A...B` means revisions in either A or B that are not in the merge bases for A and B. In other words, show the commits in either local or remote that aren't in the other.

{{< highlight bash >}}
git log @{u}...HEAD --graph --decorate --left-right --boundary --pretty=format:'%Cred%h%Creset %d %s %Cgreen(%cr)%Creset %Cblue[%an]%Creset' --abbrev-commit --date=relative
{{< / highlight >}}

Now with one quick command (I suggest creating a `gitconfig` alias) you can determine what the "commit difference" is between your local branch and it's upstream copy.

##A Note About Upstream
In order for th `@{u}..HEAD` or `@{u}...HEAD` notation to work, your branch must have an upstream tracking branch defined. You can see what the upstream branch is by running this command, substituting the branch name as necessary:

{{< highlight bash >}}
$ git config branch.<branchname>.remote
{{< / highlight >}}

If the command returns nothing then you need to set the upstream branch. Run this command one time to establish an upstream tracking branch.

{{< highlight bash >}}
$ git push -u origin <branchname>
{{< / highlight >}}

The `-u` parameter indicates that we want to establish the origin version of <branchname> as the upstream tracking branch for the local copy of <branchname>. Remember that `origin` is just an alias that was created for a particular repository when the `git remote add` command was run.

##Conclusion
With an upstream tracking branch in place, using the `@{u}...HEAD` range specification on a `git log` command allows you to see the divergence (if any) your local copy has prior to running either a `git pull` or `git push`. By setting up and alias in your `gitconfig` file you can easily run `git ahead` anytime you want or need.

##References
The following [stackOverflow](http://stackoverflow.com "stackOverflow") pages were instrumental in creating this how-to.

[Substitute current git branch name into git log command](http://stackoverflow.com/questions/14515284/substitute-current-git-branch-name-into-git-log-command "Substitute current git branch name into git log command")

[Git command to emit name of remote tracking branch](http://stackoverflow.com/questions/3763039/git-command-to-emit-name-of-remote-tracking-branch "Git command to emit name of remote tracking branch")

[Difference in 'git log origin/master' vs 'git log origin/master..'](http://stackoverflow.com/questions/850607/difference-in-git-log-origin-master-vs-git-log-origin-master "Difference in 'git log origin/master' vs 'git log origin/master..'")
