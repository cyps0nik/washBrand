# washBrand

Content-driven marketing website for **Eco-Power**, a local cleaning company in Uniejów, Poland (paving stones, facades, photovoltaic panels). Built with Next.js and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Hosted on Cloudflare](https://img.shields.io/badge/Hosted_on-Cloudflare-F38020?logo=cloudflare&logoColor=white)

<!-- TODO: tu bedzie link do działającej strony -->
**Live demo:** [your-domain.com](https://your-domain.com)

<!-- TODO: tutaj screenshoty -->
<p align="center">
  <img src="docs/desktop.png" alt="Desktop view" width="70%">
  <img src="docs/mobile.png" alt="Mobile view" width="25%">
</p>

> The website itself is in Polish, the target audience being local customers.

## Overview

A small business needs a website it can actually maintain. This project is a production site for a family member's company, designed around one constraint: **the owner is not a developer and must be able to update prices, offers, products and contact details without touching application code.**

All business content lives in a single data module, completely separated from the UI. Components only render what they receive, so the site is updated by editing one file and pushing to `main`.

## Features

- **Service offer with pricing** – per-m² prices for paving and facades, per-panel prices for photovoltaic panels
- **Product catalog** – cleaning chemicals with price and an availability flag (switched off until real data exists)
- **Before / after gallery** – paired images showing the effect of each job (switched off until real photos exist)
- **Video section** – a YouTube embed (`youtube-nocookie.com`) loaded only after a click
- **"Why us" section, FAQ and social proof** – all rendered from data
- **Call-to-action hero** with a primary "call now" action and a secondary link to the services
- **Contact and social links** – phone, e-mail, address, Facebook and Instagram, defined once and reused across the page
- **Price calculator** – sliders per service (m² or pieces) with a live estimate, plus a shortcut to the quote form or WhatsApp
- **Quote request form** – handled by a small Cloudflare Worker that validates the lead and e-mails it to the owner via [Resend](https://resend.com); input is HTML-escaped and customer data stays out of the logs
- **Privacy policy and GDPR notice** – a `/polityka-prywatnosci` page and an information clause under the form, both driven by data
- **Local SEO** – title/description and Open Graph from data, JSON-LD (`LocalBusiness` with service area, services and social profiles, plus `FAQPage`), `sitemap.xml` and `robots.txt`

## Key decisions

- **Content separated from presentation.** Everything the owner may want to change – prices, contact details, offers, calculator rates, form and privacy policy texts – is in `data/content.js`. Components read it and render it.
- **Minimal backend.** No database and no CMS. The site is a static export; the only server-side code is one Worker endpoint that forwards the quote form by e-mail. This keeps hosting costs near zero and the attack surface small.
- **Git-based publishing.** Every push to `main` triggers an automatic deployment, so a content change goes live within about a minute.
- **App Router.** Built on the Next.js App Router with React 19.

## Tech stack

| Area       | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 16 (App Router)                     |
| UI         | React 19                                    |
| Styling    | Tailwind CSS 4 (via `@tailwindcss/postcss`) |
| E-mail     | Resend (quote form)                         |
| Linting    | ESLint 9 with `eslint-config-next`          |
| Hosting    | Cloudflare Workers (static assets + Worker) |

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/cyps0nik/washBrand.git
cd washBrand
npm install
npm run dev
```

The site is now available at [http://localhost:3000](http://localhost:3000).

### Environment variables

The site runs without any configuration. Only the quote form needs a key to send e-mails; without it, the form asks the visitor to call instead.

| Variable         | Required | Description                                                                                   |
| ---------------- | -------- | --------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | for e-mail | API key from Resend. Leads are sent to `firma.email` from `data/content.js`.                |
| `RESEND_FROM`    | no       | Sender address, e.g. `Eco-Power <wycena@your-domain.pl>`. Defaults to `onboarding@resend.dev`, which Resend only delivers to the address the Resend account was created with – verify your own domain in Resend and set this for production. |
| `RESEND_TO`      | no       | Overrides the recipient. Use it with the test sender, set to the Resend account address, until a domain is verified. |

Locally, put them in `.dev.vars` (ignored by git). On Cloudflare, add them under **Worker → Settings → Variables and Secrets**, with `RESEND_API_KEY` as a Secret.

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server (no Worker, so the form cannot send) |
| `npm run preview` | Build and run the site with the Worker locally (http://localhost:8787) |
| `npm run build` | Create the static export in `out/`   |
| `npm run deploy` | Build and deploy with Wrangler      |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
.
├── app/            # Routes, layout and global styles (App Router)
│   ├── polityka-prywatnosci/, produkty/, wspolpraca/   # Subpages
├── components/     # Presentational components
├── data/
│   └── content.js  # Single source of truth for all site content
├── worker/         # Cloudflare Worker handling the quote form
└── public/         # Static assets (images, icons)
```

## Content model

`data/content.js` exports one constant per page section:

| Export        | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `firma`       | Company name, phone, e-mail, address, tax ID, social links, service area, site URL |
| `widocznosc`  | On/off switches for the gallery and the hidden subpages        |
| `menu`        | Navigation items                                               |
| `seo`         | Page title, description and share image                        |
| `kontakt`, `stopka` | Contact section and footer texts                         |
| `hero`        | Headline, subtitle and button labels                           |
| `uslugi`      | Services: name, description, price, icon                       |
| `produkty`    | Products: name, description, price, image, availability flag   |
| `dlaczegoMy`  | "Why us" value propositions                                    |
| `galeria`     | Before/after image pairs with a title                          |
| `faq`         | Questions and answers                                          |
| `zaufaliNam`  | Client references                                              |
| `film`        | YouTube link and texts (empty link hides the section)          |
| `opinie`      | Customer reviews (prepared, section not shown yet)             |
| `stawki`      | Rates used by the price calculator (per m² or per panel)       |
| `kalkulator`  | Calculator texts and sliders (range, step, start value)        |
| `formularz`   | Quote form labels, placeholders, messages and GDPR clause      |
| `politykaPrywatnosci` | Privacy policy sections (administrator data comes from `firma`) |

Example: adding a service means appending one object to `uslugi`.

```js
{
  id: "kostka",
  nazwa: "Mycie kostki brukowej",
  opis: "Usuwamy mech, glony i ciężkie zabrudzenia z chodników, podjazdów i placów.",
  cena: "od 8 zł/m²",
  ikona: "🧹",
}
```

Images can be external URLs or files placed in `public/` (for example `/zdjecia/podjazd-po.jpg`).

## Deployment

The project runs on the free plan of [Cloudflare Workers](https://workers.cloudflare.com): static files from `out/` are served directly and only `/api/*` goes through the Worker.

1. In the Cloudflare dashboard, import the repository (Workers Builds). The project name must match `name` in `wrangler.jsonc` (`eco-power`).
2. Set the build command to `npm run build` and the deploy command to `npx wrangler deploy`.
3. Add the environment variables described above (at least `RESEND_API_KEY`) to the Worker.
4. Put the live address in `firma.adresStrony`. Every push to `main` is built and published automatically.

A custom domain can be attached under the Worker's **Settings → Domains & Routes**. Deployment from the command line is also possible with `npm run deploy`.

## Author

**Cyprian Antreou** · [GitHub](https://github.com/cyps0nik) 