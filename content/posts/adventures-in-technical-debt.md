---
title: "Adventures in Technical Debt"
date: 2023-04-19T18:22:58-05:00

tags:
- technical debt
- refactoring
---
Almost five years ago the University where I work suffered a fire in the main library building on
campus. This building also houses, in the basement, the (then) primary data center. Two holes in the
ceiling of the data center, which had been made to allow conduit runs, had not been properly sealed.
We had a major water intrusion.

In the months that followed, as we worked to restore services and find ways to move out of the now
compromised data center, we used VMware Cloud on AWS. Most of our production servers were virtual
machines running in vSphere in our vBlock. With VMC we could "lift and shift" workloads from
on-premises to AWS relatively quickly.

This spring we are working to upgrade all our Ubuntu servers to version 22.04. This required some
adjustments to our `mod_cluster` configuration and our Apache configuration. Fortunately we have a
test environment and an infrastructure automation tool to help make test and prod the same.

Our infrastructure automation tool is Chef. One of the features of Chef is the ability to "pin" the
version of resources through the environment. All the nodes (Chef parlance for server) exist within
an environment, with clever names like "test", or "prod". When we set out to migrate to VMC a new
environment was created, called "prodvmc". Catchy.

At about the same time, some version pinning occurred in the "prod" environment. Pinning that was
never revisited. Pinning that was committed to the repository with no meaningful comments as to
**why** the versions were pinned.

All of our Ubuntu 22 testing occurred, naturally enough, in the "test" environment. We never
exercised the pinned versions. Also, apparently to reduce setup time in Vagrant, some resource
definitions had code that said, "don't do this if the environment is 'test'".

Both of these decisions have produced some technical debt we now have to pay. The infrastructure
automation code that is stepped around for the test environment hasn't proved to be hard to
overcome. Frustrating perhaps, but not insurmountable.

Unwinding the version pinning is a much larger debt. Our applications are Java-based web
applications running in Wildfly application server. One of the resources that was pinned is the
primary definition for our Wildfly clusters. A definition used by all of our major applications.

Not all of the servers belong to the "prod" environment. Slightly more than half belong to the
"prodvmc" environment, where there was no pinning. For the rest, we now need to revisit four years
of commits to determine what will happen to these production resources, when we remove the pinning
constraint and update to the latest version of the infrastructure definition.

One measurement of an organization's maturity, is how well things are documented. In our haste to
move to VMC we made a decision to pin some versions, most likely thinking, "This is temporary for
reason "x", we'll come back and address this once the move is completed." And then we never went
back. Not going back apparently hasn't had too large an impact since all our applications are
working. But not documenting the reason for the decision is going to cost us some time.

Lessons to learn:

* Document even seemingly small decisions
* Documentation should exist as close to the object being documented as possible, i.e., in the
  commit comment or in the pull request description.
* Have a review process that doesn't allow poorly documented decisions, code, whatever, to move
  forward


