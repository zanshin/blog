---
title: "Converting From Jekyll to Hugo"
date: 2022-11-07T13:05:30-05:00

tags:
  - nerdliness
  - hugo
  - site
---
After several false starts I have successfully converted the backend of my website from Jekyll to
Hugo.

# History
My website has been in existence since sometime in 1995. I purchased my domain in February 1996.
The first weblog, or blog posting, happened in late 1999. Since then I have written another 2,250
postings using a variety of tools. What started out as a hand coded site, moved to Blogger,
then to MoveableType, followed by WordPress, and eventually Octopress. Since 2013 I have been
using Jekyll as the static site generator for this site.

# Motivation
Jekyll has been a good tool, and I have been able to do a lot with it. Its reliance upon a number of
Ruby Gems has always made it a little fragile. Even with a Ruby virtual environment set aside just
for Jekyll I occasionally had problems requiring that I rebuild my Jekyll infrastructure. In June
  2021 I purchased an M1 iMac and I did not install Jekyll on that computer. Instead I switched to
  using a Docker container with Jekyll. This worked well, and it eliminated the Jenga-block stack of
  Ruby Gems required to make everything go.

A few weeks ago I started writing a series of posts about exploring the Rust programming language.
After I published the first posting, I was dismayed to discover that the second post, still in the
`_drafts` folder was also showing on my site. While this may have been an error on my part, it was
enough to spur me on to completing a migration to Hugo.

I had looked at Hugo several times in the past, but never got past the hurdle of converting my
corpus of postings. I did get past that hurdle, and I also ported my site's theme to Hugo.

