---
layout: post
title: "How to Use Let's Encrypt with WebFaction"
date: 2017-08-13T22:06:00
tags:
- nerdliness
link:
---
HTTPS or HTTP over Transport Layer Security (TLS), HTTP over SSL, and HTTP Secure encrypts the
traffic between the client browser and the server hosting the website. This encryption provides data
integrity and privacy. Browser manufacturers, such a Google, are increasingly providing warnings to
computer users that the site they are visiting is not secure. Any input mechanism on a web page, be
it a comment form, search box, or credit card entry form, will be marked as insecure in the near
future if the site isn't using HTTPS.

Until the advent of [Let's Encrypt](https://letsencrypt.org) creating certificates for a web site
could be costly and time consuming. Let's Encrypt is a free, automated, and open Certificate
Authority.

I have wanted to switch my web sites, and those I help to support, to HTTPS for some time, and two
weekends ago I took the plunge and updated [Zanshin.net](https://zanshin.net). I describe how I did that below.

This process, while relatively straight forward, does require comfort with the Linux command line,
ready access to an SFTP client, and a WebFacton hosted web site. Each hosting environment has it's
own quirks; please consult your host's documentation regarding HTTPS. As always, backup your site(s)
before making significant changes. I managed to cause several hours of downtime to my site, your
mileage may vary.

#Resources
I made use of the following resources:

* [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
* [Using Let's Encrypt](https://community.webfaction.com/questions/19988/using-letsencrypt)
* [Acme.sh Github Repository](https://github.com/Neilpang/acme.sh)
* [Installing Let's Encrypt SSL Certificates on WebFacton in 3 Steps](https://cpbotha.net/2016/07/18/installing-free-lets-encrypt-ssl-certificates-on-webfaction-in-3-easy-steps/)
* [Redirecting from HTTP to HTTPS](https://docs.webfaction.com/software/static.html#static-redirecting-from-http-to-https)
* [SSL Server Test](https://www.ssllabs.com/ssltest/index.html)


#Getting Setup
I started by making a list of all my [WebFaction](https://www.webfaction.com) websites. In the case
of this site, there are a total of 8 subdomains. Let's Encrypt does let you create SAN certificates,
which would in theory allow me to have one certificate for zanshin.net and all its subdomains.
The documentation says that they all have to have the same web root folder. In my case each
subdomain, other than the **www** one, are in their own unique folders under **~/webapps**. Therefore I
opted to create separate certificates for each subdomain. In some cases, as with my
[Cello](https://cello.zanshin.net) site, the subdomain is a wholly separate site from the parent,
and not functional subdomain like **www.** or **mail.**.

##Keeping Score
I used a Google Spreadsheet to list all the websites, with columns to keep track of the steps I
would need to take for each. The steps as I have them are:

* Make a new website container using an **_ssl** suffix for each website
* Run the appropriate **acme.sh** command to create the certificates
* Copy the certificates to my local computer and then import them via WebFaction's **SSL
    Certificates** dialog
* Test the results in Google Chrome using the Console found under Developer Tools to debug any
    issues
* Use [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/index.html) to vet the site

##ACME Command Line Tool
I used the [acme.sh](https://github.com/Neilpang/acme.sh) command line tool to create my
certificates. Here are the steps I used to install it in the root of my account at WebFaction:

    mkdir -p $HOME/src
    cd $HOME/src
    git clone 'https://github.com/Neilpang/acme.sh.git'
    cd ./acme.sh
    ./acme.sh --install

With my checklist in hand, and the **acme.sh** script installed, I was ready to begin.

#Step One
Using the **websites** page on **my.webfaction.com** I created a second entry for **zanshin.net** and each
of its subdomains. For example, my cello site has an entry in the websites list of **cello**. I create
a new website called **cello_ssl** that points to the same domain as **cello**: **cello.zanshin.net**, and
serves the same static application. The new **_ssl** entry uses the HTTPS protocol.

#Step Two
Next I ran the **acme.sh** command for each domain/subdomain in my list. The command format looks like
this:

    acme.sh --issue -d example.com -d www.example.com -w ~/webapps/example

The `-d` flag specifies a domain or subdomain. The `-w` flag indicates the web root for the site.
Running `acme.sh --help` reveals all the options available.

Once the command finished running, the output will tell you where the newly created certificates are
located. By default that is in a new folder under the `.acme.sh` directory that was created when you
installed the tool. The folder is named for the first `-d` name passed to the command. There will be
several files in this folder, three of which are needed for the next step. They are:

* example.com.cer
* example.com.key
* ca.cer

The first is the certificate, the second the private key, and the third is the intermediates bundle.

# Step Three
The WebFaction **SSL Certificates** **Upload certificate** panel doesn't provide any way to copy the
certificates from your WebFaction account. So I used my SFTP client to copy them to my personal
computer. This had the added benefit of making a second copy of the files. Once they are copied you
are ready to upload them.

# Step Four
On the **Domains/Websites** | **SSL Certificates** page I filled in the form, providing a unique
name for the certificate (I used same names I had used for the website), and selecting the `*.cer`,
`*.key`, and `ca.cer` files. Clicking the **Upload** button completes this process.

Next I switched to the **Domains/Websites** | **Websites** page and for the domain or subdomain in
question, clicked on the **Security** column. On the form that expands, I selected the appropriate
certificate from the drop down list.

#Step Five
In order to redirect people who may have book marked my site, or pages on my site, to the HTTPS
version, I added these lines to my site's `.htaccess` file:

    RewriteEngine On
    RewriteCond %{HTTP:X-Forwarded-SSL} !on
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

With that in place it was time to test the site.

#Step Six
Testing proved to be the most time consuming part of this process. Zanshin.net has been my domain
since 1996, and I've been using it as a weblog since 1999. There are over 2100 postings,
several hundred images, and more links that I care to count. My site has been hosted as a Blogger
site, a MoveableType site, using WordPress, using Octopress, and now using Jekyll. Link formats have undergone a couple
major revisions - resulting in a massive `.htaccess` file with some 1300 redirect rules.

Using Google Chrome, and specifically the **Console** found under **Developer Tools**, proved to be
invaluable. I never would have discovered the final insecure links otherwise.

Using `find` and `sed` I was able to update all my image links to be secure. Various incarnations of
this command:

    find _posts/ -type f -print0 | xargs -0 sed -i '' -e 's#http://zanshin.net/images#https://zanshin.net/images#g'

allowed me to update most of the links. I did have to make some changes by hand, as some of the
insecure links were individual and not easily found by regex patterns in sed.

The hardest problem to solve, and one that took the longest time, was finding and updating a small
handful of image links hosted by Amazon. Once those were corrected, my site finally showed the green
**Secure** in Chrome and a padlock in Safari.

#Summary
My site has been running under HTTPS for over a week now and everything appears to be working fine.
I still need to tackle a couple of WordPress sites that are hosted on WebFaction and, depending on
how different that process is, I may update this posting with more details. For now, I am very happy
with my secure site.
