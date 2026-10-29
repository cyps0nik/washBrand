# washBrand

Content-driven marketing website for **Eco-Power**, a local cleaning company in Uniejów, Poland (paving stones, facades, photovoltaic panels). Built with Next.js and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

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

- **Service offer with pricing** – per-m² prices for paving, facade and photovoltaic panel cleaning
- **Product catalog** – cleaning chemicals with price and an availability flag (in stock / unavailable)
- **Before / after gallery** – paired images showing the effect of each job
- **"Why us" section, FAQ and social proof** – all rendered from data
- **Call-to-action hero** with a primary "call now" action and a secondary link to the services
- **Contact and social links** – phone, e-mail, address, Facebook and Instagram, defined once and reused across the page
- **Price calculator** – sliders per service (m²) with a live estimate based on per-m² rates, plus a shortcut to the quote form or WhatsApp
- **Quote request form** – handled by a Server Action that e-mails the lead to the owner via [Resend](https://resend.com); input is HTML-escaped before it goes into the e-mail
- **Privacy policy and GDPR notice** – a `/polityka-prywatnosci` page and an information clause under the form, both driven by data
- **Local SEO** – title/description and Open Graph from data, JSON-LD (`LocalBusiness` with service area, services and social profiles, plus `FAQPage`), `sitemap.xml` and `robots.txt`

## Key decisions

- **Content separated from presentation.** Everything the owner may want to change – prices, contact details, offers, calculator rates, form and privacy policy texts – is in `data/content.js`. Components read it and render it.
- **Minimal backend.** No database, no CMS, no API routes to maintain. The only server-side code is a single Server Action that forwards the quote form by e-mail. This keeps hosting costs near zero and the attack surface small.
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
| Hosting    | Vercel                                      |

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

The site runs without any configuration. Only the quote form needs a key to actually send e-mails; without it, submitted leads are just written to the server log.

| Variable         | Required | Description                                                                                   |
| ---------------- | -------- | --------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | for e-mail | API key from Resend. Leads are sent to `firma.email` from `data/content.js`.                |
| `RESEND_FROM`    | no       | Sender address, e.g. `Eco-Power <wycena@your-domain.pl>`. Defaults to `onboarding@resend.dev`, which Resend only delivers to the address the Resend account was created with – verify your own domain in Resend and set this for production. |

Locally, put them in `.env.local` (ignored by git). On Vercel, add them under **Settings → Environment Variables**.

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
.
├── app/            # Routes, layout and global styles (App Router)
│   ├── actions/    # Server Action for the quote form
│   ├── polityka-prywatnosci/, produkty/, wspolpraca/   # Subpages
├── components/     # Presentational components
├── data/
│   └── content.js  # Single source of truth for all site content
└── public/         # Static assets (images, icons)
```

## Content model

`data/content.js` exports one constant per page section:

| Export        | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `firma`       | Company name, phone, e-mail, address, tax ID, social links, service area, site URL |
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
| `opinie`      | Customer reviews (prepared, section not shown yet)             |
| `stawki`      | Per-m² rates used by the price calculator                      |
| `kalkulator`  | Calculator texts and sliders (range, step, start value)        |
| `formularz`   | Quote form labels, placeholders, messages and GDPR clause      |
| `politykaPrywatnosci` | Privacy policy sections (administrator data comes from `firma`) |

Example: adding a service means appending one object to `uslugi`.

```js
{
  id: "kostka",
  nazwa: "Mycie kostki brukowej",
  opis: "Usuwamy mech, glony i ciężkie zabrudzenia z chodników, podjazdów i placów.",
  cena: "od 10 zł/m²",
  ikona: "🧹",
}
```

Images can be external URLs or files placed in `public/` (for example `/zdjecia/podjazd-po.jpg`).

## Deployment

The project is deployed on [Vercel](https://vercel.com).

1. Import the repository in the Vercel dashboard.
2. Keep the default settings (the Next.js preset is detected automatically).
3. Add the environment variables described above (at least `RESEND_API_KEY`).
4. Every push to `main` is built and published automatically.

A custom domain can be attached under **Settings → Domains**. Deployment from the command line is also possible with `npx vercel`.

## Author

**Cyprian Antreou** · [GitHub](https://github.com/cyps0nik) 