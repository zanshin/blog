---
title: "How to Split a Subfolder Into a New Repository"
date: 2023-04-14T10:48:33-05:00

tags:
- github
- git
- howto
---
Recently at work I had to split a sub-folder in a repository into its own repository. I wanted to
keep the commit history. My search online led me to [Splitting a subfolder out into a new
repository](https://docs.github.com/en/get-started/using-git/splitting-a-subfolder-out-into-a-new-repository
"Splitting a subfolder out into a new repository") on the GitHub Dos site.

The instructions there are very good. In a nutshell what I did was this.

* Installed the [git-filter-repo](https://github.com/newren/git-filter-repo "git-filter-repo") tool.
* Cloned the original repository to a working directory with the name I wanted for the new
  repository.
* From inside the root of the new clone, ran the `git filter-repo --path FOLDER-NAME/` command.
* Created a new repository with the desired name on GitHub.
* Used the commands provided to add the appropriate remotes to the new repository and pushed it to
  GitHub.

In all the process took about 5 minutes. Not something I'll do every day, but it is nice to know it
is possible.
