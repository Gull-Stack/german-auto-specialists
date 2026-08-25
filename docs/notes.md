# German Auto Specialists — Durable Notes

## Who is who
- **Vincen Gillespie** — owner. Goes by Vinny / Vince. Does **not** answer the phone;
  never write copy that says he does.
- **Kaden Duncan** — the day-to-day contact, +1 (801) 953-7340. He speaks for Vincen
  and is more responsive. Send change confirmations to him by text.
- Lead notification email on file: `vincen@german-auto-specialists.com`.

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
- The **Google Business Profile is not ours.** The knowledge panel still shows
  "Own this business?", so nobody has claimed it. GBP edits are not available to us.
- Service pages (`src/services/*.html`) are plain HTML, not Nunjucks templates, and each
  carries **its own inline copy of the header and footer**. A change to
  `src/_includes/base.njk` does **not** reach them. Search all five files separately.
- `src/sitemap.xml` is hand-maintained. It listed the service pages as
  `/services/audi-repair.html` when the real URLs are `/services/audi-repair/`.
  Fixed 25 Aug 2026, but it will drift again — it is not generated.
- `src/.well-known/brand-facts.json` is a second, separate copy of the business facts
  used for AEO. It has its own rating, review count and founding year. **Update it
  whenever you update the on-page facts** — it was stale (4.9 / 150 / 2005) for months.
