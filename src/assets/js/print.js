/* The résumé's print button: rendered hidden, so without JavaScript there is no
   button that does nothing. This reveals it and opens the browser's print
   dialog, where "Save as PDF" is one of the destinations. Kept in a file rather
   than an onclick attribute so the Content-Security-Policy can stay strict. */
(function () {
  var btn = document.querySelector(".button--print");
  if (!btn || typeof window.print !== "function") return;
  btn.addEventListener("click", function () {
    window.print();
  });
  btn.hidden = false;
})();
