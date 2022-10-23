---
layout: post
title: "Xcode New Project Template Copyright"
date: 2011-12-12T14:57:00
comments: true
tags:
- nerdliness
link: false
---
When you create a new project in Xcode the generated files all include a bit of
copyright information for you. There are two places Xcode looks to gather the
company information used: your address book entry, and the Xcode plist. If
a company name is found in your address card entry that name is used. If no
name is present, Xcode creates a new dict entry in the plist and fills it with
"My Company Name" for you. If both entries are present the plist entry wins.

To see what may (or may not) be in your plist run this _defaults read_ command:

{{< highlight bash  >}}
defaults read com.apple.Xcode PBXCustomTemplateMacroDefinitions -dict ORGANIZATIONNAME
{{< / highlight >}}

If there isn't an entry for ORGANIZATIONNAME you'll get an error, otherwise
you'll see the current value.

To set ORGANIZATIONNAME to a different value run this _defaults write_ command:

{{< highlight bash  >}}
defaults write com.apple.Xcode PBXCustomTemplateMacroDefinitions -dict ORGANIZATIONNAME "your value here"
{{< / highlight >}}

Rerunning the read command now should show you the new value for
ORGANIZATIONNAME.

The information for this posting cam from this Apple Developer forum [discussion](https://discussions.apple.com/thread/2359598?start=0&tstart=0 "discussion").
