# Astral System

Monorepo for building client websites. Any type.

## Rules

1. **Before building anything, read what exists.** Look at `apps/` for existing sites, `packages/ui/src/` for components, `packages/types/src/` for interfaces. Never build what already exists.
2. **sacred-counsel is the reference.** When unsure how to structure something, check `apps/sacred-counsel/`. Copy its patterns.
3. **Reuse shared packages.** Import from `@astral/ui`, `@astral/types`, `@astral/seo`, etc. Never duplicate shared components into a client app.
4. **If you build something reusable, move it to a shared package.** Built a booking component? Put it in `packages/booking/`. Built a contact form? Put it in `packages/ui/`. Next client gets it for free.
5. **One site = one folder in `apps/`.** Each with its own git repo. Never mix client code.
6. **Don't add tech until needed.** No Sanity unless they need a CMS. No Stripe unless they need payments. No Supabase unless they need a database.
7. **User is on a phone.** Be concise. Don't list options. Pick the best approach and do it. Only ask when genuinely ambiguous.
8. **Commit early, commit often.** Small commits. Push after each meaningful change.
9. **Don't break other sites.** Only run/build the site you're working on. Use `--filter`.
10. **When stuck or running out of context, commit WIP + write TODO.md.** User will say "continue" next session.

## Before You Start Any New Site

```
# 1. Read existing components
ls packages/ui/src/primitives/   # Button, Card, Input, Badge, Accordion, Carousel
ls packages/ui/src/sections/     # Hero, CTA, FAQ, Testimonials, Pricing, Team, Newsletter, AmenityGrid
ls packages/ui/src/layout/       # Header, Footer

# 2. Read the reference site
ls apps/sacred-counsel/src/      # See how a complete site is structured
cat apps/sacred-counsel/src/lib/constants.ts   # See how data is organized
cat apps/sacred-counsel/src/app/page.tsx        # See how pages compose sections

# 3. Check what types exist
cat packages/types/src/index.ts  # SiteConfig, Testimonial, FAQ, TeamMember, etc.

# 4. Check other client sites for patterns you can copy
ls apps/
```

Do this EVERY time. Don't guess what exists — look.

## Architecture

```
astral-system/
├── packages/              ← shared code, reuse always
│   ├── ui                 ← components (primitives, sections, layout)
│   ├── types              ← TypeScript interfaces
│   ├── sanity-schemas     ← CMS schemas (when needed)
│   ├── sanity-utils       ← Sanity client + queries (when needed)
│   ├── seo                ← Schema.org structured data
│   └── config-*           ← shared tsconfig, eslint, tailwind
├── apps/                  ← one folder per client site
│   ├── client-starter     ← template (copy for new sites)
│   ├── sacred-counsel     ← reference implementation
│   └── <new-client>/      ← your new site goes here
└── tools/
    └── create-client      ← scaffold wizard
```

## Tech Stack

- Next.js 16 (App Router) + TypeScript 5 + Tailwind CSS 4
- pnpm + Turborepo
- Add only when needed: Sanity (CMS), Stripe (payments), NextAuth (auth), Supabase (DB)
- Deploy: pm2, self-hosted via Tailscale

## Creating a New Site

1. `cp -r apps/client-starter apps/<slug>`
2. Replace `@astral/{{SLUG}}` with `@astral/<slug>` in package.json
3. Fill in `src/lib/config.ts` (site name, nav, footer)
4. Set brand colors in `src/app/globals.css`
5. Set fonts in `src/app/layout.tsx`
6. No CMS? Remove `@sanity/*` and `next-sanity` from package.json
7. `cd ~/projects/astral-system && pnpm install`
8. Init git:
   ```bash
   cd apps/<slug> && git init
   gh repo create <slug> --public --source=. --push
   ```

## Git

- `astral-system/` = monorepo repo (packages, configs, tools, template)
- `apps/<slug>/` = each client has its own repo
- `apps/*/` is in monorepo `.gitignore` — client repos are independent
- When you change a shared package, commit to monorepo repo
- When you change a client site, commit to that client's repo

## Development

```bash
pnpm dev --filter @astral/<slug>    # run ONLY this site
pnpm build --filter @astral/<slug>  # build ONLY this site
```

Never run `pnpm dev` without `--filter`. Never touch other sites.

## Deploy

```bash
pnpm build --filter @astral/<slug>
PORT=<port> pm2 start apps/<slug>/node_modules/.bin/next --name "<slug>" -- start -p <port>
pm2 save
```

- Ports start from 3001. Check `pm2 list` for next available.
- After deploy, report: "Running at http://100.64.86.7:<port>"

## Shared vs Custom

| If it exists in packages/ | Use it |
|---|---|
| Button, Card, Input, Badge, Accordion, Carousel | `@astral/ui` primitives |
| Hero, CTA, FAQ, Testimonials, Pricing, Team, Newsletter | `@astral/ui` sections |
| Header, Footer | `@astral/ui` layout |
| SiteConfig, Testimonial, FAQ, TeamMember, BlogPost | `@astral/types` |
| SEO schemas | `@astral/seo` |
| Sanity document schemas | `@astral/sanity-schemas` |

| If it doesn't exist | Build it |
|---|---|
| Client-specific sections | `apps/<slug>/src/components/` |
| Client content/data | `apps/<slug>/src/lib/config.ts` |
| Something reusable? | Build it, then move to `packages/` |

## CSS Variables (each client sets in globals.css)

`--primary`, `--primary-hover`, `--secondary`, `--secondary-hover`, `--accent`, `--accent-hover`, `--background`, `--background-alt`, `--foreground`, `--foreground-muted`, `--muted`, `--muted-light`, `--surface`, `--surface-alt`, `--font-heading`, `--font-body`

## Conventions

- Named exports, no default exports
- Functional components, no classes
- Props for data, never hardcode content
- Client data in `config.ts`, not in components
- Barrel exports from packages (`index.ts`)
