const schema = require("./src/_11ty/collections/schema.js");

module.exports = function (eleventyConfig) {
  // copy
  eleventyConfig.addPassthroughCopy("./src/assets/img");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy({ "./src/static": "./" });

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

  // shortcodes
  eleventyConfig.addNunjucksShortcode("consoleLog", function (data) {
    return `<script>console.log(${JSON.stringify(data)});</script>`;
  });

  // override base config
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
