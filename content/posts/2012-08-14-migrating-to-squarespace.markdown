---
layout: post
title: "Migrating to Squarespace"
date: 2012-08-14T13:40:00
comments: true
tags:
- nerdliness
link: false
---
In January 2008 I created a website for my wife's piano studio. While we've made lots of content changes to the site in the past four years the design of the site has been largely unchanged. For the past few weeks Sibylle and I have been exploring different themes and options for updating her site. After much deliberation we decided to use [Squarespace](http://squarespace.com "Squarespace"). 

Squarespace sits somewhere in between a hand-coded site and a WordPress site. Your membership includes access to a couple dozen beautiful themes, a custom content management system (CMS), and a set of drag-and-drop controls that let you assemble the pages you want on your site. By switching to Squarespace we were able to combine her static, hand-coded studio site with her WordPress backed piano pedagogy centric blog, and do so in a way the will let her manage all the content on her site. Previously she had to rely on me to make changes to her studio site.

Using the free 14-day trial we were able to experiment with several different styles until we found one we liked. Next we created pages to match her studio site and copied over the content. Pages on Squarespace are assembled from blocks. There are different blocks for different content: images, videos, text, calendars, picture galleries, et cetera. By breaking the page content into blocks you can rapidly drag-and-drop the block to rearrange their order, whether the site is one column or two, whether images are page width or have text wrapped around them.

It is possible, and very easy, to import content from WordPress (and other popular blogging systems) to Squarespace. Just by providing the WordPress site URL and the administrator id and password all of her blog entries were migrated to the new CMS.

Where this got complicated was in handling the relationships between our name server ([NameCheap](http://namecheap.com "NameCheap")), our primary hosting service ([WebFaction](http://webfcation.com "WebFaction")), and [Squarespace](http://squarespace.com "Squarespace"). 

There are three major components to her site: the site itself, an email account for her studio, and a visitor analytics package called [Mint](http://haveamint.com "Mint"). Since Squarespace doesn't provide email and doesn't provide any way to install an instance of Mint, those two components will remain on WebFaction's servers. Through the arcane magic of DNS records web requests to her site can be directed to Squarespace, while requests for the Mint installation go to WebFaction. And all email goes to WebFaction's email servers.

Had her studio site been a subdomain, e.g., **studio.**example.com instead of a root domain, e.g., example.com, I could have used what WebFaction calls "DNS Overrids" to direct web traffic to the subdomain over to Squarespace. Since her site does live at the root of the domain I was required to make the changes upstream, at NameCheap. 

NameCheap allows you to configure the underlying DNS records only if you use their name servers. If you are using a 3rd party's name servers then you have to make the DNS record changes at that 3rd party. So the first step was to switch her domain's name servers back to NameCheap. This was very easy to do - select one check box and click save. 

With NameCheap's servers activated I now had access to all DNS records for the site. To direct web requests to the new Squarespace site I needed to configure both a Cname record and an A record entry. The A (address) record consist of the IP address for Squarespace (65.39.205.57). The Cname record gives the Squarespace alias, `www.squarespace6.com`.

To direct traffic for the Mint instance her site relies upon I used the sub-domain settings section to pair the `mint` subdomain with her site's WebFaction IP address (108.59.4.77).

To cause mail to be handled by WebFaction I needed to add three MX records, one each for `mx7.webfaction.com`, `mx8.webfaction.com`, and `mx9.webfaction.com`.

Once these configuration changes were made and saved on the NameCheap host records page we got to wait for the DNS system to propagate the changes. I don't know what the time-to-live (TTL) value was prior to my changes, but the changes I made all had a TTL of 1800 seconds or 30 minutes. The TTL countdown starts on each server when it receives the request. You have to wait while all the DNS servers get the request, countdown and then make the change.

Hopefully once the dust settles Sibylle will have a beautiful new site served by Squarespace, visits to her site will be analyzed by Mint served by WebFaction, and her email will continue to flow through WebFaction. 
