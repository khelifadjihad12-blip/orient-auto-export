# HAKO AUTOMOBILE — International Automobile Export Platform

A production-grade, enterprise-ready digital platform for a **Hong Kong registered automobile trading company** specializing in exporting **brand-new Chinese vehicles** (electric, hybrid and petrol) to **Algeria and North Africa**, with future expansion across Africa and the Middle East.

> **HAKO AUTOMOBILE Limited** — sourcing, inspecting, shipping and documenting brand-new Chinese vehicles with the legal and financial transparency that international trade demands.

---

## ✨ Highlights

- **Premium corporate design** — Deep Navy Blue + White + subtle Gold, inspired by Mercedes-Benz, Volvo, Maersk and Stripe.
- **Multi-language** — English, French and Arabic with full **RTL** support and a persisted language switcher.
- **Multi-step quotation wizard** — a 4-step lead-generation flow (vehicle → logistics → business details → review) that creates a **Lead ID**, persists to the database and notifies the admin.
- **Interactive catalog** — 12 vehicles across 11 Chinese brands (BYD, Geely, Changan, GAC, Chery, Haval, Jetour, MG, Dongfeng, Hongqi, Zeekr), each with full specifications and a detail dialog.
- **Import-process timeline** — a 9-step interactive timeline from vehicle selection to delivery.
- **Shipping routes** — real China → North Africa corridors (Shanghai, Shenzhen, Nansha, Ningbo → Djendjen, Algiers, Tangier Med) with Incoterms (FOB / CIF).
- **SEO-first** — Metadata API, dynamic sitemap, robots.txt, Organization JSON-LD, OpenGraph / Twitter cards, canonical & hreflang alternates, web manifest.
- **Accessible & responsive** — WCAG-minded, keyboard navigable, ARIA labels, focus states, mobile-first layout, reduced-motion support.
- **Secure-by-default API** — Zod server-side validation, sanitized inputs, structured error responses.

---

## 🧱 Tech Stack

| Layer | Technology |
|------|------------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript 5** (strict) |
| Styling | **Tailwind CSS 4** + **shadcn/ui** (New York) |
| Animation | **Framer Motion** |
| Icons | **lucide-react** |
| Forms | **React Hook Form** + **Zod** |
| State | **Zustand** (client), server components for initial data |
| Database | **Prisma ORM** + **SQLite** (sandbox) — schema is portable to PostgreSQL |
| AI imagery | **z-ai-web-dev-sdk** (image generation) |
| Theming | **next-themes** (light/dark) |
| Notifications | **Sonner** |
| Auth (ready) | **NextAuth.js v4** + role-based access |

> **Note on database:** The sandbox runs SQLite for zero-configuration portability. The Prisma schema uses only portable types, so switching to PostgreSQL for production is a one-line datasource change (`provider = "postgresql"`). List-like fields are stored as JSON strings and parsed in `src/lib/data.ts`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, providers, JSON-LD
│   ├── page.tsx                # Home (server component — fetches & composes all sections)
│   ├── globals.css            # Design system: navy/gold theme, utilities
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # Robots policy
│   ├── manifest.ts            # PWA manifest
│   └── api/
│       ├── leads/             # POST/GET — quotation wizard submissions
│       ├── contact/           # POST — contact form
│       ├── vehicles/          # GET — filtered vehicle list
│       ├── brands/            # GET — brand list
│       ├── testimonials/      # GET
│       ├── faqs/              # GET
│       ├── articles/          # GET
│       └── shipping-routes/   # GET
├── components/
│   ├── providers/             # i18n + theme providers
│   ├── site/                  # Reveal, SectionHeading, primitives, switchers
│   ├── vehicles/              # VehicleCard, VehicleDetailDialog
│   └── sections/              # Navbar, Hero, Brands, Vehicles, Process,
│                               #   Shipping, QuotationWizard, Testimonials,
│                               #   FAQ, Articles, Contact, CTA, Footer, About
├── lib/
│   ├── db.ts                  # Prisma client singleton
│   ├── data.ts                # Server-side data accessors (parsed public models)
│   ├── types.ts               # Shared public types (client+server safe)
│   ├── i18n.ts                # EN/FR/AR dictionaries
│   ├── quote-store.ts         # Zustand store linking "Inquire" → wizard
│   └── utils.ts               # cn() helper
└── hooks/                      # shadcn hooks
prisma/
└── schema.prisma              # User, Brand, Vehicle, Category, Lead, Article,
                               #   Catalog, ShippingRoute, Testimonial, FAQ, Media
seed.ts                        # Realistic seed data (11 brands, 12 vehicles, …)
```

---

## 🗄️ Data Models

`User`, `Brand`, `Category`, `Vehicle`, `Lead`, `Article`, `Catalog`, `ShippingRoute`, `Testimonial`, `FAQ`, `Media`.

Each `Vehicle` carries a JSON `specs` payload (engine, transmission, battery, range, horsepower, top speed, acceleration, dimensions, seating, features). See `prisma/schema.prisma`.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
bun install

# 2. Configure environment
cp .env.example .env

# 3. Push the database schema & seed
bun run db:push
bun run seed.ts

# 4. Start the dev server
bun run dev          # http://localhost:3000

# 5. Lint
bun run lint
```

