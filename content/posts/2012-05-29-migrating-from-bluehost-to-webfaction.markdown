---
layout: post
title: "Migrating From Bluehost to WebFaction"
date: 2012-05-29T16:06:00
comments: true
tags:
- nerdliness
link: false
---
I moved all the websites I have or manage to [WebFacton](http://www.webfaction.com/?affiliate=markn "WebFaction") this past weekend. It was, as they say, a non-trivial undertaking. Broken down into categories and in rough order of execution here is how I did the move.

## Account Creation
Creating an account with WebFaction is straight-forward and quick. The signup process allows you to choose your account id and my first choice was immediately accepted. I'm used to having to trial-and-error my way through increasingly unlikable user ids to find one that hasn't already been taken. Getting my first choice was nice. Even though the site warned me that it may take an hour for my account to be activated in truth it was more like 15 minutes.

Four years ago when I signed up with Bluehost I didn't realize that my user id would be the first 8 characters of the primary (first) domain I hosted there. I ended up canceling my first account, getting my money back, and creating a new account in order to have a marginally acceptable user id. A small thing to be hung up on perhaps, but illustrative of the different approach WebFaction has so far displayed.

## Setup
Like any nerd I immediately signed in to my new account both through the my.webfaction.com URL and through a command line using secure shell (ssh). I was delighted to discover that WebFaction supports either `bash` or `zsh` as your default shell. For nearly a year now I've been using [zsh](http://www.zsh.org/ "zsh") anywhere and everywhere I can and one of the first things I setup on the new server was my zsh configuration. This was made easier since WebFaction also includes Git.

## Git
I have kept all my [configuration files](https://github.com/zan5hin/dotfiles "dotfiles"), including my zsh setup in a Git repository for some time now. Being able to clone that setup to my new WebFaction account with a single command made my afternoon last Friday. With my `dotfiles` repository in place, `oh-my-zsh` installed, and some `ln -s` commands issued to link everything together I had my preferred setup on the new remote server.

## Control Panel
Unlike many shared-IP hosting providers, WebFaction does not use cPanel as the default set of tools used to manage your account. Instead they have developed their own control panel. It is very easy to use and doesn't have all the pseudo-spammy extras that every other cPanel installation seems to come with. With just a few minutes exploring I was able to find my way around the WebFaction control panel with ease. Best of all they have excellent [documentation](http://docs.webfaction.com/ "WebFaction documentation").

## Applications
WebFaction has the concept of an "application". Each application is really a container for holding resources used to create a site. The application may be static or dynamic. It is easy to pre-install a number of tools including [Rails](http://rubyonrails.org/ "Ruby on Rails"), [Django](https://www.djangoproject.com/ "Django"), and [WordPress](http://wordpress.org/ "WordPress"). I created eleven applications: 4 WordPress and the rest static. From the command line I could see that the `webapps` directory was being populated with new sub-directories named for the applications I was creating. Simple and straight-forward.

With the application container in place I started moving the resources that made up each site from the old Bluehost server to the new WebFaction one. The smaller static sites were done first as they were less complicated - just copy the html, css, and other files. In the case of the WordPress sites I needed to do some setup to the WordPress installation WebFaction did for me. Each of the 4 WordPress sites I moved has its own theme and collection of plugins. Once I had the theme installed (or copied from Bluehost) and the plugins installed and configured, I used the export/import feature in WordPress to move the content.

## Websites
Applications are mapped to domains through a website. It is possible to map the same application to multiple domains or sub-domains. Initially I mapped all 11 applications to my default WebFaction domain: `<userid.webfactional.com>`. This allowed me to view the sites without having to initiate the name server change. I just mapped each new application to a new path on my default domain. So for `application-x` I created a website record that mapped it to `userid.webfactional.com/site-x`. Once I could see each site through this mapping I was able to address any issues that had cropped up during the move.

## Domains and Name Server Changes
With sites in place the next step was to add the domain to WebFaction. This was a two-step process. I added the domain and created a new website record mapping the appropriate application. Next I went to the Domain Manager on Bluehost to change the [name server](http://en.wikipedia.org/wiki/Name_server "name server") records. Once the name server change had been initiated all I could do was wait for the new information to propagate through the [DNS](http://en.wikipedia.org/wiki/Domain_Name_System "DNS") system. Most of the changes I made resolved within 24 hours.

## Email
Like applications and website, mailboxes and email addresses are separate. I created a mailbox for each address we currently have. Next I created an email address that was mapped to that mailbox. It would be possible to have multiple email addresses mapped to the same mailbox.

Two of the email addresses I moved had thousands of emails associated with them. Moving an IMAP-based email account is not the easiest thing in the world. After much trial-and-error, including a €30 purchase of [imapsync](http://imapsync.lamiral.info/ "imapsync"), I was able to transfer some 22,000 emails through the brute force method of copying them from the Bluehost account to a local email folder on one of our laptops and then copying them from the local email folder to the new WebFaction email account. I believe imapsync would have worked, but I was too tired at the time I was working with it (midnight on a 14-hour day) to figure it out. It's an industrial strength package with industrial strength options.

Of all the steps I completed getting email moved successfully was the most stressful and most time consuming. See the **Afterward** below for more on email.

## Databases
In addition to the four WordPress databases, which were automatically created for me when I created each WordPress application, I needed three more databases for the Mint visit tracking system used on three of our sites. So as to not lose any visits during the move I wanted to have external access granted to these three databases. That way I could point the Bluehost instance of the site to the WebFaction based Mint database. With the WebFaction instance of the site also pointed to the WebFaction Mint database any visit to the site would be tracked no matter when the name server change propagated.

I was able to submit a support ticket to WebFaction requesting the external access and access was granted within minutes.

## Support
WebFaction's support has been outstanding through-out this process. I was able to ask questions before signing up, helping me to plan my steps. And I was able to create a couple of tickets asking for help during my move. Both support processes were easy to use and both provided quick, helpful answers.

## Registration Transfer
With all the sites up and running on WebFaction's servers and all name server changes propagated I started the domain registration transfer. Bluehost has been our domain registrar but I wanted to completely cut ties with them. Rather than put all my domain eggs in one basket I decided to use NameCheap.com as my registrar. Working with NameCheap has been very good. They have a transfer how-to page for many of the more popular domain registrars, including Bluehost. Following the how-to steps I was able to unlock and transfer all seven domains. While the process can take up to 5 days, all seven of my transfers completed within a few hours.

## Cleanup
As a just-in-case measure I compressed and downloaded all the files and directories I had under `public_html` on Bluehost. I shouldn't ever need these archives, but it feels good to have them any way. I then deleted any file I created or uploaded to my Bluehost account. The final step will be to cancel the account and initiate a refund for the final six months of my pre-paid account.

I need to investigate some weirdness with how Thunderbird is working with the new mailbox for Sibylle's email address. She isn't able to copy messages from her inbox to some, but not all, sub-folders. I am hoping that removing the account and re-adding it will clear up the issue.

The connection between my site and the Mint instance it uses for visit tracking isn't working reliably at the moment. I'm not sure what the issue is here.

There were two sub-domains on my site that I rarely ever used that I haven't done anything about yet. One was a personal wiki and the other a Tumblr site. The Tumblr still works, it just isn't mapped to a sub-domain of zanshin.net any more. I may or may not recreate the personal wiki - I tend to use Evernote for the same purpose now.

## Afterward
If I had to do this all over I would do most of it the same way. I forced myself to make a checklist (a sanitized version of which is below) and used it religiously. As I learned from one task I updated all similar tasks. Having everything written down was critical to keeping my sanity. The original checklist had 97 steps. The final one has over 300.

The biggest thing I would change would be my approach to email. Email is only logically tied to your website. It shares the domain name, but it is a wholly separate resource. If I were re-doing this I would create the new mailboxes first, and start the process of migrating the email first. Then I would tackle the comparatively simple process of setting up the sites and their associated resources.

## The Checklist
{{< highlight bash  >}}
{% raw %}
Update Mint instances

  1. Update core Mint and all Peppers on
    1. [X]sibyllekuder.com/mint
      1. [X]Creating 20120525_ backup
      2. [X]Mint (2.19)
      3. [X]Backup/Restore (2.02)
      4. [X]Default Pepper (2.1)
      5. [X]iPhone Pepper (1.22)
      6. [X]User Agent 007 Pepper (2.1)
      7. [X]Locations+ Pepper (1.14)

    2. [X]manhattanareamusicteachers.org/mint
      1. [X]Create 20120525_ backup
      2. [X]Mint (2.19)
      3. [X]Backup/Restore (2.02)
      4. [X]Default Pepper (2.1)
      5. [X]iPhone Pepper (1.22)
      6. [X]User Agent 007 Pepper (2.1)
      7. [X]Locations+ Pepper (1.14)

    3. [X]mint.zanshin.net/mint


Update WordPress instances

  1. [X]Update hannelorebohlig.com
    1. [X]Visit Updates section and use WordPress updater
    2. [X]Update plugins
      1. [X]Akismet
      2. [X]Flickr Gallery
      3. [X]Jetpack
    3. [X]Update themes

  2. [X]manhattanareamusicteachers.org
    1. [X]Use WP Updater to update WordPress
    2. [X]Update plug-ins
      1. [X]Akisment
      2. [X]WP-TableReloaded
      3. [X]WP Events Calendar
    3. [X]Update themes

  3. [X]notes.sibyllekuder.com
    1. [X]Use WP Updated to update WordPress
    2. [X]Update plug-ings
      1. [X]Akismet
    3. [X]Update themes

  4. [X]andifyoudidknow.com
    1. [X]backup files
    2. [X]backup database
    3. [X]get latest version of WP
    4. [X]maintenance mode
    5. [X]deactivate plugins
    6. [X]update all files
    7. [X]reactivate plugins
    8. [X]update database
    9. [X]clean up install files
    10. [X]Update plugins
      1. [X]Akismet
      2. [X]Hello Dolly
   11. [X]Updates themes

Create WebFaction Account
  1. [X]use affiliate link
  2. [X]Select username
  3. [X]Select "PHP, CGI, or static" site as initial software
  4. [X]Fill in all other required information, including payment information
  5. [X]From laptop: scp ~/.ssh/blackperl.pub <newaccount>:/~.ssh

  6. [X]On WebFaction:
    1. [X]cd .ssh
    2. [X]touch authorized_keys
    3. [X]cat blackperl.pub >> authorized_keys
    4. [X]chmod 700 authorized_keys
    5. [X]chmod 700 ~/.ssh
  7. [X]Installed rmate script for remote edit via TextMate
  8. [X]Cloned dotfiles repository and created symbolic links to establish my settings
  9. [X]Cloned oh-my-zsh and linked in my theme file
  10. [X]Change default shell to zsh

Create static application for zanshin.net
  1. [X]Create static site application container called `zanshin`
  2. [X]Create `webfaction` branch in zanshin Git repository
  3. [X]Checkout `webfaction` and update Rakefile to new server values
  4. [X]Change Bluehost line in footer to affiliate link for WebFaction
  5. [X]Generate site and deploy
  6. [X]Create website on WebFaction linking to zanshin application

Create static application for cello.zanshin.net
  1. [X]Create static site application container called `solfege`
  2. [X]Create `webfaction` branch in solfege Git repository
  3. [X]Checkout `webfaction` and update Rakefile to new server values
  4. [X]Change Bluehost link in footer to affiliate link for WebFaction
  5. [X]Generate site and deploy
  6. [X]Create website on WebFaction linking to solfege application

Create static application for markhnichols.com
  1. [X]Create static container for markhnichols
  2. [X]User SFTP client to transfer files for markhnichols.com
  3. [X]Create website linking to markhnichols application

Create static application for geek.zanshin.net
  1. [X]Create static application container for geek subdomain
  2. [X]Use SFTP client to transfer files for geek.zanshin.net
  3. [X]Create website linking to geek application

Create static application for sibyllekuder.com
  1. [X]Create static application container for elfenbein
  2. [X]Use SFTP client to deploy sibyllekuder.com
  3. [X]Create website on WebFaction linking to elfenbein application

Create static application for jonathankuder.com
  1. [X]Create static container for jonathankuder
  2. [X]Use SFTP client to upload files for jonathankuder.com
  3. [X]Create website linking to jonathankuder application

Create Wordpress application for andifyoudidknow.com
  1. [X]Create WordPress container for aiydk
  2. [X]Export from Bluehost
  3. [X]Install WordPress importer
  4. [X]Import XML file from export
  5. [X]Install Mixed Bouquet theme - use Fetch to copy theme from Bluehost to WebFaction
  6. [X]Install / activate plugins
    1. [X]Akismet
    2. [X]WordPress Automatic Upgrade - skipping - will use WP function for this
    3. [X]WordPress Backup to Dropbox (new!)
  7. [X]Create website on WebFaction linking aiydk application
  8. [X]Set time zone
  9. [X]Set WordPress address and site address URLs
  10. [X]Set site title, tag line, and email address
  11. [X]Updated user `Mark` to have new password
  12. [X]Setup widgets - theme will not allow. Need to find new theme
  13. [X]Rebuild blogroll list (links) - lost in translation. :(

Create WordPress application for notes.sibyllekuder.com
  1. [X]Create WordPress container for notes
  2. [X]Export from Bluehost
  3. [X]Install WordPress importer plugin
  4. [X]Import XML file from export - check attachments to get media files
  5. [X]Install Musik theme - use Fetch to copy theme from Bluehost to WebFaction
  6. [X]Install plugins
    1. [X]Akismet
    2. [X]OneClick Installer - actually OneClick Plugin Updater
    3. [X]Ultimate Google Analytics - added UA number
    4. [X]WordPress Automatic Upgrade - skipping - will use WP function for this
    5. [X]WordPress Backup to Dropbox
    6. [X]WP-Mint - actually Mint 1.3 - installed not activated yet
  7. [X]Create website on WebFaction linking notes application
  8. [X]Set time zone
  9. [X]Set WordPress address and site address URLs
  10. [X]Set site title, tag line, and email address
  11. [X]Change default admin password to what Sibylle expects
  12. [X]Update admin user profile to be Sibylle\'s information
  13. [X]Setup widgets
  14. [X]Rebuilt links (blogroll)

Create Wordpress application for hannelorebohlig.com
  1. [X]Create WordPress container for bohlig
  2. [X]Export from Bluehost
  3. [X]Install WordPress importer plugin
  4. [X]Import XML file from export - check attachments to get media files
  5. [X]Install F8 Lite theme - use Fetch to copy theme from Bluehost to WebFaction
  6. [X]Install plugins
    1. [X]Akismet
    2. [X]Flickr Gallery
    3. [X]Jetpack - installed - not activated
    4. [X]PhotoQ - not installed
  7. [X]Create website on WebFaction linking to bohlig application
  8. [X]Set time zone
  9. [X]Set WordPress address and site address URLs
  10. [X]Set site title, tag line, and email address
  11. [X]Change default admin password to what Sibylle expects
  12. [X]Update admin user profile to be Sibylle\'s information

Create WordPress application for manhattanareamusicteachers.org
  1. [X]Create WordPress container for mamta
  2. [X]Install WhiteHouse 2.0.0 theme - use Fetch to copy theme from Bluehost to WebFaction
  3. [X]Install plugins
    1. [X]Akismet
    2. [X]Clean Contact
    3. [X]LBB - used myPHPAdmin to export/import sql file
    4. [X]WordPress Automatic Upgrade - will use WP function instead
    5. [X]WordPress Database Backup to Dropbox
    6. [X]Mint 1.3
    7. [X]WP-Table Reloaded
  4. [X]Export from Bluehost
  5. [X]Install WordPress importer plugin
  6. [X]Import XML file from export - check attachments to get media files
  7. [X]Create website on WebFaction linking mamta application
  8. [X]Set time zone
  9. [X]Set WordPress address and site address URLs
  10. [X]Set site title, tag line, and email address
  11. [X]Setup Widgets
  12. [X]Fixed navigation background to match header image :)
  13. [X]Used SQL query to retrieve LBB data and transfer
  14. [X]User export/import option on WP-Table to transfer that data

Create my user account on all WordPress sites with expected password
  1. [X]manhattanareamusicteachers.org
  2. [X]notes.sibyllekuder.com
  3. [X]andifyoudidknow.com
  4. [X]hannelorebohlig.com

Create static application for Mint for zanshin.net
  1. [X]Update Mint at mint.zanshin.net/mint, including all Peppers
  2. [X]Use phpMyAdmin to export all tables in current Zanshin Mint database
  3. [X]Create new MySQL database on WebFaction
  4. [X]Import all tables using phpMyAdmin
  5. [X]Upload Mint and all Peppers to WebFaction - use Fetch to copy server to server
  6. [X]Edit /mint/config/db/php to update database information
  7. [X]Edit location to changed URL to Mint on Bluehost instance of site.
    1. [X]zanshin.net
    2. [X]cello.zanshin.net
    3. [X]geek.zanshin.net - edited in place on webfaction
  9. [X]Visit /mint/?moved to let Mint know its been moved
  10. [X]Redeploy to activate new (temporary) Mint URL
    1. [X]zanshin.net
    2. [X]cello.zanshin.net
    3. [X]geek.zanshin.net
  11. [X]Create website on WebFaction linking new Mint URL to Mint application

Create static application for Mint for sibyllekuder.com
  1. [X]Update Mint at sibyllekuder.com/mint, including all Peppers
  2. [X]Use phpMyAdmin to export all tables in current Elfenbein Mint database
  3. [X]Create new MySQL database on WebFaction
  4. [X]Import all tables using phpMyAdmin
  5. [X]Upload Mint and all Peppers to WebFaction
  6. [X]Edit /mint/config/db/php to update database information
  7. [X]Edit location to changed URL to Mint.
    1. [X]sibyllekuder.net
    2. [X]Mint 1.3 Plugin on notes.sibyllekuder.net
  9. [X]Visit /mint/?moved to let Mint know its been moved
  10. [X]Redeploy sibyllekuder.com to activate new Mint URL
  11. [X]Create website on WebFaction linking new Mint URL to Mint application
  12. [X]Completely re-work sibyllekuder.com to eliminate .php file types
    1. [X]use SSI includes and .shtml file type
    2. [X]Create .htaccess to
      1. [X]map .php to .shtml
      2. [X]eliminate need for .shtml
      3. [X]eliminate need for www.
      4. [X]hide .htaccess file
      5. [X]prevent viewing of directory from browser

Create static application for Mint for manhattanareamusicteachers.org
  1. [X]Update Mint at manhattanareamusicteachers.org/mint, including all Peppers
  2. [X]Use phpMyAdmin to export all tables in current MAMTA Mint database
  3. [X]Create new MySQL database on WebFaction
  4. [X]Import all tables using phpMyAdmin
  5. [X]Upload Mint and all Peppers to WebFaction - used fetch to copy server to server
  6. [X]Edit /mint/config/db.php to update database information
  7. [X]Edit MAMTA Mint plugin to change URL to Mint.
  8. [X]Visit /mint/?moved to let Mint know its been moved
  9. [X]Redeploy manhattanareamusicteachers.org to activate new Mint URL


Create email accounts
  1. [X]------@zanshin.net
  2. [X]-----@zanshin.net
  3. [X]------@markhnichols.com
  4. [X]-------@sibyllekuder.com
  5. [X]---@jonathankuder.com
  6. [X]------@manhattanareamusicteachers.org

Transfer domains from Bluehost to WebFaction via Name Server change
  1. [X]zanshin.net
    1. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    2. [X]Add domain manhattanareamusicteachers.org to WebFaction
    3. [X]Map zanshin website to domain
      1. [X]map geek and cello subdomains to their applications
  2. [X]sibyllekuder.com
    1. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    2. [X]Add domain sibyllekuder.com to WebFaction
    3. [X]Map elfenbein website to domain
  3. [X]manhattanareamusicteachers.org
    1. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    2. [X]Add domain manhattanareamusicteachers.org to WebFaction
    3. [X]Map mamta website to domain
  4. [X]jonathankuder.com
    1. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    2. [X]Add domain jonathankuder.com to WebFaction
    3. [X]Map jonathankuder website to domain
  5. [X]hannelorebohlig.com
    1. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    2. [X]Add domain hannelorebohlig.com to WebFaction
    3. [X]Map bohlig website to domain
  6. [X]andifyoudidknow.com
    1. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    2. [X]Add domain andifyoudidknow.com to WebFaction
    3. [X]Map aiydk website to domain
  7. [X]markhnichols.com
    1. Need to pay for or transfer to NameCheap
    2. [X]Change DNS record on Bluehost to be ns[1,2,3,4].webfaction.com
    3. [X]Add domain markhnichols.com to WebFaction
    4. [X]Map markhnichols website to domain

Copy email from old to new on local machine(s)
  1. [X]------@zanshin.net
  2. [X]------@zanshin.net
  3. [X]------@sibyllekuder.com
    1. [X]Tried numerous methods to copy 14K messages. Ended up copying to local folders and then to new account. Took hours.

Once DNS switch has happened
  1. [X]Update all Mint references and redeploy sites as necessary
    1. [X]manhattanareamusicteachers.org
      1. [X]Changed mint path
    2. [X]notes.sibyllekuder.com
      1. [X]changed mint path
  2. [X]Check users and settings on WP sites
    1. [X]hannelorebohlig.com
      1. [X]verify users
      2. [X]verify settings
    2. [X]andifyoudidknow.com
      1. [X]verify users
      2. [X]verify settings
  3. [X]Verify that all sites are completely functional
    1. [X]jonathankuder.com
    2. [X]hannelorebohlig.com
    3. [X]manhattanareamusicteachers.org
    4. [X]notes.sibyllekuder.com
    5. [X]sibyllekuder.com
    6. [X]cello.zanshin.net
    7. [X]geek.zanshin.net
      1. [X]Set up WebFaction webapps/geek to be git clone of source
    8. [X]zanshin.net
    9. [X]andifyoudidknow.com
    10. [X]markhnichols.com
  4. [X]Merge WebFaction branches into source on git repos
    1. [X]zanshin
    2. [X]solfege

Move Domain Registrations to NameCheap
  1. [X]Ensure that privacy is disabled.
  2. [X]Verify that contact information is current and correct (Registrant, Admin, Billing)
  3. [X]Get EPP code for each site
    1. [X]andifyoudidknow.com
    2. [X]hannelorebohlig.com
    3. [X]jonathankuder.com
    4. [X]manhattanareamusicteachers.org
    5. [X]markhnichols.com
    6. [X]sibyllekuder.com
    7. [X]zanshin.net
  4. [X]Unlock all domains
  5. [X]Verify the whois information shows me as admin contact
  6. [X]Enter domains and EPP codes on namecheap.com to start transfer
  7. [X]Create namecheap.com account, enter payment information
  8. [X]Start transfer
    1. [X]Approved on namecheap.com side (listed in order received)
      1. [X]manhattanareamusicteachers.org
      2. [X]markhnichols.com
      3. [X]jonathankuder.com
      4. [X]sibyllekuder.com
      5. [X]hannelorebohlig.com
      6. [X]zanshin.net
      7. [X]andifyoudidknow.com
    2. [X]Approved on bluehost.com side (listed in order received)
      1. [X]manhattanareamusicteachers.org
      2. [X]jonathankuder.com
      3. [X]markhnichols.com
      4. [X]sibyllekuder.com
      5. [X]hannelorebohlig.com
      6. [X]zanshin.net
      7. [X]andifyoudidknow.com -- wasn\'t able to explicit approve. Should transfer at time limit
    3. [X]Completed (listed in order received)
      1. [X]jonathankuder.com
      2. [X]sibyllekuder.com
      3. [X]zanshin.net
      4. [X]hannelorebohlig.com
      5. [X]andifyoudidknow.com
      6. [X]manhattanareamusicteachers.com
      7. [X]markhnichols.com


Delete Bluehost account
  1. [X]Compress and download all files from Bluehost server
    1. tar jcf foo.tar.bz2 foo/
  2. [X]Remove all files from Bluehost server
  3. [ ]Delete Bluehost account
    1. [X]Submit ticket
    2. [ ]Confirm primary domain and password
    3. [ ]Verify name
    4. [ ]Verify that backups are made

Aftermath tasks
  1. [ ]Sort out folder issue on Sibylle\'s email
    1. Appears to have been synchronization issue? Has started working properly now
  2. [ ]Figure out intermittent Mint issue with zanshin.net
  3. [ ]Reinstall ThinkUp eventually
  4. [ ]Initiate DNS change necessary to move tumblr pointer to new host
{% endraw %}
{{< / highlight >}}



