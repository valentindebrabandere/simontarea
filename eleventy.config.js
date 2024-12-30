// plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// collections
const schema = require("./src/_11ty/collections/schema.js");

// filters
const limit = require("./src/_11ty/filters/limit.js");
const dates = require("./src/_11ty/filters/dates.js");
const replaceSpans = require("./src/_11ty/filters/replaceSpans.js");

module.exports = function (eleventyConfig) {

  // collections
  const allItems = (collectionApi) => {
    return schema(collectionApi).schema__items;
  };
  eleventyConfig.addCollection("schema__bigItems", (collectionApi) => {
    return schema(collectionApi).schema__bigItems;
  });
  eleventyConfig.addCollection("schema__smallItems", (collectionApi) => {
    return schema(collectionApi).schema__smallItems;
  });

  eleventyConfig.addCollection("reviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/content/reviews/*.md")
      .filter(function(item) {
        return !item.data.draft;
      })
      .sort(function(a, b) {
        return a.data.sortOrder - b.data.sortOrder;
      });
  });

  eleventyConfig.addCollection("pages", (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/content/pages/*.md")
      .filter((item) => !item.data.draft);
  });

  // filters
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("replaceSpans", replaceSpans);

  // plugins
  eleventyConfig.addPlugin(syntaxHighlight, {
    trim: true,
  });

  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("admin/**/*");

  // passthrough copy
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy({ "./src/static": "/" });
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy({ "./admin": "/admin" });

  // server config
  eleventyConfig.setServerOptions({
    watch: ["./dist/assets/css/**/*.css", "./dist/assets/js/**/*.js"],
    port: 8000,
  });

  // fix for eleventy 1.0.0
  eleventyConfig.setFreezeReservedData(false);

  // base config
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
