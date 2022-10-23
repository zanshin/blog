---
layout: post
title: "How to Display a Neatly Formatted Path"
date: 2013-09-08T21:43:00
comments: true
tags:
- nerdliness
link: false
---
The following function displays your `PATH` environment variable using color
coding and showing each path entry on its own line.
{{< highlight bash >}}
    path() {
      echo $PATH | tr ":" "\n" | \
        awk "{ sub(\"/usr\",   \"$fg_no_bold[green]/usr$reset_color\"); \
               sub(\"/bin\",   \"$fg_no_bold[blue]/bin$reset_color\"); \
               sub(\"/opt\",   \"$fg_no_bold[cyan]/opt$reset_color\"); \
               sub(\"/sbin\",  \"$fg_no_bold[magenta]/sbin$reset_color\"); \
               sub(\"/local\", \"$fg_no_bold[yellow]/local$reset_color\"); \
               sub(\"/.rvm\",  \"$fg_no_bold[red]/.rvm$reset_color\"); \
               print }"
    }
{{< / highlight >}}
Here's a sample of the output:

![Image of formatted path](https://zanshin.net/images/path.png)

I find this function to be particularly useful when dealing with
[RVM](https://rvm.io "RVM") and [Homebrew](http://brew.sh "Homebrew") as they
are both particular about where in the `PATH` they occur.
