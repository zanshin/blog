---
title: "Script to Create Hugo Post"
date: 2022-10-30T22:02:46-05:00

tags:
- hugo
---
When I was using Jekyll to build and deploy this site, I had a Rakefile setup that let me perform a
number of common tasks. By typing `rake <action>`, where action was `draft` or `publish` or
`deploy`, I could create a new post, publish a draft, or deploy the site to my web
host.

I want to have the same kind of ease with Hugo. As a first step I have created a small Bash script
that creates a new post and then opens it in my editor.

Here's the script.

{{< highlight bash >}}
function hnew() {
    str="$*"
    # replace alphanumeric words with a dash, compress repeated dashes to a single
    # dash, replace capital letters with lower case
    post=$(echo $str | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z.md).md
    hugo new posts/$post
    nvim content/posts/$post
}
{{< / highlight >}}

- `$*` is everything that was typed after the function name, i.e., the title desired for the new
posting.
- `sed 's/[^[:alnum:]]/-/g'` converts alphanumeric words to a single dash
- `tr -s '-'` compresses multiple dashes to a single dash
- `tr A-Z a-z.md` replaces capital letters with lowercase letters

Once the post has been created, it is opened in Neovim, ready to be edited.
