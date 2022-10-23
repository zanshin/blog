--- 
layout: post
title: Installing PostgreSQL on Mac 10.6 (Snow Leopard)
date: 2009-09-07T03:02:00
comments: true
tags:
- life
link: false
---
These steps will install PostgreSQL in /usr/local.
<ol>
	<li>Download source from <a title="PostgreSQL source" href="http://www.postgresql.org/ftp/source/">http://www.postgresql.org/ftp/source/</a></li>
	<li>Unpack it somewhere convenient and change to that directory.</li>
	<li>Configure using the default installation location (/usr/local/pgsql) and a minimal set of options.</li>
{{< highlight bash  >}}
$ ./configure --with-perl --with-python --with-openssl --with-bonjour PERL=/usr/bin/perl PYTHON=/usr/bin/python
{{< / highlight >}}
	<li>Run make</li>
{{< highlight bash  >}}
$ make
{{< / highlight >}}
	<li>And finally, make install. For /usr/local installation this will need sudo.
{{< highlight bash  >}}
$ sudo make install
{{< / highlight >}}
</li>
</ol>
PostgreSQL should now be installed in /usr/local/pgsql.
## Post Installation steps
<ol>
	<li>Add the PostgreSQL bin directory to Path and export by adding the following to your .bash_profile or .profile:
{{< highlight bash  >}}
if [ -d /usr/local/pgsql/bin ] ; then
     PATH="/usr/local/pgsql/bin:${PATH}"
fi
export PATH
{{< / highlight >}}
</li>
	<li>Create a directory to hold the database installation.</li>
{{< highlight bash  >}}
$ cd /usr/local/pgsql
$ sudo mkdir data
{{< / highlight >}}
	<li>Create a postgres user and a postgres group. Change ownership of the pgsql directory to postgres. PostgreSQL cannot be access by root (a security measure, one assumes). (Snow Leopard (10.6) eliminates the netinfo tool, so you get to build the group on the command line.)
First find an unused User ID. The following command shows IDs already in use.
{{< highlight bash  >}}
$ dscl . -list /Users UniqueID | awk '{print $2}' | sort -n
{{< / highlight >}}
Next find an unused Group ID, again the following command shows IDs already in use.
{{< highlight bash  >}}
$ dscl . -list /Groups PrimaryGroupID | awk '{print $2}' | sort -n
{{< / highlight >}}
</li>
	<li>On the my system 103 was available in both lists, the rest of these directions assume you are using the same number. The following commands create the group and the user and set the user’s home directory to the pgsql folder.</li>
{{< highlight bash  >}}
$ sudo dseditgroup -o create -i 103 -r "PostgreSQL Users" postgres
$ sudu dscl . -create /Users/postgres
$ sudu dscl . -create /Users/postgres UniqueID 103
$ sudu dscl . -create /Users/postgres UserShell /bin/bash
$ sudu dscl . -create /Users/postgres RealName "Postgres Administrator"
$ sudu dscl . -create /Users/postgres NFSHomeDirectory /usr/local/pgsql
$ sudu dscl . -create /Users/postgres PrimaryGroupID 103
$ sudu dscl . -create /Users/postgres Password postgres
{{< / highlight >}}
I was forced to visit the Accounts preference pane in System Preferences to reset the password for the postgres account. For reasons I don't understand setting it via the dscl command failed.
	<li>Finally, give the postgres user ownership of the /usr/local/pgsql directory:</li>
{{< highlight bash  >}}
$ sudo chown -R postgres:postgres /usr/local/pgsql
{{< / highlight >}}
	<li>Now you can switch users to the postgres account and run the initdb command to create a database installation. The command is:
{{< highlight bash  >}}
$ /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data
{{< / highlight >}}
The output should look something like:</li>
{{< highlight bash  >}}
$ su postgres
Password:
bash-3.2$ /usr/local/pgsql/bin/initdb -D /usr/local/pgsql/data
The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale en_US.UTF-8.
The default database encoding has accordingly been set to UTF8.
The default text search configuration will be set to "english".

fixing permissions on existing directory /usr/local/pgsql/data ... ok
creating subdirectories ... ok
selecting default max_connections ... 20
selecting default shared_buffers ... 2400kB
creating configuration files ... ok
creating template1 database in /usr/local/pgsql/data/base/1 ... ok
initializing pg_authid ... ok
initializing dependencies ... ok
creating system views ... ok
loading system objects' descriptions ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
creating information schema ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the -A option the
next time you run initdb.

Success. You can now start the database server using:

    /usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data
or
    /usr/local/pgsql/bin/pg_ctl -D /usr/local/pgsql/data -l logfile start
{{< / highlight >}}
	<li>Now you can start up the database server. I prefer the second of the two command examples shown at the end of the initialization step above:</li>
{{< highlight bash  >}}
/usr/local/pgsql/bin/pg_ctl -D /usr/local/pgsql/data -l logfile start
{{< / highlight >}}
As it starts the database server in the background, thus freeing up your console for other uses.

To stop a server running in the background you can type:
{{< highlight bash  >}}
/usr/local/pgsql/bin/pg_ctl stop
{{< / highlight >}}
	<li>Now you can create a database. Make sure you are operating as the *postgres* user, and issue the _createdb_ command.</li>
{{< highlight bash  >}}
$ su postgres
Password:
bash-3.2$ cd
bash-3.2$ pwd
/usr/local/pgsql
bash-3.2$ createdb testdb
bash-3.2$
{{< / highlight >}}
	<li>Connect to the database, and start experimenting with SQL commands.</li>
{{< highlight bash  >}}
bash-3.2$ psql testdb
psql (8.4.0)
Type "help" for help.

testdb=#
{{< / highlight >}}
</ol>
## Miscellaneous
The best graphical user interface I've found for administering PostgreSQL is <a title="pgAdmin" href="http://www.pgadmin.org/" target="_blank">pgAdmin</a>. You can <a title="pgAdmin download" href="http://www.pgadmin.org/download/macosx.php" target="_blank">download it here</a>.

The postgres user account will appear in the fast user switching (FUS) list and as an account on the login screen. To hide the account on the login screen run the following command:
<ol>
{{< highlight bash  >}}
$ sudo defaults write /Library/Preferences/com.apple.loginwindow HiddenUsersList -array-add postgres
{{< / highlight >}}
</ol>
While this will hide postgres from the login window it will not hide it from the FUS list. Additionally, the list of accounts on the login window will have an "Other..." entry which will allow you to access the hidden account.

To unhide all accounts:
<ol>
{{< highlight bash  >}}
$ sudo defaults delete /Library/Preferences/com.apple.loginwindow HiddenUsersList
{{< / highlight >}}
</ol>
