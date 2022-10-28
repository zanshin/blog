---
title: "Converting From Jekyll to Hugo"
date: 2022-10-26T08:38:30-05:00
draft: true

tags:
  - nerdliness
  - hugo
  - site
---
After tinkering with, and exploring using [Hugo](https://gohugo.io "Hugo") as the static site generator for my site, on and off,
for more than a year, I have finally taken the plunge and converted. Along the way I learned quite a
  bit about Go language programming, in order to write a program to convert my Jekyll encoded site
  to Hugo encoding. I also had to learn how Hugo templates work, and I spent some time freshening up
  my site's appearance.

# Site Look and Feel
Outwardly my site has the same same look and feel, and it has the same structure. There are subtle
differences.

## Font
Previously I was using a Google Font called Lato for my site. Now I'm using two GDPR-compliant fonts
from Bunny Fonts, called [Gotu](https://fonts.bunny.net/family/gotu "Gotu"), and [Cormorant SC](https://fonts.bunny.net/family/cormorant-sc "Cormorant SC"). Gotu is used for all the content, and the small cap
Cormorant font is for headings and titles.

I've also bumped up the font size from 16 to 18 pixels.

## Link Posts
Those posts on my site that lead to some other site are now marked by a pair of chain links. The
font size for the title is also smaller than a normal post's.

## Sidebar
I've had the same image as the header on my site for more than 20 years. That isn't going away. I
have added a few more links to subdomains my site has.

## Archive Page
The layout of the archive page still lists posts by year, but it uses an HTML table rather then
unordered lists elements, for better alignment of the columns.

# Templating
Converting my current theme from Jekyll's templating approach to Hugo's template structure did take
some trial and error. In the end what I did was create a new Hugo theme using

{{< highlight shell >}}
hugo new theme mytheme
{{< / highlight >}}

and then copying the generic template elements from the `theme` directory to their corresponding
directories at the root of my site's repository. Once I had a working, generic template, I then
added my style sheets, and started tweaking how the templates present different aspects of my site.

## Archetypes
Hugo allows you to create multiple content types through archetypes. I now have the ability to create
a new posting, a new link post, or a new video link post. Each of those has the same basic front
matter, with some minor differences. Each of these types has it's own directory within the `content`
directory, and within the templates that produce the site it is possible to treat each differently.

## Layout
{{< highlight shell >}}
layouts/
├── _default
│   ├── baseof.html
│   ├── link.html
│   ├── list.html
│   ├── page.html
│   ├── single.html
│   └── video.html
├── archive
│   └── single.html
├── partials
│   ├── aside.html
│   ├── footer.html
│   ├── head.html
│   ├── header.html
│   ├── link-footer.html
│   └── metadata.html
├── 404.html
└── index.html
{{< /highlight >}}
