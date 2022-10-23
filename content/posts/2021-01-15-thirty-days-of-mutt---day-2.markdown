---
layout: post
title: "Thirty Days of Mutt - Day 2"
date: 2021-01-15T07:10:00
tags:
- nerdliness
link:
---
Yesterday, when I was unable to send email from mutt using msmtp, I solved the issue by replacing
the symbolic link to the `.msmtprc` file with the actual file itself.

In searching for an answer I had posed a question on the mutt IRC channel about the problem, and
overnight I got an answer and an explanation.

"Permission denied" errors are most likely due to AppArmor and a profile that interfere with msmtp.
[msmtp permission errors: disable
apparmor!](https://marlam.de/msmtp/news/msmtp-permission-denied-disable-apparmor/ "msmtp permission
errors: disable apparmor!") explains that by running this command:

    sudo aa-disable /etc/apparmor.d/usr.bin.msmtp

The offending profile can be disabled. I had to install the `apparmor-utils` package before I was
able to run the `aa-disable` command.

After running the command, I deleted the `.msmtprc` file from my home directory and replaced it with
a symlink to the file in my dotfiles repository. Emails are once again sending.

## Reading HTML Email
Nearly all email today has some formatting beyond basic bold or italics. Either they are rich text
format or they have HTML embedded. Some emails might as well be web pages. Besides bloating the size
of the email compared to its meaningful content, HTML emails can be "abused" to provide tracking
information about the recipient. Using images with unique URLs it is possible to know when an email
was opened and by whom. This practice isn't going away, and neither are HTML formatted emails.

Reading HTML emails in a text-based tool in a terminal emulator is a problem. For my mutt setup I
have tried two different text-based web browsers to display these formatted emails: Lynx and w3m.
Neither is 100% successful and making a meaningful display out of the mess of HTML wrapped around
the actual content. They make it possible to read the mail, but interacting with any URLs in the
email is problematic.

For example, I received an appointment confirmation email yesterday. It has, a large "Confirm
Appointment" button you are supposed to click on to say that, "Yes, I'll be at my appointment." In
both Lynx and w3m I could see the image of the button in the source, but not the link itself. I had
to resort to opening the email in the Gmail web interface in order to click the button.

My hope is that I can discovered in the documentation for either of these text browsers a way to
better interact with these web pages masquerading as emails.

## URLVIEW
I have installed `urlview` and a key binding to activate it. This utility displays all the links in
an email as a list, so that you can select one and click on it. Unfortunately, most of the emails
have links that are made up of random letters and numbers - machine generated rather than human
readable.

If I am still unsatisfied with how mutt and HTML emails work (or don't work) together at the end of
the 30 days, that could well be the reason I don't continue using mutt as my email client.
