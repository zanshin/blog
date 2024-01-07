---
title: "Using asdf to Manage Software Versions on Macos"
date: 2024-01-07T13:15:18-06:00

tags:
- MacOS
- asdf
---
After reading Thorsten Ball's Register Spill newsletter about [New Year, new job, new machine](https://registerspill.thorstenball.com/p/new-year-new-job-new-machine "New year, new job, new machine") I decided to give [asdf](https://asdf-vm.com "asdf") a try. It's a single piece of software designed to manage multiple versions of any number of other pieces of software. Like `rbenv` or `rvm` is to Ruby, `asdf` is to Ruby, and Python, and NodeJS, and, and, and.

Here's how I set it up.

## Step One
Clone the GitHub repository. Installing it via [Homebrew](https://brew.sh "Homebrew") apparently has
some issues. Running this command will close the `0.13.1` version into the `.asdf` directory in your
`$HOME`.

     git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.13.1

## Step Two
Install some plugins to manage the software of your choice. You can get a complete list of plugins
available by running:

    asdf plugin-list-all

I actually piped the output through `grep` to make finding the software I wanted a bit quicker.

    asdf plugin-list-all | grep ruby

With the plugin name and repository information, run:

    asdf plugin install ruby

## Step Three
Determine the version, or versions, of the software you want.

    asdf list all ruby

## Step Four
Install the software.

    asdf install ruby latest

or

    asdf install ruby 3.3.0

## Step Five
Set the version globally. (It can be overridden on a project by project basis.)

    asdf global ruby latest

There is no Step Six.

Using `asdf` means I have one set of software version management commands to remember, and one
location where that information, and those versions, are kept. Better still, the version information
can be shared, say with your team, ensuring everyone has the same versions of required tools
installed.
