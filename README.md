# Sushila Phool Bhandar - website

A small website I built for **Sushila Phool Bhandar**, a gajra and flower stall outside
Gate No. 2 of Kalkaji Mandir in New Delhi. The stall has been there since 1987 and is run
by Sushila Devi with her son Rakesh and his wife Pooja. They sell mogra gajra, veni,
garlands, pooja flowers, and they take decoration orders for weddings and functions.

Built as a college assignment. The shop had no website, no Instagram, nothing online -
people either knew the stall or they didn't.

**Live site:** https://hitanshbhutani.github.io/sushila-phool-bhandar/

---

## Why they wanted it

From talking to Rakesh, the actual problems were:

1. People ring up asking rates all day and he is at the mandi till 6 am.
2. Function and wedding orders are the money, but nobody knows they do that work -
   customers think it is only a gajra stall.
3. New people cannot find the stall. "Near Kalkaji Mandir" is not an address.

So the site is really three things: a rate list, proof that they do function work, and
directions. Not a shopping cart - they don't want online payment or online orders,
everything ends in a phone call or WhatsApp.

## Pages

| File | What is on it |
|---|---|
| `index.html` | Home - what they make, function orders, timings, where the stall is |
| `about.html` | The family, how a gajra actually gets made, timeline |
| `phool.html` | Full rate list with a search box, function rates, FAQ |
| `contact.html` | Address, timings, directions, and the order enquiry form |

## Built with

- Plain **HTML5**, **CSS3** and **vanilla JavaScript**. No Bootstrap, no Tailwind, no
  build step. It is four pages, a framework would have been more work than it saved.
- **Google Fonts** - Yatra One for headings, Mukta for body text (it does Devanagari
  properly, which I needed for the shop's Hindi name), Kalam for the handwritten quotes.
- Layout is CSS Grid and Flexbox, responsive down to 320px wide.
- Hosted on **GitHub Pages**.

## Colours

Taken off the stall itself.

| | |
|---|---|
| `#2f5134` | thread green - the cotton thread the gajra is strung on |
| `#e0982a` | genda (marigold) |
| `#9e2a5c` | the pink of the plastic bags they hand flowers out in |
| `#faf6ec` | newspaper, which is what flowers get wrapped in |

## The interactive bits

- **Open / closed indicator** in the header, works out from the current time whether the
  stall is open. Tuesday has different hours because of the mandir crowd.
- **Search on the rate list** - filters the table as you type, and shows a message if
  nothing matched.
- **Order enquiry form** - validates the name, the 10 digit mobile number and the
  details, then builds a WhatsApp message and opens it. There is no backend and no
  email, because Rakesh runs everything off WhatsApp anyway and an email form would just
  go unread. Also means the site can sit on GitHub Pages with no server.

## Running it

No build step, no npm. Clone it and open `index.html`, or:

```bash
python -m http.server 8000
```

then go to `http://localhost:8000`.

## Notes

- The phone number is a placeholder (`+91 98110 00000`) because the repo is public. It
  lives in `script.js` as `SHOP_NUMBER` and in the `tel:` links on each page.
- No photographs yet, so the gajra on the home page and the flower divider between
  sections are SVG. Swap them for real photos when the family sends some.
- No logo. The shop does not have one, so the name is just set in Yatra One the way a
  painted signboard would be.
