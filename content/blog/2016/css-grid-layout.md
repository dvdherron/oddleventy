---
card: feature
title: Will CSS Grid Layout Enable Creative Design?
author: stacy
date: 2016-09-19
tags:
  - Article
  - Grids
  - CSS
  - Layout
  - Design
image:
  src: blog/cssgriddemo.jpg
  alt: CSS Grid example layout
summary: |
  CSS Grid Layout is shaping up to be the layout tool we've always wanted
  on the web. How can we use it to start creating interesting layouts?
after:
  - include: blog/_tag-module.html.j2
    title: Posts about CSS Grid Layout
    tag: CSS Grid
    id: css-grid-layout
---

{% import 'embed.macros.njk' as embed %}

I couldn’t be more excited about CSS grid layout. For far too many years
we’ve been dealing with CSS solutions that were never made for the
layouts we have been creating. Working with tables then floats and
positioning have conditioned us to avoid anything outside of these
standard patterns we’ve come to settle upon. But designers and CSS
developers can soon rejoice when the CSS Grid Layout Module hits
browsers.

In the meantime, Flexbox has been a great addition to our CSS Toolbox,
giving us a way to lay content out easier than before. Remember when
vertical centering used to be a huge ordeal? There are a number of
issues that are “[Solved by Flexbox],” but it is still not a complete
grid solution.

If you haven’t used Flexbox yet, I highly suggest studying this CodePen
demo:

{{ embed.codepen(
  id='adLPwv',
  title='Flexbox playground',
  user='enxaneta'
) }}

Flexbox is great for single direction elements but lacks the ability to
create structure on both x and y axis’. A container with <span
class="title-ref">display: flex;</span> can either go horizontally or
vertically as selected by the flex-direction property.

[Solved by Flexbox]: https://philipwalton.github.io/solved-by-flexbox/

## CSS Grid Layout to the Rescue

Well, CSS Grid Layout is in the far distant future. It doesn’t have much
browser support at the moment so if you want to use it on a production
site you may want to use Feature Queries. By wrapping your code in an
`@supports` conditional, it will check to see if the browser has support
for the property/value pair in the parentheses, and if so, will use what
is inside the @supports brackets. If the browser doesn't have support
for <span class="title-ref">display: grid</span> or if the browser
doesn't even know what Feature Queries are, then it ignores the block of
code.

```scss
.container {
  display: flex;

  @supports ( display: grid ) {
     display: grid;
  }
}
```

Currently, Feature Queries are supported in most browsers except
Internet Explorer and Opera Mini:

