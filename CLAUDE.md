# Astral System

Monorepo for building client websites. Any type — wellness, restaurants, portfolios, agencies, e-commerce, landing pages.

The user works from a phone. Be autonomous. Just build. Only ask when truly ambiguous.

## Architecture

```
astral-system/
├── packages/              ← shared, reuse always
│   ├── ui                 ← Button, Card, Hero, CTA, FAQ, Team, etc.
│   ├── types              ← TypeScript interfaces
│   ├── sanity-schemas     ← CMS document schemas
│   ├── sanity-utils       ← Sanity client + GROQ queries
│   ├── seo                ← Schema.org structured data
│   ├── config-typescript  ← shared tsconfig
│   ├── config-eslint      ← ESLint 9 flat config
│   └── config-tailwind    ← Tailwind preset + base CSS
├── apps/                  ← one folder per client
│   ├── client-starter     ← template (copy this for new sites)
│   └── sacred-counsel     ← reference implementation
└── tools/
    └── create-client      ← scaffold wizard
```

## Tech Stack (same for everything)

- Next.js 16 (App Router) + TypeScript 5 (strict) + Tailwind CSS 4
- pnpm + Turborepo
- CMS: Sanity v5 (only when client needs it)
- Payments: Stripe (only when client needs it)
- Auth: NextAuth (only when client needs it)
- DB: Supabase (only for complex sites with user data)
- Deploy: pm2 on this Mac, self-hosted via Tailscale

Don't add tools unless a real client needs them.

## Creating a New Client Site

1. Copy the template:
   ```bash
   cp -r apps/client-starter apps/<slug>
   ```

2. In `apps/<slug>/package.json`: replace `@astral/{{SLUG}}` with `@astral/<slug>`

3. In `apps/<slug>/src/lib/config.ts`: fill in SITE_CONFIG, NAV_LINKS, FOOTER_COLUMNS

4. In `apps/<slug>/src/app/globals.css`: set brand colors as CSS variables

5. In `apps/<slug>/src/app/layout.tsx`: set fonts and metadata

6. If no CMS needed: remove all `@sanity/*` and `next-sanity` from package.json

7. Install: `cd ~/projects/astral-system && pnpm install`

8. Init client git repo:
   ```bash
   cd apps/<slug>
   git init
   gh repo create <slug> --public --source=. --push
   ```

## Git Strategy

- The monorepo `astral-system/` has its own git repo (tracks packages, configs, tools)
- Each client `apps/<slug>/` gets its own separate git repo inside it
- Add `apps/*/` to the monorepo's `.gitignore` so client repos stay independent
- This way: shared code is versioned together, client code is versioned separately

When creating a new client:
1. Build the site in `apps/<slug>/`
2. `git init` inside `apps/<slug>/`
3. `gh repo create <slug> --public --source=. --push`
4. Commit to the client repo as you work

When updating shared packages:
1. Make changes in `packages/`
2. Commit to the monorepo repo
3. Rebuild affected client sites

## Development

```bash
pnpm dev --filter @astral/<slug>          # dev one site
pnpm build --filter @astral/<slug>        # build one site
PORT=3005 pnpm dev --filter @astral/<slug> # dev on specific port
```

Only the site you're working on runs. Other deployed sites are untouched.

## Deploy

All sites self-hosted on this Mac via Tailscale at http://100.64.86.7:<port>.

```bash
pnpm build --filter @astral/<slug>
PORT=<port> pm2 start apps/<slug>/node_modules/.bin/next --name "<slug>" -- start -p <port>
pm2 save
```

Check what's running: `pm2 list`
Next available port: check `pm2 list` and pick the next one after 3001.

After deploying, always report: "Running at http://100.64.86.7:<port>"

## When to Use Shared Packages vs Build New

| Need | Use shared | Build in client app |
|---|---|---|
| Button, Card, Input, Badge | @astral/ui | Never rebuild these |
| Hero, CTA, FAQ, Testimonials, Team | @astral/ui sections | Never rebuild these |
| Header, Footer | @astral/ui layout | Never rebuild these |
| Blog/FAQ/Team CMS schemas | @astral/sanity-schemas | Never redefine |
| GROQ queries | @astral/sanity-utils | Never write inline |
| SEO structured data | @astral/seo | Never do manual JSON-LD |
| Client-specific sections | — | apps/<slug>/src/components/ |
| Client data/content | — | apps/<slug>/src/lib/config.ts |

**If you build something that could work for other clients, add it to a shared package.**

## Site Type Handling

- **Brochure/landing page**: Hero + CTA + maybe testimonials. No DB, no CMS. Just constants.ts.
- **Wellness/retreat**: Full template — Hero, Team, FAQ, Testimonials, Pricing, Newsletter.
- **Restaurant**: Hero + custom menu component + contact. Build menu component in client app.
- **Portfolio**: Hero + project grid. Minimal.
- **Agency**: Hero + services + team + testimonials + CTA.
- **With booking**: Add when first client needs it → build `packages/booking/`, reuse forever.
- **With payments**: Add Stripe when needed → build `packages/payments/`, reuse forever.

Always start from shared components. Only build custom when @astral/ui doesn't have it.

## CSS Variable Contract

Each client sets these in `globals.css`:

| Variable | Purpose |
|---|---|
| `--primary` / `--primary-hover` | Main brand color |
| `--secondary` / `--secondary-hover` | Secondary brand color |
| `--accent` / `--accent-hover` | Accent/highlight |
| `--background` / `--background-alt` | Page backgrounds |
| `--foreground` / `--foreground-muted` | Text colors |
| `--muted` / `--muted-light` | Subtle elements |
| `--surface` / `--surface-alt` | Card/section backgrounds |
| `--font-heading` | Heading font |
| `--font-body` | Body font |

## Conventions

- Named exports, no default exports
- Functional components only
- Barrel exports from each package (index.ts)
- Components accept data via props — never hardcode content
- Client data lives in `apps/<slug>/src/lib/config.ts`
- No unnecessary comments
- Commit early, commit often

## If You Can't Finish

1. Commit everything: `git add -A && git commit -m "wip: <what was done>"`
2. Push to GitHub
3. Write `TODO.md` in the client app listing what's left
4. User will say "continue" in a new session — read TODO.md and resume
