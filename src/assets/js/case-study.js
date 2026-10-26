/* case-study.js — the shared script for case studies (story substrate).
   Marks the page so styles that depend on it (phone figure copies) only
   apply once it runs. */
document.documentElement.classList.add("story-js");
/* Portfolio Pudding substrate v1.
   - Steps: on wide screens, the step in the middle of the viewport sets its chapter's figure state.
   - Phones: each step is followed by a copy of its chapter's figure in that step's state (no overlap).
   - Section nav: highlights the current section and fills the progress line.
   - Claims register: rows with data-ref get an "In the story" link to the passage they come from.
   Figure state: any element with data-on="0,2" gets .on at those steps. Pages can add behaviour with
   Pudding.onStep(chapterId, (step, root) => {...}); root is the figure being updated (the sticky one or a phone copy).
   Pages that bind live values listen for the "pudding:layout" event, fired after phone copies are built or removed.
   Pudding.changed(el) gives a just-updated value a brief outline; Pudding.reduce is true under reduced motion. */
(function(){
  "use strict";
  const P = window.Pudding = window.Pudding || {};
  P.hooks = P.hooks || {};
  P.onStep = function(id, fn){ (P.hooks[id] = P.hooks[id] || []).push(fn); };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  P.reduce = reduce;
  // Mark a value that just changed: a brief outline that fades (a static outline under reduced motion).
  P.changed = function(el){
    if (!el) return;
    el.classList.remove("just-changed"); void el.offsetWidth; el.classList.add("just-changed");
    clearTimeout(el._jc); el._jc = setTimeout(function(){ el.classList.remove("just-changed"); }, 1400);
  };
  const phone = matchMedia("(max-width: 820px)");

  function applyState(root, chapterId, n){
    root.querySelectorAll("[data-on]").forEach(function(e){
      e.classList.toggle("on", e.dataset.on.split(",").map(Number).indexOf(n) > -1);
    });
    (P.hooks[chapterId] || []).forEach(function(fn){ try { fn(n, root); } catch (err) { console.error(err); } });
  }
  function figureOf(ch){ const sc = ch.querySelector(".scrolly"); return sc ? sc.querySelector(":scope > .graphic") : null; }
  function setStep(ch, n){
    ch.dataset.cur = n;
    ch.querySelectorAll(".step").forEach(function(s){ s.classList.toggle("active", +s.dataset.step === n); });
    const g = figureOf(ch); if (g) applyState(g, ch.id, n);
  }

  // Remove what a step doesn't show, and any section left with nothing to show.
  function prune(root){
    const secs = Array.prototype.slice.call(root.querySelectorAll(".sec"));
    const stateful = secs.map(function(s){ return !s.hasAttribute("data-on") && !!s.querySelector("[data-on]"); });
    root.querySelectorAll("[data-on]:not(.on)").forEach(function(e){ e.remove(); });
    secs.forEach(function(s, i){ if (s.isConnected && stateful[i] && !s.querySelector("[data-on]")) s.remove(); });
  }

  function buildPhone(){
    document.querySelectorAll(".m-fig").forEach(function(f){ f.remove(); });
    if (!phone.matches) return;
    document.querySelectorAll(".chapter").forEach(function(ch){
      const sc = ch.querySelector(".scrolly"); if (!sc || sc.classList.contains("inline")) return;
      const g = figureOf(ch); if (!g) return;
      ch.querySelectorAll(".step").forEach(function(step){
        const n = +step.dataset.step;
        const copy = g.cloneNode(true);
        copy.classList.remove("graphic");
        copy.removeAttribute("id");
        copy.querySelectorAll("[id]").forEach(function(e){ e.removeAttribute("id"); });
        applyState(copy, ch.id, n);
        prune(copy);
        if (!copy.textContent.trim() && !copy.querySelector("svg")) return;
        const fig = document.createElement("div");
        fig.className = "m-fig";
        fig.appendChild(copy);
        step.after(fig);
      });
    });
  }

  function init(){
    const chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
    chapters.forEach(function(ch){ setStep(ch, 0); });

    if ("IntersectionObserver" in window){
      const io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if (e.isIntersecting) setStep(e.target.closest(".chapter"), +e.target.dataset.step); });
      }, { rootMargin: "-45% 0px -45% 0px" });
      document.querySelectorAll(".chapter .step").forEach(function(s){ io.observe(s); });
    } else {
      document.querySelectorAll("[data-on]").forEach(function(e){ e.classList.add("on"); });
    }

    // Audience toggle. "gen" (New to the field) is the default; the choice is remembered per viewer.
    function setAud(a, save){
      a = a === "pro" ? "pro" : "gen";
      document.documentElement.setAttribute("data-aud", a);
      document.querySelectorAll("[data-aud-set]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.audSet === a)); });
      document.querySelectorAll("details.claimsbox").forEach(function(d){ d.open = (a === "pro"); });
      if (save) { try { localStorage.setItem("pudding-aud", a); } catch (_) {} }
      document.dispatchEvent(new CustomEvent("pudding:aud", { detail: a }));
    }
    let savedAud = "gen"; try { savedAud = localStorage.getItem("pudding-aud") || "gen"; } catch (_) {}
    setAud(savedAud, false);
    document.addEventListener("click", function(e){ const b = e.target.closest("[data-aud-set]"); if (b) setAud(b.dataset.audSet, true); });

    // Rebuilding phone copies can remove the focused control; put focus back on its counterpart.
    function focusKey(){
      const a = document.activeElement; if (!a || a === document.body) return null;
      const ch = a.closest(".chapter, .hero, .outcome"); if (!ch) return null;
      return { el: a, ch: ch, tag: a.tagName, text: (a.textContent || "").trim(), ds: JSON.stringify(a.dataset) };
    }
    function restoreFocus(k){
      if (!k || (k.el.isConnected && k.el.getClientRects().length)) return;
      const c = Array.prototype.slice.call(k.ch.querySelectorAll(k.tag)).filter(function(e){
        return e.getClientRects().length && (e.textContent || "").trim() === k.text && JSON.stringify(e.dataset) === k.ds;
      });
      if (c[0]) c[0].focus({ preventScroll: true });
    }
    function relayout(){ const k = focusKey(); buildPhone(); document.dispatchEvent(new CustomEvent("pudding:layout")); restoreFocus(k); }
    relayout();
    if (phone.addEventListener) phone.addEventListener("change", relayout);

    // Register back-links
    document.querySelectorAll(".reg tr[data-ref]").forEach(function(tr){
      const cell = tr.children[1]; if (!cell) return;
      const a = document.createElement("a");
      a.className = "ref"; a.href = "#" + tr.dataset.ref; a.textContent = "In the story ↑";
      cell.appendChild(document.createTextNode(" ")); cell.appendChild(a);
    });

    // Section nav
    const links = Array.prototype.slice.call(document.querySelectorAll(".secnav a"));
    const targets = links.map(function(a){ return document.getElementById(a.getAttribute("href").slice(1)); });
    const prog = document.getElementById("prog");
    let ticking = false;
    function onScroll(){
      if (ticking) return; ticking = true;
      requestAnimationFrame(function(){
        const h = document.documentElement, max = (h.scrollHeight - h.clientHeight) || 1;
        if (prog) prog.style.width = (Math.min(1, Math.max(0, h.scrollTop / max)) * 100).toFixed(1) + "%";
        const line = innerHeight * 0.35; let cur = -1;
        targets.forEach(function(t, i){ if (t && t.getBoundingClientRect().top <= line) cur = i; });
        links.forEach(function(a, i){ if (i === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
        if (cur >= 0){
          const a = links[cur], ul = a.closest("ul"), l = a.offsetLeft - ul.scrollLeft;
          if (l < 0 || l + a.offsetWidth > ul.clientWidth) ul.scrollTo({ left: a.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
        }
        ticking = false;
      });
    }
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    // In-page links: smooth scroll; flash the target when it comes from the register
    document.addEventListener("click", function(e){
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const id = a.getAttribute("href").slice(1); const t = id && document.getElementById(id); if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: a.classList.contains("ref") ? "center" : "start" });
      if (a.classList.contains("ref")){
        const box = t.querySelector(".step-in") || t;
        box.classList.remove("flash"); void box.offsetWidth; box.classList.add("flash");
      }
      try { history.replaceState(null, "", "#" + id); } catch (_) {}
    });
    const h = (location.hash || "").slice(1);
    if (h && document.getElementById(h)) requestAnimationFrame(function(){ document.getElementById(h).scrollIntoView({ block: "start" }); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else setTimeout(init, 0);
})();
