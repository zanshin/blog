---
title: "Setting Up Umami Site Tracking"
date: 2023-12-18T07:53:48-06:00

tags:
- Tracking
- Umami
- Visitors
---
In December 2005 I purchased a license for Mint, a website visitor tracking tool. Written in PHP and
utilizing JavaScript, it was an elegant approach to understanding what kind of traffic your website
was getting. Mint hasn't been developed in ten years, and is no longer supported. I have had to
patch the source code a couple of times in recent years to keep it functioning. Mint showed you
visit (by hour, day, week, month, or year), session information, referrers, pages viewed, and
information about the browser/platform used by the visitor. The site layout was beautifully
constructed and a joy to use. Mint also allowed for plugins, called Peppers. There was at one time a
fairly active set of Peppers you could add to gain further insight into your site's visitors.

Both my wife and I have used and continue to use Mint. Largely since the current crop of visit
tracking services or products are all aimed at competing with Google Analytics. They are complex and
have noisy interfaces, and generally aren't useful for our purposes. I have been looking for a new
site tracking tool for years, but haven't found one I liked. That is until I happened on to
[Umami](https://umami.is "Umami").

The interface is simple, and, as my wife put it, "highly clickable". It doesn't try to be the next
Google Analytics, but it does provide lots of useful information for owners of small websites. Visit
counts, pages viewed, visit duration, and information about their location and browsers. Even
better it is respectful of data privacy, and meets EU GCPR requirements. There is a cloud service
and a self-hosted option.

Signing up for the cloud service was quick an easy. Once you add a site a tracking code is generated
that you add to the HTML `<head>` section of your page. For my site, which is statically generated
using [Hugo](https://gohugo.io "Hugo") adding the tracking code was simple. Adding the code to
WorkPress for my wife's site was a bit more complicated.

Her site uses a free version of a highly customize-able theme, which makes adding code, ah, tricky.
There is a plugin called "Integrate Umami" that purports to insert the tracking code into your
WordPress site, but I was unable to get it to work. Instead I found another plugin called
[WPCode](https://wordpress.org/plugins/insert-headers-and-footers/ "WPCode") that lets you, among
other things, insert code into the `<head>` section of your site. That solved the problem of getting
the tracking code for my wife's site in place.

We've only had Umami for two days now, so it is too early to tell how satisfied we'll be in the long
term, but our initial reaction is positive. For now I'm leaving our creaky Mint infrastructure in
place. It'll be interesting to compare the numbers between Mint and Umami. Umami also provides some
API documentation, it might be interesting to see if I can import at least some of the history from
Mint into Umami.
