---
layout: post
title: "Use RVM to Fix SSL Certificates"
date: 2013-10-30T14:08:00
comments: true
tags:
- nerdliness
link: false
---
While trying to add a new gem to my development machine I got the following error message.

    Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3
    read server certificate B: certificate verify failed
    (https://s3.amazonaws.com/production.s3.rubygems.org/specs.4.8.gz)

A quick Google search lead me to this [GitHub](http://github.com "GitHub") thread on the rubygems
repository: [gem 2.0.3 Unable to download data from
https://rubygems.org](http://github.com/rubygems/issues/515 "Unable to download from rubygems").
Scrolling down through all the comments I eventually discovered a link to [Use RVM to Fix SSL
Certificates](http://railsapps.github.io/openssl-certificate-verify-failed.html "OpenSSL Errors and
Rails - Certificate Verify Failed").

The gist of the article is under the **Use RVM to Fix SSL Certificates** heading part way through
the article. It seems that recent versions of RVM have the ability to update SSL certificates.

Run this command to see the current status:

    $ rvm osx-ssl-certs status all
    Certificates for /usr/local/etc/openssl/cert.pem: Old.

In my case the status was "Old". Running this command updates the certificates:

    $ rvm osx-ssl-certs update all
    Updating certificates for /use/local/etc/openssl/cert.pem: Updating certificates in
    '/usr/local/etc/openssl/cert.pem'.
    Updated.

Rerunning the first command now shows everything up-to-date.

    $ rvm osx-ssl-certs status all
    Certificates for /usr/local/etc/openssl/cert.pem: Up to date.

Now the `gem install` command that originally was getting the certificate error works. 
