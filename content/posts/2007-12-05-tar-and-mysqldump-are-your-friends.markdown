--- 
layout: post
title: Tar and mysqldump Are Your Friends
date: 2007-12-05T03:02:00
comments: true
tags:
- nerdliness
link: false
---
The first step in my site migration project is to backup all my data, all my content, everything.  Since my hosting platform is Linux based, this was surprisingly easy.

First I issued this command:
{{< highlight bash  >}}
$ tar cvf archive.tar *
{{< / highlight >}}
at the root of my account, /usr/www/users/mnichols, to create an archive off everything I have stored under my account at Pair.

Next I compressed this archive using gzip.  Like so:
{{< highlight bash  >}}
$ gzip archive.tar
{{< / highlight >}}

The resulting file, archive.tar.gzip, was then copied to my local computer.

Some parts of this site, and parts of the other sites I have hosted over the years at Pair, have made use of MySQL databases; I've used various referrer and site monitoring tools that all required relational databases for support.  Before leaving Pair I want to back up the contents and structure of these data stores.

Using MySQL on my laptop I can issue a command in this format:
{{< highlight bash  >}}
$ mysqldump --add-drop-table -h &lt;hostname&gt; -u &lt;username&gt; -p &lt;databasename&gt; | bzip2 -c database_yyyymmdd.bak.sql.bz2
{{< / highlight >}}
to not only dump the database, but to compress it as well.  The resulting file will be stored in the directory on my local machine where I ran the command.

Once all 10 MySQL databases were dumped and compressed using this command I had a complete back up of my site: the presentation (HTML/CSS) files in the public_html directory and the underlying databases that feed the various sites their content.
