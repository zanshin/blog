---
layout: post
title: "Create Lab Machines Using Vagrant"
date: 2020-10-07T22:27:00
tags:
- nerdliness
link:
---
For some time I've been interested in [Ansible](https://www.ansible.com "Ansible"), which is Red
Hat's lightweight, infrastructure automation tool. I found an Ansible tutorial on YouTube from
[LearnLinuxTV](https://www.youtube.com/playlist?list=PLT98CRl2KxKGoSzQJANrE26Y_eOY2xlSQ "Learn
Ansible"). Jay, the host, uses several VirtualBox VMs as his test lab for Ansible. I decided to go a
slightly different route.

I used [Vagrant](https://www.vagrantup.com "Vagrant") to create and minimally provision a lab
environment that I could use for the tutorial. After some trial and error, the Vagrantfile below is
my result.

    # -*- mode: ruby -*-
    # vi: set ft=ruby :

    # Vagranyfile API/syntax version
    VAGRANTFILE_API_VERSION = "2"

    Vagrant.require_version ">= 2.2.0"

    Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

      servers=[
          {
            :hostname => "lab01",
            :box      => "generic/ubuntu1804",
            :boxurl   => "generic/ubuntu1804",
            :ip       => "10.1.1.11"
          },
          {
            :hostname => "lab02",
            :box      => "generic/ubuntu1804",
            :boxurl   => "generic/ubuntu1804",
            :ip       => "10.1.1.12"
          },
          {
            :hostname => "lab03",
            :box      => "generic/ubuntu1804",
            :boxurl   => "generic/ubuntu1804",
            :ip       => "10.1.1.13"
          },
          {
            :hostname => "lab04",
            :box      => "generic/centos7",
            :boxurl   => "generic/centos7",
            :ip       => "10.1.1.14"
          }

        ]

      servers.each do |machine|
        config.vm.define machine[:hostname] do |node|
          node.vm.hostname = machine[:hostname]
          node.vm.box      = machine[:box]
          node.vm.box_url  = machine[:boxurl]
          node.vm.network :private_network, ip: machine[:ip]

          node.vm.provider :libvirt do |libvirt|
            libvirt.memory = 512
            libvirt.cpus = 1
          end
        end
      end

      ansible_pub = File.read(File.join(Dir.home, ".ssh", "ansible.pub"))

      config.vm.provision :shell,
            :inline => "echo 'appending SSH public key to ~vagrant/.ssh/authorized_keys' && echo '#{ansible_pub }' >> /home/vagrant/.ssh/authorized_keys && chmod 600 /home/vagrant/.ssh/authorized_keys"

      config.ssh.insert_key = false
    end

The `servers` array has entries for each lab machine to be created. Each machine has its own
hostname, its own IP address, and a Vagrant box image and URL. I'm using a private network for the
IP addresses, and I matched the IP address with the host name. `lab01` has IP address `10.1.1.11`,
`lab02` is `.12`, and so on.

The `servers.each` loop creates each VM, giving it 512MB of RAM and a single CPU. I'm using QEMU/KVM
as my virtualization layer, so I added the `vagrant-libvirt` plugin.

After the VMs are created, I'm using an `inline` shell provisioner to add an ssh key to the VM. I
generated a new key pair just for Ansible, and this inline script puts the public half of that key
pair on the VM.

In Ansible, I added a line to the `ansible.cfg` to specify `vagrant` as the ssh user.

With this setup I can quickly and painlessly create 4 VMs, using two different operating systems,
ready for use in my tutorial. I'm enjoying learning about Ansible, but I had fun creating this lab
environment using Vagrant too.

The GitHub repository for my lab environment is called [lab](https://github.com/zanshin/lab "lab")
is has an MIT license. Help yourself.
