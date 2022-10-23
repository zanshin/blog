---
layout: post
title: "How to Build an RSS Feed for Jekyll"
date: 2013-11-08T13:21:00
tags:
- nerdliness
link:
---
An RSS feed is nothing more than an XML document following a known format. Adding one to a Jekyll site is relatively easy and straight forward. As with all changes to your site's structure it's best to use your version control system to create a branch in case something goes horribly wrong.

Start by creating a new file at the root of your website. It should be a peer to your `index.html` file. Since the previous version of my site called the feed `atom.xml` that's what I called it for the Jekyll version. The XML file has some meta information about the feed and then a loop which creates entries.

{{< highlight xml >}}
{% raw %}
---
layout: nil
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

  <title type="text" xml:lang="en">{% site.rss_desc %}</title>
  <link type="application/atom+xml" href="https://zanshin.net/feed/" rel="self" />
  <link type="text" href="https://zanshin.net" rel="alternate" />
  <updated>{% site.time | date_to_xmlschema %}</updated>
  <id>https://zanshin.net</id>
  <author>
    <name>Mark H. Nichols</name>
  </author>
  <rights>Copyright (c) 1996-2013, Mark H. Nichols; all rights reserved.</rights>

  {% for post in site.posts limit:20 %}
  <entry>
    <title>{% post.title %}</title>
    <link href="https://zanshin.net{% post.url %}" />
    <updated>{% post.date | date_to_xmlschema %}</updated>
    <id>https://zanshin.net{% post.id %}</id>
    <content type="html">{% post.content | xml_escape %}{% include rss_footer.html %}</content>
  </entry>
  {% endfor %}
</feed>
{% endraw %}
{{< / highlight >}}

You of course will need to change the site references to match your site, along with the author information.

Within the `for` loop that builds the individual entries this line is worth extra attention.

{{< highlight xml >}}
{% raw %}
    <content type="html">{% post.content | xml_escape %}{% include rss_footer.html %}</content>
{% endraw %}
{{< / highlight >}}

All content must be escaped for XML. Here the `post.content` passes through a Liquid filter that properly escapes angle brackets and quotes for XML. I've added a footer that appears only in my RSS feed. Since this does not pass through the `xml_escape` Liquid Filter like `post.content` does, I had to make sure that it was properly escaped. The `rss_footer.html` files is in my `_includes` directory.

{{< highlight html >}}
{% raw %}
&lt;hr /&gt;
  &lt;p&gt;
    You should follow &lt;a href=&quot;http://twitter.com/zanshin&quot; title=&quot;Follow me on Twitter&quot;&gt;me on Twitter&lt;/a&gt; and on &lt;a href=&quot;http://alpha.app.net/zanshin&quot; title=&quot;Follow me on App.net&quot;&gt;App.net&lt;/a&gt;. You should also subscribe to &lt;a href=&quot;http://twitter.com/zanshinnet&quot; title=&quot;@ZanshinNet on Twitter&quot;&gt;@ZanshinNet&lt;/a&gt; on Twitter for site updates.
  &lt;/p&gt;
{% endraw %}
{{< / highlight >}}

It looks ugly but it works. 

With the `atom.xml` file in place (and the `rss_footer.html` file too, if you are using one) simply regenerate your site and the feed will be created. 
