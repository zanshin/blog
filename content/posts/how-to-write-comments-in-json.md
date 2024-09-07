---
title: "How to Write Comments in Json"
date: 2024-06-09T14:52:07-05:00

tags:
- JSON
---
I spend a lot of time working in either JSON or YAML while building out
infrastructure in AWS. I prefer YAML as I find it less cumbersome to type and
it allows for comments.

Today on Mastodon I saw [this
posting](https://mastodon.social/@deech/112575032110299043) that illustrates a
way to put comments into JSON.

{{< highlight json >}}
{
    "//": [
      "I am a comment",
    ],
    ...
}
{{< / highlight >}}

Cumbersome, but effective. 

