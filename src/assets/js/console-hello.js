(function () {
  try {
    // Same conifer dialect as the favicon and the HTML-source comment.
    var tree = [
      "",
      "      /\\",
      "     /  \\",
      "    /----\\",
      "   /      \\",
      "  /--------\\",
      "      ||",
      ""
    ].join("\n");

    // Nod to the season this build was cut in — set on <html data-season> at
    // build time, so the greeting tracks the calendar just like the glow does.
    var seasons = {
      winter: "cut in winter — the glow runs to frost.",
      spring: "cut in spring — the glow runs to lilac.",
      summer: "cut in summer — the glow runs full.",
      autumn: "cut in autumn — the glow runs to amber."
    };
    var season = document.documentElement.getAttribute("data-season");
    var note = seasons[season] || "hand-built, slowly tended.";

    var green = "color:#6f9d52;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;line-height:1.2";
    var muted = "color:#a8a195;font-family:ui-monospace,monospace";

    console.log("%c" + tree, green);
    console.log(
      "%cyou opened the hood. respect.%c\n" + note + "\nbuilt by hand — hello@cognitivearchitecture.ca",
      "color:#6f9d52;font-weight:600;font-family:ui-monospace,monospace",
      muted
    );
  } catch (e) { /* noop */ }
})();