[{{ embed.img(
  src='blog/feature-queries.jpg',
  alt='Feature Queries support in browsers looks good',
  attrs={
    'class': 'align-center',
    'width': '1980',
    'height': '1288'
  }
) }}](https://caniuse.com/css-featurequeries)

### Grid Introduces New Vocabulary

**Grid line**
The lines that create the grid, separating the grid cells.

{{ embed.svg('svg/grid/line') }}

**Grid track**
The horizontal or vertical space between two grid lines, often spanning
multiple grid cells.

{{ embed.svg('svg/grid/track') }}

**Grid cell**
A single unit of the grid made from the space between four grid lines.

{{ embed.svg('svg/grid/cell') }}

**Grid area**
A group of space between four grid lines, often containing a group of
grid cells. Grid areas can be named in CSS.

{{ embed.svg('svg/grid/area') }}

### Grid-specific CSS Properties

Over the next few months we will be writing more about CSS Grid Layout.
In the meantime, [CSS-Tricks posted a guide] from [Chris House]
that explains each of the below properties in great detail.

[CSS-Tricks posted a guide]: https://css-tricks.com/snippets/css/complete-guide-grid/
[Chris House]: https://chris.house/

#### CSS Grid Layout Properties to use on a Grid Container:

- display
- grid-template-columns
- grid-template-rows
- grid-template-areas
- grid-column-gap
- grid-row-gap
- grid-gap
- justify-items
- align-items
- justify-content
- align-content
- grid-auto-columns
- grid-auto-rows
- grid-auto-flow
- grid

#### CSS Grid Layout Properties to use on a Grid Item:

- grid-column-start
- grid-column-end
- grid-row-start
- grid-row-end
- grid-column
- grid-row
- grid-area
- justify-self
- align-self

I’ve been creating a few demos in CodePen using Grid and it has been
exciting to see the flexibility we will have once this rolls out. I
encourage you to start experimenting on your own as well.

{{ embed.codepen(
  id='rLyErg',
  title='CSS Grid Layout Demo',
  user='stacy',
  height=568
) }}

In the CodePen demo below, you'll see we start with floats then wrap
everything else in `@supports ( display: flex ) {}` or
`@supports ( display: grid ) {}`. Within the first Flexbox conditional,
we over-write the float, max-width, and clearing properties we defined
for the older browsers.

{{ embed.codepen(
  id='vXBvNE',
  title='CSS Grid Layout with float and flexbox fallbacks',
  user='stacy',
  height=568
) }}

What types of layouts can we create with this more flexible system? I
would love for some very experimental design to start taking place. I
can hear the sighs from usability experts everywhere so let me be clear,
I am not saying that we need to create crazy, chaotic designs with
unpredictable navigation patterns. I am only asking how we can explore
and create new ways to layout out content that are still intuitive but
perhaps different from what we've always done in the past.

## Flexbox and CSS Grid Layout Resources

### Flexbox

- [Stacy’s Flexbox Bookmark Collection]
- [Codrops CSS Flexbox Reference]
- [CSS-Tricks Guide to Flexbox]
- [Flexbox Froggy]
- [Flexbox Defense]
- [Flexbox Patterns]

[Stacy’s Flexbox Bookmark Collection]: https://raindrop.io/collection/1328630
[Codrops CSS Flexbox Reference]: https://tympanus.net/codrops/css_reference/flexbox/
[CSS-Tricks Guide to Flexbox]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[Flexbox Froggy]: https://flexboxfroggy.com/
[Flexbox Defense]: http://www.flexboxdefense.com/
[Flexbox Patterns]: https://www.flexboxpatterns.com/

### CSS Grid Layout

- [Stacy’s CSS Grid Layout Bookmark Collection]
- [Grid by Example]
- [Jen Simmons Labs]
- [Should I Use Grid or Flexbox]
- [Get Ready for CSS Grid Layout]
- [CSS Grid Layout]
- [Where Things Are at in the CSS Grid Layout Working Draft]
- [CSS Grid Layout CodePen Collection]

[Stacy’s CSS Grid Layout Bookmark Collection]: https://raindrop.io/collection/1295293
[Grid by Example]: https://gridbyexample.com/
[Jen Simmons Labs]: https://labs.jensimmons.com/
[Should I Use Grid or Flexbox]: https://www.rachelandrew.co.uk/archives/2016/03/30/should-i-use-grid-or-flexbox/
[Get Ready for CSS Grid Layout]: https://abookapart.com/products/get-ready-for-css-grid-layout
[CSS Grid Layout]: https://blogs.igalia.com/mrego/tag/css-grid-layout/
[Where Things Are at in the CSS Grid Layout Working Draft]: https://www.sitepoint.com/where-things-are-at-in-the-css-grid-layout-working-draft/
[CSS Grid Layout CodePen Collection]: https://codepen.io/collection/XRRJGq/

### Related Conference Talks

There have been a number of wonderful conference talks from CSS Grid
advocates including Rachel Andrew, Christopher Wright and Jen Simmons
demonstrating the *how*, *why* and *what* is possible when it comes to
CSS Grid Layout. If you have any resources to share with us, we'd love
to hear from you, too!

{{ embed.video(
  src='https://player.vimeo.com/video/160593669',
  height=360,
  width=640,
  caption='Taking Layout to the Next Level, by Chrisopher Wright'
) }}
