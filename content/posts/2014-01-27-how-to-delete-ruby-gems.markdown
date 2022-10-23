---
layout: post
title: "How to Delete Ruby Gems, Part II"
date: 2014-01-27T22:50:00
tags:
- nerdliness
link:
---
Back in June I wrote about [how to delete Ruby
gems](https://zanshin.net/2013/06/10/how-to-delete-all-ruby-gems/ "How To Delete Ruby Gems") and
presented a solution that involved a short script. Recently I went through another round of cleaning
up Gems and discovered and even shorter method for deleting them.

    for i in `gem list --no-versions`; do gem uninstall -aIx $i; done

This will ignore all default Gems errors. Simple and direct. 

The flags specified with the `gem uninstall`, `-aIx` mean the command will remove all matching
versions (`-a`), will ignore dependency requirements (`-I`), and will remove executables without
needing confirmation (`-x`). You can read more about `gem uninsall` on the [RubyGems
Guide](http://guides.rubygems.org/command-reference/#gem_uninstall "gem uninstall - Command
Reference - RubyGems Guide").

