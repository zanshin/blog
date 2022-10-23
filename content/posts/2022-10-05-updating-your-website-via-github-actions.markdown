---
layout: post
title: "Updating Your Website Via GitHub Actions"
date: 2022-10-05T20:20:00
tags:
- nerdliness
link:
---
For several years I maintained a subdomain on my website where I kept a list of all the books I had
read, organized by year. The site was completely hand coded—no CMS involved, no frameworks, just
HTML, CSS, and a little JavaScript.

While having the list was pleasing, updating the site was tedious at times. Copy and paste the
previous book's HTML table row, and replace all the values. Then commit the changes to the sites Git
repository, and push the changes to GitHub. Finally sign into the host and update the site by
updating the local working copy of the repository.

I have been wanting to automate this for some time, and, with a small Go application and a GitHub
Action, it now requires far less interaction from me.

## GitHub Action
My GitHub Action does these steps:

- Checks out the site's Git repository
- Sets up Go
- Runs the Go application that builds the `index.html` file
- Commits the changes to the Git repository
- Sets up an ssh key using a Repository Secret
- Uses `rsync` to copy the updated site to the web host

### Trigger
Currently I have the Action set to run anytime there is a push to the `master` branch. I am planning
on revising this, to only run the Action when a pull request is merged into `master`. That will
allow me to make multiple changes, without repeatedly running the automation.

{{< highlight yaml >}}
name: Build Book Website

on:
  push:
    branches:
      - master
{{< / highlight >}}

### Checkout the Repository
The action runs in a "container" which itself is running the latest version of Ubuntu. GitHub
provides a clause to specify the OS. GitHub also provides a library to checkout the repository.

{{< highlight yaml >}}
jobs:
  # The "build" workflow
  build:
    runs-on: ubuntu-latest
      steps:
        # Checks out repository
      - uses: actions/checkout@v2
{{< / highlight >}}

### Setting up Go
The site is rebuilt using a small Go language application that reads the list of books from a
comma-separated-value (CSV) file, and uses Go's templating feature to build an HTML table with one
row per book.

In order for the GitHub Action to run this application, Go needs to be setup. Again, a provided
library makes getting Go installed quick.

{{< highlight yaml >}}
- name: Setup Go
  uses: actions/setup-go@v2
  with:
    go-version: '1.18.3'
{{< / highlight >}}

### Running the Go Application
With Go installed, and the repository checked out, one command is all that is needed to run the Go
application to rebuild the `index.html` file.

{{< highlight yaml >}}
  # Run the Go application to update the site
- name: Run application
  run: go run main.go
{{< / highlight >}}

### Committing the Updated Repository
With the `index.html` file now updated the change needs to be committed to GitHub. I used an
external action for this.

{{< highlight yaml >}}
  # Commit the updated index.html file to the repository
- name: Commit updated index
  uses: EndBug/add-and-commit@v9
  with:
    add: 'site/index.html'
    author_name: GitHub Action
    author_email: root@zanshin.net
    message: 'Updated index.html with new listing(s)'
    push: true
{{< / highlight >}}

There is only one file updated by the Go application, so I'm able to be specific about what is
added. `push: true` is the default, but I put it here to be unambiguous. The
[Endbug/add-and-commit](https://github.com/EndBug/add-and-commit "Add and Commit Action") repository has more
information about using this action.

### Setting up an ssh Key
Getting an ssh key setup so that `rsync` can transfer the site from GitHub to the web host was the
trickiest part of the entire action. I closely followed [Deploying to a server via SSH and Rsync in
a GitHub Action](https://zellwk.com/blog/github-actions-deploy/ "Deploying via rsync in a GitHub
Action") to get this working.

Remember, the action is running inside an Ubuntu container, and this will be a different container
each time the action executes. The steps in zellwk.com's article demonstrate how to use repository
secrets to put the private half of an ssh key pair in the Ubuntu container, and how to update the
`.ssh/``known_hosts` file. With all the pieces in place, here is the code for setting up the ssh key.

{{< highlight yaml >}}
{% raw %}
  # Install the private half of our SSH key via a repository secret
- name: Install SSH Key
  uses: shimataro/ssh-key-action@v2
  with:
    key: {{ secrets.SSH_PRIVATE_KEY }}
    known_hosts: 'just-a-place-holder-so-we-dont-get-errors'

  # Update the know_hosts file
- name: Adding Known Hosts
  run: ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
{% endraw %}
{{< / highlight >}}

### rsync the Site to the Web Host
The final step uses `rsync` to copy the updated site to the web host. I restructured my repository
to have all the site specific files in a `site` subdirectory. This makes it possible to copy the
site and not the Go application and associated files to the web host.

{{< highlight yaml >}}
{% raw %}
  # Use rsync to copy the repo to the host
- name: Deploy with rsync
  run: rsync -avz ./site/ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:/usr/home/mnichols/public_html/books
{% endraw %}
{{< / highlight >}}

## The Complete build.yaml Action
Here is my complete
[build.yaml](https://github.com/zanshin/books/blob/master/.github/workflows/build.yaml "build.yaml")
action.
