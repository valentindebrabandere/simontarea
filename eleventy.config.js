
const schema = require("./src/_11ty/collections/schema.js");



module.exports = function (eleventyConfig) {
    // copy
    eleventyConfig.addPassthroughCopy("./src/assets/img");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy({ "./src/static": "./" });

    eleventyConfig.addCollection("items", schema);

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
  