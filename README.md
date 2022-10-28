# TO-DO

## Required before site can go live
- [X] Figure out youtube shortcode
- [ ] Create archtypes
  - [ ] For "link" posts
  - [ ] For "video" posts
  - [ ] For regular posts
- [X] Add in post footer
- [X] Get figure shortcode working
- [ ] Copy other single pages from Jekyll version of site
  - [X] CIDR
  - [X] keybase.txt
  - [X] robots.txt
  - [X] Copy htaccess file
    - [ ] Construct Redirect for old permalink to new permalink
- [X] Setup 404 error page

## Go Live Steps
- [ ] Final conversion of Jekyll posts
- [ ] Remove test posts from content/posts, content/videos, content/links
- [ ] Put htaccess redirect into place
- [ ] Delete and recreate public_html/blog directory on web host (rsync --delete?)
- [ ] rsync -azr --delete public/* public_html/blog


## Optional - can happen after going live
- [ ] Create GitHub Action that rsyncs public to Pair on commit to main branch
- [ ] Get Tags page setup and working

## Ancillary - need to do elsewhere as a result of this project
- [X] Create new subdomain for password page

