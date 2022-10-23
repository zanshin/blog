---
layout: post
title: "Xcode Project Template Copyright Fixed"
date: 2012-08-31T08:49:00
comments: true
tags:
- nerdliness
- apple
link: false
---
The latest version of Xcode, 4.4.1 (4F1003), addresses the issue of organization name and copyright. Previously the copyright information was collected from your address book entry. In my case I had a single address card for myself that included my employer's name. Every new project I'd create in Xcode spammed my employer's name into the project's copyright line. Through an obscure [_defaults write_](https://zanshin.net/2011/12/12/xcode-new-project-template-copyright/ "Xcode New Project Template Copyright") command I was able to force the organization name to be me.

With the release of version 4.4.1 you no longer need to worry about organization name. The new project creation panel allows you to set an organization name per project. This value is used for the "Created by" attribution line as well as for the "Copyright" line in the header on each file created for your project.

![Xcode now lets you set an organization name at project creation time](https://zanshin.net/images/organization_name.png)
