---
layout: post
title: "Why Using Your Gmail Address as Your Username is a Bad Idea"
date: 2020-04-04T08:26:00
tags:
- nerdliness
link:
---
Gmail, or Google Mail, was famously announced on April 1, 2004. April Fool's Day. Free email with
unlimited storage. Initially you had to be invited to get an account. I desperately wanted to have a
Gmail account and finally managed to cage an invitation through Matt Haughey, whom I knew of through
his web site [A Whole Lotta Nothing](https://a.wholelottanothing.org "A Whole Lotta Nothing"). I got
my first Gmail address in June 2004, and I've been using it to one degree or another ever since.

There are [email standards](https://en.wikipedia.org/wiki/Email_address#Local-part "email
standards"). One of those standards is that, while the local part of your address - the bit
preceding the at sign - can contain a dot (`.`), the dot cannot be the first or last character, and
it cannot be repeated, e.g, `joe..user@example.com`. The local part of the address needs to be
unique with in the domain. You can't have two `bob@example.com` email addresses that go to two
different people.

Google breaks this rule in a subtle way. They allow any and all variations, involving dots, of your
local part to resolve as your account. An example will make this clearer. Joe User signs up with
Gmail. He picks `joe.user@gmail.com` as his address. He will get mail addressed to
`joe.user@gmail.com`. He will also get the email addressed to any of these variations:

    joeuser@gmail.com
    j.o.e.user@gmail.com
    joe.u.s.e.r@gmail.com
    j.o.e.u.s.e.r@gmail.com

And so on. Google says "[dots don't matter in Gmail
addresses](https://support.google.com/mail/answer/7436150?hl=en "Dots don't matter in Gmail
addresses")".

> If someone accidentally adds dots to your address when emailing you, you'll still get that email.

On the surface, this is a nice idea, but in implementation it proves to be massively annoying.

### Why Standards are Important
By not following the email standard for unique local parts to email addresses, Google has set a trap
for every other Internet business who allows email addresses to be used as user account names.
Unless the developers at Example Incorporated code their user on-boarding process to prevent any
variation of an established account, using Gmail as the username, where the variation involves
adding or subtracting dots within the local part of the address, then they will end up allowing
what appear to be two (or more) distinct accounts to be created on their site, the resolve to only
one Gmail address.

For example: Joe User signs up at PayPal using his `joe.user@gmail.com` email address for the
username. He adds his phone number and sets a password and he is good to go. Then one day he gets
an email stating, "You added your phone number to your account", which lists a phone number poor Joe
has never seen before.

PayPal allowed another person named `Joseph User` to create an account using `joeuser@gmail.com` as the
username. To PayPal the two accounts are unique. `joe.user` is different than `joeuser`.
Unfortunately, Google sees `joe.user` and `joeuser` as variations on the same email account. `Joe
User` will now get emails from PayPal that are meant for `Joseph User`. Joseph won't understand why
he isn't getting his PayPal emails.

Because additional information is needed to reset the password for the other account, and the prompts for that information obscure the alternate contact information for the other user (which is good), there is no way to reach out to the other user to let them know that their email address isn't what they think it is - unless that other email address is Googlable enough to find out enough information to try to contact the other user via other means.

### My Approach to this Mess
My name is not that uncommon. There are several other people in my town of 53,000 who share my first
and last name. I have no idea how many people nationwide are named `Mark Nichols`. I do know that
there are enough that I get a continuous stream of emails using the dot-less variation of my Gmail
address. I get hotel reservation confirmations and bill folios. I get reminders of dental
appointments, and car service appointments. I get emailed copies of Lowe's purchase receipts. I get
access to shared Google Docs, and invitations to weddings and other events. All because someone at
Google 16 years ago though it would be cool to "save people from typos" and decided to allow email
address local parts to be non-unique within the `gmail.com` domain.

Since there is no way every other business, organization, what have you, on the Internet is going to
carefully vet email addresses used as usernames to ensure that two seemingly unique Gmail addresses
aren't in fact merely dot variations, then you should not use your Gmail address as a username.
You'll still get emails sent to dot variations of your address, but if you know **your** account
username is **NOT** your Gmail address, then you won't have momentary panic when you get an email
confirming your week long hotel stay in Miami.

I'm starting the tedious process of visiting each online account that uses my Gmail address for the
user name, and changing that user name (if possible) and changing the associated email address.
Fortunately I have all of my accounts stored in a password manager, so I _should_ be able to
identify 99% of them.

I'm retiring my Gmail account as the email I use to sign up for things. I'll create a new account on
my personal domain for that. Hopefully this will prevent 30 minutes of late night panic about an
email from PayPal announcing that I've added a phone number to my account that I've never seen
before.
