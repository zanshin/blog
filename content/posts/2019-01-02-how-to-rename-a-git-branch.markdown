---
layout: post
title: "How to Rename a Git Branch"
date: 2019-01-02T22:18:00
tags:
- nerdliness
link:
---
Recently at work, after I had started making changes to a Git repository on a branch, I needed to
rename that branch to share it with others. When I'm working by myself on something I tend to name
branches `mhn/topic` - my initials followed by some relevant topic. Not wanting to share a branch
with multiple other developers that has my initials in it, I needed to rename it.

Step 1. Switch to the local branch you want to rename

    git checkout <old_name>

Step 2. Rename the local branch like so

    git branch -m <new_name>

Step 3. If the branch has already been pushed to the remote repository, then delete the `old_name`
remote branch

    git push origin --delete <old_name>

Step 4. Push the new branch name and reset the upstream branch

    git push origin -u <new_name>

You have now successfully renamed your Git branch.
