---
layout: post
title: "Git Commit Picture"
date: 2012-06-26T14:22:00
comments: true
tags:
- nerdliness
link: false
---
The other day I ran across Victor Martínez's posting about [taking your picture every time you commit](http://coderwall.com/p/xlatfq?i=9&p=1&q= "Take a photo of yourself every time you commit"). The process is simple enough, you install [imagesnap](http://github.com/alexwilliamsca/imagesnap "imagesnap") via brew and then add a post-commit hook to any Git repository where you want to record commit pictures.

Victor's posting also links to a tool you can use to assemble these still images into a video. I'll have to wait to have a collection of snapshots before experimenting with creating a video.

The only caveat I can see to this technique is that it imposes a dependency on the `imagesnap` tool. In the case of this site's repository virtually all of the work is done from a single machine so I don't need to worry about this dependency too much. However, if I ever move to a new machine I'll need to instal `imagesnap` there as well.
