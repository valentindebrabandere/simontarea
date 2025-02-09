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
        // Filter out items where draft is true
        return !item.data.draft;
      })
      .sort(function(a, b) {
        // Sort by sortOrder field
        return a.data.sortOrder - b.data.sortOrder;
      });
  });

  // filters
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("replaceSpans", replaceSpans);

  // admin passthrough
  eleventyConfig.addPassthroughCopy("./admin");

  // collections
  eleventyConfig.addCollection("home", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/content/collections/home/*.md");
  });
  
  eleventyConfig.addCollection("about", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/content/collections/about/*.md");
  });
  
  eleventyConfig.addCollection("suivi", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/content/collections/suivi/*.md");
  });

  // plugins
  eleventyConfig.addPlugin(syntaxHighlight, {
    trim: true,
  });

  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy({ "./src/static": "/" });
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");

  // server config
  eleventyConfig.setServerOptions({
    watch: ["./dist/assets/css/**/*.css", "./dist/assets/js/**/*.js"],
    port: 8000,
  });

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
