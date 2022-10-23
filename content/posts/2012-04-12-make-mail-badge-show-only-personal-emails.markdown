---
layout: post
title: "Make Mail Badge Show Only Personal Emails"
date: 2012-04-12T08:07:00
comments: true
tags:
- nerdliness
- apple
link: false
---
Recently there was an excellent hint on [Mac OS X Hints](http://hints.macworld.com "Mac OS X Hints") about how to [show only personal emails](http://hints.macworld.com/article.php?story=20120405234513127 "Make Mail badge report only personal emails") in the badge on the Apple Mail icon. I liked the hint enough that I've implemented it on my machine, with a slight modification as I have multiple mail accounts and wanted personal emails from two of those to aggregate into the unread badge.

The first step is to create two new mail rules for each account that receives personal email. You can create a new rule by choosing **Mail > Preferences > Rules** and then clicking on "Add rule". One rule will flag previous senders and the other senders who are already in your address book. I named my rules "flag account previous senders" and "flag account address book" where "account" is my name for the given account. The "previous senders" rule should have the following selections made:

* The rule should match **all** of the following conditions
* "Sender is in my Previous Recipients"
* "Message is in Mailbox: account"
* "Perform action" : flag emails with a gray flag (which is the least obtrusive)

The "address book" variation should have these selections made:

* The rule should match **all** of the following conditions
* "Sender is in my Address Book"
* "Message is in Mailbox: account"
* "Perform action" : flag emails with a gray flag (which is the least obtrusive)

The reason for splitting these rules apart is so that we can filter by account. My address book contains the email addresses of my co-workers, and if these rules are combined as shown in the Mac OS X Hints article, you will end up flagging work emails.

Repeat this pair of rules for each account that gets personal mail.

The next step in the article is to create a smart mailbox that uses the "previous sender" and "address book" rule pairs. Since I have 4 email accounts set up in mail, two of which are personal accounts, one of which is for mailing lists, and my work account; I needed two smart mailbox rules -- one for each personal account.

Create a smart mailbox called "Relevant account email" where account is the name of the first personal account. You can create a smart mailbox by choosing **Mailbox > New Smart Mailbox**. Specify that emails in the smart mailbox should satisfy **all** of the following conditions:

* Email should be unread ("Message is unread")
* Flagged ("Message is flagged")
* In your account inbox ("Message is in Mailbox: account")
* Has been sent directly to you ("Any recipient contains myemail@mydomain.tld")

Repeat these steps for each account that receives personal email you wish to aggregate into your unread mail badge. Since the smart mailbox filters on account, emails in the work account which would have been flagged by a combined rule above, would not be shown in the badge. However they would still be needlessly flagged.

Next create a smart mailbox to "sum" the counts from the "Relevant" smart mailboxes. (**Mailbox > New Smart Mailbox**.) Call this smart mailbox "Mail Badge". Add the following condition once for each "Relevant" mailbox you created in the previous step.

* "Message is in Mailbox: Relevant account# email" 

Finally go to the General Mail preferences (**Mail > Preferences > General**), and set "Dock unread count" to be the "Mail Badge" smart mailbox.

The mail badge will now count unread personal emails. You will no longer be nagged by unread work emails over the weekend or while on vacation.
