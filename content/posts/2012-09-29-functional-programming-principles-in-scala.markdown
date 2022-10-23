---
layout: post
title: "Functional Programming Principles in Scala"
date: 2012-09-29T21:46:00
comments: true
tags:
- nerdliness
link: false
---
Recently I wrote about staring a class with [Coursera](https://zanshin.net/2012/09/17/coursera/ "Coursera"). The class I am taking, [Functional Programming Principles in Scala](https://www.coursera.org/course/progfun "Functional Programming Principles in Scala") is now into its second week and I am pleased with my progress. It hasn't by any stretch been easy - after 35+ years of imperative programming trying to think in terms of recursion and functions is difficult. 

I would love to write about the assignments we've been given and about my solutions and how I arrived at them. However, since this course, like many on [Coursera](http://coursera.org "Coursera"), offers a certificate to participants who successfully complete the course work, there is an [honor code](https://www.coursera.org/maestro/auth/normal/tos.php "Terms of Service") that I am bound by that includes an injunction against making solutions to assignments available to anyone else. In one of the class forums someone asked if the solutions would be provided after the deadline for the assignment had passed and the staff response was, in a word, no. There are plans to re-offer this course in the future and it would be too great an effort if they had to update the assignments, and the automatic grading, for each class offering.

Having said that there are still some aspects of functional programming I think I can talk about here without violating the honor code. Perhaps the two biggest insights I've gained from the first two sets of lectures center on recursion and functions as types.

Recursion is a concept I was already familiar with but not one I've made great use of in my programming career. While I was in college one of my assignments was to write a program that would solve the [Towers of Hanoi](http://en.wikipedia.org/wiki/Tower_of_Hanoi "Towers of Hanio") puzzle. This is the game where you have three posts, one of which has a stack of disks on it. The disks are stacked from largest (on the bottom) to smallest (on the top). You have to move the entire stack to a new post with out putting a larger disk over a smaller one. Programmatically the solution makes use of recursion. Recursion simply means a subroutine or function that calls itself. As long as there is a condition that terminates the recursion it works. What I remember most about the Towers problem is that the number of moves can be calculated as the 2 raised to the number of disks minus one. 3 disks = 2**3 - 1, or 7 moves. We were told not to test our solutions with any more than 5 or 6 disks as we could tie up the processor on the mainframe.

One of the tenets of functional programming is immutable variables. Most (all?) imperative languages have mutable variables. You can create an accumulator and increment it every time set condition happens. At the end of the execution you'll know how many times that condition occurred. While there is nothing wrong with mutable state, it becomes vastly more complicated when you start having multi-core processors. Spreading the computing load of your application out over multiple processors, simultaneously, makes it possible for one instance of the code to be impacted by mutations from another instance of the code. Eliminating mutable variables avoids this complication making it easier to support concurrent execution on multiple processors.

Instead of having mutable variables you have functions, which can recursively call themselves logically mimicking the effect of mutable variables without physically altering state. At first blush this is a difficult concept to wrap your head around, especially if it has been marinating in a mutation happy imperative programming world for several decades. Not only does functional programming make heavy use of recursion, it makes use of functions as types.

Data is described in terms of its type. Character data has one type, while numeric has another. Some times are subdivided: integers and floating point for example. With functional programming you can define a new type that is a function. This week we were given a type definition of template for defining sets of numbers. And using that type you could create a rule for determining if a number was even. 

{{< highlight bash  >}}
type Set = Int => Boolean
val evens: Set = x => x % 2 == 0
{{< / highlight >}}

The first line defines a type, called _Set_ as an integer that satisfies some boolean expression. The second line creates a new value, called _evens_ that implements a rule, _x % 2 == 0_ to determine if the integer is an even number. (In Scala the _%_ indicates modulo arithmetic, which simply means divide and keep the remainder, so _x % 2_ divides the number by two and if the remainder is 0 we know it's an even number.)

THe hard part about _evens_ is that is doesn't contain a single number. It is just the rule for determining if a given integer is an even number. `evens(1)` would return false as _1_ is not an even number, `evens(2)` would return true as _2_ is even. I spent most of the week struggling with the idea that any `Set` I defined didn't actually hold any numbers - it just held a rule for determining membership to the set. 

Our assignment this week centered around creating some functions to manipulate our newly defined Set type, including intersections, unions, differences, and contains. The hardest of these required determining if the numbers granted membership to the Set also satisfied the membership requirements of a predicate (another Set) either singly or the whole set. All week I kept thinking I could do this with a loop and some tasty mutable variables - but that would be imperative coding and not functional. Once I found the solutions to the problems I was struck with how simple they were - in most cases a _single line of code_. Simple in implementation but massively dense in concept.

Functional programming has its roots in lambda calculus, and I suspect a healthy does of symbolic logic. Calculus and algebra where not my favorite subjects in school, so I'm not sure I'll ever be a functional programming convert. I am convinced that the future of programming will depend upon functional concepts as our processors aren't going to get faster, they are just going to have more cores. And in order to utilize those cores applications will need to be capable of maintaining their internal start without mutable variables. 
