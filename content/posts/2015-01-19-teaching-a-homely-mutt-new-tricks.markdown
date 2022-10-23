---
layout: post
title: "Teaching A Homely Mutt New Tricks"
date: 2015-01-19T20:32:00
tags:
- nerdliness
link:
---
About two years ago I read Steve Losh's excellent [The Homely Mutt](http://stevelosh.com/blog/2012/10/the-homely-mutt/ "The Homely Mutt"). It's a fantastic how-to on setting up [Mutt](http://www.mutt.org "Mutt") as your email client. Mostly to see if I could, I set aside a day and managed to get it all working. Having scratched my technology itch I set Mutt aside and continuted on with Mail.app.

About a year ago my employer switched to Office365 for email. While I find the webmail interface to be clunky and difficult to use, getting my mail through Mail.app worked so I wasn't too bothered by the switch. However when I upgraded to Yosemite in October I started having problems with my Office365 mail. The 10.10.1 release did improve things some, but it's still a pain to use.

This past weekend I decided to resurrect my Mutt setup, and see if I could make it work -- not just for one account, but for six accounts. The Homely Mutt (THM) posting describes how to setup Mutt to work with a single GMail account. I have 3 domain accounts, two Gmail accounts, and the afore mentioned Office365 (Exchange) account.

My [dotfiles](https://github.com/zanshin/dotfiles "dotfile") repository had the Mutt configuration I had created in 2013, and I had managed to get that working with multiple accounts. Not having touched it in nearly two years I decided to start over from scratch.

## Mutt for Gmail
I reread [THM](http://stevelosh.com/blog/2012/10/the-homely-mutt/ "The Homely Mutt") and started in from the top. This allowed me to setup one of my two Gmail accounts. I picked the one with the least amount of mail to reduce the time Offline imap would need to complete the initial download of my mail.

## Offlineimap for Multiple Computers
I have three computers that I use on a daily or near daily basis and I want to have my mail available on all three. So I wanted to modify the original `offlineimap.py` script to work using the current user account, and not a hard coded account as shown in THM. Digging around in Mr. Losh's [dotfiles](https://bitbucket.org/sjl/dotfiles/src/603bb1ae9da27c6e08ab115df1cb5d8f6a1442c3?at=default "dotfiles") I discoverd his solution was to simply use `whoami` in place of the hard coded user account name. The resulting script looks like this:

    #!/usr/bin/python

    import re, subprocess

    def get_keychain_pass(account=None, server=None):
        params = {
            'security': '/usr/bin/security',
            'command': 'find-internet-password',
            'account': account,
            'server': server,
            'keychain': '/Users/`whoami`/Library/Keychains/login.keychain',
        }

        command = "sudo -u `whoami` %(security)s -v %(command)s -g -a %(account)s -s %(server)s %(keychain)s" %params
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT)
        outtext = [l for l in output.splitlines()
                         if l.startswith('password: ')][0]

        return re.match(r'password: "(.*)"', outtext).group(1)


## Mutt with sidebar-patch
On OS X the easiest way to install Mutt is using [Homebrew](http://brew.sh "Homebrew"). Unfortunately the formula for Mutt no longer contains the sidebar patch. Having a sidebar where your accounts and their mailboxes are displayed is, in my opinion, essential. A short Google search lead me to [how to apply this mutt sidebar patch](http://stackoverflow.com/questions/20883936/how-to-apply-this-mutt-sidebar-patch "how to apply this mutt sidebar patch") on [StackOverflow](http://stackoverflow.com "StackOverflow"). You just edit the Mutt formula and insert the missing option.

    $ brew edit mutt

And then, scroll down to a section of commands that all start with "option", sort of like:

    option "with-debug", "Build with debug option enabled"
    option "with-trash-patch", "Apply trash folder patch"
    option "with-s-lang", "Build against slang instead of ncurses"
    option "with-ignore-thread-patch", "Apply ignore-thread patch"
    option "with-pgp-verbose-mime-patch", "Apply PGP verbose mime patch"
    option "with-confirm-attachment-patch", "Apply confirm attachment patch"

Add this line to the bottom of the options:

    option "with-sidebar-patch", "Apply sidebar patch"

Scroll down further to the section with all the patches, e.g.

    patch do
      url "http://patch-tracker.debian.org/patch/series/dl/mutt/1.5.21-6.2+deb7u1/features/trash-folder"
      sha1 "6c8ce66021d89a063e67975a3730215c20cf2859"
    end if build.with? "trash-patch"

And add this block:

    patch do
      url "https://raw.github.com/nedos/mutt-sidebar-patch/7ba0d8db829fe54c4940a7471ac2ebc2283ecb15/mutt-sidebar.patch"
      sha1 "1e151d4ff3ce83d635cf794acf0c781e1b748ff1"
    end if build.with? "sidebar-patch"

Exit the editor and run

    $ brew install mutt --with-sidebar-patch

## Multiple Accounts in Mutt
Much of the configuration described in THM still applies for multiple mail accounts. Below I've described where there are differences.

### Offlineimap
You'll need to add the account identifier for each account to the `accounts =` line. And you'll need to create new `[Account ...]`, `[Repository ...-Local]`, and `[Repository ...-Remote]` sections for the new email account as well. I've included a shortened version of my `.offlineimaprc` file showing two accounts. The [complete version](https://github.com/zanshin/dotfiles/blob/master/mutt/offlineimaprc ".offlineimaprc") is a bit long.

    # vim: ft=rc:

    [general]
    # ui = ttyui
    ui = blinkenlights
    #ui = quiet
    accounts = mark,root
    pythonfile=~/.mutt/offlineimap.py
    fsync = False

    [Account mark]
    localrepository = mark-Local
    remoterepository = mark-Remote

    [Repository mark-Local]
    type = Maildir
    localfolders = ~/.mail/mark

    [Repository mark-Remote]
    maxconnections = 3
    type = IMAP
    remoteuser = mark_zanshin
    remotehost = mail.example.com
    remoteport = 993
    ssl = yes
    remotepasseval = get_keychain_pass(account="mark_zanshin", server="mail.webfaction.com")
    realdelete = no

    [Account root]
    localrepository = root-Local
    remoterepository = root-Remote

    [Repository root-Local]
    type = Maildir
    localfolders = ~/.mail/root

    [Repository root-Remote]
    maxconnections = 3
    type = IMAP
    remoteuser = root_zanshin
    remotehost = mail.example.com
    remoteport = 993
    ssl = yes
    remotepasseval = get_keychain_pass(account="root_zanshin", server="mail.webfaction.com")
    realdelete = no

You'll also need to visit Keychain Access and create new password entries for incoming (imap) and outoging (smtp) messages. This process is unchanged from THM, you just need to do it for each new account. With all the accounts setup in `.offlineimaprc` and new Keychain entries I was able to kick off the rather lenghty process of downloading my mail.


### .muttrc Changes
Some of the changes to the `.muttrc` file happen in that file and others I farmed out to a new directory called `accounts`.

The `.muttrc` changes are fairly straight forward. You need to edit the list of mailboxes you want to have appear in the sidebar. I've added what amounts to a comment or tag before each new set of mailbaoxes to make identifying which account is which easier.

    # Mailboxes to show in the sidebar.
    mailboxes "+-- mark ---------------" \
              +mark/INBOX \
              +mark/archive \
              +mark/Drafts \
              +mark/Sent\ Messages \
              "+-- root ---------------" \
              +root/INBOX \
              +root/archive \
              +root/Drafts \
              +root/Sent\ Messages \
              "+-- MarkNichols ----------" \
              +marknichols/INBOX \
              +marknichols/archive \
              +marknichols/drafts \
              +marknichols/sent \
              "+-- CodeProle ----------" \
              +codeprole/INBOX \
              +codeprole/archive \
              +codeprole/drafts \
              +codeprole/sent
              "+-- mhn (ksu) ----------" \
              +mhn/INBOX \
              +mhn/Archive \
              +mhn/Drafts \
              +mhn/Sent\ Items \
              +mhn/github \
              +mhn/bugzilla \
              +mhn/ome-dt-l \
              +mhn/Junk\ Email \
              +mhn/Deleted\ Items \\
              "+-- Chef ---------------" \
              +chef/INBOX \
              +chef/archive \
              +chef/Drafts \
              +chef/Sent\ Messages \

Using the `folder-hook` feature of Mutt I was able to setup account specifc settings, each in their own file. When an account is selected in the sidebar and one of its mailboxes opened the folder hook sources a short chunk of `muttrc` code to set the account specific values.

Under the `.mutt` directory I created a new directory called `accounts`. In `accounts` I put a file for each email account. Here's an example file:

    # Account Settings ------------------------------

    set from      = "mark@zanshin.net"
    set sendmail  = "/usr/local/bin/msmtp -a mark"

    # Default inbox.
    set spoolfile = "+mark/INBOX"

    # Other special folders.
    set mbox      = "+mark/archive"
    set postponed = "+mark/drafts"
    set record    = "+mark/Sent Messages"

    color status yellow default

The `folder-hook` lines in the `.muttrc` file look like this:

    # Set account specific options on folder change
    folder-hook mark/*        source ~/.mutt/accounts/mark
    folder-hook root/*        source ~/.mutt/accounts/root
    folder-hook chef/*        source ~/.mutt/accounts/chef
    folder-hook marknichols/* source ~/.mutt/accounts/marknichols
    folder-hook codeprole/*   source ~/.mutt/accounts/codeprole
    folder-hook mhn/*         source ~/.mutt/accounts/mhn

### .msmtprc
The final piece of the puzzle is sending email. Edit the `.msmtprc` file and add the necessary information for each of the additional accounts. Again, here is a shortened version of my `.msmtprc` file:

    account mark
    host smtp.webfaction.com
    port 587
    protocol smtp
    auth on
    from mark@zanshin.net
    user mark_zanshin
    tls on
    tls_trust_file ~/.mutt/Equifax_Secure_CA.cert

    account root
    host smtp.webfaction.com
    port 587
    protocol smtp
    auth on
    from root@zanshin.net
    user root_zanshin
    tls on
    tls_trust_file ~/.mutt/Equifax_Secure_CA.cert

## Conclusion and Caveats
You can view my complete [Mutt setup](https://github.com/zanshin/dotfiles/tree/master/mutt "mutt") on Github.

A word of caution applies. Unlike configuring tmux or Vim, making a mistake with Offlineimap or Mutt could potential wipe out some or all of your mail and cause the end of Western civilization. Proceed at your own risk.

