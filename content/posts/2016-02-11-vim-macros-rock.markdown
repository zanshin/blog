---
layout: post
title: "Vim Macros Rock"
date: 2016-02-11T18:23:00
tags:
- snippet
link:
---
Today I had to take a two column list of fully qualified domain names and their associated IP
addresses and reverse the order of the columns. Using Vim macros I was able to capture all the steps
on the first line and then repeat it for the other 80-odd lines of the file.

Here's a sanitized sample of the data:

    as1.example.com , 10.600.40.31 ,
    as2.example.com , 10.600.40.32 ,
    db1.example.com , 10.600.40.75 ,
    db2.example.com , 10.600.40.76 ,
    db3.example.com , 10.600.40.79 ,
    db4.example.com , 10.600.40.80 ,
    db5.example.com , 10.600.40.81 ,
    dr-as1.example.com , 10.600.40.43 ,
    dr-fmw1.example.com , 10.600.40.44 ,
    dr-oid1.example.com , 10.600.40.39 ,
    dr-web1.example.com , 10.600.40.45 ,
    fmw1.example.com , 10.600.40.33 ,
    fmw2.example.com , 10.600.40.34 ,
    oid1.example.com , 10.600.40.29 ,
    oid2.example.com , 10.600.40.30 ,
    web1.example.com , 10.600.40.35 ,
    web2.example.com , 10.600.40.36 ,

What I wanted was the IP address first, surrounded in single quotes, follwed by a comma, then follwed by an in-line comment containing the FQDN. This crytpic string of Vim commands does that:

    vWWdf1i'<esc>f i', #<esc>pd$

Let's break that down.

    v - Enter Visual mode
    W - Select a Word, in this case the leading spaces before the FQDN
    W - Select a Word, in this case the FQDN, including the trailing comma
    d - Put the selection in the cut buffer
    f1 - Find the start of the IP address, they all start with 1 in my data set
    i'<esc> - Insert a single quote and escape from insert mode
    f  - Find the next blank, or the end of the IP address
    i', #<esc> - Insert the closing single quote, a space, a comma, and the in-line comment character, escape insert mode
    p - Paste the contents of the cut buffer, the FQDN
    d$ - Delete to the end of the line to clean up the errant commas from the cut/paste 

To capture this command string in a macro you need to record it. [Macros and You](https://robots.thoughtbot.com/vim-macros-and-you "Macros and You") is a really nice introduction to Vim macros. To start recording a macro you press the `q` key. The next key determines the buffer or name for the macro. Then you enter the command string. To stop recording press the `q` key again. For simplicity sake I tend to name my macros `q`, so to start recording I press `qq` and then enter the steps outlined above, followed by `q` to stop recording.

Playing back the macro is done with the `@` command, followed by the letter or number naming the macro. So, `@q`. 

Macros can be proceeded by a number, like regular Vim commands. In my case with 80 lines to data to mangle, I'd record the macro on line one, and then run it against the remaining 79 lines with `79@q`. There is a problem with my command string though, it works on one line only. I need to add movement commands to the end of it to position the insertion point to the beginning of the next line. The updated command sting would be this:

    vWWdf1i'<esc>f i', #<esc>pd$j0

The `j0` jumps down a line and goes to the beginning. Now when the macro is run, it will march down through the file a line at a time, transforming the data. Here's the result.

    '10.600.40.31', #   as1.example.com
    '10.600.40.32', #   as2.example.com
    '10.600.40.75', #   db1.example.com
    '10.600.40.76', #   db2.example.com
    '10.600.40.79', #   db3.example.com
    '10.600.40.80', #   db4.example.com
    '10.600.40.81', #   db5.example.com
    '10.600.40.43', #   dr-as1.example.com
    '10.600.40.44', #   dr-fmw1.example.com
    '10.600.40.39', #   dr-oid1.example.com
    '10.600.40.45', #   dr-web1.example.com
    '10.600.40.33', #   fmw1.example.com
    '10.600.40.34', #   fmw2.example.com
    '10.600.40.29', #   oid1.example.com
    '10.600.40.30', #   oid2.example.com
    '10.600.40.35', #   web1.example.com
    '10.600.40.36', #   web2.example.com

While it may take a little trial and error to capture the right set of commands in the macro to accomplish the transforms you want, the time and effort saved over a large file is well worth it. That watching your macro work through your file is fun too, is icing on the cake. 
