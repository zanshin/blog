---
layout: post
title: "Force Safari to Put New Tab at End of Tab Bar"
date: 2022-10-04T13:16:00
tags:
- nerdliness
link:
---
By default Safari wants to position any new tab opened after the last related tab. When you are
browsing a site and open links from it in new tabs, having them immediately follow the current one
is nice. However, when you simply want to open a new tab and have it appear at the end of the tab
bar, you have to first position the focus on the current last tab, and then do CMD-T.

By enabling the "Debug" menu in Safari, you can access the "Tab Ordering" options. To enable the
Debug menu run this command in the Terminal.

    defaults write com.apple.Safari IncludeInternalDebugMenu 1

Then quit and reopen Safari. The Debug menu should be listed as the last menu in the Safari menu
bar.

Locate the "Tab Ordering" menu option, and then hover over "Position of New Tabs". There are four to
choose from:

* After Current Tab
* After Related Tabs
* After Last Related Tab
* After Last Tab

Click the option you prefer and your choice should take immediate effect.
