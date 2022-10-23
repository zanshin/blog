---
layout: post
title: "A Script to Monitor SSL Certificate Dates"
date: 2020-03-22T15:02:00
tags:
- nerdliness
link:
---
I've been using Let's Encrypt to provide SSL certificates for all my domains and subdomains for a
couple of years now. Let's Encrypt certificates are only good for 90 day, and with 17 certificates
to manage, renewing them all manually was a pain. So I put the commands into a cron job (actually
several cron jobs) that renewed each certificate once a month. The cron job mailed me when it was
done so I knew which certificates had been renewed.

Recently my web host, WebFaction, started offering built-in Let's Encrypt certificates - ones that I
would not have to renew myself. At 40 days to go they automatically generate a new certificate to
replace the old one. This is great, but I've lost some visibility into the process.

I wanted a way to list all my SSL certificates, and their current date ranges. Each SSL certificate
has a date and time they become active, and a date and time when they expire. This command will
return those two pieces of information for the domain `example.com`.

    echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

For example:

    echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null |
    openssl x509 -noout -dates
    notBefore=Nov 28 00:00:00 2018 GMT
    notAfter=Dec  2 12:00:00 2020 GMT

You could create a `bash` shell script that was just 17 instances of that command and call it a day.
Inelegant, but functional. A better solution would be to have a file of domains to check, and a
script to do the checking.

Here's part of my file.

    zanshin zanshin.net
    books books.zanshin.net
    geek geek.zanshin.net
    health health.zanshin.net
    music music.zanshin.net

And here's the script.

    #!/bin/bash

    set -e
    set -o pipefail

    ###
    # certcheck displays the good from and good until dates for SSL certificates.
    # It expects a file (.certs) that contains a list of domains to query. Each
    # entry in the file has two parts, the name to display, and the domain to
    # query. The two entries are separated by a space.
    #
    # .certs file example:
    # example example.com
    # www www.example.com
    ###

    echo -e "certcheck\n"

    filename=".certs"
    while read -r line; do
        # Parse input into an array, using space as delimiter
        certarray=($line)

        # Get the name and the domain
        name=${certarray[0]}
        domain=${certarray[1]}

        # Get the certificate start and end dates
        result=$(echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -dates)

        # Muck with internal field separator (IFS) to split $result on new line
        oldIFS=$IFS
        IFS=$'\n'
        datearray=($result)
        IFS=$oldIFS

        startdate=${datearray[0]}
        enddate=${datearray[1]}

        # Print the results in columns
        printf "%-15s %-30s %-30s\n" "$name" "$startdate" "$enddate"
    done < "$filename"

    echo -e "\nfinished"

The script is a simple loop. For each line in the file it does the following steps:

* It parses the line using space as the delimiter so that `$name` contains the label to use, and
  `$domain` has the domain to query.
* Using the value in `$domain` the `open_ssl` command is run. The two lines of output are captured
    in `$resutl`. The key part here is that it is two lines of output.
* In order to put the two date time stamps into separate variables, the "internal field separator"
  or IFS has to be set to the new line character, `\n`. So that IFS can be returned to it's original
  value it is saved in `oldIFS` first.
* With the start and end dates now in `$startdate` and `$enddate` respectively, a `printf` command
  can be used to create the output. `printf` is used as it provides better control over formatting
  than `echo` would.

That's it. Loop through the file, use the domain to run the `open_ssl` command and capture the
result. Split the result on the new line character. Print the results, one per line, neatly
formatted into columns.

Here is an example of the script's output.

    certcheck

    zanshin         notBefore=Feb  2 19:30:06 2020 GMT notAfter=May  2 19:30:06 2020 GMT
    books           notBefore=Jan 24 11:13:48 2020 GMT notAfter=Apr 23 11:13:48 2020 GMT
    geek            notBefore=Jan 23 07:36:14 2020 GMT notAfter=Apr 22 07:36:14 2020 GMT
    health          notBefore=Jan 31 14:24:25 2020 GMT notAfter=Apr 30 14:24:25 2020 GMT
    music           notBefore=Mar 18 12:09:18 2020 GMT notAfter=Jun 16 12:09:18 2020 GMT

    finished

Any time I'm curious about the state of my SSL certificates I can run this script.
