---
layout: post.njk
title: "Reading power, sphere by sphere"
date: 2026-11-20
updated: 2026-11-20
type: post
stage: seedling
excerpt: "A first version of the spheres ledger: an information architecture for reading who can constrain whom, where, and on what evidence. The structure and the tests, no findings yet."
tags:
  - research
syndicated: false
inProgress: true
pageStyles:
  - /assets/css/figures.css
  - /assets/css/posts/spheres-ledger.css
---

Most maps of world power are stories: who's rising, who's falling, who counts as a superpower. I wanted something I could check. The spheres ledger is my attempt at an architecture for reading power instead: a small set of categories, two roles, and tests a claim has to pass before it counts.

In [Grokipedia was a warning shot](/writing/grokipedia-was-a-warning-shot/) I asked who controls the infrastructure. This is one way I've tried to make that kind of question answerable. It's a first version, shared to show the thinking rather than the findings. This page changes as the work does. Every change is dated at the bottom.

## Spheres, not one map

Power isn't one thing. A country can set the terms for banking and have almost no say over chips. So the ledger reads power in six spheres: security, finance, trade, energy and logistics, tech and compute, and legitimacy (who gets recognized, and whose votes bind). The spheres overlap, and the same two countries can meet in several of them on different terms.

<div class="fig-seq sl-seq">
<div class="fig-seq__step">
<p class="fig-seq__kicker" id="sl-sph-1-kicker">1 OF 3 · SIX SPHERES</p>
<figure class="fig sl-fig" aria-labelledby="sl-sph-1-kicker sl-sph-1-title">
<p class="fig__title" id="sl-sph-1-title">THE SPHERES</p>
<svg class="sl-spheres" viewBox="0 0 240 240" role="img" aria-label="Six overlapping circles, one for each sphere: security, finance, trade, energy and logistics, tech and compute, and legitimacy" focusable="false">
<g class="sl-ring"><circle cx="120" cy="68" r="56"/><circle cx="165" cy="94" r="56"/><circle cx="165" cy="146" r="56"/><circle cx="120" cy="172" r="56"/><circle cx="75" cy="146" r="56"/><circle cx="75" cy="94" r="56"/></g>
<g class="sl-tags"><text x="120" y="29">S1</text><text x="204" y="76">S2</text><text x="204" y="172">S3</text><text x="120" y="223">S4</text><text x="36" y="172">S5</text><text x="36" y="76">S6</text></g>
</svg>
<ul class="fig__chips sl-chips" aria-label="The six spheres">
<li class="chip">S1 security</li>
<li class="chip">S2 finance</li>
<li class="chip">S3 trade</li>
<li class="chip">S4 energy &amp; logistics</li>
<li class="chip">S5 tech &amp; compute</li>
<li class="chip">S6 legitimacy</li>
</ul>
</figure>
<p class="fig-seq__text">Six domains where one actor can constrain another. They overlap: nothing has to sit in only one.</p>
</div>
<div class="fig-seq__step">
<p class="fig-seq__kicker" id="sl-sph-2-kicker">2 OF 3 · TWO ROLES</p>
<figure class="fig sl-fig" aria-labelledby="sl-sph-2-kicker sl-sph-2-title">
<p class="fig__title" id="sl-sph-2-title">THE SPHERES</p>
<svg class="sl-spheres" viewBox="0 0 240 240" role="img" aria-label="Inside the security sphere, Controller X points to Resident Y: one edge, one claim" focusable="false">
<g class="sl-ring"><circle cx="120" cy="68" r="56"/><circle cx="165" cy="94" r="56"/><circle cx="165" cy="146" r="56"/><circle cx="120" cy="172" r="56"/><circle cx="75" cy="146" r="56"/><circle cx="75" cy="94" r="56"/></g>
<g class="sl-tags"><text x="120" y="29">S1</text><text x="204" y="76">S2</text><text x="204" y="172">S3</text><text x="120" y="223">S4</text><text x="36" y="172">S5</text><text x="36" y="76">S6</text></g>
<line class="sl-edge sl-edge--moss" x1="99" y1="36" x2="134" y2="36"/><polygon class="sl-head" points="142,36 132,30.5 132,41.5"/>
<circle class="sl-node sl-node--x" cx="90" cy="36" r="8"/><circle class="sl-node sl-node--y" cx="150" cy="36" r="8"/>
<text class="sl-name" x="90" y="62">X</text><text class="sl-name" x="150" y="62">Y</text>
</svg>
<ul class="fig__chips sl-chips" aria-label="The two roles">
<li class="chip sl-chip--node-x">Controller X</li>
<li class="chip sl-chip--node-y">Resident Y</li>
</ul>
<ul class="fig__legend" aria-label="What the marks mean">
<li><span class="fig__mk fig__mk--moss" aria-hidden="true"></span>moss · the edge to look at</li>
</ul>
</figure>
<p class="fig-seq__text">Inside one sphere, a controller and a resident, joined by an edge: a claim that one constrains the other.</p>
</div>
<div class="fig-seq__step">
<p class="fig-seq__kicker" id="sl-sph-3-kicker">3 OF 3 · OVERLAP</p>
<figure class="fig sl-fig" aria-labelledby="sl-sph-3-kicker sl-sph-3-title">
<p class="fig__title" id="sl-sph-3-title">THE SPHERES</p>
<svg class="sl-spheres" viewBox="0 0 240 240" role="img" aria-label="The same pair meets again in the energy and logistics sphere: a second edge, a second claim with its own evidence" focusable="false">
<g class="sl-ring"><circle cx="120" cy="68" r="56"/><circle cx="165" cy="94" r="56"/><circle cx="165" cy="146" r="56"/><circle cx="120" cy="172" r="56"/><circle cx="75" cy="146" r="56"/><circle cx="75" cy="94" r="56"/></g>
<g class="sl-tags"><text x="120" y="29">S1</text><text x="204" y="76">S2</text><text x="204" y="172">S3</text><text x="120" y="223">S4</text><text x="36" y="172">S5</text><text x="36" y="76">S6</text></g>
<line class="sl-edge" x1="99" y1="36" x2="134" y2="36"/><polygon class="sl-head sl-head--ink" points="142,36 132,30.5 132,41.5"/>
<circle class="sl-node sl-node--x" cx="90" cy="36" r="8"/><circle class="sl-node sl-node--y" cx="150" cy="36" r="8"/>
<text class="sl-name" x="90" y="62">X</text><text class="sl-name" x="150" y="62">Y</text>
<line class="sl-edge sl-edge--moss" x1="99" y1="204" x2="134" y2="204"/><polygon class="sl-head" points="142,204 132,198.5 132,209.5"/>
<circle class="sl-node sl-node--x" cx="90" cy="204" r="8"/><circle class="sl-node sl-node--y" cx="150" cy="204" r="8"/>
<text class="sl-name" x="90" y="189">X</text><text class="sl-name" x="150" y="189">Y</text>
</svg>
<ul class="fig__legend" aria-label="What the marks mean">
<li><span class="fig__mk sl-mk--node-x" aria-hidden="true"></span>filled · controller</li>
<li><span class="fig__mk sl-mk--node-y" aria-hidden="true"></span>open · resident</li>
<li><span class="fig__mk fig__mk--moss" aria-hidden="true"></span>moss · the edge to look at</li>
</ul>
</figure>
<p class="fig-seq__text">The same pair can meet again in another sphere. Each edge is its own claim, with its own evidence.</p>
</div>
</div>

