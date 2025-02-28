'use strict';

const removeMd = require('@tommoor/remove-markdown');
const _ = require('lodash');
const markdown = require('markdown-it');
const mdAnchor = require('markdown-it-anchor');
const mdFootnote = require('markdown-it-footnote');
const mdMark = require('markdown-it-mark');
const striptags = require('striptags');
const truncate = require('truncate-html');
const typogrify = require('typogr');

const { anchorLinkIconString } = require('../../src/js/clickToCopy.cjs');

const mdown = markdown({
  html: true,
  breaks: false,
  typographer: true,
})
  .disable('code')
  .use(mdAnchor, {
    level: [2],
    permalink: mdAnchor.permalink.linkAfterHeader({
      symbol: anchorLinkIconString,
      style: 'visually-hidden',
      assistiveText: (title) => `Copy permalink to “${title}”`,
      visuallyHiddenClass: 'sr-only',
      wrapper: ['<div class="anchor-link-wrapper">', '</div>'],
      placement: 'before',
    }),
  })
  .use(mdMark)
  .use(mdFootnote);

/* @docs
label: Typography Filters
category: File
*/

/* @docs
label: typogr
category: typesetting
links:
  - '[Typogr.js](https://github.com/ekalinin/typogr.js/)'
params:
  content:
    type: string
  inline:
    type: boolean
    default: false
    note: |
      Inline typesetting removes the "widont" filter
      if the text has fewer than 5 words
*/
const typogr = (content, inline = false) => {
  if (content) {
    // if this is inline text with less than 5 words
    // avoid the "widont" feature
    return inline && content.split(' ').length < 5
      ? typogrify(content)
          .chain()
          .amp()
          .smartypants()
          .initQuotes()
          .caps()
          .ord()
          .value()
      : typogrify.typogrify(content);
  }

  return content;
};

/* @docs
label: md
category: typesetting
note: Block markdown with typesetting
params:
  content:
    type: string
*/
const md = (content) => (content ? typogr(mdown.render(content)) : content);

/* @docs
label: mdInline
category: typesetting
note: Inline markdown with inline typesetting
params:
  content:
    type: string
*/
const mdInline = (content) =>
  content ? typogr(mdown.renderInline(content), true) : content;

/* @docs
label: elide
category: typesetting
note: |
  Elide HTML at a given word count,
  and append `…` if elided.
params:
  html:
    type: string
  count:
    type: Number
    default: 50
*/
const elide = (html, count = 50) => {
  // Strip links, paragraph breaks, etc:
  const stripped = striptags(html.trim(), ['code', 'strong', 'em']);
  // Truncate stripped html:
  let truncated = truncate(stripped, count, { byWords: true, ellipsis: '…' });
  // This will catch both cases where no truncation was needed, but also
  // (unintentionally) cases where the truncation is within a final tag
  // (e.g. `<em>final words…</em>`) -- but that's probably good enough for now?
  if (!truncated.endsWith('…')) {
    return truncated;
  }
  // Strip non-alphanumeric trailing chars (e.g. commas, periods):
  if (truncated.slice(-2, -1).match(/[^A-Z|a-z|0-9]/) !== null) {
    truncated = `${truncated.slice(0, -2)}…`;
  }
  return truncated;
};

/* @docs
label: h
category: headings
note: Generate a heading at any given level
params:
  content:
    type: string
  level:
    type: Number (1-6)
  attrs:
    type: object
*/
const heading = (content, level, attrs = {}) => {
  const attr_html = _(attrs)
    .map((val, attr) => {
      if (!val) {
        return undefined;
      }
      return typeof val === 'boolean' || val === ''
        ? `${attr}`
        : `${attr}="${val}"`;
    })
    .compact()
    .uniq()
    .join(' ');

  return `<h${level} ${attr_html}>${content}</h${level}>`;
};

/* @docs
label: callout
category: callouts
note: |
  Add callout boxes for highlighted content,
  e.g. `{% callout type, label %}content{% endcallout %}`
params:
  content:
    type: markdown string
  type:
    type: string
    default: 'note'
    note: |
      The primary expected values are 'note' or 'warn',
      though we currently only have styling for 'note' callouts.
  label:
    type: string
    default: null
    note: |
      Null label will default to
      'Note' when the type is 'note',
      'Warning' when the type is 'warn',
      and otherwise the type as given.
*/
const callout = (content, type = 'note', label = null) => {
  const labels = {
    note: 'Note',
    warn: 'Warning',
  };

  return `<div data-callout="${type}">
            <strong>${label || labels[type] || type}:</strong>
            <div>${md(content.trim())}</div>
          </div>`;
};

module.exports = {
  mdown,
  elide,
  typogr,
  md,
  mdInline,
  removeMd,
  heading,
  callout,
};
