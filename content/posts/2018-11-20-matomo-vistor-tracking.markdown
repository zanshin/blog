---
layout: post
title: "Matomo Vistor Tracking"
date: 2018-11-20T10:29:00
tags:
- nerdliness
link:
---
After reading Kev Quirk's series [De-Googleing My Life](https://kevq.uk/category/de-googling/
"De-Googleing My Life"), specifically the posting about
[Analytics](https://kevq.uk/de-googling-my-life-02-analytics/ "Analytics"), I decided to investigate
[Matomo](https://matomo.org "Matomo").

For the past 13 years I've been using [Mint](https://haveamint.com "Mint") to track visitors and
activity on my website. Mint is no longer under development and support has been suspended as well.
Fortunately it still works perfectly for my purposes. But the demo for Matomo looked nice and since
it was free I decided to give is a try.

Installation was very straightforward and adding in the JavaScript tracking code to my site was
simple. After waiting impatiently for some traffic, I was able to start comparing Matomo to Mint. I
like that Mint always shows you the total unique visits and page views for all time. Matomo can show
you those figures, but you have to change the date range filter to get there. Matomo does have an
up-to-date geo-location database, and a real-time map feature, which is nicely geeky.

After running Matomo for a couple of weeks I've added codes to my various subdomains and another
top-level domain. Adding in new sites to track is very quick and easy. Type in a human friendly name
for the site, add its URL and then paste the generated JavaScript code in the `<head></head` block
  on the site. Mint had, when it was still for sale, a $30 ($29?) fee per top-level domain. This
  wasn't a huge problem for my tiny little corner of the Internet, but it is nice to be able to add
  multiple sites to one tracking tool.

I'm not going to abandon Mint - at least not while it is still working. It's tracked the 1,012,936
visitors I've had since December 2005 beautifully. I hope to still be using when I reach 2,000,000
visitors. Having Matomo in addition to Mint gives me a second way to slice and dice visitor data.
One that is completely under my control.
