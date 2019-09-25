const hljs = require('@11ty/eleventy-plugin-syntaxhighlight');

const utils = require('./_src/filters/utils');
const events = require('./_src/filters/events');
const pages = require('./_src/filters/pages');
const tags = require('./_src/filters/tags');
const time = require('./_src/filters/time');
const type = require('./_src/filters/type');

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(hljs);

  // pass-through
  eleventyConfig.addPassthroughCopy('content/assets');
  eleventyConfig.addPassthroughCopy('content/robots.txt');

  // collections
  eleventyConfig.addCollection('orgs', collection => {
    return collection
      .getAll()
      .filter(item => item.data.org && item.data.end === 'ongoing')
      .sort((a, b) => a.data.start - b.data.start);
  });
  eleventyConfig.addCollection('all_orgs', collection => {
    return collection
      .getAll()
      .filter(item => item.data.org)
      .sort((a, b) => {
        const ae = a.data.end === 'ongoing' ? null : a.data.end;
        const be = b.data.end === 'ongoing' ? null : b.data.end;

        if (ae === be) {
          return a.data.start - b.data.start;
        }
        return ae - be;
      });
  });

  // filters
  eleventyConfig.addFilter('typeCheck', utils.typeCheck);
  eleventyConfig.addFilter('objectKeys', utils.objectKeys);
  eleventyConfig.addFilter('jsonString', utils.jsonString);
  eleventyConfig.addFilter('only', utils.only);

  eleventyConfig.addFilter('getDate', time.getDate);
  eleventyConfig.addFilter('rssDate', time.rssDate);
  eleventyConfig.addFilter('rssLatest', time.rssLatest);

  eleventyConfig.addFilter('publicTags', tags.publicTags);
  eleventyConfig.addFilter('getTags', tags.getTags);
  eleventyConfig.addFilter('groupTags', tags.groupTags);
  eleventyConfig.addFilter('hasTag', tags.hasTag);
  eleventyConfig.addFilter('withTag', tags.withTag);
  eleventyConfig.addFilter('displayName', tags.displayName);
  eleventyConfig.addFilter('tagLink', tags.tagLink);
  eleventyConfig.addFilter('inTopTagCount', count => {
    return typeof count === 'number' && count <= tags.topCount;
  });

  eleventyConfig.addFilter('getPage', pages.fromCollection);
  eleventyConfig.addFilter('getPublic', pages.getPublic);
  eleventyConfig.addFilter('seriesNav', pages.seriesNav);
  eleventyConfig.addFilter('titleSort', pages.titleSort);
  eleventyConfig.addFilter('authorPage', (collection, bird) => {
    const url = `/authors/${bird}/`;
    return pages.fromCollection(collection, url);
  });

  eleventyConfig.addFilter('activeNav', (collection, nav, page) => {
    const checkUrl = (link) => {
      const target = pages.fromCollection(collection, link.url);

      link.title = target.data.title || target.fileSlug;
      link.active = (link.url === page.url)
        || (link.url === page.location)
        || (target.fileSlug === page.location);

      return link;
    };

    function checkItem(item) {
      if (item.url) {
        return checkUrl(item);
      }

      if (item.subnav) {
        const subnav = item.subnav.map(sub => checkUrl(sub));

        item.subnav = subnav;
        item.active = subnav.filter(sub => sub.active).length > 0
          || (item.title === page.location);

        return item;
      }
    };

    return nav.map(main => checkItem(main));
  });

  eleventyConfig.addFilter('getEvents', events.get);
  eleventyConfig.addFilter('countEvents', events.count);
  eleventyConfig.addFilter('groupName', group => events.groupNames[group]);

  eleventyConfig.addFilter('amp', type.amp);
  eleventyConfig.addFilter('typogr', type.set);
  eleventyConfig.addFilter('md', type.render);
  eleventyConfig.addFilter('mdInline', type.inline);

  // shortcodes
  eleventyConfig.addPairedShortcode('md', type.render);
  eleventyConfig.addPairedShortcode('mdInline', type.inline);
  eleventyConfig.addShortcode('getDate', format => {
    return `${time.getDate(time.now, format)}`;
  });

  // markdown
  eleventyConfig.setLibrary('md', type.mdown);

  // settings
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'content',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
