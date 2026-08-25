# German Auto Specialists — Project Notes

Independent Audi / BMW / VW / Mini repair shop, West Jordan UT.
Eleventy static site, deployed to Vercel from `main`.

Read `docs/notes.md` before touching copy. It lists the two hard constraints
(no manufacturer logos, no dealer price comparisons) and the short list of
facts about this business that are actually verified.

## Session Log

### 2026-08-25 — Cleared the whole 5 May change list, plus the misinformation behind it

- **Context:** Kaden Duncan sent a detailed change list by text on 5 May 2026. None of
  it was ever done. Last commit before today was 25 Mar. He escalated on 24 Aug
  ("almost 4 months and not a single thing has been changed"). Every item from that
  thread is now done.
- **Removed the Audi hero animation.** The homepage hero was a 96-frame scroll-scrubbed
  render of an Audi Q5 with the four-ring grille badge clearly visible — and a "Veo"
  watermark. This shop was rebuilt *because* of a logo cease and desist, so this was the
  most urgent item. Replaced with a static dark gradient hero; deleted all 96 frames and
  the canvas JS. Also deleted the leftover `images/brands/*` badges still rendering on
  nine area pages, and the unused `audi-logo.png` / `bmw-logo.png` / `vw-logo.png` /
  `mini-logo.png`.
- **Stripped every dealer price comparison**, per Kaden's stated goal for the site.
  That covered the "40% Less Than Dealers" hero stat, "Save Up to 40%", the
  "Independent Shop vs. Dealership" table on /about/, the dealer-rate paragraphs on all
  four brand pages, the `/areas/` "Save 30-40%" bullets, and the meta descriptions.
  Customer reviews that mention dealer pricing were left as written — those are the
  customer's words, not a claim by the shop.
- **Deleted both `/guides/` pages.** They were built end to end on dealer-vs-independent
  pricing and published specific dollar figures as this shop's own rates ($70–$120 oil
  change, "30-40% less"). The client never approved those numbers. 301'd to /services/.
- **Corrected the Google rating.** The site claimed **4.9 stars / 150 reviews** in three
  places including LocalBusiness schema. The real profile reads **4.6 / 171**. Fixed in
  `index.njk`, `brand-facts/index.njk`, and `.well-known/brand-facts.json`.
- **Corrected founding year** 2005 → 2010 and "over two decades" → "15 years", both per
  Kaden. Also fixed `brand-facts.json`, which still carried 2005 and "20+ years".
- **Removed the contact form entirely** and deleted `api/contact.js`. Kaden asked for
  "the leads" to be taken off because of AI marketing spam. Deleting the endpoint too
  means bots cannot POST to it directly. Phone is now the only inbound channel.
- **Deleted the /contact/ driving directions.** All three were wrong — see `docs/notes.md`.
  Map embed kept. Removed "Vinny answers the phone personally" everywhere, per Kaden.
- **Removed the /about/ owner section and shop gallery**, per Kaden. The gallery photos
  were stock images of cars this shop doesn't service.
- **Fixed `sitemap.xml`**, which pointed at `/services/*.html` instead of the real
  `/services/*/` URLs.
- **Verified:** clean Eleventy build, all 19 pages 200, zero broken internal links,
  zero broken image references, `/guides/*` redirecting.

**Next session picks up:** the Google Business Profile is unclaimed and we have no
access — that's the biggest open item. The About page and the hero both need real
photos from the client before they're worth rebuilding. See `docs/roadmap.md`.
