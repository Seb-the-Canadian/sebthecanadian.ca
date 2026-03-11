import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import yaml from "js-yaml";
import { readFileSync } from "node:fs";

export default function (eleventyConfig) {
  // YAML data file support
  eleventyConfig.addDataExtension("yml,yaml", (contents) => {
    return yaml.load(contents);
  });
  // RSS/Atom feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "writing",
      limit: 20,
    },
    metadata: {
      language: "en",
      title: "Seb (the Canadian)",
      subtitle: "Writing from sebthecanadian.ca",
      base: "https://sebthecanadian.ca/",
      author: {
        name: "Seb Lathangue",
        email: "hello@cognitivearchitecture.ca",
      },
    },
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // Writing collection
  eleventyConfig.addCollection("writing", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/writing/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("isoDateShort", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "../_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
