---
title: "How to Remove Outdated Local Git Branches"
date: 2024-04-17T07:13:18-05:00

tags:
- TIL
- Git
- How To
---
To clean up local Git branches that no longer exist on the upstream repository, you can run these
commands.

## Update your working copy
To start, make sure your working copy is up to date.

    git fetch --prune

The `--prune` option removes and remote tracking references that no longer exist on the remote
repository.

## Discover which branches are already merged
By running

    git branch

You get a list of all the branches on your working copy. Using the `--merged` flag, filters that
list to show only those branches that are already merged into the `main` or `master` branch.

    git branch --merged

## Delete all merged branches
To delete all the merged branches from your working copy, run this command.

    git branch --merged | egrep -v "(^\*|master|main)" | xargs git branch -d

The list of merged branches is piped to an `egrep` command that eliminates the `master` or `main`
branch, as we don't want to delete those. The remaining branch names are pipes to the `git branch
-d` command, which deletes them.

## Notes
Whenever I find a command or set of commands online, that purport to accomplish some task, I always
break the command down, and execute each stage of it, to make sure I understand what it is doing,
and to ensure that it does what the author claims. Trust, but verify.
