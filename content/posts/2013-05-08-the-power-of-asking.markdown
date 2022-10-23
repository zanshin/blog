---
layout: post
title: "The Power of Asking"
date: 2013-05-08T14:06:00
comments: true
tags:
- nerdliness
link: false
---
Four years ago, in April 2009, I joined [GitHub](http://github.com "GitHub"). Whenever possible I use 'zanshin' as my account name, however someone else had beaten me to that account on GitHub. So I used my fall-back acccount option, 'zan5hin'.

Periodically I would visit [http://github.com/zanshin](http://github.com/zanshin "http://github.com/zanshin") to see if the account was being used. Other than an initial project that had long since gotten stale, there was no activity. Moreover, there was no profile information so I had no way to contact the erstwhile owner to see if they would be willing to relinquish the account name to me. 
This past weekend I sent an email to GitHub support asking for their help in contacting the owner. Here is the email I received today in response to my request:

>Hi Mark,
>
>Sure! We happily release unused usernames into the wild. I've reviewed this account, and deemed it dusty. I've made the username available to you. If you wanted to create an organization, the name will be available. It's not reserved, though, so someone else might swoop in and take it if you hesitate too long!
>
>You can change your username by going to Account Settings &gt; Account Admin &gt; Change your username.
>
>Be aware, after you change your name, you will need to update the remotes in any local clones of your repos to point at your new repo URL. Please don't hesitate to let us know if you have any questions or concerns.
>
>Thanks, 
>Sara

Needless to say I immediately changed my account name from 'zan5hin' to 'zanshin'. And started the necessary changes to my remotes.

In case you ever need to change the URL for a remote here's the command to use:

    $ git remote set-url <remotename> git@github.com:<youraccountname>/<repo>

Oh, and don't forget to change your `/gitconfig` to relfect your new GitHub account name.