## Earned, not asserted

A label like "superpower" is usually asserted. Here a role has to be earned. An actor is a controller in a sphere only if three things hold, each backed by linked evidence. The actor is usually a state, and sometimes an institution that enforces the rule itself:

- **C1, imposition:** it applied an enforceable rule or action.
- **C2, compliance capture:** third parties (banks, shippers, vendors, allies) changed what they did because of it.
- **C3, net effect:** there's a measurable cost or constraint, or a strong sign of one.

Fewer than three, and it stays a candidate. A controller whose hold weakens in a later window, because others stop complying or the effect fades, is marked contested. A resident is the other side of the edge: it depends on a channel the controller holds, it felt the constraint during an event, and routing around it would be slow or costly. A resident doesn't have to be a whole country. It can be a firm, a sector, or a state reached through one firm's asset, and the ledger keeps those apart rather than stretching a claim about a company into a claim about a nation.

<figure class="fig sl-fig" aria-labelledby="sl-tests-title">
<p class="fig__title" id="sl-tests-title">SPHERES LEDGER · THE TESTS</p>
<div class="sl-row">
<p class="sl-row__name" id="sl-tests-c">Controller</p>
<ol class="sl-steps" aria-labelledby="sl-tests-c">
<li class="sl-step sl-step--hatch"><span class="sl-step__k">C1 · imposition</span><span class="sl-step__t">It imposes</span><span class="sl-step__d">An enforceable rule or action, applied.</span></li>
<li class="sl-step sl-step--hatch"><span class="sl-step__k">C2 · compliance</span><span class="sl-step__t">Others comply</span><span class="sl-step__d">Banks, shippers, vendors or allies change course.</span></li>
<li class="sl-step sl-step--hatch"><span class="sl-step__k">C3 · net effect</span><span class="sl-step__t">It bites</span><span class="sl-step__d">A measurable cost, or a strong sign of one.</span></li>
<li class="sl-step sl-step--out sl-step--moss"><span class="sl-step__k">all three</span><span class="sl-step__t">Controller</span><span class="sl-step__d">Promoted, with the evidence linked.</span>
<ul class="fig__chips sl-outs" aria-label="Otherwise, or later">
<li class="chip sl-chip--dashed">fewer: candidate</li>
<li class="chip sl-chip--state"><span class="sl-icon" aria-hidden="true">◆</span>contested</li>
</ul></li>
</ol>
</div>
<div class="sl-row">
<p class="sl-row__name" id="sl-tests-r">Resident</p>
<ol class="sl-steps" aria-labelledby="sl-tests-r">
<li class="sl-step sl-step--hatch"><span class="sl-step__k">R1 · dependence</span><span class="sl-step__t">It depends</span><span class="sl-step__d">On a channel the controller holds, with few substitutes.</span></li>
<li class="sl-step sl-step--hatch"><span class="sl-step__k">R2 · episode</span><span class="sl-step__t">It felt it</span><span class="sl-step__d">The constraint shows up during an event.</span></li>
<li class="sl-step sl-step--hatch"><span class="sl-step__k">R3 · switching cost</span><span class="sl-step__t">It can't easily leave</span><span class="sl-step__d">Routing around is slow or expensive.</span></li>
<li class="sl-step sl-step--out"><span class="sl-step__k">scoped</span><span class="sl-step__t">Resident</span><span class="sl-step__d">Of this controller, in this sphere.</span>
<ul class="fig__chips sl-outs" aria-label="Who can be a resident">
<li class="chip">state</li>
<li class="chip">firm</li>
<li class="chip">sector</li>
<li class="chip">asset</li>
</ul></li>
</ol>
</div>
<ul class="fig__legend" aria-label="What the marks mean">
<li><span class="fig__mk fig__mk--hatch" aria-hidden="true"></span>hatch · my judgement on the evidence</li>
<li><span class="fig__mk fig__mk--dashed" aria-hidden="true"></span>dashed · unresolved</li>
<li><span class="fig__mk sl-mk--state" aria-hidden="true"></span>◆ amber · a state: contested</li>
<li><span class="fig__mk fig__mk--moss" aria-hidden="true"></span>moss · where to look</li>
</ul>
<figcaption>All three tests, or it stays a candidate. A controller whose hold weakens in a later window becomes contested. Moss marks where to look.</figcaption>
</figure>

