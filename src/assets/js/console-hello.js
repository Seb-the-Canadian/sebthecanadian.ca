(function () {
  try {
    var sigil = [
      "",
      "    .",
      "   /|\\",
      "  /|||\\",
      " /|||||\\",
      "    |",
      ""
    ].join("\n");
    var style = "color:#4a8c6f;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;line-height:1.2";
    console.log("%c" + sigil, style);
    console.log(
      "%cyou opened the hood. respect.%c\nbuilt by hand — hello@cognitivearchitecture.ca",
      "color:#4a8c6f;font-weight:600;font-family:ui-monospace,monospace",
      "color:#8a8477;font-family:ui-monospace,monospace"
    );
  } catch (e) { /* noop */ }
})();
