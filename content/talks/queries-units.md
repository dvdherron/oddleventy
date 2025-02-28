---
title: Intrinsic CSS with Container Queries & Units
date: 2022-08-16
author: miriam
image:
  src: talks/container-query.jpg
  alt: |
    Wireframe of card elements
    in different sized containers --
    some laid out vertically in small spaces,
    others horizontal when there's room.
  position: top
tags:
  - CSS
  - Container Queries
  - CSSWG
events:
  - venue: Jamstack Conf
    adr: San Francisco, CA (hybrid)
    url: https://jamstack.org/conf/
    date: 2022-11-07
    end: 2022-11-08
    slug: 2022-jamstack
    discount:
      code: FRIENDOFMIRIAM20
      amount: 20%
  - venue: W3C Developer Meetup
    adr: Vancouver, Canada ([streaming](https://www.w3.org/2022/09/meetup/#stream))
    url: https://www.w3.org/2022/09/meetup/
    date: 2022-09-13
    slug: 2022-tpac
summary: |
  Container queries & units have a lot to offer
  as we enter a more content-out era of Intrinsic Web Design,
  but they also come with some limitations of their own.
  Join Miriam to learn about how the feature works,
  how to start using it in production,
  and what to look forward to as Container Queries continue to evolve.
---

CSS has always been contextual,
with a Cascade & Normal Flow
that allow content & styles to adapt across browsers,
writing modes, device interfaces,
and user-defined preferences.
Media Queries
(part of the initial language proposal!)
kicked off a decade of Responsive Web Design --
with more explicit control for
adapting designs to different context.
But with `@media`,
there's only one global context shared by every element on the page.

Container Queries are here to change that.
We can define 'containers' that expose more localized context --
and then query those containers in a variety of ways.
Beyond just the highly anticipated size queries,
we also get new container-relative units,
and a road-map for querying
container styles, states, and more.
