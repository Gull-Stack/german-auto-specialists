# German Auto Specialists — Durable Notes

## Who is who

| Who | Mobile | Email |
|---|---|---|
| **Vincen Gillespie** — owner | **(801) 722-8523** | vincen@german-auto-specialists.com |
| **Kaden Duncan** — day-to-day | (801) 953-7340 | kaden.dunc12@gmail.com |
| Shop line (on the website) | (801) 432-8790 | — |

- Vincen goes by Vinny / Vince. He does **not** answer the shop line; never write
  copy that says he does.
- Kaden speaks for Vincen and is far more responsive. He **texts** — he does not
  email. His email address above came from his own test lead, not from him.
- ⚠️ **Both men are saved in Bryce's phone under the organisation "German Auto
  Specialists", and Kaden's contact has no first name on it.** The phone shows only
  "German Auto Spe…" on either thread. Always say the person's name *and* the
  number, never just "the client".

## Hard constraints
- **No manufacturer logos anywhere on the site.** The shop received a cease and desist
  over brand logos. That is why they commissioned the rebuild. Audi/BMW/VW/Mini marks,
  grille badges, and brand wordmark images are all off limits — including inside photos
  and background video frames.
- **No dealer price comparisons.** No "30-40% less than the dealer", no dealership
  labor-rate tables, no "save $X vs. the dealer". Stated by Kaden on 1 May 2026 as the
  general goal for the whole site. Real customer reviews that happen to mention dealer
  pricing are left alone — those are the customer's words, not the shop's claim.
- **No invented numbers.** See "Verified facts" below. Anything not on that list needs
  Kaden to confirm before it goes on the site.

## Verified facts
| Fact | Value | Source |
|---|---|---|
| Serving since | 2010 | Kaden, 5 May 2026 (corrected the site's "2005") |
| Servicing VWs for | 15 years | Kaden, 5 May 2026 (corrected "over two decades") |
| Google rating | 4.6 | Google Business Profile, read 25 Aug 2026 |
| Google review count | 171 | Google Business Profile, read 25 Aug 2026 |
| Address | 1372 W 7800 S, West Jordan, UT 84088 | site + GBP |
| Phone | (801) 432-8790 | site + GBP |
| Hours | Mon–Fri 8:30–5:30, closed Sat/Sun | site |

## Known-wrong things that were removed, not corrected
- **Driving directions.** The old /contact/ page said the shop is "just west of Redwood
  Road" and "1.5 miles west of Redwood Road", and "half a mile east of Bangerter".
  1372 West is **east** of Redwood Road (1700 W), and Bangerter at 7800 S is roughly
  5600 W — about four miles away. Every direction was wrong. Kaden flagged the block as
  inaccurate but did not supply corrections, so it was deleted rather than guessed at.
  The Google Map embed stays. **Ask Kaden for real directions before rewriting this.**
- **"Our shop" photo gallery on /about/.** All four images were stock photos — a Chevy
  Niva on a lift, a Toyota engine, and two generic hands-on-engine shots. Presenting them
  as this shop was part of what Kaden called "misinformation". Removed. Kaden said they
  would send real photos of the employees.
- **`owner-portrait.jpg`** is not Vincen. It is stock. Do not reuse it as a portrait.

## Gotchas
- **The Google Business Profile is claimed and settled. Do not raise it again.**
  Vincen is the primary owner, and Bryce confirmed 26 Aug 2026 that our side has
  what it needs. Nothing is outstanding here.
  ⚠ An earlier note said the profile was *unclaimed*. That was read off the
  "Own this business?" link in the public knowledge panel, which Google renders
  for **anyone not signed in as an owner** — it is not evidence of ownership
  either way, and it went to the client as a recommendation before anyone
  checked. Never read ownership off the public panel.
- Service pages (`src/services/*.html`) are plain HTML, not Nunjucks templates, and each
  carries **its own inline copy of the header and footer**. A change to
  `src/_includes/base.njk` does **not** reach them. Search all five files separately.
- `src/sitemap.xml` is hand-maintained. It listed the service pages as
  `/services/audi-repair.html` when the real URLs are `/services/audi-repair/`.
  Fixed 25 Aug 2026, but it will drift again — it is not generated.
- `src/.well-known/brand-facts.json` is a second, separate copy of the business facts
  used for AEO. It has its own rating, review count and founding year. **Update it
  whenever you update the on-page facts** — it was stale (4.9 / 150 / 2005) for months.
