---
layout: post
title: "How I setup my Chef Workstation"
date: 2014-03-04T22:19:00
tags:
- nerdliness
link:
---

Here's how I have setup my laptop running OS X Mavericks (10.9.1) for [Chef](http://getchef.com "Chef").

# Getting Started

* Install [VirtualBox 4.x.](https://www.virtualbox.org/wiki/Downloads "VirtualBox").

* Install [Vagrant 1.4.1 (or higher)](http://www.vagrantup.com/downloads.html "Vagrant").

* Set up a [sane Ruby 1.9.x environment for Chef cookbook authoring](http://misheska.com/blog/2013/12/26/set-up-a-sane-ruby-cookbook-authoring-environment-for-chef/ "Setup A Sane Ruby Cookbook Authoring Environment for Chef") Note: On OS X Mavericks (10.9.x) the system (default) Ruby is 2.x and therefore you may not need to install a Ruby version manager (RVM, rbenv, or chruby).

* Install [Berkshelf](http://berkshelf.com "Berkshlf")

{{< highlight bash >}}
$ gem install berkshelf --no-ri --no-rdoc
Fetching: berkshelf-2.0.10.gem (100%)
Successfully installed berkshelf-2.0.10
1 gem installed

$ berks -v
Berkshelf (2.0.10)

Copyright 2012-2013 Riot Games

    Jamie Winsor (<jamie@vialstudios.com>)
    Josiah Kiehl (<jkiehl@riotgames.com>)
    Michael Ivey (<michael.ivey@riotgames.com>)
    Justin Campbell (<justin.campbell@riotgames.com>)
    Seth Vargo (<sethvargo@gmail.com>)
{{< / highlight >}}

* Install the vagrant-berkshelf Plugin (1.3.3 or higher)

{{< highlight bash >}}
$ vagrant plugin install vagrant-berkshelf
Installing the 'vagrant-berkshelf' plugin. This can take a few minutes...
Installed the plugin 'vagrant-berkshelf (1.3.7)'!
{{< / highlight >}}

* Install the vagrant-omnibus plugin (1.1.0 or higher)

{{< highlight bash >}}
$ vagrant plugin install vagrant-omnibus
Installing the 'vagrant-omnibus' plugin.  This can take a few minutes...
Installed the plugin 'vagrant-omnibus (1.2.1)'!
{{< / highlight >}}

# Install Chef On Your Workstation

Open a browser and navigate to [http://www.getchef.com/chef/install](http://www.getchef.com/chef/install "Chef Install"). Select `OS X` in the **Operating System** drop down. Choose the version number closest to your current OS X version, likely `10.7`. Select `x86_64` for the architecture. Copy the `curl` command from the **Quick Install Instructions** section and run it.

Once you've completed the setup process for your workstation open a command prompt and verify your installation is working.

{{< highlight bash >}}
$ chef-client --version
Chef: 11.10.0
{{< / highlight >}}

# Chef Server Configuration

Create a directory to hold your Chef authentication keys. For example:

{{< highlight bash >}}
$ mkdir ~/.chef
{{< / highlight >}}

## Your account key

If you are using a hosted Chef server the Chef Starter Kit will include your account authentication key, the Chef Server authentication key, and a `knife.rb` configuration file for that server. While you can leave your authentication keys in the `chef-repo` the starter kit provides, I choose to copy them to my `~/.chef` directory as I access multiple chef servers and centralizing the authentiation keys simplifies things. 

{{< highlight bash >}}
$ cp ~/Downloads/chef-repo/.chef/*.pem ~/.chef
{{< / highlight >}}

If you are using a locally hosted open soure Chef Server, contact the administrator for that server to have an account created. Once your account has been created you can generate a new authentication key by following these steps.

Sign into your account on the Chef Server and then

* Click on the `edit account` link in the upper-right corner of the page

* Check the box under **Regenerate Private Key** and click the **Save User** button. **Note**: Regenerating your private key means any previous key will no longer work.

* Copy your entire private key to your workstation naming it `your-id.pem` and saving it in the `~/.chef` directory you created above. If you are setting up more than one workstation, copy the key to those workstations as well.

## The Chef Server Key

The administrator for the Chef Server can also proide you with the server's `validator.pem`. Once you have received that file, copy it to your Chef keys directory as well, calling it `chef-validator.pem`.

## Completed Keys Setup

Your Chef authentication keys directory should now look similar to this:

{{< highlight bash >}}
drwxr-xr-x   10 mhn  staff   340B Jan  7 14:11 ./
drwxr-xr-x+  77 mhn  staff   2.6K Mar  2 10:37 ../
-rw-r--r--    1 mhn  staff   1.6K Jan  7 14:08 chef-validator.pem
-rw-r--r--    1 mhn  staff   1.6K Jan  7 14:06 you.pem
{{< / highlight >}}

# Setting up a Chef Repository

## Project Directory

Create a directory on your workstation to be the root of all your Chef activities. For example:

{{< highlight bash >}}
$ mkdir -p ~/Projects/chef
{{< / highlight >}}

## Create a Chef Repository (chef-repo)

The Chef Repository, or chef-repo, provides a structure for all the components of Chef: cookbooks, recipes, templates, attributes, roles, et cetera.

If you are using a hosted Chef Server, the same starter kit mentioned above will include a `chef-repo` for your use. Copy it to your newly created project directory. 

To create a `chef-repo` yourself follow these steps:

{{< highlight bash >}}
$ cd ~/Projects/chef
$ wget http://github.com/opscode/chef-repo/tarball/master
$ tar -zxf master
$ mv opscode-chef-repo* chef-repo
$ rm master
{{< / highlight >}}

**Note:** On OS X you may need to run `brew install wget` to add that utility to your system.

# Configure knife

knife is the Chef command line tool. It is an API-client that is used to communicate with the Chef Server, and also to perform some activities on your workstation. knife is included with Chef and was installed when you added Chef to your workstation.

If you are working from a stater kit you already have a completed `knife.rb` file and can skip ahead to "Testing your knife.rb configuration".

## knife Configuration

Create a `.chef` directory in your chef-repo.

{{< highlight bash >}}
$ cd ~/Projects/chef/chef-repo
$ mkdir .chef
{{< / highlight >}}

Using your favorite editor create a new file, `knife.rb` in the `.chef` directory. The file contents should look like this:

{{< highlight ruby >}}
current_dir = File.dirname(__FILE__)

node_name               'your-id'
client_key              '/Users/you/.chef/your-id.pem'
validation_client_name  'chef-validator'
validation_key          '/Users/you/.chef/chef-validator.pem'

chef_server_url         'https://path.to.your/chef-server'

cache_type              'BasicFile'
cache_options( :path => '/Users/you/.chef/checksums' )
cookbook_path           ["#{current_dir}/../cookbooks"]

cookbook_copyright      'Your Name'
cookbook_license        'reserved'
cookbook_email          'you@example.com'

log_level               :debug
log_location            STDOUT
{{< / highlight >}}

## Testing your knife.rb configuration

With the `knife.rb` configuration file in place you should be able to view the clients known to the your Chef Server.

{{< highlight bash >}}
$ cd ~/Projects/chef/chef-repo
$ knife client list
{{< / highlight >}}

Which should produce a list of all the nodes bootstrapped to that Chef Server. 

# Berkshelf

Chef cookbooks can and do have dependencies on other cookbooks. Berkshelf manages those dependencies in much the same way Gem dependencies are managed by `bundler` for Ruby. In order to use Berkshelf to deploy to our production Chef Server you will need to configure it. Run the following command to create a default Berkshelf configuration:

{{< highlight bash >}}
$ berks configure
{{< / highlight >}}

You will be prompted to provide several pieces of information.

{{< highlight bash >}}
$ berks configure
Enter value for chef.chef_server_url (default: 'http://localhost:4000'):  https://path.to.your/chef-server
Enter value for chef.node_name (default: 'Ruby.local'):  your-id
Enter value for chef.client_key (default: '/etc/chef/client.pem'):  /Users/you/.chef/you.pem
Enter value for chef.validation_client_name (default: 'chef-validator'):  chef-validator
Enter value for chef.validation_key_path (default: '/etc/chef/validation.pem'):  /Users/you/.chef/chef-validator.pem
Enter value for vagrant.vm.box (default: 'Berkshelf-CentOS-6.3-x86_64-minimal'): 
Enter value for vagrant.vm.box_url (default: 'https://dl.dropbox.com/u/31081437/Berkshelf-CentOS-6.3-x86_64-minimal.box'):  
Config written to: '/Users/you/.berkshelf/config.json'
{{< / highlight >}}

The result of this configuration will be a `config.json` file stored at `$HOME/.berkshef`

{{< highlight json >}}
{
  "chef":{
    "chef_server_url":"https://path.to.your/chef-server",
    "validation_client_name":"chef-validator",
    "validation_key_path":"/Users/you/.chef/chef-validator.pem",
    "client_key":"/Users/you/.chef/you.pem",
    "node_name":"you"
  },
  "cookbook":{
    "copyright":"Your Name",
    "email":"you@example.com",
    "license":"reserved"
  },
  "allowed_licenses":[],
  "raise_license_exception":false,
  "vagrant":{
    "vm":{
      "box":"Berkshelf-CentOS-6.3-x86_64-minimal",
      "box_url":"https://dl.dropbox.com/u/31081437/Berkshelf-CentOS-6.3-x86_64-minimal.box",
      "forward_port":{},
      "network":{
        "bridged":false,
        "hostonly":"33.33.33.10"
      },
      "provision":"chef_solo"
    }
  },
  "ssl":{
    "verify":true
  }
}
{{< / highlight >}}

You can edit your `config.json` to add the additional information shown in the example above. (The initial file will be compressed into a single line, you will have to had line breaks to achieve the format shown above.)

For more information on Berkshelf, visit [http://berkshelf.com]

# Using Berkshelf

I use Berkshelf to create cookbooks as it manages cookbook dependencies automatically. This is especially useful when uploading cookbooks to a Chef Server.

Create a new cookbook like so:

{{< highlight bash >}}
$ berks cookbook <new_cookbook_name>
{{< / highlight >}}

While the `knife` command, through its configuration, will put new cookbooks it creates in the `cookbooks` directory of the parent `chef-repo` where it is run, the `berks cookbook` command will create the new cookbook in the directory that currently has focus. Therefore it is suggested that you change your working path to be `~/Projects/chef-repo/cookbooks` before issuing the `berks cookbook` command.

# A Note About the chef-repo directory

When you created the chef-repo directory it came with a `.gitignore` file. While the chef-repo could be turned into a Git repository  I choose not to do this. Each cookbook I create is its own Git repository, and nesting Git repositories is cumbersome. Through use of the `Berksfile` included with each cookbook created via `berks cookbook` it is possible to reference cookbooks outside of the immediate context; cookbooks from Github and other locations on your workstation..

# Accessing Multiple Chef Servers Using Berkshelf

Berkshelf will look in the current working directory for a `.berkshelf/config.json` file so I have leveraged this to work with multiple Chef Servers. Currently I have three Chef Servers that I work with. 

Here is a very high-level overview of how to manage multiple Chef Servers via Berkshelf.

## Rename your exiting Chef project space

{{< highlight bash >}}
$ cd ~/Projects
$ mv chef alpha-chef
{{< / highlight >}}

## Create a chef-repo for each Chef Server

{{< highlight bash >}}
$ mkdir -p ~/Projects/beta-chef
$ mkdir -p ~/Projects/gamma-chef
{{< / highlight >}}

## Create a chef-repo for each Chef Server

{{< highlight bash >}}
$ cd ~/Projects/beta-chef
$ wget http://github.com/opscode/chef-repo/tarball/master
$ tar -zxf master
$ mv opscode-chef-repo* chef-repo
$ rm master
$ cd ~/Projects/gamma-chef
$ cp -R ../beta-chef/chef-repo .
{{< / highlight >}}

For each Chef Server you will have a pair of keys, your `*.pem` file and the Chef `validator.pem` file. Place your `pem` file and the `validator.pem` for that server in your `~/.chef` directory. Be careful to name the files differently for each server so as not to overlay existing `pem` files.

For example:

{{< highlight bash >}}
$ cd ~/.chef
$ ls -al
drwxr-xr-x   10 mhn  staff   340B Jan  7 14:11 ./
drwxr-xr-x+  77 mhn  staff   2.6K Mar  2 21:44 ../
-rw-r--r--    1 mhn  staff   1.6K Jan  7 14:08 alpha-chef-validator.pem
-rw-r--r--    1 mhn  staff   1.6K Jan  7 14:08 beta-chef-validator.pem
drwxr-xr-x  500 mhn  staff    17K Feb 16 11:03 checksums/
-rw-r--r--    1 mhn  staff   1.7K Jan  7 14:11 gamma-chef-validator.pem
-rw-r--r--@   1 mhn  staff   1.6K Jan  7 14:09 mhn-alpha.pem
-rw-r--r--    1 mhn  staff   1.6K Jan  7 14:05 mhn-beta.pem
-rw-r--r--    1 mhn  staff   1.6K Jan  7 14:06 mhn-gamma.pem
drwxr-xr-x    3 mhn  staff   102B Jan  7 14:09 pub/
{{< / highlight >}}

## Create knife.rb Configuration for each Chef Server

{{< highlight bash >}}
$ cd ~/Projects/beta-chef/chef-repo/.chef
$ cp ~/Projects/alpha-chef/chef-repo/.chef/knife.rb .
$ cd ~/Projects/gamma-chef/chef-repo/.chef
$ cp ~/Projects/alpha-chef/chef-repo/.chef/knife.rb .
{{< / highlight >}}

Edit the two new `knife.rb` files and fill in the correct `pem` file names.

## Rename your ~/.berkshelf/config.json file

{{< highlight bash >}}
$ cd ~/.berkshelf
$ mv config.json alpha-config.json
{{< / highlight >}}

## Create a new Berksfile configuration for each Chef Server

Run the `berks configure` command once for each additional Chef Server, filling in the appropriate values. After each `berks configure` command rename the resulting `config.json` file appropriately. Afterwards your `~/.berkshelf` directory will look similar to:

{{< highlight bash >}}
$ cd ~/.berkshelf
$ ls -al
drwxr-xr-x   11 mhn  staff   374B Mar  2 00:39 ./
drwxr-xr-x+  77 mhn  staff   2.6K Mar  2 21:55 ../
-rw-r--r--    1 mhn  staff   815B Mar  2 00:16 alpha-config.json
-rw-r--r--    1 mhn  staff   815B Mar  2 00:16 beta-config.json
drwxr-xr-x  118 mhn  staff   3.9K Jan 28 14:08 cookbooks/
drwxr-xr-x    5 mhn  staff   170B Nov 13 13:20 default/
-rw-r--r--    1 mhn  staff   811B Mar  2 00:15 gamma-config.json
drwxr-xr-x  512 mhn  staff    17K Feb 28 14:04 tmp/
drwxr-xr-x    6 mhn  staff   204B Nov 13 09:56 vagrant/
{{< / highlight >}}

## Place Berkshelf config files in chef-repo directories

Berkshelf looks for a `.berkshelf/config.json` in the current working directory. We can use this fact to setup each chef repo with its own berkshelf config. Copy the files created above (`alpha-config.json`, `beta-config.json`, and `gamma-config.json`) into `alpah-chef/chef-repo/.berkshelf/config.json`, `beta-chef/chef-repo/.berkshelf/config.json`, and `gamma-chef/chef-repo/.berkshelf/config.json` respectively.

{{< highlight bash >}}
cd ~/.berkshelf
mkdir ~/Projects/alpha-chef/chef-repo/.berkshelf/ 
mkdir ~/Projects/beta-chef/chef-repo/.berkshelf/ 
mkdir ~/Projects/gamma-chef/chef-repo/.berkshelf/
cp alpha-config.json ~/Projects/alpha-chef/chef-repo/.berkshelf/config.json
cp beta-config.json ~/Projects/beta-chef/chef-repo/.berkshelf/config.json
cp gamma-config.json ~/Projects/gamma-chef/chef-repo/.berkshelf/config.json
{{< / highlight >}}


## Caveat

The added complexity of managing multiple sets of knife and Berkshelf configurations, multiple sets of pem files, and multiple chef-repo, there is the possibility of inadvertently working against the wrong server. Caution should be exercised. 

# Summary
If you've successfully gotten this far you should now have configured your workstation to work with one or more Chef Servers. You should have knife and Berkshelf configurations for each Chef server, and you should have a working space for each server with a chef-repo to organize your work.
