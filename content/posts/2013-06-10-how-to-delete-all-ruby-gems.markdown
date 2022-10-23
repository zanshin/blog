---
layout: post
title: "How to Delete All Ruby Gems"
date: 2013-06-10T09:27:00
comments: true
tags:
- nerdliness
link: false
---
For my day job I've been doing a lot of work with [Chef](http://www.opscode.com/chef/ "Chef"), [Vagrant](http://vagrantup.com "Vagrant"), and [veewee](https://github.com/jedi4ever/veewee "veewee"). All of these tools are continually evolving and, over the course of several weeks time, I've updated versions more than once. As a result my set of Ruby Gems was causing some conflicts trying to run `vagrant up` after using veewee.

To clear things up so that I could make better use of [RVM Gemsets](https://rvm.io/gemsets/basics/ "RVM Gemset Basics") to manage what Gems were loaded for a given process, I wanted to delete all Gems installed on my machine. A quick StackOverflow search lead me to this command:

    $ [sudo] gem list --no-version | xargs [sudo] gem uninstall -aIx 

While I've marked `sudo` as optional, you should use them as a pair — either have both of them in the command or neither of them.

Running this command didn't work as expected as it ran afoul of the default gems that are pre-installed with Ruby. Another search lead me to this [gem-reset](https://gist.github.com/nixpulvis/5042764 "gem-reset") Gist on GitHub.

{{< highlight ruby >}}
#!/usr/bin/env ruby
# Remove all gems EXCEPT defaults :)
 
`gem list -d`.split(/\n\n^(?=\w)/).each do |data|
  match = data.match(/(?<name>([^\s]+)) \((?<versions>.*)\)/)
  name = match[:name]
  versions = match[:versions].split(', ')
 
  if match = data.match(/^.*\(([\d\.]*),? ?default\): .*$/)
    next if match[1].empty? # it's the only version if this match is empty
    versions.delete(match[1] || versions[0])
  end
 
  versions.each { |v| system "gem uninstall -Ix #{name} -v #{v}" }
end
{{< / highlight >}}

This script removes all Gems except the ones marked as default. I forked it and used the `wget` option to run it. Once the script completed my machine only had the default gems installed.

For each of my Ruby-based projects I added a `.ruby-gemset` and `.ruby-version` file specifying the gemset name I wanted and the Ruby version desired. Next I visited each project, checked that the gemset was in use, and ran `bundle install` to re-install the gems, this time in managed gemsets.

This not only cleared up the gem conflict I had introduced, but has made seeing and managing my installed Gems easier.
