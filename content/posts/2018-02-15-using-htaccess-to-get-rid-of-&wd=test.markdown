---
layout: post
title: "Using htaccess to Get Rid of &wd=test"
date: 2018-02-15T21:38:00
tags:
- nerdliness
link:
---
Recently I've had a plague of links to my site that end with `/&wd=test` or `/&wd=` with four random
characters. They were causing a large up tick in 404 errors, as none of my posts or pages has `&wd=`
the end.

A week or so ago I setup a `.htaccess` RewriteRule to force any incoming link with the `&wd`
business on the end to my 403 page. Here's the rule:

    RewriteRule "wd=test/?$" "-" [L,F]

This worked like a charm. The only problem was now I was seeing 403 errors instead of 404 errors. I
realize that in this case the work "error" is a misnomer. The error is on the part of the incoming
request, it isn't an error on my site. Still, having all those 403 hits bothered me.

Time for a new RewriteRule:

    RewriteRule (.+?)/\&wd=.*$  https://zanshin.net/$1 [L,R=301]

This one matches `&wd=` plus any number of characters after the equal sign, and it redirects the incoming link to the incoming link minus the spurious `&wd` business.

As for what the `&wd=test` might mean, this is the only English language page I've found that talks
about it at all: [Chinese "Testing" Link Hacking
Attempt?](https://www.webmasterworld.com/webmaster/4880078.htm). My site is static (i.e., there's no
database or online administration function to exploit. Redirecting the `&wd` links to the actual
link seems like a good solution for me and my site.