# Conversion
The [Hugo](https://gohugo.io "Hugo") website has links to a couple of scripts that can be used to convert Jekyll-formatted posts
to the format Hugo expects. Both of them expect fairly generic posts, and neither were capable
of dealing with all of my edge cases.

So I wrote my own conversion tool. Since Hugo is Go language based, I used Go. My tool does a number of conversions:

- It formats dates, regardless of their initial format, to a YYYY-MM-DDTHH:MM:SS format.
- It converts the `category` front matter element to `tags` and creates a list of any tags it finds
- It converts the YouTube shortcode to Hugo’s style
- It converts all `<img … >` tags to Hugo’s style
- It converts all code highlighting to use Hugo’s style

Since Hugo is based on the Go programming language, and since I have been exploring Go for the past
couple of years, it only seemed appropriate that I create a Go program to convert my site's
content. I've shared the result, called [jtoh](https://github.com/zanshin/jtoh "JTOH"), for Jekyll to Hugo, on GitHub.

The program is opinionated and written to complete my conversion. It could be used by others as-is,
or with some modifications to how I resolved differences between the two systems.

At a high level this program reads each posting, converts the post into a string, and then runs a
number of regex (Regular Expression) transforms, along with a couple parsing sub-routines, to
convert front matter and shortcodes. The updated posting is then written out with the same file name
to the specified destination directory.

The two trickiest transformations were the front matter date, and image tags. Due to the variety of
tools used over the past 23 years to create postings, the front matter date formatting varied. Some
postings had just `YYY/MM/DD` while others had `YYYY/MM/DD HH:MM`. After the conversion they all
have `YYYY/MM/DDTHH:MM:SS`.

Image tags were tricky since I needed to identify the source element, and collect all the other
elements, regardless of their order. Using a Go library that parses HTML, I was able to pass the
entire `<img ...>` string to a parsing function, and get back the Hugo image shortcode format
necessary.

I worked on the `jtoh` program on and off for more than two weeks, and ran the conversion repeatedly
against a copy of my content. You can read the [DETAILS](https://github.com/zanshin/jtoh/blob/main/DETAILS.md "DETAILS") readme
file for a deeper dive.

# Templates
Converting my current theme from Jekyll's templating approach to Hugo's template structure did take
some trial and error. In the end what I did was create a new Hugo theme using

{{< highlight shell >}}
hugo new theme mytheme
{{< / highlight >}}

and then copied generic template elements from the `theme` directory to their corresponding
directories at the root of my site's repository. Once I had a working, generic template, I then
added my style sheets, and started tweaking how the templates presented different aspects of my site.

## Archetypes
Hugo allows you to create multiple content types through archetypes. I now have the ability to create
a new posting, a new link post, or a new video link post. Each of those has the same basic front
matter, with some minor differences. Each of these types has it's own directory within the `content`
directory, and within the templates that produce the site it is possible to treat each differently.

I haven't explored different formatting for link or video posts, to distinguish them from my posts,
but I am planning on something to offset them.

## Layout
Under the covers Hugo organizes the templates, static files, and content that make up a site
differently than Jekyll. The layout makes sense and isn't hard to navigate. Here is the overall layout of my site:

{{< highlight shell >}}
├── archetypes
├── assets
│   └── images
├── blog
│   ├── css
│   └── js
├── content
│   ├── links
│   ├── posts
│   └── videos
├── data
├── layouts
│   ├── _default
│   ├── archive
│   ├── partials
│   └── shortcodes
├── resources
│   └── _gen
├── static
│   ├── css
│   ├── fonts
│   └── js
└── themes
    └── blog
{{< /highlight >}}

The templates are all contained in the `layouts` directory. I'm not doing anything outrageous with
my site. What were `_includes` in Jekylle are `partials` in Hugo. The `_default` directory has the
different default pages: the base, overall layout, and then layouts for list pages, single post
pages, and for my, a layout for links and video posts. These layouts make use of the partials to
help keep the HTML DRY. Here is a more detailed look at the layouts directory;

{{< highlight shell >}}
layouts
├── 404.html
├── _default
│   ├── baseof.html
│   ├── link.html
│   ├── list.html
│   ├── page.html
│   ├── single.html
│   └── video.html
├── archive
│   └── single.html
├── index.html
├── index.xml
├── partials
│   ├── aside.html
│   ├── footer.html
│   ├── head.html
│   ├── header.html
│   ├── link-footer.html
│   ├── metadata.html
│   ├── post-footer.html
│   └── scripts.html
└── shortcodes
    └── rawhtml.html
{{< / highlight >}}

The `static` directory, in addition to being the home for CSS and JavaScripts, is also where any file
you want at the root of your site goes. Consequently, I have a `robots.txt` file there, as well as
my `.htaccess` file.

{{< highlight shell >}}
static
├── css
├── favicon.ico
├── fonts
├── js
├── keybase.txt
└── robots.txt
{{< / highlight >}}

# Site Look and Feel
## Font
Previously I was using a Google Font called Lato for my site. Now I'm using two GDPR-compliant fonts
from Bunny Fonts, called [Gotu](https://fonts.bunny.net/family/gotu "Gotu"), and [Cormorant SC](https://fonts.bunny.net/family/cormorant-sc "Cormorant SC"). Gotu is used for all the content, and the small cap Cormorant font is for headings and titles.

I've also bumped up the font size from 16 to 18 pixels, and increased the weight from 300 to 400.
All of these changes make the site easier to read, and refreshes my theme.

## Link Posts
Those posts on my site that lead to some other site are now marked by a pair of chain links. The
title link leads to the other site, while the chain links icon is a link to the posting on my
archive page.

## Sidebar
I've had the same image as the header on my site for more than 20 years. That isn't going away. I
have added a few more links to subdomains my site has. I've had a password strength tester for some
time now, but never had a public link to it. That has been added to the sidebar. I also have a page
with some reference material about CIDR (Classless inter-domain routing) notation, that is now
linked in the sidebar.

## Archive Page
The layout of the archive page still lists posts by year, but it uses an HTML table rather then
unordered lists elements, for better alignment of the columns. I need to add a search function to
this page.

# Benefits
The reason for converting my site was two-fold. One, performance, and two, reduced time spent
maintaining the tool (Jekyll).

## Performance
One of the features touted about Hugo is its performance. On Jekyll, running natively (i.e., not in
a Docker container) it takes ~11 seconds from the time I type `rake watch[drafts]` until the site
has been generated and is ready to be viewed on the local machine.

On Hugo, my site takes 888 ms or 0.8 seconds, to generate the site. Incremental changes, such as
saving this posting, regenerate in anywhere from 100 to 300 ms.

The Docker container was considerably slower. From the time Docker is started until the site is
generated is ~130-140 seconds. Incremental changes are anywhere from 60-90 seconds. Using a
container for Jekyll was obviously not a good choice.

## Reduced Maintenance
As I alluded to above, maintaining a Ruby environment for Jekyll that was walled off from my
other Ruby activities required some effort. Periodically some Gem would get an update, or
Ruby would update and I’d have to rebuild the whole stack again. Usually this wasn’t a problem,
but it was tiresome. I like that Hugo is a single executable.

# Conclusion
I’m pleased with the changes to my site: both behind the scenes and visible to anyone who
visits. Having spent time over several weeks doing the conversion and creating a theme, I
feel like I blew the dust of the site. I am reinvigorated to post more.

I still have a smaller subdomain to convert (only 250-ish posts). With the conversion program I
wrote, and with my own theme ready to go, that migration should be fairly quick and easy.
