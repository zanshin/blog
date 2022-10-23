---
layout: post
title: "Automating a Reading List"
date: 2022-09-11T08:05:00
tags:
- nerdliness
link:
---
For a very long time I have been searching for, and trying, different note taking schemes in a
futile effort to find a way to capture links to pages on the Internet. I wanted a way to find some
previously read article or posting about "X". Searching my browser history sometimes works, but not always.
Creating a bookmark would only result in hundreds of bookmarks, and another searching problem. I view a bookmark as a way to return
to a frequently visited site. For example, I have a book mark to Hacker News, but I don't bookmark
individual articles I find there.

On Hacker News recently there was a posting about
[tracking everything a person had read for a year](https://www.tdpain.net/blog/a-year-of-reading "A Year of Reading").
Underneath the statistics there was an automated way to, with a single click, capture a page you've read
online. It works by using a JavaScript bookmarklet, some GitHub repository Actions, and a couple of
Go language functions.

## What You Need
### JavaScript Bookmarklet
Copy the [`readingList.js` bookmarklet Gist](https://gist.github.com/codemicro/f7d4d4b687c3ec2e7186ef7efecfcc35) to your GitHub account. Make it a secret Gist as it will eventually have your GitHub Personal Access Token (PAT) included.

### Fork the readingList repository
Fork the [readingList repository](https://github.com/codemicro/readingList "readingList") created by codemicro. It was their idea, they deserve
the forks. Once you have your fork, scrub through the code and replace all the references to
codemicro with your GitHub ID.

#### Workflows
The repository contains two GitHub Action workflows in the `.github/workflows` directory: append and
build. Find the `run` line in both of these and update the path to point to your fork of the
repository.

Additionally, in the `append.yml` file there is an email address for notifications; make sure to
update it to your email address.

### Go
#### generator.go
In the `generator.go` file, toward the end of the code, line 194 in my fork, there is an HTML link
that needs to be updated to point to your readingList repository.

#### manager.go
In the `manager.go` file you need to update the `"github.com/codemicro/readingList/transport"`
import to reference your repository.

### go.mod
Once you've finished updating all the code references to your ID or repository, rebuild the `go.mod`
file. I deleted it and ran `go mod init` and the `go mod tidy`.

### save.html
In the comments to the original `readingList.js` Gist, jamesmstone put links to his fork of the
project. He added a new piece of JavaScript that allows you to [use the bookmarklet without a server](https://gist.github.com/codemicro/f7d4d4b687c3ec2e7186ef7efecfcc35?permalink_comment_id=4294101#gistcomment-4294101).
In my case I'm using GitHub Pages to host the actual list page, the [`save.html`](https://github.com/jamesmstone/readingList/blob/master/.site/save.html "save.html") code the jamesmstone created makes this possible.

Copy his `save.html` code to the `.site` directory in your fork of the project. On line 13 of the
file, change his account name to yours.

### readingList.csv
The links are all appended to the `readingList.csv` file in the `readingList` repository. Unless you
want all of codemicro's articles, edit this file and delete all the lines except for the heading
line.

### GitHub Pages
In your `readingList` repository you need to setup GitHub Pages. Click on the `Settings` link in the
navigation bar. I set mine up to be `<account>.github.io/readingList`. For `Source` I picked "Deploy
from a branch". And for `Branch` I selected "gh-pages" and "/root". I also checked the "Enforce
HTTPS" option.

### Create a Personal Access Token
In order for the JavaScript bookmarklet to function, it need a GitHub Personal Access Token or PAT.
This article, [Using GitHub Actions with Repository Dispatch
Event](https://codeburst.io/using-github-actions-with-repository-dispatch-event-c113a45b3948 "Using
GitHub Actions with Repository Dispatch Event") explains the mechanism used to tie JavaScript and
GitHub action together, using a PAT. [Creating a personal access
token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
"Creating a personal access token") describes how to create and use a PAT.

#### Add PAT to readingList.js
Once you have created your PAT, you need to add it to line 3 of `readingList.js`. It becomes the
`token` used by the rest of the code to gain access to your repository.

#### Update requestURL
You need to update the `requestURL` value to be the path to your readingList. If you are using
GitHub Pages this will look like `https://zanshin.github.io/readingList/save`.

### Create a Bookmarklet
I used [How to create a JavaScript Bookmarklet
Easily](https://www.scrapersnbots.com/blog/code/how-to-create-javascript-bookmarklet.php "How to
create a JavaScript Bookmarklet Easily") to compress the JavaScript to a single line. Copy that line
and make a bookmark of it in your browser(s).

## Using the Bookmarklet
With the bookmarklet created you are ready to put the automation to work. Find an article you'd like
to add to your list and click the `read` bookmark and (if you have all the pieces properly lined up)
the page should briefly disappear and reappear. The JavaScript interrogates the page, collecting the
URL, the title, the meta data description, etc, and triggers the GitHub Action. It then redirects to
the original page. By using the Action this way, the adding of the new entry to your reading list
happens asynchronously. You can go to the Actions page of your repository and see the status of the
actions as they are running. Within a minute or two the readingList site should be regenerated with
the new entry added.

## Moving Parts
This automation has many moving parts. Two pieces of JavaScript, GitHub Actions, a GitHub PAT, and
GitHub Pages. Getting all the references updated from the original project to your account, getting
the path to the repository correct in the `readingList.js`, making sure that GitHub Pages is setup
properly; all these steps are crucial. Tracking down one missing or incorrect piece (the repository
path, ahem) can be frustrating.

I had never used GitHub Actions prior to this, and my understanding of JavaScript is rather thin. I
spent most of a day reading and learning to make all the parts of this make sense in my head, and
making them all work together to have a functional reading list.

## Update
I've been using this automation for several days now and it works very well. So far there has only
been one site where the JavaScript bookmarklet wouldn't work. I've been going through the many open
tabs in my browsers and adding articles to my read list.
