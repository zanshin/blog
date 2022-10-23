---
layout: post
title: "How to Rename Chef Roles"
date: 2014-07-23T15:58:00
tags:
- nerdliness
link:
---
Today I had need to rename several roles used in our Chef configuration. They had been created with dashes rather than underscores in their names and that prevented me from use the role name as a Ruby symbol. For example, while `my-role` might be a perfectly good name, `:my-role` as a Ruby symbol doesn't work. Renaming the roles is only part of the problem, finding all occurrences of the role in all the run-lists and updating those occurrences is the real trick.

A word of caution: As with any code you find on the Internet, you should review the script and commands given below to assure yourself you know their impact. Mass changes can have far reaching consequences. 

First off you need to download the role from the Chef Server to your workstation.

    $ knife download roles

(This command actually gets all your roles.)

Next, rename the file.

    $ mv my-role.json my_role.json

Now edit the file and correct the JSON `"name":` to match the new file name.

    $ vim my_role.json

Upload the new role to your Chef Server

    $ knife role from file my_role.json

On your Chef server now you should have two roles, one with a dash and one with an underscore that have identical contents.

To update all run-lists I used this script, which I found here: [renaming a role](http://permalink.gmane.org/gmane.comp.sysutils.chef.user/15629 "renaming a role")

{{< highlight ruby >}}
role_from = ARGV[2]  # format role[foo]'
role_to = ARGV[3]

if ARGV.length > 3 and ARGV[4] == 'dry-run'
   dry_run = true
else
   dry_run = false
end
puts role_from
nodes.all do |node|
   if node.run_list.include?(role_from)
     puts "match #{node}, current run_list #{node.run_list}"
     if node.run_list.include?(role_to)
       puts "ERROR #{node} has #{role_from} and #{role_to} skipping"
       next
     end
     pos = -1
     node.run_list.each_with_index do |item, index|
       if item == role_from
         pos = index
         break
       end
     end
     node.run_list.run_list_items[pos] = node.run_list.coerce_to_run_list_item(role_to)
     puts "\tchange  <at> pos=#{pos} new run list #{node.run_list}"
     if dry_run == false
       node.save()
       puts "\tsaving node #{node}"
     end
   end
end

exit 0
{{< / highlight >}}

To run this, save the script somewhere on your workstation. I put mine in my `~/.chef` directory in a new sub-directory called `scripts`. Once the script is saved run this `knife exec` command.

    $ knife exec ~/.chef/scripts/rename_nodes.rb "role[my-role]" "role[my_role]"

Optionally you can do a `dry-run` of the script to see its impact before making any changes.

    $ knife exec ~/.chef/scripts/rename_nodes.rb "role[my-role]" "role[my_role]" dry-run

You must specify the enclosing `role[ ... ]` otherwise the matching performed by the rename_nodes script won't work.

All your nodes should now be using the new role name. As a final step you can restart the Chef Client on all your nodes.

    $ knife ssh 'name:*' 'sudo /etc/init.d/chef-client restart'

Once everything checks out you can remove the old role.

