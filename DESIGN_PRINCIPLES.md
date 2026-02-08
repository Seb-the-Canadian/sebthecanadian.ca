# Design Principles

Foundation for visual identity, UX decisions, and technical choices for sebthecanadian.ca.

---

## Philosophical Grounding

All design work on this site is grounded in two frameworks:

### IndieWeb Principles

The [IndieWeb](https://indieweb.org/principles) centers personal ownership, human-first design, and sustainable web practices:

1. **Own your data** — Your content, metadata, and identity belong to you, not platforms
2. **Use & publish visible data for humans first, machines second** — Design for readability, not just machine parsing
3. **Make what you need** — Build tools for yourself first, not hypothetical users
4. **Use what you make** — If you don't depend on it, why should anyone else?
5. **UX and design > protocols** — User experience matters more than technical purity
6. **Progressive enhancement** — Every feature should work with plain HTML
7. **Longevity** — Build for the long term, not the current trend

### Ivan Illich's Convivial Design

Ivan Illich's *[Tools for Conviviality](https://en.wikipedia.org/wiki/Tools_for_Conviviality)* (1973) defines convivial tools as those that:

> "give each person who uses them the greatest opportunity to enrich the environment with the fruits of their vision"

**Characteristics of convivial tools:**
- Easily used by anybody, as often or seldom as desired
- Do not require certification, expertise, or permission
- Do not impose obligation to use them
- Allow users to express their meaning and intent
- Enable autonomy and creativity rather than dependence
- Encourage participation, trust, and sociability
- Operate at human scale, not industrial scale

**Anti-characteristics** (what convivial tools avoid):
- Creating dependencies or undermining natural abilities
- Requiring specialists or monopolizing knowledge
- Enforcing power structures or compulsion
- Restricting user agency or expression

---

## Application to This Site

### What This Means for Visual Identity

**Human-first aesthetics:**
- Typography must prioritize readability over novelty
- Color choices must meet accessibility standards (WCAG 2.2)
- Visual hierarchy should guide, not confuse
- Design should feel welcoming, not intimidating

**Transparent design:**
- Style choices should be understandable (documented in CSS)
- No "magic" — visual effects should have clear purpose
- Design system documented so others can learn from it

**Autonomous and portable:**
- No locked-in frameworks or proprietary tools
- Standard HTML/CSS that works everywhere
- Can be viewed, forked, modified without special software
- Works without JavaScript (progressive enhancement)

**Sustainable and maintainable:**
- Simple enough to maintain indefinitely
- No dependency on build tools that might break
- Future-you should understand past-you's decisions
- Design scales down gracefully for low-bandwidth contexts

### What This Means for Technical Choices

**Own your content:**
- Static HTML files you can backup, move, edit
- No database dependencies
- Microformats for machine-readable ownership (`rel="me"`, `h-card`, `h-entry`)
- RSS/Atom for syndication without platform lock-in

**Progressive enhancement:**
- Core content and navigation works with HTML alone
- CSS enhances visual experience
- JavaScript only for non-essential enhancements (if at all)
- Print stylesheets honor the content's portability

**Long-term durability:**
- Hand-editable source files
- Minimal dependencies (static site, no build step)
- Standard formats that will outlast frameworks
- Documentation that explains *why*, not just *what*

### What This Means for Content & Features

**Make what you need:**
- Build features you'll actually use (`/uses`, `/resume`)
- Showcase your own projects (CivCitDev, Ontario Tenant Tools)
- Don't add complexity for hypothetical visitors

**Interoperability:**
- Microformats for IndieWeb compatibility
- Semantic HTML for accessibility and machine-parsing
- Standard syndication (RSS/Atom)
- `rel="me"` links for identity verification

**Human-readable first:**
- Write content for people, not SEO algorithms
- Metadata should be visible and meaningful
- Navigation should be obvious without instructions
- Design should respect reader's time and attention

---

## Decision Framework

When evaluating any design or technical choice, ask:

### Convivial Test
- Does this increase or decrease user autonomy?
- Does this require special knowledge or certification?
- Could someone fork this and modify it for their needs?
- Does this create dependencies or expand possibilities?

### IndieWeb Test
- Do I own this content and can I move it elsewhere?
- Does this work for humans first, machines second?
- Will I actually use this feature?
- Does this enhance or compromise long-term maintainability?

### Sustainability Test
- Will this still work in 5 years? 10 years?
- Can future-me understand why this choice was made?
- Does this respect low-bandwidth or older devices?
- Is this the simplest solution that could work?

### Accessibility Test
- Does this work with keyboard navigation?
- Does this meet WCAG 2.2 contrast requirements?
- Does this work with screen readers?
- Does this respect user preferences (motion, color scheme)?

**If the answer to any test is unclear or negative, reconsider the choice.**

---

## Design Values Summary

Drawing from both frameworks, this site commits to being:

- **Minimal** — No unnecessary complexity
- **Durable** — Built to last decades, not months
- **Portable** — Works anywhere, easily moved
- **Accessible** — Usable by everyone
- **Autonomous** — Under your control, not platform control
- **Transparent** — Understandable and forkable
- **Human-scale** — Focused on people, not metrics
- **Sustainable** — Environmentally and technically

These aren't just aspirations — they're constraints that guide every visual, technical, and content decision.

---

## Sources & Further Reading

**IndieWeb:**
- [IndieWeb Principles](https://indieweb.org/principles)
- [IndieWeb Developer Principles](https://indieweb.org/developer-principles)
- [IndieWeb Design](https://indieweb.org/design)

**Convivial Design:**
- [Tools for Conviviality - Wikipedia](https://en.wikipedia.org/wiki/Tools_for_Conviviality)
- [Ivan Illich on Tools for Conviviality](https://arl.human.cornell.edu/linked%20docs/Illich_Tools_for_Conviviality.pdf) (PDF)
- [Ivan Illich, Conviviality (1973)](https://www.panarchy.org/illich/conviviality.html)

**Accessibility:**
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [IndieWeb Accessibility](https://indieweb.org/accessibility)

---

*This document establishes the foundation. Refer to it when making design decisions, evaluating new features, or questioning whether a change aligns with the site's values.*
