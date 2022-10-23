---
layout: post
title: "Pagination Part Deux"
date: 2011-09-05T12:55:00
comments: true
tags:
- nerdliness
link: false
---
Recently I wrote about [pagination](https://zanshin.net/2011/09/04/pagination/ "Pagination") issues I was having on my site. It turns out they were entirely my fault. The process of updating the Octopress framework that my sites rests upon has three steps, and in the most recently update I performed I only completed one of those steps.

Whoops.

The first step is to pull the latest changes from the ur-Octopress repository via a **git pull** command:
{{< highlight bash  >}}
$ git pull octopress master
{{< / highlight >}}

This updates the core components of Octopress but does not update the SASS theme files or the source files that you may have altered in creating your site. In order to safely allow for updates to the theme and the source files that use the theme, there are two **rake** commands you must run. Each makes a copy of the existing SASS or source files so that you can reapply any modifications you may have made. 
{{< highlight bash  >}}
$ rake update_source
$ rake update_style
{{< / highlight >}}

When I only ran the git pull I introduced a new version of the pagination code. Code that required the HTML source be updated as well. Since I didn't run the update\_source command, my site was still using the previous pagination HTML. Once I completed a full update cycle, my site's pagination was working properly.

The moral of the story is, understand the consequences of not following all the directions. 
