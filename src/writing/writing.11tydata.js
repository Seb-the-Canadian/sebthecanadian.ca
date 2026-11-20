// Writing directory data. A post with two or more declared revisions shows
// the "How this page has grown" figure (post.njk → fig-versions.njk), which
// needs the shared figure styles and the version styles.
export default {
  eleventyComputed: {
    versionStyles: (data) => {
      const vers = data.revisions && data.revisions.bySlug && data.revisions.bySlug[data.page.fileSlug];
      if (!vers || vers.length < 2) return [];
      const have = data.pageStyles || [];
      return [...(have.includes("/assets/css/figures.css") ? [] : ["/assets/css/figures.css"]), "/assets/css/versions.css"];
    },
  },
};
