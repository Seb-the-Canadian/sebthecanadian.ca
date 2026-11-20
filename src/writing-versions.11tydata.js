// Computed values for the version pages (src/writing-versions.njk).
// The newest version links the post's current styles; an older one carries
// its own as they stood then, inlined by post-version.njk.
export default {
  eleventyComputed: {
    title: (data) => `${data.ver.data.title || data.ver.slug} (version ${data.ver.n})`,
    description: (data) => `Version ${data.ver.n} of ${data.ver.total}, ${data.ver.date}: ${data.ver.text}`,
    canonicalPath: (data) => data.ver.postUrl,
    pageStyles: (data) => (data.ver.isLatest ? data.ver.data.pageStyles || [] : []),
    versionStyles: () => ["/assets/css/versions.css"],
  },
};
