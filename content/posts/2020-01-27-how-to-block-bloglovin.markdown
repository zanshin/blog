---
layout: post
title: "How to Block Bloglovin"
date: 2020-01-27T09:00:00
tags:
- nerdliness
link:
---
Last night, while reviewing the visitor logs for my site, I noticed several hits from
`frame.bloglovin.com`. I'm always curious to see where visitor to my site are coming from, so I
clicked on the link that had brought them to my site and saw this.

![BlogLovin' Subscribe image](https://zanshin.net/images/blsubscribe.png "BlogLovin' Subscribe
image")

My initial reaction was WTF?

There's no obvious way to dismiss that subscribe dialog, but when I clicked on the site behind it
the dialog went away. The page behind it had this as its header.

![BlogLovin' Frame image](https://zanshin.net/images/blframe.png "BLogLovin' Frame image")

They aren't scraping my content and claiming it as theirs, but they are presenting it through their
site, with their header. I was not pleased.

A quick search led me to a couple of articles about BlogLovin'. The verdict is that, while perhaps
not 100% sketchy, they are pushing it. It appears they add comments, through their site, to my
content. [The Ultimate Guide to BlogLovin'](https://allyssabarnes.com/bloggers-guide-bloglovin/ "The
Ultimate Guide to BlogLovin'") actually reversed their standing on the service. Over at [BlogLovin'
is Now Stealing Your Posts](https://www.nosegraze.com/bloglovin-is-stealing-posts/ "BlogLovin' is
Now Stealing Your Posts") there is evidence that BlogLovin' is actively claiming content that isn't
there's.

Toward the end of the second post there was reference to how to block BlogLovin' on Nginx using
`$http_user_agent` and a link to a (now defunct) article about doing the same with Apache based
servers.

I did another search and learned how to block access to my site by testing the `User-Agent` property
in the request. Here's a sample of the code to be placed in the `.htaccess` file.

    <IfModule mod_setenvif.c>
      SetEnvIfNoCase User-Agent (bloglovin) bad_user_agents

      Order Allow,Deny
      Allow from all
      Deny from env=bad_user_agents
    </IfModule>

This test is case insensitive, and since the matching string isn't prefixed with a `^` the string
can occur anywhere in `User-Agent`.

There have only been five total visits to my domain through BlogLovin', all within the past week.
Roughly a week ago I resurrected a long dormant subdomain, and the scraped content was all from that
site. I added the `htaccess` directive to my main domain, and to the subdomain that was being
scraped. Now I'll have to wait and see if any 403 errors are produced.

It's self-entitled liberties like this that make the World Wide Web frustrating at times.

If you want to keep up with my publishing, click the RSS icon at the bottom of the page and add me
to your RSS feed.
