# SEO notes for wasatchyard.com

Everything in the "Done on the site" list is already live in this repo. The
"Still to do" list is off-site work that only a human with the relevant logins
can complete, ordered by how much it is likely to matter.

## What we are trying to rank for

| Query type | Examples | Where we target it |
| --- | --- | --- |
| Informational (biggest volume) | what is a backyard ultra, backyard ultra rules, how long is a backyard ultra, 4.167 miles | `backyard-ultra-guide.html` |
| Local / discovery | backyard ultra Utah, backyard ultra Park City, Utah ultramarathon October, last person standing race Utah | `index.html`, `race-info.html` |
| Branded | the wasatch yard, wasatch yard results, wasatch backyard ultra | all pages, `results.html` |
| Practical | backyard ultra crew, backyard ultra gear list, first backyard ultra | guide + race info |

The informational queries are worth chasing because they are searched
year-round by people who have not yet picked a race. That page exists to catch
them and hand them a registration link.

## Done on the site

- Unique, keyword-led `<title>` and meta description on every page, all inside
  Google's display limits.
- Canonical URLs on `https://wasatchyard.com` (matches the `CNAME`).
- `SportsEvent` JSON-LD with date, location, organizer and registration offer.
  This is what makes the race eligible for Google's event rich results and the
  events carousel. `Organization`, `WebSite`, `BreadcrumbList`, `FAQPage`,
  `Article` and `ImageGallery` schema on the relevant pages.
- Open Graph and Twitter card tags plus a 1200x630 share image
  (`assets/og-card.jpg`), so links posted to Facebook groups, Reddit, Strava
  and iMessage render a proper card instead of a bare URL.
- `robots.txt`, `sitemap.xml`, and a real `404.html`.
- `backyard-ultra-guide.html`: long-form content targeting the informational
  queries, with a glossary and FAQ.
- Internal linking between all pages with descriptive anchor text.
- Descriptive, keyword-bearing alt text on gallery images.
- Page-speed work (see the performance notes below) — Core Web Vitals are a
  ranking input and a conversion input.

## Still to do (off-site, highest value first)

1. **Google Search Console.** Verify `wasatchyard.com`, submit
   `https://wasatchyard.com/sitemap.xml`, and check the Events report for
   structured-data errors. Do the same at Bing Webmaster Tools. Nothing else
   on this list gives you feedback the way this does.
2. **Get listed on the backyard ultra authority sites.** A listing on
   `backyardultra.com` / `bigsbackyardultra.com` as an affiliate race is both
   the strongest topical backlink available in this niche and the way most
   backyard runners actually find races. Apply for affiliate status if the race
   is not already listed.
3. **Race calendars.** Each of these is a free listing that both ranks and
   sends traffic: ultrarunning.com calendar, runningintheusa.com,
   runguides.com, ultraracecalendar.com, RaceRaves, Athlinks, and the DUV
   ultramarathon statistics database (statistik.d-u-v.org). Use the same race
   name and the same URL everywhere so the citations reinforce each other.
4. **Local links.** Visit Park City and the Park City Chamber events calendars,
   Mountain Trails Foundation (they steward the Round Valley trails, so a link
   from them is topical and local), and local running shops. Local links are
   the main lever for "backyard ultra near me" style searches.
5. **Reciprocal partner links.** Rendezvous Run, Salty Star Run Club, and every
   sponsor listed on the home page should link back to wasatchyard.com. We link
   out to them already; ask for the return link.
6. **Local press.** A short write-up in the Park Record or on KPCW after the
   race is a high-authority local backlink and tends to keep sending traffic
   for years.
7. **Community posts.** r/ultrarunning race threads and the large Backyard
   Ultra Facebook groups are where this format's audience actually lives. Post
   the race announcement and the guide page.
8. **Keep results current.** Add a card to `results.html` after each race
   naming the last runner standing and their lap count. It is one edit a year
   and it is what makes the page rank for the branded results search.

## Race details reflected in the structured data

- Entry fee is $100, set as `offers.price` on the event schema.
- There is no time cap, so the event schema carries a `startDate` with no
  `endDate` rather than inventing a finish time.
- The sponsorship button points at the on-page contact form. The previous
  `info@thewasatchyard.com` address was on a domain that does not resolve, so
  mail to it could not be delivered. If a real `@wasatchyard.com` address is
  set up later, use it there.

## Why the results page is not a redirect

The obvious shortcut is to point `results.html` straight at UltraSignup. It is
worth not doing that. "wasatch yard results" is a branded search with real
volume, and a page that immediately bounces visitors off-site hands that result
to UltraSignup instead of keeping it. The page now carries only the short
version — who was last standing, in a card per year — and links out for the
full finisher list, so there is no table to hand-maintain.

Adding a year is one card. Keep naming the winner in text: runners search their
own names, and that sentence is the part search engines can actually index.

## Performance notes

The photos page previously loaded all 74 full-resolution images, about 40 MB.
It now loads 640px thumbnails (3.3 MB total) and only fetches the full image
when someone opens the viewer.

`assets/favicon.png` was a 1.8 MB, 1024px PNG being used as the browser favicon
*and* as the 42px navbar logo on every page. It is now 81 KB, with a dedicated
32px favicon, an apple touch icon, and a transparent light logo mark for the
dark navbar.

If you add new gallery photos, generate matching thumbnails into
`assets/gallery/thumbs/` at 640px wide and add the file name plus its
thumbnail dimensions to the `PHOTOS` array in `assets/site.js`.
