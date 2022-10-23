---
layout: post
title: "The Internet Never Forgets"
date: 2011-09-01T08:19:00
comments: true
tags:
- nerdliness
link: false
---
When I switched from WordPress to Octopress I heavily edited my .htaccess file on the assumption that no one would still have a bookmark to one of my old posts using an out-dated URL. That assumption was wrong.

In October 2003, for example, I posted a comment on a [Kottke.org](http://kottke.org "Kottke.org") piece about the contents of [your dock](http://kottke.org/03/10/os-x-dock "Your Dock, if you please"). And wouldn't you know, that posting still gets traffic eight years later and that traffic still follows links buried in the comments, one of which [leads to my site](http://www.zanshin.net/blogs/000281.html "What's up, Dock?").

I know all of this thanks to [Mint](http://haveamint.com "Mint") and the [Error Tracker Pepper](http://haveamint.com/peppermill/pepper/47/error_tracker/ "Error Tracker Pepper"). 

So this morning I reassembled my .htaccess file, bringing back in all the old MoveableType redirects, and while I was at it, I added one to catch all the old monthly archive pages too. The MoveableType redirects are specific to my site, but the basic format looks like this {{< highlight bash  MoveableType Redirect >}}Redirect 301 /blogs/######.html https://zanshin.net/YYYY/MM/DD/title-slug/{{< / highlight >}}

I no longer have the script I used to generate these, but it read the meta data for each posting exported from MoveableType in order to match up the meaningless 6-digit posting number with the Year, Month, Day, and post title for each entry.

The monthly archive redirects were easier to deal with as that URL pattern could be neatly fit into a regular expression: {{< highlight bash  Regex Redirect >}}Redirect 301 /blogs/\d{4}_\d{2}.html https://zanshin.net/archives/{{< / highlight >}}

In order to really clean things up I need to create a **categories** page that shows my remaining categories, with links to pages showing the entries for each of those categories, and once that hierarchy is in place, redirect old category links to that page. That will have to wait for another day. Until then the [404](https://zanshin.net/404/ "404") page will have to suffice.