The platform ships pre-seeded with 11 brands, 12 vehicles, 6 shipping routes, 5 testimonials, 10 FAQs and 6 articles — so it looks and reads like a real trading company from the first load.

---

## 🔌 API Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/leads` | Create a quotation request → returns `{ leadId }` (e.g. `OAE-2025-000142`) |
| `GET`  | `/api/leads` | List recent leads (admin) |
| `POST` | `/api/contact` | Submit the contact form → returns `{ ticket }` |
| `GET`  | `/api/vehicles?featured=true&energy=EV&brand=byd` | Filtered vehicle list |
| `GET`  | `/api/brands` | Brand list with model counts |
| `GET`  | `/api/shipping-routes` | Active shipping corridors |
| `GET`  | `/api/testimonials` · `/api/faqs` · `/api/articles` | Content endpoints |

All `POST` endpoints validate input with **Zod** and return `422` with structured issues on failure.

---

## 🌍 Internationalisation

- Locales: **English** (default), **French**, **Arabic** (RTL).
- The language switcher persists to `localStorage` and updates `<html lang>` / `dir`.
- Implemented with `useSyncExternalStore` for hydration-safe, SSR-stable rendering.
- Dictionary: `src/lib/i18n.ts`.

---

## 🔐 Security & Compliance Posture

- **Server-side validation** with Zod on every API route.
- **Input length bounds** on all string fields to mitigate abuse.
- **Sanitized error responses** — internal details are logged, not leaked.
- **CSRF-aware** POST handling via Next.js route handlers.
- **KYC / AML / sanctions-screening** posture documented in copy and footer (outcomes remain subject to the relevant authorities — no guarantees are made).
- Secrets are kept in environment variables (see `.env.example`).

---

## 🎯 Performance

- Server Components for the initial render; client components only where interactivity is required.
- `next/image` optimization for all vehicle and hero imagery.
- Framer Motion `whileInView` reveal with `prefers-reduced-motion` respect.
- ISR (`revalidate = 3600`) on the home route.
- Code-splitting via dynamic section composition.

---

## 🧭 Deployment Guide

### Option A — Cloudflare Workers (recommended, edge-deployed)

The project is preconfigured for Cloudflare via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).
Because Cloudflare's edge runtime has no filesystem, the local SQLite file
won't work there — the production database is **Turso** (SQLite-at-the-edge,
fully Prisma-compatible, same schema).

**1. Create a Turso database** (free tier available):

```bash
# Install the Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Log in and create a database
turso auth login
turso db create orient-auto-export --location fra

# Get your connection URL and access token
turso db show orient-auto-export --url         # → libsql://orient-auto-export-<you>.turso.io
turso db tokens create orient-auto-export      # → <long token string>
```

**2. Push the schema & seed Turso** (run locally with the Turso URL):

```bash
# Temporarily point your local .env at Turso to push the schema + seed
DATABASE_URL="libsql://orient-auto-export-<you>.turso.io" \
DATABASE_AUTH_TOKEN="<token>" \
bun run db:push

DATABASE_URL="libsql://orient-auto-export-<you>.turso.io" \
DATABASE_AUTH_TOKEN="<token>" \
bun run seed.ts
```

**3. Deploy to Cloudflare** (two ways):

- **CLI** — `bun run cf:deploy` (runs `opennextjs-cloudflare build && deploy`)
- **Dashboard** — Cloudflare → Workers & Pages → Create → Connect to Git →
  select your GitHub repo. Build command: `npx opennextjs-cloudflare build`.
  Output directory: `.open-next`.

**4. Set environment variables** in the Cloudflare dashboard
(Workers & Pages → your worker → Settings → Variables):

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `libsql://orient-auto-export-<you>.turso.io` |
| `DATABASE_AUTH_TOKEN` | `<turso token>` (mark as **secret**) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `85259874400` |
| `NEXT_PUBLIC_SITE_URL` | `https://orient-auto-export.<subdomain>.workers.dev` |

That's it — your site is live on Cloudflare's global edge network. 🚀

### Option B — Vercel / Node.js (classic)

1. **Database** — keep SQLite for small deployments or point `DATABASE_URL` at PostgreSQL. Run `bun run db:push`.
2. **Email** — set `RESEND_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL`.
3. **Deploy** — `next build` produces a standalone output. Set env vars in the Vercel project settings.

---

## ☁️ Cloudflare scripts

| Script | Purpose |
|--------|---------|
| `bun run cf:build` | Build the Cloudflare Worker (`.open-next/worker.js`) |
| `bun run cf:preview` | Build + run locally via Wrangler dev server |
| `bun run cf:deploy` | Build + deploy to Cloudflare Workers |

First-time CLI deploy requires `npx wrangler login` to authenticate with your Cloudflare account.

---

## ⚖️ Legal & Disclaimer

The platform copy intentionally **does not guarantee** regulatory, banking or customs outcomes. The footer carries an explicit disclaimer: final specifications, pricing and availability are confirmed in writing on each quotation, and regulatory/banking/customs outcomes remain subject to the relevant authorities and institutions.

---

## 📄 License

Proprietary — © HAKO AUTOMOBILE Limited. All rights reserved.
