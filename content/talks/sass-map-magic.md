---
title: Sass Map Magic
author: miriam
date: 2014-09-12
image:
  src: talks/sass-map.jpg
  alt: Miriam being interviewed at a conference
slides: https://oddbooksapp.com/book/sass-map-magic
tags:
  - Sass
events:
  - venue: CSSConf 2016
    url: https://2016.cssconf.com/
    adr: Boston, MA
    date: 2016-09-26
    slides: https://oddbooksapp.com/release/b71e6e5d-e956-42ff-a4dd-b70bf3b13a2a
    media: &cssconf
      iframe: https://www.youtube.com/embed/MdwtoFt2LOI
  - venue: CSS Summit
    adr: Online
    date: 2015-07-07
  - venue: Future Insights Live
    adr: Las Vegas, NV
    date: 2015-06-02
  - venue: SassConf 2014
    adr: New York, NY
    url: https://twitter.com/sassconf
    date: 2014-10-02
  - venue: BlendConf
    adr: Charlotte, NC
    date: 2014-09-12
    video: https://vimeo.com/115826194
summary: |
  **Maps are a powerful data type in Sass** –
  perfect for managing color and scale palettes,
  framework configuration, data storage, and more.
media:
  - span: full
    <<: *cssconf
---

{% import "embed.macros.njk" as embed %}

We'll find ways to integrate maps into any project
before we push them to their limits.

- What are Sass Maps, and how do I use them?
- Organizing variables with maps.
- Manipulating maps programmatically.
- The main problems with maps, and how we work around them.
- Automating pattern libraries and style guides based on maps.
- Fun with maps for data-storage, and natural-language syntax.

------

{{ embed.figure(
  data=media,
  caption='Conference videos...'
) }}
