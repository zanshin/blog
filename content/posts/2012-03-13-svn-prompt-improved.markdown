---
layout: post
title: "SVN Prompt Improved"
date: 2012-03-13T15:30:00
comments: true
tags:
- nerdliness
link: false
---
The new shell prompt I created for myself is working wonderfully. However, the Subversion prompt was only effective when I was in the root directory of a Subversion project. Once I drilled down into sub-directories the prompt, which depended upon the presence of a `.svn` directory, lost all Subversion information.

After much fiddling around last night I came up with a simple change that allows the Subversion information to be displayed, regardless of where I am in the directory hierarchy under the root directory of a Subversion controlled project.

Here's the code:

{{< highlight bash >}}
{% raw %}
# ----------------------------------------------------------------------------
# svn prompt
# based on: https://gist.github.com/1156969 
# with help from: http://andrewray.me/bash-prompt-builder/index.html
# 
# Only the root directory holds the .svn repository. We need to test each directory in the current
# directory's path to determine if we are under Subversion control.
# ----------------------------------------------------------------------------
function svn_prompt_info {
	# Set up defaults
	local svn_branch=""
	local svn_repository=""
	local svn_version=""
	local svn_change=""

	# if `svn info` returns more than 1 line, we are under subversion control
    testsvn=`svn info > /dev/null 2>&1 | wc -l`
    if [ $testsvn -gt 1 ] ; then
		# query svn info and parse the results
		svn_branch=`svn info | grep '^URL:' | egrep -o '((tags|branches)/[^/]+|trunk).*' | sed -E -e 's/^(branches|tags)\///g'`
		svn_repository=`svn info | grep '^Repository Root:' | egrep -o '(http|https|file|svn|svn+ssh)/[^/]+' | egrep -o '[^/]+$'`
		svn_version=`svnversion -n`
		
		# this is the slowest test of the bunch
		change_count=`svn status | grep "?\|\!\|M\|A" | wc -l`
		if [ "$change_count" != "       0" ]; then
			svn_change=" [dirty]"
		else
			svn_change=""
		fi
		
		# show the results
		echo "%{$fg[blue]%}$svn_repository/$svn_branch @ $svn_version%{$reset_color%}%{$fg[yellow]%}$svn_change%{$reset_color%}"
		
	fi
}

{% endraw %}
{{< / highlight >}}

The `testsvn` variable on line 17 is set to the result of running an `svn info` and then counting the lines of output via `wc -l`. By shunting the output of the command into `/dev/null` it's quiet, i.e., no output leaks out into the shell. And the `2>&1` bit captures the error message produced when `svn info` is run in a non-Subversion controlled directory. So, if I'm in a Subversion project the line count (`wc -l`) will be about 12. If I'm not in a Subversion project, there will be a single line counted -- the error produced.

The `if` statement on line 18 determines if there count is greater than 1 and if so, builds the Subversion portion of the prompt. 

Everything else stays the same as I had it before. It works beautifully.
