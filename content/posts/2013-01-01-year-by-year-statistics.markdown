---
layout: post
title: "Year by Year Statistics"
date: 2013-01-01T08:39:00
comments: true
tags:
- nerdliness
link: false
---
With the turn of a new year I was curious how many postings I made in the past 12 months, and how many words I had written on my sites.

Counting the number of postings is simple, it's just the number of files in my `_posts` folder.

{{< highlight bash >}}
$ cd path/to/source/_posts
$ ls -l | grep 2012 | wc -l
{{< / highlight >}}

Counting the number of words contained in those files with a `2012` in the name was a bit trickier, but a couple of searches and two Stack Overflow answers combined gave me this:

{{< highlight bash >}}
$ cd path/to/source/_posts
$ find . -name "*2012*" -maxdepth 1 -print0 | xargs -0 cat | wc -w
{{< / highlight >}}

Armed with these two commands I decided it would be fun to see, year by year, the number of postings made and words written.

<table cellspacing="35px" cellpadding="25px">
	<tr>
		<th>Year</th><th>Posts</th><th>Words</th>
	</tr>
	<tr><td>2012</td><td>182</td><td>43,312</td></tr>
	<tr><td>2011</td><td>216</td><td>43,308</td></tr>
	<tr><td>2010</td><td>37</td><td>13,270</td></tr>
	<tr><td>2009</td><td>85</td><td>34,890</td></tr>
	<tr><td>2008</td><td>222</td><td>81,620</td></tr>
	<tr><td>2007</td><td>214</td><td>56,309</td></tr>
	<tr><td>2006</td><td>451</td><td>116,573</td></tr>
	<tr><td>2005</td><td>180</td><td>58,483</td></tr>
	<tr><td>2004</td><td>175</td><td>58,739</td></tr>
	<tr><td>2003</td><td>198</td><td>65,927</td></tr>
	<tr><td>2002</td><td>88</td><td>79,284</td></tr>
	<tr><td>2001</td><td>21</td><td>9,344</td></tr>
	<tr><td>2000</td><td>10</td><td>5,110</td></tr>
	<tr><td>1999</td><td>5</td><td>1,117</td></tr>
</table>

My Cello site is much younger, but here are the year by year statistics for it as well.

<table cellspacing="35px" cellpadding="25px">
	<tr>
		<th>Year</th><th>Posts</th><th>Words</th>
	</tr>
	<tr><td>2012</td><td>197</td><td>36,892</td></tr>
	<tr><td>2011</td><td>30</td><td>8,665</td></tr>
	<tr><td>2010</td><td>60</td><td>22,838</td></tr>
	<tr><td>2009</td><td>18</td><td>8,516</td></tr>
</table>

Combined, I've written 2,274 posts containing 693,865 words.
