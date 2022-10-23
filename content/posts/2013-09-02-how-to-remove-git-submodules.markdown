---
layout: post
title: "How to Remove Git Submodules"
date: 2013-09-02T11:18:00
comments: true
tags:
- nerdliness
link: false
---
Removing a [Git submodule](http://git-scm.com/book/en/Git-Tools-Submodules "Git submodule") is nowhere near as easy as adding one. In my projects I typically use a submodule for managing dependencies that are themselves a Git repository. When that dependency goes away it is necessary to remove the submodule. Here's how I go about that task.

First delete the relevant section from the `.gitmodules` file at the root of the parent project. This section will have this format:

{{< highlight properties >}}
[submodule "vendor"]
  path = vendor
  url = git://github.com/some-user/some-repo.git
{{< / highlight >}}

Next stage the `.gitmodules` file.

{{< highlight bash >}}
$ git add .gitmodules
{{< / highlight >}}

Now delete the relevant section from the `config` file located in the `.git` directory at the root of the project. It will look something like this:

{{< highlight properties >}}
[submodule "vendor"]
  url = git://github.com/some-user/some-repo.git
{{< / highlight >}}

Now it's time to use `git rm` to tell Git to stop tracking the submodule.

{{< highlight bash >}}
$ git rm --cached path/to/submodule
{{< / highlight >}}

Be careful not to include a trailing slash on the `git rm` command as it will cause errors.

Now that no longer is tracking the submodule it can be deleted from the file system.

{{< highlight bash >}}
$ rm -rf .git/modules/submodule_name
{{< / highlight >}}

Commit the changes to the repository.

{{< highlight bash >}}
$ git commit -m "Removed <vendor> submodule."
{{< / highlight >}}

Finally you can delete the actual submodule.

{{< highlight bash >}}
$ rm -rf path/to/submodule
{{< / highlight >}}

That's it. The submodule has been completely removed from Git and removed from the file system.
