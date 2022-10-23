---
layout: post
title: "Octopress Sidebar Categories"
date: 2012-06-26T09:43:00
comments: true
tags:
- nerdliness
- site
link: false
---
After reading Dan Watson's posting about [listing categories in the Octopress sidebar](http://www.dotnetguy.co.uk/post/2012/06/25/octopress-category-list-plugin/ "Octopress - Catagory list plugin") I implemented it on my site.

Where Dan puts the aside in source/_includes/asides I put it in source/_includes/custom/asides, otherwise I followed his setup to the letter.

As a result of seeing my categories listed with a count of their postings I realized that I needed to do some clean up. When assigning multiple categories I tend to separate them with a comma. Octopress parses on spaces between categories so the trailing comma is treated as part of the category name. So posting something in "apple, nerdliness" results in an "apple," category. 

A simple `grep` command can search through all the postings and return a list of the files that contain one of these comma-added categories:

    grep -H -r "categories: apple," _posts/
	
Some of my mislabeled categories only had one or two postings, one had 49. Not wanting to edit that many postings I used a `find` command to do the work for me.

    find _posts/ -type f | xargs perl -pi -e 's/: apple,/: apple/g'
	
Since this command alters files you should probably do the work on a branch in case you need to revert following unintended changes.

With my categories cleaned up I now have a set of links in my sidebar allowing readers to investigate my site by topics. Now I just need to plow through the catch-all category (life) and properly tag those entries.
