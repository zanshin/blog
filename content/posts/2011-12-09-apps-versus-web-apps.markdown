---
layout: post
title: "Apps Versus Web Apps"
date: 2011-12-09T22:14:00
comments: true
tags:
- nerdliness
link: false
---
Thirty years ago when I started programming professionally, online programming
meant CICS on a mainframe somewhere. I worked with CICS and IMS for the first
few years of my career as a COBOL programmer. I also dabbled a bit with an
early 4GL called [Nomad](http://en.wikipedia.org/wiki/Nomad_software "Nomad").
What distinguished these early applications was an utter lack of graphical
interface. Everything was text based. Usually the bottom two lines of the
terminal display (which may have had only 24 or maybe 40 lines total) was
devoted to a legend that told the user which function key performed what
activity.

And we walked uphill both ways to the raised-floor, Halon fire-suppressed
machine rooms to run our programs too.

In the early 1990s I did a tiny bit of client-server application development
using [PowerBuilder](http://en.wikipedia.org/wiki/PowerBuilder "PowerBuilder")
3. On my own I toyed around with [VisualBasic](http://en.wikipedia.org/wiki/Visual_Basic "VisualBasic) 1.0. VB was the first development platform I bought for my self to use.

In 1996 I started working with a distributed object-oriented platform called
Forte. In 1999 Forte was [purchased](http://news.cnet.com/Suns-Forte-buy-gives-server-software-a-boost/2100-1001_3-230162.html "Sun buys Forte") Sun Microsystems. The power of Forte, and its language, [TOOL](http://en.wikipedia.org/wiki/Forte_4GL "TOOL"), was having a complete end-to-end solution. You wrote serve components and client applications in the same IDE, and they communicated through Forte's middleware. What doomed Forte was its expense and that it was proprietary.

Both PowerBuilder and Forte produced Windows applications, client-server
applications that ran on the end-users computer and communicated to backend
processes over the network. A graphical tool was employed to build these
applications, one that allowed you to position various UI elements on the
screen and then wire them to functions.

Creating the interface was something tangible in a way. You assembled windows
from component parts. There were buttons and drop-down lists and multi-select
lists, radio buttons and check boxes, text areas and labels. 

Starting in about 2004 I began to work exclusively with Java-based systems, and
HTML applications. While Java the language has great similarity to TOOL,
creating applications with HTML is nothing at all like PowerBuilder or Forte.
CSS and Javascript have come a tremendous way - in the hands of skilled people
wonderful interfaces can be realized. Conceiving the interface and figuring out
how to conjure it up from HTML and CSS and Javascript is an artform.

I am moderately capable at building small webpages. This site has largely been
handcrafted by yours truly. And I have built and maintain Sibylle's
[piano](http://sibyllekuder.com "piano site") completely by hand. Creating true
web applications is something I've never done, either professionally or
personally. 

Today I think I figured out one reason why I've never had the drive to build
web applications. The process lacks the tangibility that creating client-server
apps had. In the end the web app can look and act like a native application,
but getting there is a vastly different process. 

In the last week or so I've [been playing around with iOS](https://zanshin.net/2011/12/05/ios-programming-and-cs193p/ "iOS Development") and I am loving every minute of it. This afternoon, while watching a pair of co-workers discuss visual changes to a web app, I had an epiphany: I like iOS development because it has the same tangibility as Forte had. You build your applications interface with buttons, and labels and so on. 

In a way I feel like working iOS is like coming home. Conceptually, stateless
applications haven't changed much in 30 years. The paradigms I used in CICS and
IMS worked in client-server applications, just as they work in web applications
and in native iOS or Android applications. But the added immediacy of building
the interface in iOS adds something I've missed in development work for a long,
long time.


