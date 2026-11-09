---
layout: base.njk
title: About
description: "About Seb Lathangue: the data governance and information architecture work, and how to reach me."
permalink: /about/
pageStyles:
  - /assets/css/figures.css
---

{% set mastheadLabel = "about/" %}
{% include "masthead.njk" %}

<figure class="about-portrait">
  <img class="u-photo" src="/assets/img/seb-pixel-portrait-340.webp" srcset="/assets/img/seb-pixel-portrait-340.webp 340w, /assets/img/seb-pixel-portrait-510.webp 510w" sizes="170px" decoding="async" width="340" height="340" alt="Pixel-art portrait of Seb Lathangue" />
</figure>

<p class="lede">I'm Seb Lathangue. I live near Toronto, but I'm most at home when I'm outside, without shoes on, and can see lots of green around me. I work on knowledge architecture and data governance at Meridian Credit Union, and I run <a href="/projects/">CivCitDev</a>, a civic-technology program building tools like Ontario Tenant Tools. I think a lot about how information moves through organizations — which pieces stick, which get lost, and who ends up accountable for the difference.</p>

This site is a stable front door. This page gathers the durable parts: who I am, how I approach the work, where to find the résumé, and how to reach me.

{# The join in three states. Unindented so Markdown leaves it alone; figState, figId and figKicker are set before each include. #}
<div class="fig-seq">
<div class="fig-seq__step">
<p class="fig-seq__kicker" id="about-join-1-kicker">1 OF 3 · THE SYSTEM</p>
{% set figKicker = true %}{% set figState = 1 %}{% set figId = "about-join-1" %}{% include "fig-join.njk" %}
<p class="fig-seq__text">Taxonomies, classification schemes, glossaries, metadata standards: the structures that make information findable and trustworthy.</p>
</div>
<div class="fig-seq__step">
<p class="fig-seq__kicker" id="about-join-2-kicker">2 OF 3 · THE PEOPLE</p>
{% set figKicker = true %}{% set figState = 2 %}{% set figId = "about-join-2" %}{% include "fig-join.njk" %}
<p class="fig-seq__text">On the other side, people trying to use them, and not enough translation between the two.</p>
</div>
<div class="fig-seq__step">
<p class="fig-seq__kicker" id="about-join-3-kicker">3 OF 3 · THE GOVERNED PATH</p>
{% set figKicker = true %}{% set figState = 3 %}{% set figId = "about-join-3" %}{% include "fig-join.njk" %}
<p class="fig-seq__text">I treat governance less as rulemaking and more as a design problem: if the governed path is easier than the ungoverned one, people take it without being told to.</p>
</div>
</div>
{% set figKicker = false %}

## How I approach the work

Before any of this had a name, I was hand-coding interview transcripts for a graduate study on how the media frames homelessness — deciding, line by line, which words belonged under which category, then defending the codebook when two coders disagreed. It looked like clerical work. It wasn't: every category was an argument about what the data meant, and who got to decide.

I didn't set out to work in data governance. I set out to work with information — in libraries, then research, then a lecture hall of 300 sociology undergrads, then learning design. The governance piece came later, when I got deep enough into enterprise data work to realize the core problem usually isn't technical. It's that nobody can agree on what anything means, or who's accountable for it.

Each stop turned out to be the same problem in different clothing. At Phreesia I was the translation layer between engineering and hospital IT departments — 100+ tickets closed a week, and a refusal to close the ones I'd only understood on the surface. At Meridian I've built a low-code governance program that grew from 50 builders to 150, and a self-serve knowledge hub that reaches 2,000-plus employees. Different rooms, same instinct: find where the confusion actually lives, and fix that.

A few things I've come to believe about the work: symptoms lie, so diagnose at the level of the system. Communication isn't separate from governance; how you explain a rule is part of the rule. <span class="pull-line">That's the problem I find interesting &mdash; and the one I've built a career solving.</span>

<aside class="resume-callout">
  <p class="resume-callout__note">The formal version — titles, dates, and what each role actually involved — lives on the résumé.</p>
  <p><a class="button" href="/resume/">Read the résumé &middot; print to PDF &rarr;</a></p>
</aside>

## Contact

Email: [hello@cognitivearchitecture.ca](mailto:hello@cognitivearchitecture.ca)

How this site is built, and what it does with your visit, is on the [colophon](/colophon/).
