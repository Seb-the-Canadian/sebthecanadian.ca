(function () {
  // Hover-reveal anchor links on content headings. Progressive enhancement:
  // headings get slug ids (if missing) and a trailing "#" that deep-links the
  // section; clicking copies the full URL as a small reward. No build step —
  // ids are derived from the heading text at load.
  var main = document.getElementById("content");
  if (!main) return;

  var slugify = function (s) {
    return s.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  var used = {};
  var heads = main.querySelectorAll("h2, h3");

  Array.prototype.forEach.call(heads, function (h) {
    // Skip label-style headings (home-page section eyebrows) and masthead.
    if (h.classList.contains("eyebrow")) return;

    var id = h.id;
    if (!id) {
      id = slugify(h.textContent || "");
      if (!id) return;
      if (used[id]) { id = id + "-" + (++used[id]); } else { used[id] = 1; }
      h.id = id;
    }

    var a = document.createElement("a");
    a.className = "heading-anchor";
    a.href = "#" + id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";

    a.addEventListener("click", function (e) {
      if (!navigator.clipboard) return; // fall back to plain hash navigation
      e.preventDefault();
      var url = location.origin + location.pathname + "#" + id;
      history.replaceState(null, "", "#" + id);
      h.scrollIntoView();
      navigator.clipboard.writeText(url).then(function () {
        a.classList.add("is-copied");
        setTimeout(function () { a.classList.remove("is-copied"); }, 1400);
      }).catch(function () { /* clipboard blocked — hash still updated */ });
    });

    h.appendChild(a);
  });
})();
