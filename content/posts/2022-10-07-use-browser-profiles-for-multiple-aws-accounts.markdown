---
layout: post
title: "Use Browser Profiles for Multiple AWS Accounts"
date: 2022-10-07T13:53:00
tags:
- nerdliness
link:
---
AWS allows the use of multiple accounts to help separate billing, business units, functional items,
etc. One downside to multiple accounts is needed to sign into and out of accounts to access the AWS
resources or functions you need.

My employer has multiple accounts that I use on a daily basis:

- Dev
- Sandbox
- Prod
- Shared

Until today I made use of multiple browsers and incognito windows to be able to be signed into
multiple accounts at one time. A lunch time conversation with a former collegue clued me into
browser profiles.

A browser profile is a complete encapsulation of all the settings, bookmarks, browsing history,
etc., for an identity. Using different profiles, one for each AWS account, it is possible to be
signed into several AWS accounts simultaneously, without resorting to private windows or using
several different browsers.

It appears that Firefox, Chrome, and Brave all support profiles. Brave is based on Chrome, so I
suspect any browser using Chromium will also support profiles.

Brave, at least, adds a "Profiles" menu, that lists all the profiles allowing quick access to any of
the others. Even better, by adjusting the theme / color scheme for each profile you can visually
separate them. Green for dev, yellow for test, and red for production.

Browser profiles makes multiple AWS accounts much less work.