## Every role has a trail

Every role runs back to something checkable. Sources are documented first. Events are recorded from them, each tagged with a sphere, the kind of instrument used (a sanction, a tariff, an export licence) and a time window. The edge between a controller and a resident is my judgement on those events, and the register is what the edges add up to. Claude helps scan for events and patterns; nothing it surfaces goes in until I've checked it against a source.

<figure class="fig sl-fig" aria-labelledby="sl-trail-title">
<p class="fig__title" id="sl-trail-title">SPHERES LEDGER · THE EVIDENCE TRAIL</p>
<ol class="sl-steps sl-steps--trail">
<li class="sl-step sl-step--ruled"><span class="sl-step__k">1 · sources</span><span class="sl-step__t">Documented</span><span class="sl-step__d">Primary documents and reporting, each with a key.</span></li>
<li class="sl-step sl-step--solid"><span class="sl-step__k">2 · events</span><span class="sl-step__t">Recorded</span><span class="sl-step__d">One row per event: sphere, instrument, time window, sources.</span></li>
<li class="sl-step sl-step--hatch sl-step--moss"><span class="sl-step__k">3 · edges</span><span class="sl-step__t">Judged</span><span class="sl-step__d">Controller to resident, with the tests and the events behind them.</span></li>
<li class="sl-step sl-step--solid"><span class="sl-step__k">4 · register</span><span class="sl-step__t">Kept</span><span class="sl-step__d">Who is a candidate, controller or contested, and since when.</span></li>
</ol>
<div class="sl-scan">
<div class="sl-step sl-step--dither"><span class="sl-step__k">alongside</span><span class="sl-step__t">Claude's scan</span><span class="sl-step__d">Suggests events and patterns. A person checks each one against a source before it reaches step 2 or 3.</span></div>
</div>
<ul class="fig__legend" aria-label="What the marks mean">
<li><span class="fig__mk fig__mk--ruled" aria-hidden="true"></span>ruled · documented</li>
<li><span class="fig__mk fig__mk--solid" aria-hidden="true"></span>solid · recorded</li>
<li><span class="fig__mk fig__mk--hatch" aria-hidden="true"></span>hatch · my judgement</li>
<li><span class="fig__mk fig__mk--dither" aria-hidden="true"></span>pixel · Claude's scan</li>
</ul>
<figcaption>Moss marks the step where a person decides.</figcaption>
</figure>

## What this is and isn't

- **It's a lens:** a structure for asking who can constrain whom, where, and on what evidence.
- **It isn't a finding.** There are 21 events in the ledger so far, too few to say who controls what, so this page names no countries.
- **It's measurement, not advocacy.** "Insufficient evidence" is a real answer, and often the right one.
- **It will be wrong in places.** The tests are meant to be ones evidence can prove wrong. Writing down, for each test, exactly what would do that is still on my list.

## What's next

Collecting the next window of events, and testing whether the six spheres hold up or need to be cut differently. A worked example, with real events, comes once there's enough evidence to stand behind one.

## Revisions

- **20 Nov 2026.** First version of this page (MVP 1.0): the structure, the tests and the evidence trail. No findings yet.

## Sources

- The spheres ledger: my working dataset and its rules (not public yet).
- This project is done with Claude, an AI model made by Anthropic. Its part is labelled as its own.
