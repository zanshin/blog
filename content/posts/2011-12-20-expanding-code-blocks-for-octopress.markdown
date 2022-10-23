---
layout: post
title: "Expanding Code Blocks for Octopress"
date: 2011-12-20T13:09:00
comments: true
tags:
- nerdliness
link: false
---
I have always liked code samples in blog postings, but I have never liked the need to scroll horizontally to see the tail end of long lines. In preparing my site for migration from WordPress to Octopress I read and reread [Paul Stamatiou's](http://paulstamatiou.com "Paul Stamatiou") [How to: WordPress to Jekyll](http://paulstamatiou.com/how-to-wordpress-to-jekyll "How to: WordPress to Jekyll") about a dozen times. In that article I admired the expanding view of code examples. When you moused over the code it expanded in width to allow you to see most, if not all, of its width at once. 

It turns out this is relatively easy to accomplish through the use of the CSS hover selector. What is more complicated is getting the expanded content to properly overlay the aside content in the default Octopress theme. After pestering a couple of my work mates (thanks [@gpennington](https://twitter.com/#!/gpennington "Garrett Pennington") and [@worksology](https://twitter.com/#!/worksology "Josh Works")) I now have the proper combination of z-index and position:relative to properly expand the code blocks, even when there is sidebar content involved.

Here is the code I added to my `sass/custom/_styles.scss` to make this all work:

{{< highlight bash  >}}
{% raw %}
article { overflow: visible; }
figure[role="code"]:hover, .gist:hover { width: 800px; overflow: inherit; position: relative; z-index: 2;}
aside[role="sidebar"]  { z-index: 1; }
{% endraw %}
{{< / highlight >}}

This will cause code blocks and embedded gists to expand when the mouse pointer is over them, and if they are along side of aside material, the expansion will be on top of that content as well. Based on any thematic changes you may have made to the default Octopress theme, you may need to adjust the `width` value to suit.
