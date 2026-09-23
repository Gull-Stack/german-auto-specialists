module.exports = function(eleventyConfig) {

  const SITE = "https://www.german-auto-specialists.com";

  const titleCase = (slug) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  // BreadcrumbList that mirrors the breadcrumb already visible on the page.
  // Derived from page.url so it cannot drift from the URL it describes.
  // `label` overrides the final crumb where the visible text is not the slug
  // title-cased. The city pages pass their `city` front matter.
  eleventyConfig.addFilter("breadcrumbJsonLd", (url, label) => {
    const segs = String(url || "/").split("/").filter(Boolean);
    if (segs.length === 0) return ""; // the home page carries no trail
    const items = [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
    ];
    segs.forEach((seg, i) => {
      const isLast = i === segs.length - 1;
      items.push({
        "@type": "ListItem",
        position: i + 2,
        name: isLast && label ? label : titleCase(seg),
        item: SITE + "/" + segs.slice(0, i + 1).join("/") + "/",
      });
    });
    return JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      },
      null,
      2
    );
  });
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/vercel.json");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/.well-known");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
